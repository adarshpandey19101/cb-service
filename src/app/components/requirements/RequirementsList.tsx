import { motion } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createRequirement, updateRequirement, deleteRequirement, type Requirement } from '@/lib/api/requirements';
import { Plus, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

interface RequirementsListProps {
    projectId: string;
    requirements: Requirement[];
    onUpdate: () => void;
}

export function RequirementsList({ projectId, requirements, onUpdate }: RequirementsListProps) {
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium' as Requirement['priority'],
    });

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            await createRequirement(
                {
                    project_id: projectId,
                    ...formData,
                },
                user.id
            );
            setFormData({ title: '', description: '', priority: 'medium' });
            setShowForm(false);
            onUpdate();
        } catch (err) {
            console.error('Failed to create requirement:', err);
        }
    };

    const handleStatusChange = async (requirementId: string, newStatus: Requirement['status']) => {
        if (!user) return;

        try {
            await updateRequirement(requirementId, { status: newStatus }, user.id);
            onUpdate();
        } catch (err) {
            console.error('Failed to update requirement:', err);
        }
    };

    const getStatusIcon = (status: Requirement['status']) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="text-green-600" size={20} />;
            case 'in_development':
                return <Clock className="text-yellow-600" size={20} />;
            case 'approved':
                return <CheckCircle className="text-blue-600" size={20} />;
            case 'rejected':
                return <XCircle className="text-red-600" size={20} />;
            default:
                return <AlertCircle className="text-gray-600" size={20} />;
        }
    };

    const getStatusColor = (status: Requirement['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in_development':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-blue-100 text-blue-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: Requirement['priority']) => {
        switch (priority) {
            case 'critical':
                return 'bg-red-100 text-red-800';
            case 'high':
                return 'bg-orange-100 text-orange-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-4">
            {/* Add Requirement Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
                >
                    <Plus size={18} />
                    Add Requirement
                </button>
            </div>

            {/* New Requirement Form */}
            {showForm && (
                <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    onSubmit={handleCreate}
                    className="bg-white rounded-xl shadow-sm p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">New Requirement</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Title *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Requirement title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                placeholder="Describe the requirement..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Requirement['priority'] })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                Create
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setFormData({ title: '', description: '', priority: 'medium' });
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.form>
            )}

            {/* Requirements List */}
            <div className="space-y-3">
                {requirements.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
                        <p className="text-gray-600">No requirements yet. Add your first requirement to get started.</p>
                    </div>
                ) : (
                    requirements.map((req) => (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                {getStatusIcon(req.status)}

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-lg font-semibold text-gray-900">{req.title}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(req.priority)}`}>
                                                {req.priority}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                                                {req.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>

                                    {req.description && (
                                        <p className="text-gray-600 mb-3">{req.description}</p>
                                    )}

                                    {/* Status Actions */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Update status:</span>
                                        <select
                                            value={req.status}
                                            onChange={(e) => handleStatusChange(req.id, e.target.value as Requirement['status'])}
                                            className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="in_development">In Development</option>
                                            <option value="completed">Completed</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
