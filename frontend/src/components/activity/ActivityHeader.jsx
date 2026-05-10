import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { Button } from "../../common/Button";

const ActivityHeader = ({ user, activeTab, setActiveTab, navigate, setShowModal }) => {
  return (
    <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <button onClick={() => navigate("/")} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-500 transition-colors mb-6 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform w-4 h-4" /> Home Page
        </button>
        <h1 className="text-6xl font-black tracking-tighter text-white mb-4">
          Activity <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 italic">Hub</span>
        </h1>
        <p className="text-slate-400 font-medium max-w-lg leading-relaxed">
          Centralized workspace for your professional deployments and technical evolution.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
          {["postings", "learning"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? 'bg-white text-black shadow-xl scale-105' : 'text-slate-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {user.role === "ADMIN" && (
            <Button onClick={() => navigate("/courses")} variant="bgBlack" size="small" className="!px-5 border border-blue-500/20 text-blue-400">
              CREATE COURSE <FiPlus className="w-4 h-4 ml-2" />
            </Button>
          )}
          <Button onClick={() => setShowModal(true)} variant="primary" size="small" className="px-5 shadow-[0_10px_20px_rgba(37,99,235,0.2)]">
            POST JOB <FiPlus className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </header>
  );
};

export default ActivityHeader;
