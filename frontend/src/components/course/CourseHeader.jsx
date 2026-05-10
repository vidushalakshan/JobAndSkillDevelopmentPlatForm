import React from "react";
import { FiArrowLeft, FiShare2, FiMoreVertical } from "react-icons/fi";
import { Button } from "../../common/Button";

const CourseHeader = ({ course, navigate }) => {
  return (
    <nav className="relative z-50 bg-[#020203]/80 backdrop-blur-3xl border-b border-white/5 px-12 h-24 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-10">
        <button onClick={() => navigate("/courses")} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all group">
          <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        <div className="h-10 w-px bg-white/10" />
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">{course.title}</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/80">Project Node: {course.id}</p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 mb-2">Cloud Sync: {course.progress || 0}%</span>
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${course.progress || 0}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-500 hover:text-white transition-all">
            <FiShare2 className="w-5 h-5" />
          </button>
          <button className="p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-500 hover:text-white transition-all">
            <FiMoreVertical className="w-5 h-5" />
          </button>
          <Button variant="primary" size="small" className="!px-8 !rounded-2xl">
            Save Status
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default CourseHeader;
