import React from "react";

const StatusBadge = ({ status, small }) => {
  const map = {
    PENDING:  { bg: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    APPROVED: { bg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" },
    REJECTED: { bg: "bg-red-500/10 text-red-500 border-red-500/30" },
    ACCEPTED: { bg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" },
    REVIEWED: { bg: "bg-blue-500/10 text-blue-500 border-blue-500/30" },
    USER:     { bg: "bg-slate-500/10 text-slate-500 border-white/5" },
    ADMIN:    { bg: "bg-blue-600/10 text-blue-400 border-blue-500/20" },
  };

  const cls = map[status]?.bg || "bg-gray-500/10 text-gray-500 border-white/10";
  
  return (
    <span className={`border rounded-full font-black tracking-tighter uppercase ${small ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]"} ${cls} backdrop-blur-sm transition-all`}>
      {status}
    </span>
  );
};

export default StatusBadge;
