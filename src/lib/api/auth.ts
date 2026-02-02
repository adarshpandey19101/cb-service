import { supabase } from '../supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface SignUpData {
    email: string;
    password: string;
    fullName: string;
    company?: string;
}

export interface SignInData {
    email: string;
    password: string;
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(data: SignUpData) {
    const { email, password, fullName, company } = data;

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                company,
            },
        },
    });

    if (authError) throw authError;

    // Create profile (triggered automatically by database trigger, but we can also do it manually)
    if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
            id: authData.user.id,
            email,
            full_name: fullName,
            company,
        });

        if (profileError) console.error('Profile creation error:', profileError);
    }

    return authData;
}

/**
 * Sign in an existing user with email and password
 */
export async function signIn(data: SignInData) {
    const { email, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return authData;
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/`,
        },
    });

    if (error) throw error;
    return data;
}

/**
 * Sign in with LinkedIn OAuth
 */
export async function signInWithLinkedIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
            redirectTo: `${window.location.origin}/`,
        },
    });

    if (error) throw error;
    return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/**
 * Get the current session
 */
export async function getCurrentSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

/**
 * Update user profile
 */
export async function updateProfile(userId: string, updates: {
    full_name?: string;
    company?: string;
    avatar_url?: string;
}) {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Get user profile by ID
 */
export async function getProfile(userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data;
}
