import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiLogOut,
  FiSettings,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const stats = [
  { label: "Total Jobs", value: "128", icon: FiBriefcase, color: "from-blue-500 to-blue-700", shadow: "shadow-blue-500/30" },
  { label: "Total Users", value: "3,240", icon: FiUsers, color: "from-purple-500 to-purple-700", shadow: "shadow-purple-500/30" },
  { label: "Applications", value: "892", icon: FiFileText, color: "from-emerald-500 to-emerald-700", shadow: "shadow-emerald-500/30" },
  { label: "Growth", value: "+18%", icon: FiTrendingUp, color: "from-orange-500 to-orange-700", shadow: "shadow-orange-500/30" },
];

const recentActivity = [
  { text: "New job posted: Senior React Developer", time: "2 min ago", icon: FiCheckCircle, color: "text-emerald-400" },
  { text: "New user registered: john@example.com", time: "15 min ago", icon: FiUsers, color: "text-blue-400" },
  { text: "Application received for UI Designer", time: "1 hr ago", icon: FiFileText, color: "text-purple-400" },
  { text: "Job expired: Backend Java Engineer", time: "3 hrs ago", icon: FiClock, color: "text-orange-400" },
];

const AdminDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Protect route — only ADMIN can access
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "ADMIN") {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white font-['Inter',sans-serif]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#111127] border-r border-white/5 flex flex-col z-20">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-500 mt-1">Job & Skill Platform</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: "Dashboard", icon: FiTrendingUp, active: true },
            { label: "Jobs", icon: FiBriefcase },
            { label: "Users", icon: FiUsers },
            { label: "Applications", icon: FiFileText },
            { label: "Settings", icon: FiSettings },
          ].map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
              {user.username?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.username || "Admin"}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black"
          >
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{user.username || "Admin"}</span> 👋
          </motion.h2>
          <p className="text-gray-400 mt-1">Here's what's happening on your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map(({ label, value, icon: Icon, color, shadow }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-[#111127] rounded-2xl p-6 border border-white/5 shadow-xl ${shadow}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg ${shadow}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-black">{value}</p>
              <p className="text-gray-400 text-sm mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#111127] rounded-2xl border border-white/5 p-6"
        >
          <h3 className="text-lg font-bold mb-5">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map(({ text, time, icon: Icon, color }, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-all">
                <Icon className={`w-5 h-5 flex-shrink-0 ${color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-200">{text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
