import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getProjects, getProjectStats, type Project } from '@/lib/api/projects';
import { getUserProfile, type UserProfile } from '@/lib/api/profile';
import { FolderOpen, CheckCircle, Clock, Pause, Plus, ArrowRight, User, LogOut } from 'lucide-react';

// Counter animation hook
function useCounter(target: number, duration: number = 1) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [value, setValue] = useState(0);

    useEffect(() => {
        const controls = animate(count, target, {
            duration,
            ease: 'easeOut',
        });
        const unsubscribe = rounded.on('change', (latest) => setValue(latest));
        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [target, count, rounded, duration]);

    return value;
}

export function Dashboard() {
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        completed: 0,
        onHold: 0,
    });
    const [loading, setLoading] = useState(true);

    // Animated counters
    const totalCount = useCounter(stats.total, 1.5);
    const activeCount = useCounter(stats.active, 1.5);
    const completedCount = useCounter(stats.completed, 1.5);
    const onHoldCount = useCounter(stats.onHold, 1.5);

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
            setRecentProjects(projectsData.slice(0, 5));
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
                <motion.div
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3"
                    />
                    Loading dashboard...
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-20 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header with Profile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                            {/* Profile Photo */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0 ring-4 ring-primary/10"
                            >
                                {profile?.profile_photo_url ? (
                                    <img
                                        src={profile.profile_photo_url}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="text-primary" size={32} />
                                )}
                            </motion.div>

                            {/* User Info */}
                            <div className="flex-1 min-w-0">
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 truncate"
                                >
                                    Welcome back, {profile?.full_name || 'there'}! 👋
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-sm md:text-base text-gray-600"
                                >
                                    Here's what's happening with your projects
                                </motion.p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 md:flex-none"
                            >
                                <Link
                                    to="/profile"
                                    className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-primary text-white rounded-lg hover:bg-blue-900 transition-all shadow-md hover:shadow-lg text-sm md:text-base font-medium w-full"
                                >
                                    <User size={18} />
                                    <span className="hidden sm:inline">Edit Profile</span>
                                    <span className="sm:hidden">Profile</span>
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button
                                    onClick={async () => {
                                        await signOut();
                                        window.location.href = '/';
                                    }}
                                    className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg text-sm md:text-base font-medium"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8"
                >
                    {/* Total Projects */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 transition-all hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-lg flex items-center justify-center"
                            >
                                <FolderOpen className="text-primary" size={20} />
                            </motion.div>
                        </div>
                        <motion.div
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-1"
                            key={totalCount}
                        >
                            {totalCount}
                        </motion.div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">Total Projects</div>
                    </motion.div>

                    {/* Active Projects */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 transition-all hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="w-10 h-10 md:w-12 md:h-12 bg-yellow-200/50 rounded-lg flex items-center justify-center"
                            >
                                <Clock className="text-yellow-600" size={20} />
                            </motion.div>
                        </div>
                        <motion.div
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-1"
                            key={activeCount}
                        >
                            {activeCount}
                        </motion.div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">Active</div>
                    </motion.div>

                    {/* Completed Projects */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 transition-all hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.3 }}
                                className="w-10 h-10 md:w-12 md:h-12 bg-green-200/50 rounded-lg flex items-center justify-center"
                            >
                                <CheckCircle className="text-green-600" size={20} />
                            </motion.div>
                        </div>
                        <motion.div
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-1"
                            key={completedCount}
                        >
                            {completedCount}
                        </motion.div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">Completed</div>
                    </motion.div>

                    {/* On Hold */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 transition-all hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="w-10 h-10 md:w-12 md:h-12 bg-gray-200/50 rounded-lg flex items-center justify-center"
                            >
                                <Pause className="text-gray-600" size={20} />
                            </motion.div>
                        </div>
                        <motion.div
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-1"
                            key={onHoldCount}
                        >
                            {onHoldCount}
                        </motion.div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">On Hold</div>
                    </motion.div>
                </motion.div>

                {/* Recent Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Recent Projects</h2>
                        <motion.div whileHover={{ x: 5 }} className="inline-block">
                            <Link
                                to="/projects"
                                className="flex items-center gap-2 text-primary hover:text-blue-900 transition-colors font-medium text-sm md:text-base"
                            >
                                View All
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </div>

                    {recentProjects.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-12 md:py-16"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <FolderOpen className="mx-auto text-gray-400 mb-4" size={48} />
                            </motion.div>
                            <p className="text-gray-600 mb-6 text-sm md:text-base">No projects yet. Create your first project!</p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/projects/new"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-900 transition-all shadow-md hover:shadow-lg font-medium"
                                >
                                    <Plus size={20} />
                                    New Project
                                </Link>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                            className="space-y-3 md:space-y-4"
                        >
                            {recentProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    whileHover={{ x: 5, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                >
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="block p-3 md:p-4 border border-gray-200 rounded-lg hover:border-primary transition-all group"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-0">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1 truncate">
                                                    {project.title}
                                                </h3>
                                                <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                                                    {project.description || 'No description'}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                <div className="text-right">
                                                    <div className="text-xs text-gray-600 mb-1">Progress</div>
                                                    <div className="text-sm md:text-base font-bold text-gray-900">{project.progress}%</div>
                                                </div>
                                                <motion.span
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                                                >
                                                    {project.status.replace('_', ' ')}
                                                </motion.span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${project.progress}%` }}
                                                transition={{ duration: 1, delay: 0.3 }}
                                                className="bg-primary h-2 rounded-full"
                                            />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.6
                            }
                        }
                    }}
                    className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/projects/new"
                            className="block bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-5 md:p-6 lg:p-8 hover:shadow-2xl transition-all group"
                        >
                            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
                                <Plus className="mb-3 group-hover:scale-110 transition-transform" size={32} />
                            </motion.div>
                            <h3 className="text-lg md:text-xl font-bold mb-2">New Project</h3>
                            <p className="text-sm md:text-base text-blue-100">Start a new project and track its progress</p>
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/profile"
                            className="block bg-gradient-to-br from-green-600 to-green-800 text-white rounded-xl p-5 md:p-6 lg:p-8 hover:shadow-2xl transition-all group"
                        >
                            <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                                <User className="mb-3" size={32} />
                            </motion.div>
                            <h3 className="text-lg md:text-xl font-bold mb-2">My Profile</h3>
                            <p className="text-sm md:text-base text-green-100">Update your profile information</p>
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/projects"
                            className="block bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl p-5 md:p-6 lg:p-8 hover:shadow-2xl transition-all group"
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CheckCircle className="mb-3" size={32} />
                            </motion.div>
                            <h3 className="text-lg md:text-xl font-bold mb-2">All Projects</h3>
                            <p className="text-sm md:text-base text-purple-100">View and manage all your projects</p>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
