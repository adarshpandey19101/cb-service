import { supabase } from '../supabase';

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company?: string;
    message: string;
}

/**
 * Submit a contact form
 */
export async function submitContactForm(data: ContactFormData) {
    const { error } = await supabase.from('contact_submissions').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        message: data.message,
        status: 'new',
    });

    if (error) throw error;
    return { success: true };
}
