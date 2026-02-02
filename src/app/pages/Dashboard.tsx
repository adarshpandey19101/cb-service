import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getProjects, getProjectStats, type Project } from '@/lib/api/projects';
import { getUserProfile, type UserProfile } from '@/lib/api/profile';
import { FolderOpen, CheckCircle, Clock, Pause, Plus, ArrowRight } from 'lucide-react';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export function Dashboard() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        completed: 0,
        onHold: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadDashboardData();
        }
    }, [user]);

    const loadDashboardData = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const [profileData, projectsData, statsData] = await Promise.all([
                getUserProfile(user.id),
                getProjects(user.id),
                getProjectStats(user.id),
            ]);

            setProfile(profileData);
            setRecentProjects(projectsData.slice(0, 5)); // Get 5 most recent
            setStats(statsData);
        } catch (err) {
            console.error('Failed to load dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: Project['status']) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'on_hold': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-gray-600">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <motion.div {...fadeIn} className="mb-8">
                    <h1 className="text-4xl text-gray-900 mb-2">
                        Welcome back, {profile?.full_name || 'there'}! 👋
                    </h1>
                    <p className="text-gray-600">Here's what's happening with your projects</p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid md:grid-cols-4 gap-6 mb-8"
                >
                    {/* Total Projects */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FolderOpen className="text-primary" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total Projects</div>
                    </div>

                    {/* Active Projects */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="text-yellow-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{stats.active}</div>
                        <div className="text-sm text-gray-600">Active Projects</div>
                    </div>

                    {/* Completed Projects */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{stats.completed}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>

                    {/* On Hold */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Pause className="text-gray-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{stats.onHold}</div>
                        <div className="text-sm text-gray-600">On Hold</div>
                    </div>
                </motion.div>

                {/* Recent Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-sm p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl text-gray-900">Recent Projects</h2>
                        <Link
                            to="/projects"
                            className="flex items-center gap-2 text-primary hover:text-blue-900 transition-colors"
                        >
                            View All
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    {recentProjects.length === 0 ? (
                        <div className="text-center py-12">
                            <FolderOpen className="mx-auto text-gray-400 mb-4" size={48} />
                            <p className="text-gray-600 mb-6">No projects yet. Create your first project!</p>
                            <Link
                                to="/projects/new"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                <Plus size={20} />
                                New Project
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    to={`/projects/${project.id}`}
                                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-1">
                                                {project.description || 'No description'}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="text-right mr-4">
                                                <div className="text-sm text-gray-600 mb-1">Progress</div>
                                                <div className="text-sm font-medium text-gray-900">{project.progress}%</div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                                {project.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all"
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 grid md:grid-cols-3 gap-6"
                >
                    <Link
                        to="/projects/new"
                        className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6 hover:shadow-lg transition-shadow group"
                    >
                        <Plus className="mb-3 group-hover:scale-110 transition-transform" size={32} />
                        <h3 className="text-xl font-semibold mb-2">New Project</h3>
                        <p className="text-blue-100">Start a new project and track its progress</p>
                    </Link>

                    <Link
                        to="/profile"
                        className="bg-gradient-to-br from-green-600 to-green-800 text-white rounded-xl p-6 hover:shadow-lg transition-shadow group"
                    >
                        <div className="mb-3 group-hover:scale-110 transition-transform">
                            <FolderOpen size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">My Profile</h3>
                        <p className="text-green-100">Update your profile information</p>
                    </Link>

                    <Link
                        to="/projects"
                        className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl p-6 hover:shadow-lg transition-shadow group"
                    >
                        <div className="mb-3 group-hover:scale-110 transition-transform">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">All Projects</h3>
                        <p className="text-purple-100">View and manage all your projects</p>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
