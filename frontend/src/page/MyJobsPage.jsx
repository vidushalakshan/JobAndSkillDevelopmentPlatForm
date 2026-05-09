import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { toast } from "react-toastify";
import instance from "../service/axios";
import PostJobModal from "../components/PostJobModal";
import {
  FiBriefcase, FiClock, FiCheckCircle, FiXCircle,
  FiPlus, FiArrowLeft, FiMapPin, FiActivity,
  FiLayers, FiChevronRight, FiGrid, FiList, FiTrash2
} from "react-icons/fi";

const STATUS_CONFIG = {
  PENDING: { label: "Under Review", color: "text-amber-400", glow: "shadow-amber-500/20", icon: FiClock },
  APPROVED: { label: "Live & Active", color: "text-emerald-400", glow: "shadow-emerald-500/20", icon: FiCheckCircle },
  REJECTED: { label: "Needs Revision", color: "text-rose-400", glow: "shadow-rose-500/20", icon: FiXCircle },
};

const MyJobsPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("postings");
  const [viewMode, setViewMode] = useState("grid"); 

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, enrolledRes] = await Promise.allSettled([
        instance.get("/job/my"),
        instance.get("/courses/enrolled")
      ]);
      
      if (jobsRes.status === "fulfilled") setJobs(jobsRes.value.data);
      if (enrolledRes.status === "fulfilled") setEnrolledCourses(enrolledRes.value.data);
    } catch (err) {
      toast.error("Protocol synchronization failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user) fetchData(); }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 selection:bg-blue-500/30">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50" style={{ scaleX }} />

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {showModal && <PostJobModal onClose={() => setShowModal(false)} onCreated={fetchData} />}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 py-20">
        
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <button onClick={() => navigate("/")} 
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-500 transition-colors mb-6 group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform w-4 h-4" />Home Page
            </button>
            <h1 className="text-6xl font-black tracking-tighter text-white mb-4">
              Activity <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Hub</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-lg leading-relaxed">
              Track your professional development and corporate engagements in a unified workspace.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button onClick={() => setActiveTab("postings")}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'postings' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-white'}`}>
                Postings
              </button>
              <button onClick={() => setActiveTab("learning")}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'learning' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-white'}`}>
                Learning
              </button>
            </div>
            
            <button onClick={() => setShowModal(true)}
              className="group relative flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl overflow-hidden transition-all"
            >
              <span className="relative z-10">POST JOB</span>
              <FiPlus className="relative z-10 w-4 h-4 group-hover:rotate-90 transition-transform" />
            </button>
          </motion.div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <StatCard label="Active Postings" value={jobs.length} icon={FiBriefcase} color="text-blue-400" />
          <StatCard label="Enrolled Projects" value={enrolledCourses.length} icon={FiActivity} color="text-emerald-400" />
          <StatCard label="Pending Approval" value={jobs.filter(j => j.status === 'PENDING').length} icon={FiClock} color="text-amber-400" />
          <StatCard label="Total Reach" value="Global" icon={FiLayers} color="text-purple-400" />
        </section>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "postings" ? (
              <motion.div key="postings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-4"}
              >
                {jobs.length === 0 ? (
                  <EmptyState onAction={() => setShowModal(true)} title="No Active Contracts Found" actionText="CREATE FIRST POSTING" />
                ) : (
                  jobs.map((job, i) => <JobCard key={job.id} job={job} i={i} viewMode={viewMode} />)
                )}
              </motion.div>
            ) : (
              <motion.div key="learning" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {enrolledCourses.length === 0 ? (
                  <EmptyState onAction={() => navigate("/courses")} title="No Projects Initialized" actionText="EXPLORE MATRIX" icon={FiLayers} />
                ) : (
                  enrolledCourses.map((course, i) => <LearningCard key={course.id} course={course} i={i} />)
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
        <Icon size={24} />
      </div>
      <span className="text-3xl font-black text-white">{value}</span>
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
  </motion.div>
);

const JobCard = ({ job, i, viewMode }) => {
  const cfg = STATUS_CONFIG[job.status] || STATUS_CONFIG.PENDING;
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
      className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 overflow-hidden transition-all hover:bg-white/[0.08] ${viewMode === 'list' ? 'flex items-center justify-between gap-6' : ''}`}
    >
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-3xl transition-colors ${cfg.color.replace('text', 'bg')}`} />
      <div className={viewMode === 'list' ? 'flex items-center gap-8 flex-1' : ''}>
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl bg-white/5 ${cfg.color} ${cfg.glow} shadow-2xl`}>
            <cfg.icon size={28} />
          </div>
        </div>
        <div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${cfg.color} mb-3 block`}>{cfg.label}</span>
          <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">{job.title}</h3>
          {viewMode === 'grid' && <p className="text-slate-400 text-sm line-clamp-2 mb-8 font-medium">{job.description}</p>}
        </div>
      </div>
      <div className={`flex items-center gap-6 ${viewMode === 'grid' ? 'border-t border-white/5 pt-8' : ''}`}>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><FiMapPin className="text-blue-500" /> {job.location}</div>
        <div className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest">{job.type}</div>
      </div>
    </motion.div>
  );
};

const LearningCard = ({ course, i }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 overflow-hidden hover:bg-white/[0.08] transition-all"
  >
    <div className="flex justify-between items-start mb-10">
      <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 shadow-2xl">
        <FiActivity size={28} />
      </div>
      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 px-3 py-1 rounded-full border border-white/5">Enrolled</span>
    </div>
    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors tracking-tight">{course.title}</h3>
    <p className="text-slate-500 text-sm mb-8 line-clamp-2 font-medium">{course.description}</p>
    
    <div className="space-y-6 pt-6 border-t border-white/5">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
        <span>Project Roadmap</span>
        <span className="text-emerald-500 italic">Phase 01</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: "35%" }} className="h-full bg-emerald-500" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><FiMapPin className="text-emerald-500" /> Remote</div>
        <button 
          onClick={() => navigate(`/course/${course.id}/viewer`)}
          className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest hover:text-emerald-400 transition-colors"
        >
          Open Console <FiChevronRight />
        </button>
      </div>
    </div>
  </motion.div>
);

const SkeletonCard = () => <div className="h-64 rounded-[2.5rem] bg-white/5 animate-pulse border border-white/10" />;

const EmptyState = ({ onAction, title, actionText, icon: Icon = FiBriefcase }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-40 text-center">
    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
      <Icon size={40} className="text-slate-700" />
    </div>
    <h3 className="text-3xl font-black text-white mb-6 italic tracking-tight">{title}</h3>
    <button onClick={onAction} className="px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-gray-100 transition-all">
      {actionText}
    </button>
  </motion.div>
);

export default MyJobsPage;