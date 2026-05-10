import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiClock, FiUsers, FiShield, FiZap, FiDatabase } from "react-icons/fi";

const AdminOverview = ({ jobs, pendingJobs, users }) => {
  const stats = [
    { label: "Total Openings", value: jobs.length, icon: FiBriefcase, color: "from-blue-600 to-indigo-600" },
    { label: "Approval Queue", value: pendingJobs.length, icon: FiClock, color: "from-amber-500 to-orange-600" },
    { label: "Active Users", value: users.length, icon: FiUsers, color: "from-emerald-500 to-teal-700" },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/5 rounded-[3rem] p-10 border border-white/5 shadow-2xl hover:bg-white/[0.08] transition-colors group">
            <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${color} flex items-center justify-center mb-8 shadow-xl transition-transform group-hover:scale-110`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <p className="text-5xl font-black mb-1 text-white tracking-tighter">{value.toLocaleString()}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 rounded-[3rem] p-12 border border-white/5">
          <h3 className="text-2xl font-black mb-12 text-white">Core Metrics</h3>
          <div className="space-y-10">
            {[
              { label: "Network Integrity", pct: 98, color: "bg-blue-500", icon: FiShield },
              { label: "API Latency", pct: 14, color: "bg-emerald-500", icon: FiZap },
              { label: "Database Sync", pct: 100, color: "bg-indigo-500", icon: FiDatabase },
            ].map(bar => (
              <div key={bar.label} className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  <span className="flex items-center gap-2">
                    <bar.icon className="text-blue-500" /> {bar.label}
                  </span>
                  <span className="text-white tracking-tighter">{bar.pct}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${bar.pct}%` }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full ${bar.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#0f172a] rounded-[3rem] p-12 border border-blue-500/20 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-600/20 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <FiShield size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">System Protocol</span>
            </div>
            <h3 className="text-3xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">Integrity <br /> Shield Active.</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed mb-10">
              Advanced encryption and multi-layer authentication are governing all active node connections.
            </p>
            <div className="flex items-center gap-3 py-3 px-5 rounded-2xl bg-white/5 border border-white/5 w-fit">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Secure Node: 8080</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
