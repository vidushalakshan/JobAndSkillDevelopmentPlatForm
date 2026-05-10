import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiTrash2, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

const STATUS_CONFIG = {
  PENDING: { label: "Under Review", color: "text-amber-400", bg: "bg-amber-400/10", icon: FiClock },
  APPROVED: { label: "Live & Active", color: "text-emerald-400", bg: "bg-emerald-400/10", icon: FiCheckCircle },
  REJECTED: { label: "Needs Revision", color: "text-rose-400", bg: "bg-rose-400/10", icon: FiXCircle },
};

import { SkeletonCard } from "../../common/Skeleton";

const JobPostingsList = ({ jobs, loading, handleDelete }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="py-40 text-center bg-white/[0.01] rounded-[4rem] border border-white/5">
        <FiBriefcase className="w-20 h-20 text-white/5 mx-auto mb-8" />
        <p className="text-slate-600 font-black uppercase tracking-[0.4em] text-[10px]">No Active Postings Found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {jobs.map((job, idx) => {
        const status = STATUS_CONFIG[job.status] || STATUS_CONFIG.PENDING;
        return (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 hover:border-white/10 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] pointer-events-none" />
            
            <div className="flex justify-between items-start mb-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors border border-white/5">
                <FiBriefcase className="w-8 h-8" />
              </div>
              <button onClick={() => handleDelete(job.id)} className="p-3 rounded-xl bg-red-500/5 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 transition-all">
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">{job.title}</h3>
            <p className="flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-widest mb-10">
              <FiMapPin className="w-4 h-4 text-blue-500" /> {job.location}
            </p>

            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl ${status.bg} border border-white/5`}>
              <status.icon className={`w-4 h-4 ${status.color}`} />
              <span className={`text-[9px] font-black uppercase tracking-widest ${status.color}`}>{status.label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default JobPostingsList;
