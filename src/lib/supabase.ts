import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase environment variables. Please check your .env file.'
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});

// Database types (will be expanded as we add more tables)
export interface Profile {
    id: string;
    email: string;
    full_name: string;
    company?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    image?: string; // Added by API layer for compatibility
    category?: string; // Optional field for future use
    author_id: string;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export interface JobApplication {
    id: string;
    job_title: string;
    applicant_name: string;
    applicant_email: string;
    phone: string;
    resume_url?: string;
    cover_letter: string;
    status: 'pending' | 'reviewing' | 'rejected' | 'accepted';
    created_at: string;
}

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    company?: string;
    message: string;
    status: 'new' | 'read' | 'responded';
    created_at: string;
}
