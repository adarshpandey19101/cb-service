-- Add linkedin_url column to profiles table
ALTER TABLE profiles
ADD COLUMN linkedin_url TEXT;

-- Add comment
COMMENT ON COLUMN profiles.linkedin_url IS 'User LinkedIn profile URL';
