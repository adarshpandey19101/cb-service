import { supabase } from '../supabase';

export interface JobApplicationData {
    jobTitle: string;
    applicantName: string;
    applicantEmail: string;
    phone: string;
    coverLetter: string;
    resumeUrl?: string;
}

/**
 * Submit a job application
 */
export async function submitJobApplication(data: JobApplicationData) {
    const { error } = await supabase.from('job_applications').insert({
        job_title: data.jobTitle,
        applicant_name: data.applicantName,
        applicant_email: data.applicantEmail,
        phone: data.phone,
        cover_letter: data.coverLetter,
        resume_url: data.resumeUrl || null,
        status: 'pending',
    });

    if (error) throw error;
    return { success: true };
}

/**
 * Upload resume to Supabase Storage
 */
export async function uploadResume(file: File, applicantEmail: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicantEmail}-${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('job-applications')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
        .from('job-applications')
        .getPublicUrl(filePath);

    return data.publicUrl;
}
