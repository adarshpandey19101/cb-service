-- Add phone column to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add a comment to the column
COMMENT ON COLUMN contact_submissions.phone IS 'Client phone/mobile number for contact purposes';
