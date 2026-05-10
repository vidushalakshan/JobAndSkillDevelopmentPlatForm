import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiBookOpen, FiClock, FiCheckCircle, 
  FiPlay, FiChevronRight, FiAward, FiBook 
} from "react-icons/fi";
import StatusBadge from "../../common/StatusBadge";

const CourseContentPlayer = ({ 
  course, 
  activeTab, 
  setActiveTab, 
  roadmapSteps, 
  handleProgressUpdate,
  handleClaimCredential,
  videoSrc
}) => {
  const tabs = [
    { id: "overview", label: "Mission Briefing", icon: FiBookOpen },
    { id: "curriculum", label: "Operation Roadmap", icon: FiClock },
    { id: "resources", label: "Intel & Assets", icon: FiBook },
  ];

  return (
    <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative z-10">
      {/* Primary Visual Feed (Video) */}
      <div className="flex-1 bg-black/40 backdrop-blur-md flex flex-col overflow-y-auto no-scrollbar">
        <div className="aspect-video w-full bg-black relative group shadow-[0_0_100px_rgba(37,99,235,0.1)]">
          <iframe 
            src={videoSrc}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-12">
          <div className="flex items-center gap-6 mb-12 border-b border-white/5">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-3 px-2 py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === t.id ? "text-blue-500" : "text-slate-600 hover:text-slate-400"}`}
              >
                <t.icon className="w-5 h-5" /> {t.label}
                {activeTab === t.id && (
                  <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <div className="flex items-center gap-4 mb-10">
                    <StatusBadge status="APPROVED" small />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 italic">Deployment Level: {course.level || "Standard"}</span>
                  </div>
                  <h2 className="text-3xl font-black text-white mb-8 tracking-tighter italic uppercase">Technical Summary</h2>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium mb-12">
                    {course.description || "Initializing course data... This mission covers advanced technical protocols and deployment strategies."}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group hover:border-blue-500/20 transition-all">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-6 italic">Command Instructor</h4>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-black text-xl shadow-xl">
                          {course.instructor?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-lg font-black text-white italic">{course.instructor || "Nexus Core Admin"}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Lead Architect</p>
                        </div>
                      </div>
                    </div>
                    {course.progress === 100 && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-10 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/20 text-center flex flex-col items-center justify-center">
                        <FiAward className="w-12 h-12 text-blue-500 mb-4" />
                        <h4 className="text-xl font-black text-white mb-4 uppercase italic">Credential Ready</h4>
                        <button onClick={handleClaimCredential} className="px-8 py-3 bg-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-blue-500 transition-all">Issue Now</button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "curriculum" && (
                <motion.div key="curriculum" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h3 className="text-2xl font-black text-white mb-10 tracking-tighter italic uppercase">Technical Roadmap</h3>
                  <div className="space-y-4">
                    {roadmapSteps.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-6 group">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all border ${course.progress >= (step.id/roadmapSteps.length)*100 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-white/5 border-white/5 text-slate-700"}`}>
                          {course.progress >= (step.id/roadmapSteps.length)*100 ? <FiCheckCircle className="w-6 h-6" /> : step.id}
                        </div>
                        <div className="flex-1 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-between group-hover:border-white/10 transition-all">
                          <div>
                            <p className="text-lg font-black text-white uppercase italic tracking-tight">{step.title}</p>
                            <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mt-1">Duration: {step.duration}</p>
                          </div>
                          <button 
                            onClick={() => handleProgressUpdate(step.id, roadmapSteps.length)}
                            className="p-4 rounded-xl bg-white/5 text-slate-700 hover:text-blue-500 hover:bg-blue-500/10 transition-all"
                          >
                            <FiPlay className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Secondary Interface (Sidebar) */}
      <div className="w-full md:w-[450px] bg-[#050508]/80 backdrop-blur-3xl border-l border-white/5 flex flex-col overflow-y-auto no-scrollbar relative">
        <div className="p-12">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-700">Project Nodes</h3>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-500">{roadmapSteps.length} Steps</span>
          </div>
          
          <div className="space-y-6">
            {roadmapSteps.map((step) => (
              <button 
                key={step.id}
                onClick={() => handleProgressUpdate(step.id, roadmapSteps.length)}
                className={`w-full p-8 rounded-[2rem] border transition-all flex items-center gap-6 group text-left ${course.progress >= (step.id/roadmapSteps.length)*100 ? "bg-emerald-500/[0.03] border-emerald-500/10" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black ${course.progress >= (step.id/roadmapSteps.length)*100 ? "text-emerald-500" : "text-slate-800"}`}>
                  {course.progress >= (step.id/roadmapSteps.length)*100 ? <FiCheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <div className="min-w-0">
                  <p className={`font-black uppercase tracking-tight truncate italic ${course.progress >= (step.id/roadmapSteps.length)*100 ? "text-slate-400 line-through decoration-emerald-500/50" : "text-white"}`}>{step.title}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[9px] font-black text-slate-800 uppercase">Synchronized</span>
                    <FiChevronRight className={`w-3 h-3 text-slate-800 group-hover:text-blue-500 transition-colors ${course.progress >= (step.id/roadmapSteps.length)*100 ? "text-emerald-500" : ""}`} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-16 p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-indigo-900/10 border border-blue-500/10 relative overflow-hidden">
             <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />
             <h4 className="text-xl font-black text-white mb-4 uppercase italic">Final Assessment</h4>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose mb-8">Validate your mastery through the core platform validation layer.</p>
             <button className="w-full py-4 rounded-xl bg-white text-blue-900 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Initiate Validation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentPlayer;
