import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../animations/variants';
import AdminLayout from '../../components/admin/AdminLayout';
import { getDashboardStats } from '../../services/inquiryService';
import { Package, MessageSquare, Star, Tag, TrendingUp, RefreshCw } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <motion.div variants={staggerItem} className="card p-6 flex items-center gap-5">
    <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
      <Icon className={`w-7 h-7 ${color}`} />
    </div>
    <div>
      <p className="text-text-lighter text-sm font-medium">{label}</p>
      <p className="font-heading font-bold text-text text-3xl mt-0.5">{value ?? '—'}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <>
      <Helmet><title>Dashboard — Admin | Lohitha Murmura</title></Helmet>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-text text-2xl">Welcome back 👋</h2>
              <p className="text-text-light text-sm mt-1">Here's what's happening with your store today.</p>
            </div>
            <button
              onClick={fetchStats}
              className="flex items-center gap-2 text-sm text-text-light hover:text-primary transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <StatCard icon={Package} label="Total Products" value={stats?.totalProducts} color="text-primary" bg="bg-primary/10" />
            <StatCard icon={MessageSquare} label="Total Inquiries" value={stats?.totalInquiries} color="text-accent" bg="bg-accent/10" />
            <StatCard icon={TrendingUp} label="New Inquiries" value={stats?.newInquiries} color="text-[#25D366]" bg="bg-[#25D366]/10" />
            <StatCard icon={Star} label="Featured Products" value={stats?.featuredProducts} color="text-amber-500" bg="bg-secondary/20" />
            <StatCard icon={Tag} label="Categories" value={stats?.totalCategories} color="text-blue-500" bg="bg-blue-50" />
          </motion.div>

          {/* Quick actions */}
          <div className="card p-6">
            <h3 className="font-heading font-semibold text-text mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Add Product', href: '/admin/products', icon: Package },
                { label: 'View Inquiries', href: '/admin/inquiries', icon: MessageSquare },
                { label: 'Manage Categories', href: '/admin/categories', icon: Tag },
                { label: 'Update Settings', href: '/admin/settings', icon: Star },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.href}
                    href={action.href}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-center"
                  >
                    <Icon className="w-6 h-6 text-primary" />
                    <span className="text-text text-xs font-semibold font-heading">{action.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
