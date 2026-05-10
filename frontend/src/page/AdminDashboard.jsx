import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import { toast } from "react-toastify";
import instance from "../service/axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiSearch } from "react-icons/fi";

// --- Components ---
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminOverview from "../components/admin/AdminOverview";
import AdminUserRegistry from "../components/admin/AdminUserRegistry";
import AdminJobInventory from "../components/admin/AdminJobInventory";
import AdminProjectMatrix from "../components/admin/AdminProjectMatrix";
import PostJobModal from "../components/PostJobModal"; 

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
        toast.warn("Incomplete data synchronization.");
      }
    } catch (err) {
      toast.error("Dashboard synchronization failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user?.role === "ADMIN") fetchAll(); }, [user]);

  // --- Handlers ---
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

  return (
    <div className="min-h-screen bg-[#05050a] text-gray-200 selection:bg-blue-500/30 font-['Plus_Jakarta_Sans',sans-serif]">
      <AnimatePresence>
        {showPostModal && <PostJobModal isAdmin onClose={() => setShowPostModal(false)} onCreated={fetchAll} />}
        {showCourseModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
             <div onClick={() => setShowCourseModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
             <div className="relative z-10 bg-[#0d0d1a] border border-white/10 rounded-[3rem] p-12 w-full max-w-xl text-center shadow-2xl">
                <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Nexus <span className="text-blue-500">Architect</span></h2>
                <p className="text-slate-500 mb-8 text-sm">Redirecting to standardized project architect interface...</p>
                <button onClick={() => navigate("/courses")} className="px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform active:scale-95">Access Matrix</button>
             </div>
          </div>
        )}
      </AnimatePresence>

      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        logout={logout} 
        navigate={navigate}
        pendingCount={pendingJobs.length}
        draftCount={courses.filter(c => !c.published).length}
        setShowPostModal={setShowPostModal}
        setShowCourseModal={setShowCourseModal}
      />

      <main className="ml-80 p-16 max-w-[1600px]">
        <header className="flex items-center justify-between mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-5xl font-black tracking-tighter mb-3 text-white uppercase italic">
              {activeTab}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Nexus Terminal Control Center</p>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
              <input type="text" placeholder="Scan records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-sm font-bold w-80 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none placeholder:text-slate-700" />
            </div>
            <button onClick={fetchAll} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-500 hover:text-blue-500 transition-all active:scale-90 shadow-lg">
              <FiRefreshCw className={`w-5 h-5 ${loading ? "animate-spin text-blue-500" : ""}`} />
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
             <div className="w-12 h-12 border-2 border-blue-600/30 border-t-blue-500 rounded-full animate-spin" />
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Syncing Data...</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {activeTab === "overview" && <AdminOverview jobs={jobs} pendingJobs={pendingJobs} users={users} />}
            {(activeTab === "approvals" || activeTab === "all-jobs") && (
              <AdminJobInventory 
                activeTab={activeTab} 
                jobs={jobs} 
                pendingJobs={pendingJobs} 
                searchTerm={searchTerm} 
                handleJobStatus={handleJobStatus} 
                handleDeleteJob={handleDeleteJob} 
              />
            )}
            {activeTab === "users" && (
              <AdminUserRegistry 
                users={users} 
                searchTerm={searchTerm} 
                handleRoleChange={handleRoleChange} 
                handleDeleteUser={handleDeleteUser} 
              />
            )}
            {activeTab === "courses" && (
              <AdminProjectMatrix 
                courses={courses} 
                searchTerm={searchTerm} 
                setShowCourseModal={setShowCourseModal}
                handlePublishCourse={handlePublishCourse}
                handleUnpublishCourse={handleUnpublishCourse}
                handleDeleteCourse={handleDeleteCourse}
              />
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;