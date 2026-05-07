import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import instance from "../service/axios";
import PostJobModal from "../components/PostJobModal";
import {
  FiBriefcase, FiClock, FiCheckCircle, FiXCircle,
  FiPlus, FiArrowLeft, FiMapPin, FiDollarSign, FiCalendar,
  FiLayers, FiUserCheck, FiTarget, FiChevronRight
} from "react-icons/fi";

const STATUS_CONFIG = {
  PENDING:  { label: "Under Review", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: FiClock },
  APPROVED: { label: "Live & Active", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: FiCheckCircle },
  REJECTED: { label: "Needs Revision", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", icon: FiXCircle },
};

const MyJobsPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("my-jobs");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.allSettled([
        instance.get("/job/my"),
        instance.get("/apply/my"),
      ]);
      if (jobsRes.status === "fulfilled") setJobs(jobsRes.value.data);
      if (appsRes.status === "fulfilled") setApplications(appsRes.value.data);
    } catch (err) {
      toast.error("Failed to load your activity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user) fetchData(); }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a14] text-gray-900 dark:text-white pb-20" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <AnimatePresence>
        {showModal && <PostJobModal onClose={() => setShowModal(false)} onCreated={fetchData} />}
      </AnimatePresence>

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-500/5 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <button onClick={() => navigate("/")} className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-all mb-4">
              <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Discover
            </button>
            <h1 className="text-5xl font-black tracking-tight mb-3">Your Platform Activity</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Track your job submissions and manage applications in real-time.</p>
          </div>
          
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-500/30 transition-all transform hover:scale-[1.03] active:scale-95">
            <FiPlus className="w-5 h-5" /> Post New Job
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Active Postings", value: jobs.length, icon: FiLayers, color: "text-blue-500" },
            { label: "Sent Applications", value: applications.length, icon: FiTarget, color: "text-purple-500" },
            { label: "Interview Invites", value: applications.filter(a => a.status === "ACCEPTED").length, icon: FiUserCheck, color: "text-emerald-500" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-[#111127] rounded-[2rem] p-8 border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/[0.02]">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-4xl font-black">{stat.value}</span>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2 p-1.5 bg-gray-200/50 dark:bg-white/5 backdrop-blur-md rounded-[1.5rem] mb-8 w-fit border border-gray-200 dark:border-white/5">
          {[
            { id: "my-jobs", label: "My Job Postings", icon: FiBriefcase },
            { id: "applications", label: "Application History", icon: FiTarget },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-black transition-all ${activeTab === id ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}>
              <Icon className="w-5 h-5" /> {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-48 bg-white dark:bg-[#111127] rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {activeTab === "my-jobs" ? (
                jobs.length === 0 ? (
                  <div className="col-span-full py-32 text-center">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiBriefcase className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">No postings yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">Start your journey by posting your first job requirement to the community.</p>
                    <button onClick={() => setShowModal(true)} className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all">Create Job Post</button>
                  </div>
                ) : jobs.map((job, i) => {
                  const cfg = STATUS_CONFIG[job.status] || STATUS_CONFIG.PENDING;
                  const Icon = cfg.icon;
                  return (
                    <motion.div key={job.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="group bg-white dark:bg-[#111127] rounded-[2rem] border border-gray-100 dark:border-white/5 p-8 shadow-2xl shadow-black/[0.02] hover:shadow-blue-500/10 transition-all">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-2xl ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${cfg.border} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black mb-2 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 font-medium leading-relaxed">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-4 border-t border-gray-50 dark:border-white/5 pt-6 mt-auto">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400"><FiMapPin /> {job.location}</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-lg uppercase tracking-wider">{job.type}</div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                applications.length === 0 ? (
                  <div className="col-span-full py-32 text-center">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiTarget className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">No applications yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto font-medium">Applications you submit to various jobs will appear here.</p>
                  </div>
                ) : applications.map((app, i) => {
                  const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.PENDING;
                  return (
                    <motion.div key={app.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="bg-white dark:bg-[#111127] rounded-[2rem] border border-gray-100 dark:border-white/5 p-8 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-black mb-1">{app.job?.title || "Deleted Job"}</h3>
                          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">{app.job?.location}</p>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${cfg.border} ${cfg.color}`}>
                          {app.status}
                        </span>
                      </div>
                      {app.coverLetter && (
                        <div className="bg-gray-50 dark:bg-white/5 rounded-[1.5rem] p-6 mb-6">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Application Note</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium italic">"{app.coverLetter}"</p>
                        </div>
                      )}
                      <button onClick={() => navigate(`/job/${app.job?.id}`)} className="mt-auto group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-all">
                        View Job Details <FiChevronRight className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default MyJobsPage;
