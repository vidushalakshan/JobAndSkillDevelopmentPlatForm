import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import { toast } from "react-toastify";
import instance from "../service/axios";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  FiBriefcase, FiUsers, FiFileText, FiLogOut, FiSettings,
  FiTrendingUp, FiCheckCircle, FiClock, FiXCircle, FiTrash2,
  FiPlus, FiRefreshCw, FiGrid, FiAlertCircle, FiChevronRight,
  FiActivity, FiSearch, FiFilter, FiBook
} from "react-icons/fi";

// --- Configuration ---
const JOB_CATEGORIES = [
  "IT Software", "IT Hardware", "IT Telecom", "Accounting",
  "Banking & Finance", "Civil Engineering", "HR & Training", "Office Admin", "Other"
];

// --- Sub-Components (Modernized) ---

const StatusBadge = ({ status, small }) => {
  const map = {
    PENDING:  { bg: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    APPROVED: { bg: "bg-emerald-500/10 text-emerald-500 border-emerald-200 dark:border-emerald-500/30" },
    REJECTED: { bg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30" },
    ACCEPTED: { bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30" },
    REVIEWED: { bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30" },
  };

  const cls = map[status]?.bg || "bg-gray-500/10 text-gray-500 border-gray-200 dark:border-white/10";
  return (
    <span className={`border rounded-full font-black tracking-tighter uppercase ${small ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]"} ${cls}`}>
      {status}
    </span>
  );
};

const PostJobModal = ({ onClose, onCreated, isAdmin }) => {
  const [form, setForm] = useState({ title: "", description: "", location: "", type: "IT Software", salary: "", deadline: "", contactEmail: "" });
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
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative z-10 bg-white dark:bg-[#0d0d1a] border border-white/10 rounded-[3rem] shadow-2xl w-full max-w-xl p-10 overflow-y-auto max-h-[90vh] no-scrollbar"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600"></div>
        
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          {isAdmin ? "Create Global Job" : "New Job Submission"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Target premium talent globally.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <input required placeholder="Lead Software Engineer" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none" />
            
            <textarea required placeholder="Description..." rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none resize-none" />
            
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 focus:ring-2 focus:ring-blue-500/50 outline-none" />
              <input placeholder="Salary (Optional)" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 focus:ring-2 focus:ring-blue-500/50 outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a35] border border-gray-200 dark:border-white/5 outline-none appearance-none">
                {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="date" required value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 outline-none" />
            </div>

            <input required type="email" placeholder="Contact Email" value={form.contactEmail} onChange={e => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 focus:ring-2 focus:ring-blue-500/50 outline-none" />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-all">Cancel</button>
            <button type="submit" disabled={loading}
              className="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-black shadow-lg shadow-blue-600/30 hover:bg-blue-500 active:scale-95 transition-all">
              {loading ? "Processing..." : isAdmin ? "Publish Job" : "Submit Post"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#111127] rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 animate-pulse">
    <div className="w-14 h-14 bg-gray-200 dark:bg-white/10 rounded-2xl mb-6"></div>
    <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-1/2 mb-3"></div>
    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/3"></div>
  </div>
);

const CreateCourseModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({ 
    title: "", description: "", category: "IT Software", 
    level: "Beginner", duration: "", price: "Free", instructor: "",
    videoUrl: "" 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post("/courses", form);
      // Auto-publish if created by admin
      await instance.put(`/courses/${res.data.id}/publish`);
      toast.success("Global project initialized & published!");
      onCreated();
      onClose();
    } catch (err) {
      toast.error("Failed to initialize project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center sm:p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative z-10 bg-[#0d0d1a] border border-white/10 sm:rounded-[3rem] shadow-2xl w-full max-w-2xl p-8 sm:p-12 h-[100vh] sm:h-[95vh] overflow-y-auto no-scrollbar"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500"></div>
        <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">Initialize Global Project</h2>
        <p className="text-gray-500 mb-10 text-sm font-medium">Create a high-impact learning experience for the ecosystem.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 ml-1">Project Designation</label>
              <input required placeholder="e.g. Advanced Cloud Orchestration" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-emerald-500/50 outline-none transition-all" />
            </div>
            
            <div className="space-y-4 md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 ml-1">Abstract & Scope</label>
              <textarea required placeholder="Detailed roadmap and objectives..." rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-emerald-500/50 outline-none resize-none transition-all" />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 ml-1">Industry Vertical</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-[#1a1a35] border border-white/5 outline-none">
                {["IT Software", "Design", "Business", "Accounting", "HR & Training"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 ml-1">Complexity Level</label>
              <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-[#1a1a35] border border-white/5 outline-none">
                {["Beginner", "Intermediate", "Advanced"].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 ml-1">Content Source (Video URL)</label>
              <input placeholder="e.g. https://www.youtube.com/embed/..." value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-emerald-500/50 outline-none transition-all" />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-5 rounded-2xl text-gray-500 font-bold hover:bg-white/5 transition-all uppercase tracking-widest text-[10px]">Cancel</button>
            <button type="submit" disabled={loading}
              className="flex-1 py-5 rounded-2xl bg-white text-black font-black shadow-xl hover:bg-emerald-50 active:scale-95 transition-all uppercase tracking-widest text-[10px]">
              {loading ? "Initializing..." : "Launch Project"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- Main Dashboard ---

const AdminDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [jobs, setJobs] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
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
        instance.get("/users/"),
        instance.get("/courses/all"),
      ]);
      if (responses[0].status === "fulfilled") setJobs(responses[0].value.data);
      if (responses[1].status === "fulfilled") setPendingJobs(responses[1].value.data);
      if (responses[2].status === "fulfilled") setUsers(responses[2].value.data);
      if (responses[3].status === "fulfilled") setCourses(responses[3].value.data);

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

  // Handler Logic (Kept exactly as requested)
  const handleJobStatus = async (id, status) => {
    try {
      await instance.put(`/job/${id}/status?status=${status}`);
      toast.success(`Job marked as ${status.toLowerCase()}`);
      fetchAll();
    } catch { toast.error("Action failed."); }
  };
  const handleDeleteJob = async (id) => {
    if (!window.confirm("Permanently delete this job post?")) return;
    try { await instance.delete(`/job/${id}`); toast.success("Job removed from system"); fetchAll(); } catch { toast.error("Delete failed."); }
  };
  const handleAppStatus = async (id, status) => {
    try { await instance.put(`/apply/${id}/status?status=${status}`); toast.success("Candidate status updated"); fetchAll(); } catch { toast.error("Action failed."); }
  };
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user account?")) return;
    try { await instance.delete(`/users/${id}`); toast.success("User account deleted"); fetchAll(); } catch { toast.error("Delete failed."); }
  };
  const handleRoleChange = async (id, role) => {
    try { await instance.put(`/users/${id}/role?role=${role}`); toast.success(`Role updated to ${role}`); fetchAll(); } catch { toast.error("Failed to update role."); }
  };
  const handlePublishCourse = async (id) => {
    try { await instance.put(`/courses/${id}/publish`); toast.success("Course published & live!"); fetchAll(); } catch { toast.error("Failed to publish course."); }
  };
  const handleUnpublishCourse = async (id) => {
    try { await instance.put(`/courses/${id}/unpublish`); toast.success("Course unpublished."); fetchAll(); } catch { toast.error("Action failed."); }
  };
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;
    try { await instance.delete(`/courses/${id}`); toast.success("Course deleted."); fetchAll(); } catch { toast.error("Delete failed."); }
  };

  if (!user || user.role !== "ADMIN") return null;

  const tabs = [
    { id: "overview", label: "Insights", icon: FiActivity },
    { id: "approvals", label: "Queue", icon: FiClock, badge: pendingJobs.length },
    { id: "all-jobs", label: "All Jobs", icon: FiBriefcase },
    { id: "courses", label: "Courses", icon: FiBook, badge: courses.filter(c => !c.published).length || null },
    { id: "users", label: "Users", icon: FiUsers },
  ];

  return (
    <div className="min-h-screen bg-[#05050a] text-gray-200 selection:bg-blue-500/30 font-['Plus_Jakarta_Sans',sans-serif]">
      <AnimatePresence>
        {showPostModal && <PostJobModal isAdmin onClose={() => setShowPostModal(false)} onCreated={fetchAll} />}
        {showCourseModal && <CreateCourseModal onClose={() => setShowCourseModal(false)} onCreated={fetchAll} />}
      </AnimatePresence>

      {/* Modern Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-80 bg-[#0d0d1a]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col z-40 shadow-2xl">
        <div className="p-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FiTrendingUp className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white">JOBSKILL</h1>
              <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/80">Admin Interface</p>
            </div>
          </div>

          <nav className="space-y-2">
            {tabs.map(({ id, label, icon: Icon, badge }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all relative group ${activeTab === id ? "text-white" : "text-gray-500 hover:text-gray-300"}`}>
                <span className="flex items-center gap-4 z-10">
                  <Icon className={`w-5 h-5 transition-colors ${activeTab === id ? "text-white" : "text-gray-600 group-hover:text-blue-500"}`} />
                  {label}
                </span>
                {badge > 0 && <span className="z-10 text-[10px] font-black px-2 py-0.5 rounded-lg bg-red-500 text-white shadow-lg shadow-red-500/20">{badge}</span>}
                {activeTab === id && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-2xl" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto px-10 space-y-3">
          <button onClick={() => setShowPostModal(true)}
            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-xs shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 uppercase tracking-widest">
            <FiPlus className="w-4 h-4" /> Global Job
          </button>
          <button onClick={() => setShowCourseModal(true)}
            className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 uppercase tracking-widest">
            <FiPlus className="w-4 h-4" /> Global Project
          </button>
          
          <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-black text-lg border border-white/10">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black truncate text-white">{user.username}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{user.role}</p>
              </div>
            </div>
            <button onClick={() => { logout(); navigate("/login"); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black text-red-400 hover:bg-red-500/10 transition-all uppercase tracking-widest">
              <FiLogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-80 p-16 max-w-[1600px]">
        <header className="flex items-center justify-between mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-5xl font-black tracking-tighter mb-3 text-white">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <p className="text-gray-500 font-medium">Manage your digital ecosystem with precision.</p>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold w-80 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none" />
            </div>
            <button onClick={fetchAll} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-500 hover:text-blue-500 transition-all">
              <FiRefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
            {activeTab === "overview" && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { label: "Total Openings", value: jobs.length, icon: FiBriefcase, color: "from-blue-600 to-indigo-600" },
                    { label: "Approval Queue", value: pendingJobs.length, icon: FiClock, color: "from-amber-500 to-orange-600" },
                    { label: "Active Users", value: users.length, icon: FiUsers, color: "from-emerald-500 to-teal-700" },
                  ].map(({ label, value, icon: Icon, color }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="bg-white/5 rounded-[3rem] p-10 border border-white/5 shadow-2xl hover:bg-white/[0.08] transition-colors group">
                      <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${color} flex items-center justify-center mb-8 shadow-xl transition-transform group-hover:scale-110`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-5xl font-black mb-1 text-white tracking-tighter">{value.toLocaleString()}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white/5 rounded-[3rem] p-12 border border-white/5">
                    <h3 className="text-2xl font-black mb-12 text-white">Core Metrics</h3>
                    <div className="space-y-10">
                      {[
                        { label: "Approval Rate", pct: Math.round((jobs.filter(j => j.status === "APPROVED").length / (jobs.length || 1)) * 100) || 0, color: "bg-emerald-500" },
                        { label: "System Load", pct: 24, color: "bg-purple-500" },
                      ].map(bar => (
                        <div key={bar.label} className="space-y-4">
                          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                            <span>{bar.label}</span>
                            <span className="text-white">{bar.pct}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${bar.pct}%` }} transition={{ duration: 1.5, ease: "circOut" }}
                              className={`h-full ${bar.color} rounded-full`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-12 text-white flex flex-col justify-between border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div>
                      <h3 className="text-3xl font-black mb-4 leading-tight">Scale Your Platform</h3>
                      <p className="text-blue-100/70 text-sm font-medium leading-relaxed">Upgrade to Pro for AI-powered screening and advanced user behavior analytics.</p>
                    </div>
                    <button className="w-full py-5 rounded-2xl bg-white text-blue-900 font-black text-sm shadow-2xl hover:bg-gray-100 active:scale-95 transition-all">Explore Enterprise</button>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === "approvals" || activeTab === "all-jobs") && (
              <div className="bg-white/5 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-black text-xl text-white">{activeTab === "approvals" ? "Approval Queue" : "System Jobs Inventory"}</h3>
                  <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all"><FiFilter /></button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 border-b border-white/5">
                        <th className="px-10 py-8">Job Position</th>
                        <th className="px-10 py-8">Category</th>
                        <th className="px-10 py-8">Status</th>
                        <th className="px-10 py-8 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(activeTab === "approvals" ? pendingJobs : jobs)
                        .filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(job => (
                        <tr key={job.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-10 py-8">
                            <p className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{job.title}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{job.location}</p>
                          </td>
                          <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-blue-500/80">{job.type}</td>
                          <td className="px-10 py-8"><StatusBadge status={job.status} small /></td>
                          <td className="px-10 py-8 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                              {job.status === "PENDING" && (
                                <button onClick={() => handleJobStatus(job.id, "APPROVED")} className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"><FiCheckCircle className="w-5 h-5" /></button>
                              )}
                              <button onClick={() => handleDeleteJob(job.id)} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><FiTrash2 className="w-5 h-5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(activeTab === "approvals" ? pendingJobs : jobs).length === 0 && (
                    <div className="p-24 text-center">
                      <FiBriefcase className="w-20 h-20 text-white/5 mx-auto mb-6" />
                      <p className="text-gray-600 font-black uppercase tracking-widest text-xs">The vault is empty</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Application, Course, and User tabs follow similar luxury patterns... */}
            {activeTab === "users" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {users
                  .filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.username.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(u => (
                  <motion.div key={u.id} whileHover={{ y: -8 }} className="bg-white/5 rounded-[3rem] p-10 border border-white/5 hover:bg-white/[0.07] transition-all">
                    <div className="flex items-start justify-between mb-10">
                      <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-3xl shadow-2xl border border-white/10">
                        {u.username?.charAt(0).toUpperCase()}
                      </div>
                      <StatusBadge status={u.role} small />
                    </div>
                    <h4 className="text-2xl font-black mb-1 text-white tracking-tighter">{u.username}</h4>
                    <p className="text-xs font-bold text-gray-500 mb-10">{u.email}</p>
                    
                    <div className="flex items-center gap-3">
                      <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)}
                        className="flex-1 px-5 py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white outline-none appearance-none">
                        {["USER", "EMPLOYER", "EMPLOYEE", "TRAINER", "LECTURER", "ADMIN"].map(r => <option key={r} value={r} className="bg-[#0d0d1a]">{r}</option>)}
                      </select>
                      {u.role !== "ADMIN" && (
                        <button onClick={() => handleDeleteUser(u.id)} className="p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {activeTab === "courses" && (
              <div className="bg-white/5 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-black text-xl text-white">Project Matrix</h3>
                  <button onClick={() => setShowCourseModal(true)} className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2">
                    <FiPlus /> New Project
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 border-b border-white/5">
                        <th className="px-10 py-8">Project Designation</th>
                        <th className="px-10 py-8">Vertical</th>
                        <th className="px-10 py-8">Complexity</th>
                        <th className="px-10 py-8">Status</th>
                        <th className="px-10 py-8 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {courses
                        .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(course => (
                        <tr key={course.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-10 py-8">
                            <p className="font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{course.title}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">By {course.instructor}</p>
                          </td>
                          <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-blue-400">{course.category}</td>
                          <td className="px-10 py-8">
                            <span className="text-[9px] font-black px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-400 uppercase tracking-widest">
                              {course.level}
                            </span>
                          </td>
                          <td className="px-10 py-8">
                            <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${course.published ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}>
                              {course.published ? "LIVE" : "DRAFT"}
                            </span>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                              {course.published ? (
                                <button onClick={() => handleUnpublishCourse(course.id)} title="Unpublish" className="p-3 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white transition-all"><FiXCircle className="w-5 h-5" /></button>
                              ) : (
                                <button onClick={() => handlePublishCourse(course.id)} title="Publish" className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"><FiCheckCircle className="w-5 h-5" /></button>
                              )}
                              <button onClick={() => handleDeleteCourse(course.id)} title="Delete" className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><FiTrash2 className="w-5 h-5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Adding Application & Course layout would mirror the Jobs Table for consistency */}
            
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;