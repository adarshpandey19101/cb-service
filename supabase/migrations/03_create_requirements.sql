-- Create requirements table
CREATE TABLE IF NOT EXISTS requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_development', 'completed', 'rejected')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  created_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger for requirements
DROP TRIGGER IF EXISTS update_requirements_updated_at ON requirements;
CREATE TRIGGER update_requirements_updated_at
    BEFORE UPDATE ON requirements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE requirements ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view requirements for their projects" ON requirements;
DROP POLICY IF EXISTS "Users can create requirements for their projects" ON requirements;
DROP POLICY IF EXISTS "Users can update requirements for their projects" ON requirements;
DROP POLICY IF EXISTS "Users can delete requirements for their projects" ON requirements;

-- RLS Policies
CREATE POLICY "Users can view requirements for their projects" 
  ON requirements FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = requirements.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create requirements for their projects" 
  ON requirements FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = requirements.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update requirements for their projects" 
  ON requirements FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = requirements.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete requirements for their projects" 
  ON requirements FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = requirements.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_requirements_project_id ON requirements(project_id);
CREATE INDEX IF NOT EXISTS idx_requirements_status ON requirements(status);
CREATE INDEX IF NOT EXISTS idx_requirements_priority ON requirements(priority);

-- Add comments
COMMENT ON TABLE requirements IS 'Project requirements and their status';
COMMENT ON COLUMN requirements.status IS 'Requirement status: pending, approved, in_development, completed, rejected';
COMMENT ON COLUMN requirements.priority IS 'Requirement priority: low, medium, high, critical';
