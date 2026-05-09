import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPlay, FiBookOpen, FiClock, FiCheckCircle, FiShare2, FiMoreVertical, FiBook, FiChevronRight } from "react-icons/fi";
import instance from "../service/axios";
import { toast } from "react-toastify";

const CourseViewerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await instance.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        toast.error("Failed to load project content.");
        navigate("/my-jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, navigate]);

  const handleProgressUpdate = async (stepId) => {
    const newProgress = Math.min(stepId * 25, 100);
    try {
      await instance.post(`/courses/${id}/progress?progress=${newProgress}`);
      setCourse(prev => ({ ...prev, progress: newProgress }));
      toast.success(`Milestone Synced: ${newProgress}%`);
    } catch (err) {
      toast.error("Cloud synchronization failed.");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full" />
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (!course) return null;

  const getEmbedUrl = (url) => {
    if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ";
    if (url.includes("youtube.com/embed/")) return url;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const videoSrc = getEmbedUrl(course.videoUrl);

  return (
    <div className="min-h-screen bg-[#020203] text-slate-200 selection:bg-blue-500/30 relative">
      {/* Top Professional Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020203]/80 backdrop-blur-2xl border-b border-white/5 px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate("/courses")} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all group">
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Exit Console
          </button>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col">
            <h1 className="text-sm font-black tracking-widest uppercase text-white leading-none mb-1">{course.title}</h1>
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-bold text-blue-500 uppercase tracking-[0.2em]">{course.category}</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Module 01</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden md:flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-white tracking-widest uppercase">{course.progress || 0}% Complete</span>
            </div>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress || 0}%` }} className="h-full bg-gradient-to-r from-blue-600 to-indigo-500" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-white"><FiShare2 /></button>
            <button className="p-3 hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-white"><FiMoreVertical /></button>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 max-w-[1920px] mx-auto px-8 grid grid-cols-12 gap-10">
        {/* Cinema Section */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-10">
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-black shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 group">
            <iframe 
              src={videoSrc}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="space-y-10">
            {/* Context Tabs */}
            <div className="flex border-b border-white/5 gap-10">
              {["overview", "resources", "discussions"].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
                </button>
              ))}
            </div>

            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4">
                        <h2 className="text-4xl font-black tracking-tighter text-white">Project Methodology</h2>
                        <div className="flex items-center gap-6 text-xs font-bold text-slate-500">
                          <span className="flex items-center gap-2"><FiBookOpen className="text-blue-500" /> Professional Level</span>
                          <span className="flex items-center gap-2"><FiClock className="text-blue-500" /> {course.duration} Intensity</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleProgressUpdate(4)}
                        className="px-8 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                        Verify Milestone
                      </button>
                    </div>
                    <p className="text-slate-400 leading-relaxed font-medium text-lg max-w-4xl">
                      {course.description}
                    </p>
                  </motion.div>
                )}
                
                {activeTab === "resources" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["Technical Blueprint.pdf", "Resource Pack.zip", "Implementation Guide.docx"].map((file, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <FiBook />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white mb-1">{file}</p>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Asset Category: Documentation</p>
                          </div>
                        </div>
                        <FiChevronRight className="text-slate-700 group-hover:text-white transition-all" />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Professional Sidebar */}
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-8">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl sticky top-28">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Curriculum Roadmap</h3>
              <span className="text-[8px] font-black text-slate-700 px-2 py-1 rounded bg-white/5">v1.0.4</span>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 1, title: "Foundational Protocols", duration: "45m" },
                { id: 2, title: "Infrastructure Orchestration", duration: "1h 20m" },
                { id: 3, title: "Edge Case Synthesis", duration: "30m" },
                { id: 4, title: "Final Deployment Hub", duration: "15m" },
              ].map((step, i) => {
                const stepProgress = (i + 1) * 25;
                const isCompleted = (course.progress || 0) >= stepProgress;
                const isActive = (course.progress || 0) < stepProgress && (i === 0 || (course.progress || 0) >= i * 25);

                return (
                  <button key={step.id} 
                    onClick={() => handleProgressUpdate(i + 1)}
                    className={`w-full group flex items-center gap-5 p-5 rounded-2xl border transition-all text-left ${isActive ? 'bg-blue-600/10 border-blue-500/50' : isCompleted ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all shrink-0 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : isCompleted ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-500 group-hover:text-white'}`}>
                      {isCompleted ? <FiCheckCircle size={18} /> : step.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[11px] font-black uppercase tracking-widest truncate ${isActive || isCompleted ? 'text-white' : 'text-slate-500'}`}>{step.title}</p>
                      <p className="text-[9px] font-bold text-slate-700 mt-1">{step.duration} • Module {step.id}</p>
                    </div>
                    {isActive && <FiPlay className="text-blue-500 animate-pulse shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-white/5">
              <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl p-6 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                <h4 className="text-sm font-black mb-2 text-white leading-tight uppercase tracking-tighter">Certified Credential</h4>
                <p className="text-blue-100/50 text-[8px] font-black uppercase tracking-[0.2em] mb-6">Locked until 100%</p>
                <button disabled={course.progress < 100} className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${course.progress >= 100 ? 'bg-white text-black hover:bg-emerald-400' : 'bg-white/5 border border-white/10 opacity-30 cursor-not-allowed'}`}>
                  {course.progress >= 100 ? "Claim Identity" : "Locked"}
                </button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CourseViewerPage;
