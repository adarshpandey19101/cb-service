-- Create project_updates table for activity tracking
CREATE TABLE IF NOT EXISTS project_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  update_type TEXT CHECK (update_type IN ('status_change', 'comment', 'file_upload', 'requirement_added', 'requirement_updated')),
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view updates for their projects" ON project_updates;
DROP POLICY IF EXISTS "Users can create updates for their projects" ON project_updates;

-- RLS Policies
CREATE POLICY "Users can view updates for their projects" 
  ON project_updates FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_updates.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create updates for their projects" 
  ON project_updates FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_updates.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_project_updates_project_id ON project_updates(project_id);
CREATE INDEX IF NOT EXISTS idx_project_updates_created_at ON project_updates(created_at DESC);

-- Add comments
COMMENT ON TABLE project_updates IS 'Activity log for projects';
COMMENT ON COLUMN project_updates.update_type IS 'Type of update: status_change, comment, file_upload, requirement_added, requirement_updated';
COMMENT ON COLUMN project_updates.metadata IS 'Additional data about the update in JSON format';
