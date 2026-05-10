import React from "react";
import { motion } from "framer-motion";
import { FiChevronRight, FiTrash2 } from "react-icons/fi";
import StatusBadge from "../../common/StatusBadge";

const AdminUserRegistry = ({ users, searchTerm, handleRoleChange, handleDeleteUser }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {users
        .filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.username.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(u => (
        <motion.div key={u.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="relative group bg-[#0a0a15] rounded-[2.5rem] p-8 border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-xl shadow-xl group-hover:bg-blue-600/10 transition-colors">
              {u.username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1 italic">Registry Node</span>
              <StatusBadge status={u.role} small />
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-black text-white tracking-tight mb-1 truncate group-hover:text-blue-400 transition-colors">{u.username}</h4>
            <p className="text-[10px] font-bold text-slate-600 truncate uppercase tracking-tighter">{u.email}</p>
          </div>
          
          <div className="flex items-center gap-3 pt-6 border-t border-white/5">
            <div className="flex-1 relative group/select">
              <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 outline-none appearance-none hover:bg-white/5 transition-all cursor-pointer">
                {["USER", "EMPLOYER", "EMPLOYEE", "TRAINER", "LECTURER", "ADMIN"].map(r => <option key={r} value={r} className="bg-[#080810]">{r}</option>)}
              </select>
              <FiChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none rotate-90" />
            </div>
            {u.role !== "ADMIN" && (
              <button onClick={() => handleDeleteUser(u.id)} className="p-3 rounded-xl bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all">
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminUserRegistry;
