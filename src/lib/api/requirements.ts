import { supabase } from '../supabase';

export interface Requirement {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    status: 'pending' | 'approved' | 'in_development' | 'completed' | 'rejected';
    priority: 'low' | 'medium' | 'high' | 'critical';
    created_by: string | null;
    assigned_to: string | null;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateRequirementData {
    project_id: string;
    title: string;
    description?: string;
    priority?: Requirement['priority'];
    due_date?: string;
}

export interface UpdateRequirementData {
    title?: string;
    description?: string;
    status?: Requirement['status'];
    priority?: Requirement['priority'];
    assigned_to?: string;
    due_date?: string;
}

/**
 * Get all requirements for a project
 */
export async function getRequirements(projectId: string): Promise<Requirement[]> {
    const { data, error } = await supabase
        .from('requirements')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

/**
 * Get a single requirement by ID
 */
export async function getRequirement(requirementId: string): Promise<Requirement> {
    const { data, error } = await supabase
        .from('requirements')
        .select('*')
        .eq('id', requirementId)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Create a new requirement
 */
export async function createRequirement(data: CreateRequirementData, userId: string): Promise<Requirement> {
    const { data: requirement, error } = await supabase
        .from('requirements')
        .insert({
            ...data,
            created_by: userId,
        })
        .select()
        .single();

    if (error) throw error;

    // Log requirement addition to project updates
    await supabase.from('project_updates').insert({
        project_id: data.project_id,
        update_type: 'requirement_added',
        message: `New requirement added: ${data.title}`,
        metadata: { requirement_id: requirement.id },
        created_by: userId,
    });

    return requirement;
}

/**
 * Update a requirement
 */
export async function updateRequirement(
    requirementId: string,
    data: UpdateRequirementData,
    userId: string
): Promise<Requirement> {
    const { data: requirement, error } = await supabase
        .from('requirements')
        .update({
            ...data,
            updated_at: new Date().toISOString(),
        })
        .eq('id', requirementId)
        .select()
        .single();

    if (error) throw error;

    // Log status change if status was updated
    if (data.status) {
        await supabase.from('project_updates').insert({
            project_id: requirement.project_id,
            update_type: 'requirement_updated',
            message: `Requirement "${requirement.title}" status changed to ${data.status}`,
            metadata: {
                requirement_id: requirementId,
                new_status: data.status
            },
            created_by: userId,
        });
    }

    return requirement;
}

/**
 * Delete a requirement
 */
export async function deleteRequirement(requirementId: string): Promise<void> {
    const { error } = await supabase
        .from('requirements')
        .delete()
        .eq('id', requirementId);

    if (error) throw error;
}

/**
 * Get requirement statistics for a project
 */
export async function getRequirementStats(projectId: string) {
    const { data, error } = await supabase
        .from('requirements')
        .select('status, priority')
        .eq('project_id', projectId);

    if (error) throw error;

    return {
        total: data?.length || 0,
        pending: data?.filter(r => r.status === 'pending').length || 0,
        approved: data?.filter(r => r.status === 'approved').length || 0,
        inDevelopment: data?.filter(r => r.status === 'in_development').length || 0,
        completed: data?.filter(r => r.status === 'completed').length || 0,
        highPriority: data?.filter(r => r.priority === 'high' || r.priority === 'critical').length || 0,
    };
}
