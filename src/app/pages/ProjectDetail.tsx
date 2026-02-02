import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getProject, updateProject, deleteProject, type Project } from '@/lib/api/projects';
import { getRequirements, type Requirement } from '@/lib/api/requirements';
import { ArrowLeft, Edit2, Trash2, Calendar, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { RequirementsList } from '../components/requirements/RequirementsList';

export function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [project, setProject] = useState<Project | null>(null);
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'activity'>('overview');

    useEffect(() => {
        if (id && user) {
            loadProject();
            loadRequirements();
        }
    }, [id, user]);

    const loadProject = async () => {
        if (!id) return;

        try {
            setLoading(true);
            const data = await getProject(id);
            setProject(data);
        } catch (err) {
            console.error('Failed to load project:', err);
            navigate('/projects');
        } finally {
            setLoading(false);
        }
    };

    const loadRequirements = async () => {
        if (!id) return;

        try {
            const data = await getRequirements(id);
            setRequirements(data);
        } catch (err) {
            console.error('Failed to load requirements:', err);
        }
    };

    const handleDelete = async () => {
        if (!id || !confirm('Are you sure you want to delete this project?')) return;

        try {
            await deleteProject(id);
            navigate('/projects');
        } catch (err) {
            console.error('Failed to delete project:', err);
        }
    };

    const getStatusColor = (status: Project['status']) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'on_hold': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-gray-600">Loading project...</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-gray-600">Project not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Projects
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm p-8 mb-6"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl text-gray-900">{project.title}</h1>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                                    {project.status.replace('_', ' ')}
                                </span>
                            </div>
                            <p className="text-gray-600">{project.description || 'No description'}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                to={`/projects/${id}/edit`}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                <Edit2 size={18} />
                                Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Progress */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Overall Progress</span>
                            <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-primary h-3 rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex gap-8">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'overview'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('requirements')}
                                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'requirements'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Requirements ({requirements.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('activity')}
                                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'activity'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Activity
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {/* Details Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-gray-400" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-600">Start Date</div>
                                        <div className="text-gray-900">
                                            {project.start_date
                                                ? new Date(project.start_date).toLocaleDateString()
                                                : 'Not set'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="text-gray-400" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-600">End Date</div>
                                        <div className="text-gray-900">
                                            {project.end_date
                                                ? new Date(project.end_date).toLocaleDateString()
                                                : 'Not set'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Clock className="text-gray-400" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-600">Estimated Hours</div>
                                        <div className="text-gray-900">{project.estimated_hours || 'Not set'}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <DollarSign className="text-gray-400" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-600">Budget</div>
                                        <div className="text-gray-900">
                                            {project.budget ? `$${project.budget.toLocaleString()}` : 'Not set'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <TrendingUp className="text-gray-400" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-600">Priority</div>
                                        <div className="text-gray-900 capitalize">{project.priority}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-primary">{requirements.length}</div>
                                    <div className="text-sm text-gray-600">Total Requirements</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {requirements.filter(r => r.status === 'completed').length}
                                    </div>
                                    <div className="text-sm text-gray-600">Completed</div>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {requirements.filter(r => r.status === 'in_development').length}
                                    </div>
                                    <div className="text-sm text-gray-600">In Development</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-600">
                                        {requirements.filter(r => r.status === 'pending').length}
                                    </div>
                                    <div className="text-sm text-gray-600">Pending</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'requirements' && (
                    <RequirementsList
                        projectId={project.id}
                        requirements={requirements}
                        onUpdate={loadRequirements}
                    />
                )}

                {activeTab === 'activity' && (
                    <motion.div
                        key="activity"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
                        <p className="text-gray-600">Activity timeline coming soon...</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
