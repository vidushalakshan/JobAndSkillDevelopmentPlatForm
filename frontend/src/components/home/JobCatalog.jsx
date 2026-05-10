import React from "react";
import { motion } from "framer-motion";
import { MapPinIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

const JobCatalog = ({ jobs, setSelectedJob }) => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <h2 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Market Matrix</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Active Nodes.</h3>
        </div>
        <p className="text-slate-500 max-w-xs font-medium">Real-time opportunities synced with industry demand.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.slice(0, 6).map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedJob(job)}
            className="group cursor-pointer bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <BriefcaseIcon className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 group-hover:text-blue-500 transition-colors">
                {job.type}
              </span>
            </div>
            <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-blue-400 transition-colors">
              {job.title}
            </h4>
            <div className="flex items-center gap-2 text-slate-600 text-xs font-bold uppercase tracking-widest">
              <MapPinIcon className="w-4 h-4" /> {job.location}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JobCatalog;
