import React from "react";
import { motion } from "framer-motion";
import { FiLayers, FiChevronRight, FiCheckCircle } from "react-icons/fi";

import { SkeletonRow } from "../../common/Skeleton";

const LearningTrackList = ({ courses, loading, navigate }) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((n) => <SkeletonRow key={n} />)}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="py-40 text-center bg-white/[0.01] rounded-[4rem] border border-white/5">
        <FiLayers className="w-20 h-20 text-white/5 mx-auto mb-8" />
        <p className="text-slate-600 font-black uppercase tracking-[0.4em] text-[10px]">No Active Learning Nodes</p>
        <button onClick={() => navigate("/courses")} className="mt-8 text-blue-500 font-black text-[10px] uppercase tracking-widest hover:underline">Access Catalog</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {courses.map((enrollment, idx) => (
        <motion.div
          key={enrollment.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => navigate(`/courses/${enrollment.course.id}`)}
          className="group cursor-pointer bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 flex flex-col md:flex-row md:items-center justify-between hover:border-white/10 transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600/[0.01] group-hover:bg-blue-600/[0.02] transition-colors pointer-events-none" />
          
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:border-blue-500/20 transition-all shrink-0">
              <FiLayers className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic group-hover:text-blue-400 transition-colors mb-2">{enrollment.course.title}</h3>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Instructor: {enrollment.course.instructor}</span>
                <div className="w-1 h-1 rounded-full bg-slate-800" />
                <span className="text-[10px] font-black text-blue-500/80 uppercase tracking-widest italic">{enrollment.course.category}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-0 flex items-center gap-10 relative z-10">
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-white italic">{enrollment.progress}% Mastery</span>
                {enrollment.progress === 100 && <FiCheckCircle className="w-4 h-4 text-emerald-500" />}
              </div>
              <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${enrollment.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                  style={{ width: `${enrollment.progress}%` }} 
                />
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 text-slate-700 group-hover:text-white group-hover:bg-blue-600 transition-all">
              <FiChevronRight className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LearningTrackList;
