import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import { toast } from "react-toastify";
import instance from "../service/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBriefcase, FiUsers, FiFileText, FiLogOut, FiSettings,
  FiTrendingUp, FiCheckCircle, FiClock, FiXCircle, FiTrash2,
  FiPlus, FiRefreshCw, FiGrid, FiAlertCircle, FiChevronRight,
  FiActivity, FiSearch, FiFilter, FiBook
} from "react-icons/fi";

const JOB_CATEGORIES = [
  "IT Software", "IT Hardware", "IT Telecom", "Accounting",
  "Banking & Finance", "Civil Engineering", "HR & Training", "Office Admin", "Other"
];

const StatusBadge = ({ status, small }) => {
  const map = {
    PENDING:  { bg: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30" },
    APPROVED: { bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30" },
    REJECTED: { bg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30" },
    ACCEPTED: { bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30" },
    REVIEWED: { bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30" },
  };
  const cls = map[status]?.bg || "bg-gray-500/10 text-gray-500 border-gray-200 dark:border-white/10";
  return (
    <span className={`border rounded-full font-bold ${small ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"} ${cls}`}>
      {status}
    </span>
  );
};

const PostJobModal = ({ onClose, onCreated, isAdmin }) => {
  const [form, setForm] = useState({ title: "", description: "", location: "", type: "IT Software", salary: "", deadline: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isAdmin ? "/job/admin-create" : "/job/create";
      await instance.post(endpoint, form);
      toast.success(isAdmin ? "Job posted & approved!" : "Job submitted for approval!");
      onCreated();
      onClose();
    } catch (err) {
      toast.error("Failed to create job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-gray-900/40 dark:bg-black/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="relative z-10 bg-white dark:bg-[#111127] border border-gray-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-xl p-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          {isAdmin ? "Create Global Job" : "New Job Submission"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Fill in the details to reach thousands of potential candidates.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Title & Role</label>
            <input required placeholder="e.g. Lead Software Engineer" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
          </div>
          
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Job Description</label>
            <textarea required placeholder="Outline the requirements and responsibilities..." rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none" />
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location</label>
              <input required placeholder="Remote, Colombo..." value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Monthly Salary</label>
              <input placeholder="Optional" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a35] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer">
                {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Application Deadline</label>
              <input type="date" required value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all">Cancel</button>
            <button type="submit" disabled={loading}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black shadow-xl shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50">
              {loading ? "Processing..." : isAdmin ? "Publish Job" : "Submit Post"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#111127] rounded-3xl p-6 border border-gray-100 dark:border-white/5 animate-pulse">
    <div className="w-12 h-12 bg-gray-200 dark:bg-white/10 rounded-xl mb-4"></div>
    <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/3"></div>
  </div>
);

const AdminDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [jobs, setJobs] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
    else if (user.role !== "ADMIN") navigate("/");
  }, [user, navigate]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const responses = await Promise.allSettled([
        instance.get("/job/all"),
        instance.get("/job/pending"),
        instance.get("/apply/all"),
        instance.get("/users/"),
        instance.get("/courses/all"),
      ]);
      
      if (responses[0].status === "fulfilled") setJobs(responses[0].value.data);
      if (responses[1].status === "fulfilled") setPendingJobs(responses[1].value.data);
      if (responses[2].status === "fulfilled") setApplications(responses[2].value.data);
      if (responses[3].status === "fulfilled") setUsers(responses[3].value.data);
      if (responses[4].status === "fulfilled") setCourses(responses[4].value.data);

      if (responses.some(r => r.status === "rejected")) {
        toast.warn("Some data could not be loaded.");
      }
    } catch (err) {
      toast.error("Critical error loading dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user?.role === "ADMIN") fetchAll(); }, [user]);

  const handleJobStatus = async (id, status) => {
    try {
      await instance.put(`/job/${id}/status?status=${status}`);
      toast.success(`Job marked as ${status.toLowerCase()}`);
      fetchAll();
    } catch { toast.error("Action failed."); }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Permanently delete this job post?")) return;
    try {
      await instance.delete(`/job/${id}`);
      toast.success("Job removed from system");
      fetchAll();
    } catch { toast.error("Delete failed."); }
  };

  const handleAppStatus = async (id, status) => {
    try {
      await instance.put(`/apply/${id}/status?status=${status}`);
      toast.success("Candidate status updated");
      fetchAll();
    } catch { toast.error("Action failed."); }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user account?")) return;
    try {
      await instance.delete(`/users/${id}`);
      toast.success("User account deleted");
      fetchAll();
    } catch { toast.error("Delete failed."); }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await instance.put(`/users/${id}/role?role=${role}`);
      toast.success(`Role updated to ${role}`);
      fetchAll();
    } catch { toast.error("Failed to update role."); }
  };

  const handlePublishCourse = async (id) => {
    try {
      await instance.put(`/courses/${id}/publish`);
      toast.success("Course published & live!");
      fetchAll();
    } catch { toast.error("Failed to publish course."); }
  };

  const handleUnpublishCourse = async (id) => {
    try {
      await instance.put(`/courses/${id}/unpublish`);
      toast.success("Course unpublished.");
      fetchAll();
    } catch { toast.error("Action failed."); }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;
    try {
      await instance.delete(`/courses/${id}`);
      toast.success("Course deleted.");
      fetchAll();
    } catch { toast.error("Delete failed."); }
  };

  if (!user || user.role !== "ADMIN") return null;

  const tabs = [
    { id: "overview", label: "Insights", icon: FiActivity },
    { id: "approvals", label: "Queue", icon: FiClock, badge: pendingJobs.length },
    { id: "all-jobs", label: "All Jobs", icon: FiBriefcase },
    { id: "applications", label: "Candidates", icon: FiFileText },
    { id: "courses", label: "Courses", icon: FiBook, badge: courses.filter(c => !c.published).length || null },
    { id: "users", label: "Users", icon: FiUsers },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a14] text-gray-900 dark:text-white selection:bg-blue-500/30" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <AnimatePresence>
        {showPostModal && <PostJobModal isAdmin onClose={() => setShowPostModal(false)} onCreated={fetchAll} />}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-[#111127] border-r border-gray-200 dark:border-white/5 flex flex-col z-40 shadow-2xl shadow-black/5">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FiTrendingUp className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight dark:text-white">JobSkill Admin</h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Admin Console</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {tabs.map(({ id, label, icon: Icon, badge }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all group ${activeTab === id ? "bg-blue-600 text-white shadow-xl shadow-blue-500/30" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"}`}>
                <span className="flex items-center gap-4">
                  <Icon className={`w-5 h-5 ${activeTab === id ? "text-white" : "text-gray-400 group-hover:text-blue-500"}`} />
                  {label}
                </span>
                {badge > 0 && <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${activeTab === id ? "bg-white text-blue-600" : "bg-red-500 text-white"}`}>{badge}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-6">
          <button onClick={() => setShowPostModal(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
            <FiPlus className="w-5 h-5" /> Quick Post
          </button>
          
          <div className="p-5 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-lg">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black truncate">{user.username}</p>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 truncate uppercase tracking-tight">{user.role}</p>
              </div>
            </div>
            <button onClick={() => { logout(); navigate("/login"); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-widest">
              <FiLogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="ml-72 p-12 max-w-7xl">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-2">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Control center for your platform operations.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" />
              <input 
                type="text" 
                placeholder="Search everything..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-[#111127] border border-gray-200 dark:border-white/10 text-sm font-bold w-72 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
              />
            </div>
            <button onClick={fetchAll} className="p-4 rounded-2xl bg-white dark:bg-[#111127] border border-gray-200 dark:border-white/10 text-gray-500 hover:text-blue-500 hover:border-blue-500/50 transition-all shadow-sm">
              <FiRefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            
            {/* INSIGHTS (Overview) */}
            {activeTab === "overview" && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Total Openings", value: jobs.length, icon: FiBriefcase, color: "from-blue-600 to-blue-800", shadow: "shadow-blue-500/20" },
                    { label: "Approval Queue", value: pendingJobs.length, icon: FiClock, color: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/20" },
                    { label: "Candidate Pool", value: applications.length, icon: FiFileText, color: "from-purple-600 to-indigo-700", shadow: "shadow-purple-500/20" },
                    { label: "Active Users", value: users.length, icon: FiUsers, color: "from-emerald-500 to-teal-700", shadow: "shadow-emerald-500/20" },
                  ].map(({ label, value, icon: Icon, color, shadow }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                      className="bg-white dark:bg-[#111127] rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/[0.02]">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-xl ${shadow}`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-4xl font-black mb-1">{value.toLocaleString()}</p>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white dark:bg-[#111127] rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/[0.02]">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-xl font-black">Performance Status</h3>
                      <button className="text-xs font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">Full Report <FiChevronRight /></button>
                    </div>
                    <div className="space-y-8">
                      {[
                        { label: "Approval Rate", pct: Math.round((jobs.filter(j => j.status === "APPROVED").length / jobs.length) * 100) || 0, color: "bg-emerald-500" },
                        { label: "Application Conversion", pct: Math.round((applications.filter(a => a.status === "ACCEPTED").length / applications.length) * 100) || 0, color: "bg-blue-500" },
                        { label: "System Load", pct: 24, color: "bg-purple-500" },
                      ].map(bar => (
                        <div key={bar.label}>
                          <div className="flex justify-between text-sm font-bold mb-3">
                            <span>{bar.label}</span>
                            <span>{bar.pct}%</span>
                          </div>
                          <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${bar.pct}%` }} transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full ${bar.color} rounded-full`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-500/20 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black mb-3">Upgrade System</h3>
                      <p className="text-blue-100 text-sm font-medium leading-relaxed">Unlock advanced analytics and automated screening tools for your platform.</p>
                    </div>
                    <button className="w-full py-4 rounded-2xl bg-white text-blue-600 font-black text-sm shadow-xl transition-all hover:bg-blue-50 active:scale-95">Explore Pro</button>
                  </div>
                </div>
              </div>
            )}

            {/* QUEUE & JOBS TABLES */}
            {(activeTab === "approvals" || activeTab === "all-jobs") && (
              <div className="bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/[0.02] overflow-hidden">
                <div className="p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] flex items-center justify-between">
                  <h3 className="font-black text-lg">{activeTab === "approvals" ? "Approval Queue" : "System Jobs Inventory"}</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 hover:text-blue-500 transition-all"><FiFilter /></button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 dark:border-white/5">
                        <th className="px-8 py-6">Job Position</th>
                        <th className="px-8 py-6">Category</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {(activeTab === "approvals" ? pendingJobs : jobs)
                        .filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(job => (
                        <tr key={job.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-all">
                          <td className="px-8 py-6">
                            <p className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">{job.title}</p>
                            <p className="text-xs font-medium text-gray-400">{job.location}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-wider">{job.type}</span>
                          </td>
                          <td className="px-8 py-6">
                            <StatusBadge status={job.status} small />
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                              {job.status === "PENDING" && (
                                <button onClick={() => handleJobStatus(job.id, "APPROVED")} className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm shadow-emerald-500/20"><FiCheckCircle className="w-4 h-4" /></button>
                              )}
                              {job.status !== "REJECTED" && (
                                <button onClick={() => handleJobStatus(job.id, "REJECTED")} className="p-3 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white transition-all shadow-sm shadow-amber-500/20"><FiXCircle className="w-4 h-4" /></button>
                              )}
                              <button onClick={() => handleDeleteJob(job.id)} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-500/20"><FiTrash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(activeTab === "approvals" ? pendingJobs : jobs).length === 0 && (
                    <div className="p-20 text-center">
                      <FiBriefcase className="w-16 h-16 text-gray-200 dark:text-white/5 mx-auto mb-6" />
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No entries found in this view</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CANDIDATES TABLE */}
            {activeTab === "applications" && (
              <div className="bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/[0.02] overflow-hidden">
                <div className="p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] flex items-center justify-between">
                  <h3 className="font-black text-lg">Active Talent Pipeline</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 dark:border-white/5">
                        <th className="px-8 py-6">Applicant Info</th>
                        <th className="px-8 py-6">Position</th>
                        <th className="px-8 py-6">Current Status</th>
                        <th className="px-8 py-6 text-right">Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {applications
                        .filter(a => a.applicant?.email.toLowerCase().includes(searchTerm.toLowerCase()) || a.job?.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(app => (
                        <tr key={app.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-all">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-blue-600 font-black text-xs">{app.applicant?.username?.charAt(0).toUpperCase()}</div>
                              <div>
                                <p className="font-bold text-gray-900 dark:text-white">{app.applicant?.username}</p>
                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tight">{app.applicant?.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 font-bold text-gray-700 dark:text-gray-300 text-sm">{app.job?.title || "Deleted Job"}</td>
                          <td className="px-8 py-6">
                            <StatusBadge status={app.status} small />
                          </td>
                          <td className="px-8 py-6 text-right">
                            <select 
                              value={app.status} 
                              onChange={e => handleAppStatus(app.id, e.target.value)}
                              className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                            >
                              {["PENDING", "REVIEWED", "ACCEPTED", "REJECTED"].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* COURSES TABLE */}
            {activeTab === "courses" && (
              <div className="bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-2xl shadow-black/[0.02]">
                <div className="flex items-center justify-between px-10 py-8 border-b border-gray-100 dark:border-white/5">
                  <div>
                    <h3 className="text-2xl font-black">Course Management</h3>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                      <span className="text-amber-500 font-black">{courses.filter(c => !c.published).length} pending review</span>
                      {" · "}{courses.filter(c => c.published).length} live
                    </p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 dark:border-white/5">
                        <th className="px-8 py-6">Course</th>
                        <th className="px-8 py-6">Category / Level</th>
                        <th className="px-8 py-6">Instructor</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {courses
                        .filter(c => c.title?.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(course => (
                        <tr key={course.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-all">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 flex items-center justify-center">
                                <FiBook className="w-5 h-5 text-purple-500" />
                              </div>
                              <div>
                                <p className="font-black text-gray-900 dark:text-white">{course.title}</p>
                                <p className="text-[10px] font-bold text-gray-400">{course.price || "Free"} · {course.duration}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{course.category}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{course.level}</p>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-gray-600 dark:text-gray-300">{course.instructor || "—"}</td>
                          <td className="px-8 py-6">
                            {course.published ? (
                              <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">Live</span>
                            ) : (
                              <span className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 animate-pulse">Pending Review</span>
                            )}
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center justify-end gap-2">
                              {!course.published ? (
                                <button onClick={() => handlePublishCourse(course.id)}
                                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition-all shadow-lg shadow-emerald-500/20">
                                  <FiCheckCircle className="w-4 h-4" /> Publish
                                </button>
                              ) : (
                                <button onClick={() => handleUnpublishCourse(course.id)}
                                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-600 text-xs font-black transition-all border border-amber-500/20">
                                  <FiXCircle className="w-4 h-4" /> Unpublish
                                </button>
                              )}
                              <button onClick={() => handleDeleteCourse(course.id)}
                                className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {courses.length === 0 && (
                    <div className="py-20 text-center text-gray-400">
                      <FiBook className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p className="font-bold">No courses submitted yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* USERS TABLE */}
            {activeTab === "users" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users
                  .filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.username.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(u => (
                  <motion.div key={u.id} whileHover={{ y: -5 }} className="bg-white dark:bg-[#111127] rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/[0.02]">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20">
                        {u.username?.charAt(0).toUpperCase()}
                      </div>
                      <StatusBadge status={u.role} small />
                    </div>
                    <h4 className="text-xl font-black mb-1">{u.username}</h4>
                    <p className="text-xs font-bold text-gray-400 mb-8 tracking-tight">{u.email}</p>
                    
                    <div className="flex items-center gap-3">
                      <select 
                        value={u.role} 
                        onChange={e => handleRoleChange(u.id, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                      >
                        {["USER", "EMPLOYER", "EMPLOYEE", "TRAINER", "LECTURER", "ADMIN"].map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      {u.role !== "ADMIN" && (
                        <button onClick={() => handleDeleteUser(u.id)} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-500/20">
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
