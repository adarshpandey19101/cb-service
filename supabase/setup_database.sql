-- ============================================
-- CodingBits Database Setup - Complete Schema
-- ============================================
-- Run this file in Supabase SQL Editor to set up the complete database
--
-- INSTRUCTIONS:
-- 1. Go to https://app.supabase.com
-- 2. Select your project
-- 3. Go to SQL Editor
-- 4. Click "New Query"
-- 5. Copy and paste this entire file
-- 6. Click "Run"
--
-- ============================================

-- ============================================
-- 1. USER PROFILES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    phone TEXT,
    company TEXT,
    bio TEXT,
    role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin')),
    profile_photo_url TEXT,
    address TEXT,
    city TEXT,
    country TEXT DEFAULT 'India',
    linkedin_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Comments
COMMENT ON TABLE profiles IS 'User profile information linked to auth.users';
COMMENT ON COLUMN profiles.linkedin_url IS 'User LinkedIn profile URL';

-- ============================================
-- 2. PROJECTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'on_hold')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    start_date DATE,
    due_date DATE,
    budget DECIMAL(10, 2),
    estimated_hours INTEGER,
    actual_hours INTEGER DEFAULT 0,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own projects"
    ON projects FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
    ON projects FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
    ON projects FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
    ON projects FOR DELETE
    USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

COMMENT ON TABLE projects IS 'User projects with status tracking and budget management';

-- ============================================
-- 3. REQUIREMENTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'functional' CHECK (type IN ('functional', 'non_functional', 'constraint', 'assumption')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'deferred')),
    estimated_hours DECIMAL(5, 2),
    actual_hours DECIMAL(5, 2) DEFAULT 0,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE requirements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view requirements for their projects"
    ON requirements FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create requirements for their projects"
    ON requirements FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update requirements for their projects"
    ON requirements FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete requirements for their projects"
    ON requirements FOR DELETE
    USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_requirements_project_id ON requirements(project_id);
CREATE INDEX IF NOT EXISTS idx_requirements_user_id ON requirements(user_id);
CREATE INDEX IF NOT EXISTS idx_requirements_status ON requirements(status);

COMMENT ON TABLE requirements IS 'Project requirements with priority and status tracking';

-- ============================================
-- 4. PROJECT UPDATES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS project_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'general' CHECK (type IN ('general', 'milestone', 'issue', 'decision')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view updates for their projects"
    ON project_updates FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create updates for their projects"
    ON project_updates FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_project_updates_project_id ON project_updates(project_id);
CREATE INDEX IF NOT EXISTS idx_project_updates_created_at ON project_updates(created_at DESC);

COMMENT ON TABLE project_updates IS 'Activity log and updates for projects';

-- ============================================
-- 5. CONTACT SUBMISSIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Admin only access)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policy - Only authenticated users can read
CREATE POLICY "Authenticated users can view contact submissions"
    ON contact_submissions FOR SELECT
    USING (auth.role() = 'authenticated');

-- Anyone can submit contact form
CREATE POLICY "Anyone can create contact submissions"
    ON contact_submissions FOR INSERT
    WITH CHECK (true);

COMMENT ON TABLE contact_submissions IS 'Contact form submissions from website';
COMMENT ON COLUMN contact_submissions.phone IS 'User phone number for contact';

-- ============================================
-- 6. STORAGE BUCKET FOR AVATARS
-- ============================================

-- Create storage bucket for profile photos (if not exists)
-- This needs to be run separately or checked in Supabase Dashboard → Storage

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('avatars', 'avatars', true)
-- ON CONFLICT (id) DO NOTHING;

-- Storage policies (run in Storage section of Supabase Dashboard)
-- CREATE POLICY "Avatar images are publicly accessible"
--   ON storage.objects FOR SELECT
--   USING ( bucket_id = 'avatars' );

-- CREATE POLICY "Users can upload their own avatar"
--   ON storage.objects FOR INSERT
--   WITH CHECK ( bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1] );

-- CREATE POLICY "Users can update their own avatar"
--   ON storage.objects FOR UPDATE
--   USING ( bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1] );

-- CREATE POLICY "Users can delete their own avatar"
--   ON storage.objects FOR DELETE
--   USING ( bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1] );

-- ============================================
-- 7. FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_requirements_updated_at ON requirements;
CREATE TRIGGER update_requirements_updated_at
    BEFORE UPDATE ON requirements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SETUP COMPLETE
-- ============================================

-- Verify tables were created
SELECT 
    tablename,
    schemaname
FROM pg_tables
WHERE schemaname = 'public'
    AND tablename IN ('profiles', 'projects', 'requirements', 'project_updates', 'contact_submissions')
ORDER BY tablename;
