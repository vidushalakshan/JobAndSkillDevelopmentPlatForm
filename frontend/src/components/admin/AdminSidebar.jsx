import React from "react";
import { motion } from "framer-motion";
import { 
  FiZap, FiPlus, FiLogOut, FiActivity, 
  FiClock, FiBriefcase, FiBook, FiUsers 
} from "react-icons/fi";
import { Button } from "../../common/Button";

const AdminSidebar = ({ 
  activeTab, 
  setActiveTab, 
  user, 
  logout, 
  navigate, 
  pendingCount, 
  draftCount,
  setShowPostModal,
  setShowCourseModal
}) => {
  const tabs = [
    { id: "overview", label: "Insights", icon: FiActivity },
    { id: "approvals", label: "Queue", icon: FiClock, badge: pendingCount },
    { id: "all-jobs", label: "All Jobs", icon: FiBriefcase },
    { id: "courses", label: "Courses", icon: FiBook, badge: draftCount },
    { id: "users", label: "Users", icon: FiUsers },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-80 bg-[#080810] border-r border-white/5 flex flex-col z-40 shadow-[20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
      
      <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg group hover:border-blue-500/50 transition-all duration-500">
            <FiZap className="text-blue-500 w-6 h-6 group-hover:scale-125 transition-transform" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">Nexus <span className="text-blue-600">Core</span></h1>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">Admin Protocol</p>
          </div>
        </div>
        
        <div className="space-y-10">
          <div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6 px-6">Main Terminal</p>
            <nav className="space-y-1">
              {tabs.map(({ id, label, icon: Icon, badge }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all relative group ${activeTab === id ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>
                  <span className="flex items-center gap-4 z-10">
                    <Icon className={`w-5 h-5 transition-colors ${activeTab === id ? "text-blue-500" : "text-slate-700 group-hover:text-blue-400"}`} />
                    {label}
                  </span>
                  {badge > 0 && <span className="z-10 text-[9px] font-black px-2 py-0.5 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">{badge}</span>}
                  {activeTab === id && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-white/[0.03] border border-white/5 rounded-2xl" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6 px-6">System Actions</p>
            <div className="space-y-3 px-2">
              <Button onClick={() => setShowPostModal(true)} variant="primary" size="small" className="w-full !rounded-2xl !py-4 shadow-[0_10px_20px_rgba(59,130,246,0.2)]">
                GLOBAL JOB <FiPlus className="ml-2 w-4 h-4" />
              </Button>
              <Button onClick={() => setShowCourseModal(true)} variant="bgBlack" size="small" className="w-full !rounded-2xl !py-4 border border-white/5 text-slate-400 hover:text-white">
                GLOBAL PROJECT <FiPlus className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-white/5 bg-black/20 backdrop-blur-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black shadow-lg">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black truncate text-white">{user?.username}</p>
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest italic">{user?.role}</p>
          </div>
        </div>
        <button 
          onClick={() => { logout(); navigate("/login"); }}
          className="w-full group flex items-center justify-center gap-3 py-3.5 rounded-xl border border-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <FiLogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Terminate Session
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
