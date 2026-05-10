import React from "react";
import { motion } from "framer-motion";
import { GlobeAltIcon, UserGroupIcon, AcademicCapIcon, BoltIcon } from "@heroicons/react/24/outline";

const StatsSection = () => {
  const stats = [
    { label: "Global Reach", val: "24+", icon: GlobeAltIcon },
    { label: "Talent Nodes", val: "12K", icon: UserGroupIcon },
    { label: "Placements", val: "94%", icon: AcademicCapIcon },
    { label: "System Uptime", val: "99.9", icon: BoltIcon },
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <s.icon className="w-6 h-6 text-blue-500/50" />
            </div>
            <p className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 italic">
              {s.val}
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
