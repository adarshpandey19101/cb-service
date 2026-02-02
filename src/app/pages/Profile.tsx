import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUserProfile, updateUserProfile, uploadProfilePhoto, type UserProfile, type ProfileUpdateData } from '@/lib/api/profile';
import { User, Mail, Phone, Building2, MapPin, Edit2, Save, X, Camera } from 'lucide-react';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState<ProfileUpdateData>({
        full_name: '',
        phone: '',
        company: '',
        bio: '',
        address: '',
        city: '',
        country: 'India',
    });

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const data = await getUserProfile(user.id);
            setProfile(data);
            setFormData({
                full_name: data.full_name || '',
                phone: data.phone || '',
                company: data.company || '',
                bio: data.bio || '',
                address: data.address || '',
                city: data.city || '',
                country: data.country || 'India',
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;

        try {
            setSaving(true);
            setError('');
            await updateUserProfile(user.id, formData);
            await loadProfile();
            setEditing(false);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || '',
                phone: profile.phone || '',
                company: profile.company || '',
                bio: profile.bio || '',
                address: profile.address || '',
                city: profile.city || '',
                country: profile.country || 'India',
            });
        }
        setEditing(false);
        setError('');
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        try {
            setUploading(true);
            setError('');
            const photoUrl = await uploadProfilePhoto(user.id, file);

            // Update profile with new photo URL
            await updateUserProfile(user.id, { ...formData, profile_photo_url: photoUrl });
            await loadProfile();
            setSuccess('Profile photo updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to upload photo');
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-gray-600">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div {...fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-6">
                            {/* Profile Photo with Upload */}
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                                    {profile?.profile_photo_url ? (
                                        <img
                                            src={profile.profile_photo_url}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="text-primary" size={48} />
                                    )}
                                </div>
                                {/* Upload button overlay */}
                                <label
                                    htmlFor="photo-upload"
                                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                >
                                    <Camera className="text-white" size={24} />
                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
                                            <div className="text-white text-xs">Uploading...</div>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl text-gray-900 mb-2">
                                    {profile?.full_name || 'User Profile'}
                                </h1>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <Mail size={16} />
                                    {profile?.email}
                                </p>
                                {profile?.role && (
                                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-primary text-sm rounded-full">
                                        {profile.role === 'admin' ? 'Administrator' : 'Client'}
                                    </span>
                                )}
                            </div>
                        </div>

                        {!editing ? (
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                <Edit2 size={18} />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    <X size={18} />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Success Message */}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6"
                    >
                        {success}
                    </motion.div>
                )}

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Profile Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm p-8"
                >
                    <h2 className="text-2xl text-gray-900 mb-6">Profile Information</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Your full name"
                                />
                            ) : (
                                <div className="flex items-center gap-2 text-gray-900 py-3">
                                    <User size={18} className="text-gray-400" />
                                    {profile?.full_name || 'Not set'}
                                </div>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                            {editing ? (
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="+91 1234567890"
                                />
                            ) : (
                                <div className="flex items-center gap-2 text-gray-900 py-3">
                                    <Phone size={18} className="text-gray-400" />
                                    {profile?.phone || 'Not set'}
                                </div>
                            )}
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Company</label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Your company name"
                                />
                            ) : (
                                <div className="flex items-center gap-2 text-gray-900 py-3">
                                    <Building2 size={18} className="text-gray-400" />
                                    {profile?.company || 'Not set'}
                                </div>
                            )}
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">City</label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Your city"
                                />
                            ) : (
                                <div className="flex items-center gap-2 text-gray-900 py-3">
                                    <MapPin size={18} className="text-gray-400" />
                                    {profile?.city || 'Not set'}
                                </div>
                            )}
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-700 mb-2">Address</label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Your address"
                                />
                            ) : (
                                <div className="flex items-center gap-2 text-gray-900 py-3">
                                    <MapPin size={18} className="text-gray-400" />
                                    {profile?.address || 'Not set'}
                                </div>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-700 mb-2">About / Bio</label>
                            {editing ? (
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            ) : (
                                <div className="text-gray-900 py-3">
                                    {profile?.bio || 'No bio added yet'}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
