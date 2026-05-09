import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPlay, FiBookOpen, FiClock, FiCheckCircle, FiShare2, FiMoreVertical } from "react-icons/fi";
import instance from "../service/axios";
import { toast } from "react-toastify";

const CourseViewerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  if (!course) return null;

  // Helper to convert standard YouTube URLs to Embed URLs
  const getEmbedUrl = (url) => {
    if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Default placeholder
    if (url.includes("youtube.com/embed/")) return url;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const videoSrc = getEmbedUrl(course.videoUrl);

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 flex items-center justify-between">
        <button onClick={() => navigate("/my-jobs")} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all">
          <FiArrowLeft className="w-4 h-4" /> Exit Console
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-black tracking-widest uppercase">{course.title}</h1>
          <p className="text-[8px] font-bold text-blue-500 uppercase tracking-[0.2em]">{course.category} Protocol</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-slate-500 hover:text-white transition-all"><FiShare2 /></button>
          <button className="text-slate-500 hover:text-white transition-all"><FiMoreVertical /></button>
        </div>
      </nav>

      <main className="pt-24 pb-20 max-w-[1800px] mx-auto px-8 flex flex-col lg:flex-row gap-12">
        {/* Cinema Section */}
        <div className="flex-1">
          <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-black shadow-2xl border border-white/5 group">
            <iframe 
              src={videoSrc}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="mt-12 space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-black tracking-tighter mb-4">{course.title}</h2>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <FiBookOpen className="text-blue-500" /> Phase 01: Systems Architecture
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <FiClock className="text-blue-500" /> {course.duration} Session
                  </div>
                </div>
              </div>
              <button className="px-10 py-4 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
                Mark as Complete
              </button>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[3rem] p-12">
              <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-slate-400">Technical Abstract</h3>
              <p className="text-slate-400 leading-relaxed font-medium text-lg">
                {course.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Roadmap */}
        <aside className="w-full lg:w-[450px] space-y-8">
          <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-10">Project Roadmap</h3>
            
            <div className="space-y-4">
              {[
                { id: 1, title: "Foundational Protocols", duration: "45m", active: true },
                { id: 2, title: "Infrastructure Orchestration", duration: "1h 20m", active: false },
                { id: 3, title: "Edge Case Synthesis", duration: "30m", active: false },
                { id: 4, title: "Final Deployment Hub", duration: "15m", active: false },
              ].map((step, i) => (
                <div key={step.id} className={`group flex items-center gap-6 p-6 rounded-2xl border transition-all cursor-pointer ${step.active ? 'bg-blue-600/10 border-blue-500/50' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all ${step.active ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-500 group-hover:text-white'}`}>
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-black uppercase tracking-widest ${step.active ? 'text-white' : 'text-slate-500'}`}>{step.title}</p>
                    <p className="text-[10px] font-bold text-slate-600 mt-1">{step.duration}</p>
                  </div>
                  {step.id === 1 && <FiPlay className="text-blue-500" />}
                  {step.id < 1 && <FiCheckCircle className="text-emerald-500" />}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h4 className="text-xl font-black mb-4 leading-tight relative z-10">Certification of Completion</h4>
            <p className="text-blue-100/70 text-[10px] font-bold uppercase tracking-widest mb-8 relative z-10">Locked until 100% mastery</p>
            <button disabled className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-50 cursor-not-allowed">
              Generate Credential
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CourseViewerPage;
