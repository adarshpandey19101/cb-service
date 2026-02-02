import { supabase } from '../supabase';
import type { BlogPost } from '../supabase';

/**
 * Get all published blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
    }
    return data;
}

/**
 * Get recent blog posts (for homepage)
 */
export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data || [];
}

/**
 * Get blog post by ID
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
    }
    return data;
}
