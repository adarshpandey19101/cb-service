import { Link } from 'react-router-dom';
import { type Project } from '@/lib/api/projects';
import { Calendar, Clock, TrendingUp, MoreVertical } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
    onUpdate: () => void;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const getStatusColor = (status: Project['status']) => {
        switch (status) {
            case 'new':
                return 'bg-blue-100 text-blue-800';
            case 'in_progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'on_hold':
                return 'bg-gray-100 text-gray-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: Project['priority']) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Link
            to={`/projects/${project.id}`}
            className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description || 'No description'}
                    </p>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        // Handle menu actions
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                >
                    <MoreVertical size={18} />
                </button>
            </div>

            {/* Status & Priority */}
            <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
                {project.start_date && (
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(project.start_date)}</span>
                    </div>
                )}
                {project.estimated_hours && (
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{project.estimated_hours}h</span>
                    </div>
                )}
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            +{project.tags.length - 3}
                        </span>
                    )}
                </div>
            )}
        </Link>
    );
}
