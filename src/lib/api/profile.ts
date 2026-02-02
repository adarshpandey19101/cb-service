import { supabase } from '../supabase';

export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    phone: string | null;
    company: string | null;
    bio: string | null;
    role: 'client' | 'admin';
    profile_photo_url: string | null;
    address: string | null;
    city: string | null;
    country: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProfileUpdateData {
    full_name?: string;
    phone?: string;
    company?: string;
    bio?: string;
    address?: string;
    city?: string;
    country?: string;
}

/**
 * Get current user's profile
 */
export async function getUserProfile(userId: string): Promise<UserProfile> {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: ProfileUpdateData) {
    const { data, error } = await supabase
        .from('profiles')
        .update({
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Upload profile photo to Supabase storage
 */
export async function uploadProfilePhoto(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profile-photos/${fileName}`;

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
        });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    // Update profile with new photo URL
    await updateUserProfile(userId, { profile_photo_url: data.publicUrl } as ProfileUpdateData);

    return data.publicUrl;
}

/**
 * Delete profile photo
 */
export async function deleteProfilePhoto(userId: string, photoUrl: string) {
    // Extract file path from URL
    const filePath = photoUrl.split('/avatars/')[1];

    if (filePath) {
        const { error } = await supabase.storage
            .from('avatars')
            .remove([filePath]);

        if (error) throw error;
    }

    // Update profile to remove photo URL
    await updateUserProfile(userId, { profile_photo_url: null } as ProfileUpdateData);
}
