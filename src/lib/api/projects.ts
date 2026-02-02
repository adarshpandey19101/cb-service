import { supabase } from '../supabase';

export interface Project {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    status: 'new' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    budget: number | null;
    start_date: string | null;
    end_date: string | null;
    estimated_hours: number | null;
    actual_hours: number;
    progress: number;
    tags: string[] | null;
    created_at: string;
    updated_at: string;
}

export interface CreateProjectData {
    title: string;
    description?: string;
    status?: Project['status'];
    priority?: Project['priority'];
    budget?: number;
    start_date?: string;
    end_date?: string;
    estimated_hours?: number;
    tags?: string[];
}

export interface UpdateProjectData {
    title?: string;
    description?: string;
    status?: Project['status'];
    priority?: Project['priority'];
    budget?: number;
    start_date?: string;
    end_date?: string;
    estimated_hours?: number;
    actual_hours?: number;
    progress?: number;
    tags?: string[];
}

export interface ProjectFilters {
    status?: Project['status'];
    priority?: Project['priority'];
    search?: string;
}

export interface ProjectStats {
    total: number;
    active: number;
    completed: number;
    onHold: number;
}

/**
 * Get all projects for the current user
 */
export async function getProjects(userId: string, filters?: ProjectFilters): Promise<Project[]> {
    let query = supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (filters?.status) {
        query = query.eq('status', filters.status);
    }

    if (filters?.priority) {
        query = query.eq('priority', filters.priority);
    }

    if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
}

/**
 * Get a single project by ID
 */
export async function getProject(projectId: string): Promise<Project> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Create a new project
 */
export async function createProject(userId: string, data: CreateProjectData): Promise<Project> {
    const { data: project, error } = await supabase
        .from('projects')
        .insert({
            user_id: userId,
            ...data,
        })
        .select()
        .single();

    if (error) throw error;

    // Create initial project update
    await supabase.from('project_updates').insert({
        project_id: project.id,
        update_type: 'comment',
        message: 'Project created',
        created_by: userId,
    });

    return project;
}

/**
 * Update a project
 */
export async function updateProject(projectId: string, data: UpdateProjectData, userId: string): Promise<Project> {
    const { data: project, error } = await supabase
        .from('projects')
        .update({
            ...data,
            updated_at: new Date().toISOString(),
        })
        .eq('id', projectId)
        .select()
        .single();

    if (error) throw error;

    // Log status change if status was updated
    if (data.status) {
        await supabase.from('project_updates').insert({
            project_id: projectId,
            update_type: 'status_change',
            message: `Project status changed to ${data.status}`,
            metadata: { new_status: data.status },
            created_by: userId,
        });
    }

    return project;
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string): Promise<void> {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

    if (error) throw error;
}

/**
 * Get project statistics for the user
 */
export async function getProjectStats(userId: string): Promise<ProjectStats> {
    const { data, error } = await supabase
        .from('projects')
        .select('status')
        .eq('user_id', userId);

    if (error) throw error;

    const stats: ProjectStats = {
        total: data?.length || 0,
        active: data?.filter(p => p.status === 'in_progress').length || 0,
        completed: data?.filter(p => p.status === 'completed').length || 0,
        onHold: data?.filter(p => p.status === 'on_hold').length || 0,
    };

    return stats;
}
