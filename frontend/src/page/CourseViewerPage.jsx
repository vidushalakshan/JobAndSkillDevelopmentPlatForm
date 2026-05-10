import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPlay, FiBookOpen, FiClock, FiCheckCircle, FiShare2, FiMoreVertical, FiBook, FiChevronRight, FiAward } from "react-icons/fi";
import instance from "../service/axios";
import { toast } from "react-toastify";
import { useUser } from "../context/context";
import { Button } from "../common/Button";

const CourseViewerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseRes, enrolledRes] = await Promise.all([
          instance.get(`/courses/${id}`),
          instance.get("/courses/enrolled")
        ]);
        
        const courseData = courseRes.data;
        const enrollment = enrolledRes.data.find(e => e.course.id === parseInt(id));
        
        if (enrollment) {
          courseData.progress = enrollment.progress;
        }
        
        setCourse(courseData);
      } catch (err) {
        toast.error("Failed to load project content.");
        navigate("/courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id, navigate]);

  const handleProgressUpdate = async (stepId, totalSteps) => {
    const newProgress = Math.min(Math.round((stepId / totalSteps) * 100), 100);
    try {
      await instance.post(`/courses/${id}/progress?progress=${newProgress}`);
      setCourse(prev => ({ ...prev, progress: newProgress }));
      toast.success(`Milestone Synced: ${newProgress}%`);
    } catch (err) {
      toast.error("Cloud synchronization failed.");
    }
  };

  const handleClaimCredential = () => {
    toast.info("Credential Minting... Your certificate will be issued to your registered email.");
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

  const roadmapSteps = course.syllabus 
    ? course.syllabus.split('\n').filter(s => s.trim()).map((s, i) => ({ id: i + 1, title: s.trim(), duration: "Flexible" }))
    : [
        { id: 1, title: "Foundational Protocols", duration: "45m" },
        { id: 2, title: "Infrastructure Orchestration", duration: "1h 20m" },
        { id: 3, title: "Edge Case Synthesis", duration: "30m" },
        { id: 4, title: "Final Deployment Hub", duration: "15m" },
      ];


  const getEmbedUrl = (url) => {
    if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ";
    if (url.includes("youtube.com/embed/")) return url;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const videoSrc = getEmbedUrl(course.videoUrl);

  return (
    <div className="h-screen bg-[#020203] text-slate-200 selection:bg-blue-500/30 overflow-hidden flex flex-col font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/[0.03] blur-[150px] rounded-full" />
      </div>

      {/* Top Professional Navigation */}
      <nav className="relative z-50 bg-[#020203]/80 backdrop-blur-3xl border-b border-white/5 px-12 h-24 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-10">
          <button onClick={() => navigate("/courses")} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all group">
            <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Exit Console
          </button>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded bg-blue-500 text-[8px] font-black uppercase tracking-widest text-white">Live Console</span>
              <h1 className="text-base font-black tracking-tighter text-white uppercase">{course.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">{course.category}</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[9px] font-bold text-blue-400/80 uppercase tracking-[0.2em]">Deployment Phase 01</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden lg:flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-white tracking-[0.3em] uppercase">Sync Progress: {course.progress || 0}%</span>
            </div>
            <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress || 0}%` }} className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-4 hover:bg-white/5 rounded-2xl transition-all text-slate-500 hover:text-white border border-transparent hover:border-white/5"><FiShare2 size={20} /></button>
            <button className="p-4 hover:bg-white/5 rounded-2xl transition-all text-slate-500 hover:text-white border border-transparent hover:border-white/5"><FiMoreVertical size={20} /></button>
            {user && (
              <div className="flex items-center gap-4 ml-4 pl-6 border-l border-white/10">
                <div className="text-right hidden md:block">
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] truncate max-w-[120px]">{user.username}</div>
                  <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Active Operator</div>
                </div>
                <div className="w-10 h-10 rounded-[1rem] bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer hover:scale-105 transition-transform border border-white/10">
                  {(user.username || "U")[0].toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-hidden grid grid-cols-12 relative z-10 min-h-0">
        {/* Cinema Section */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 overflow-y-auto no-scrollbar p-12 min-h-0">
          <div className="max-w-[1400px] mx-auto space-y-12">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-white/5 group">
              <iframe 
                src={videoSrc}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-[3rem]" />
            </div>

            <div className="space-y-12">
              {/* Context Tabs */}
              <div className="flex border-b border-white/5 gap-12">
                {["overview", "resources", "discussions"].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-6 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === tab ? 'text-blue-500' : 'text-slate-600 hover:text-slate-300'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pb-20">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div 
                      key="overview"
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }} 
                      className="space-y-10"
                    >
                      <div className="flex items-start justify-between gap-10">
                        <div className="space-y-6">
                          <h2 className="text-5xl font-black tracking-tighter text-white leading-tight">Technical Implementation <br /> & Methodology</h2>
                          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500" /> Professional Track</span>
                            <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-500" /> {course.duration} Intensity</span>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleProgressUpdate(roadmapSteps.length, roadmapSteps.length)}
                          variant="primary" size="medium">
                          Commit Milestone
                        </Button>
                      </div>
                      <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-6">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Program Abstract</h3>
                          <p className="text-slate-400 leading-relaxed font-medium text-lg">
                            {course.description}
                          </p>
                        </div>
                        {course.syllabus && (
                          <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Syllabus Breakdown</h3>
                            <div className="space-y-4">
                              {course.syllabus.split('\n').filter(s => s.trim()).map((line, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                  <span className="text-blue-500 font-black text-xs mt-1">0{idx + 1}</span>
                                  <p className="text-slate-300 text-sm font-medium">{line}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "discussions" && (
                    <motion.div 
                      key="discussions"
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }} 
                      className="space-y-8"
                    >
                      <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 text-center space-y-6">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-500">
                          <FiShare2 size={32} />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Community Terminal</h3>
                          <p className="text-slate-500 text-sm font-medium max-w-md mx-auto uppercase tracking-widest">Discussion nodes are currently undergoing maintenance. Check back soon for peer-to-peer synchronization.</p>
                        </div>
                        <Button variant="secondary" size="small" onClick={() => toast.info("Synchronization requested.")}>Notify When Live</Button>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === "resources" && (
                    <motion.div 
                      key="resources"
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }} 
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      {["Technical Blueprint.pdf", "Resource Pack.zip", "Implementation Guide.docx", "API Documentation.pdf"].map((file, i) => (
                        <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/5 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                              <FiBook size={24} />
                            </div>
                            <div>
                              <p className="text-base font-bold text-white mb-1">{file}</p>
                              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Asset ID: SRC-0{i+1}</p>
                            </div>
                          </div>
                          <FiChevronRight size={24} className="text-slate-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Sidebar */}
        <aside className="hidden lg:flex lg:col-span-4 xl:col-span-3 border-l border-white/5 bg-[#050508]/50 backdrop-blur-xl flex-col min-h-0">
          <div className="p-10 border-b border-white/5">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2">Curriculum Roadmap</h3>
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Synchronized with Nexus v1.0.4</p>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
            {roadmapSteps.map((step, i) => {
              const totalSteps = roadmapSteps.length;
              const stepProgress = Math.round(((i + 1) / totalSteps) * 100);
              const isCompleted = (course.progress || 0) >= stepProgress;
              const isActive = (course.progress || 0) < stepProgress && (i === 0 || (course.progress || 0) >= Math.round((i / totalSteps) * 100));

              return (
                <button key={step.id} 
                  onClick={() => handleProgressUpdate(i + 1, totalSteps)}
                  className={`w-full group flex items-center gap-6 p-6 rounded-[2rem] border transition-all text-left relative overflow-hidden ${isActive ? 'bg-blue-600/10 border-blue-500/50' : isCompleted ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'}`}>
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all shrink-0 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : isCompleted ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-600 group-hover:text-white'}`}>
                    {isCompleted ? <FiCheckCircle size={20} /> : `0${step.id}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-black uppercase tracking-[0.15em] truncate ${isActive || isCompleted ? 'text-white' : 'text-slate-600'}`}>{step.title}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[9px] font-bold text-slate-700">{step.duration}</span>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <span className={`text-[9px] font-bold ${isCompleted ? 'text-emerald-500' : isActive ? 'text-blue-500' : 'text-slate-800'}`}>
                        {isCompleted ? 'Validated' : isActive ? 'In Session' : 'Locked'}
                      </span>
                    </div>
                  </div>
                  {isActive && <FiPlay className="text-blue-500 animate-pulse shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="p-10 border-t border-white/5">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-8">
                  <div className="p-3 bg-blue-500/20 rounded-2xl">
                    <FiAward className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] leading-none mb-2">Identity Certification</h4>
                    {user ? (
                       <span className="text-xs font-bold text-blue-300">{user.username}</span>
                    ) : (
                       <span className="text-xs font-bold text-slate-400">Anonymous Mode</span>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Progress</span>
                    <span className="text-sm font-black text-white">{course.progress || 0}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white" style={{ width: `${course.progress || 0}%` }} />
                  </div>
                </div>
                <Button 
                  onClick={handleClaimCredential}
                  disabled={course.progress < 100} 
                  variant={course.progress >= 100 ? "primary" : "bgBlack"}
                  className="w-full mt-8 uppercase tracking-[0.3em] text-[10px]">
                  {course.progress >= 100 ? "Claim Credential" : "Module Incomplete"}
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CourseViewerPage;
