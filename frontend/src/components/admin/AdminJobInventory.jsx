import React from "react";
import { FiFilter, FiBriefcase, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import StatusBadge from "../../common/StatusBadge";

const AdminJobInventory = ({ activeTab, jobs, pendingJobs, searchTerm, handleJobStatus, handleDeleteJob }) => {
  const displayJobs = activeTab === "approvals" ? pendingJobs : jobs;

  return (
    <div className="bg-white/5 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
      <div className="p-10 border-b border-white/5 flex items-center justify-between">
        <h3 className="font-black text-xl text-white">
          {activeTab === "approvals" ? "Approval Queue" : "System Jobs Inventory"}
        </h3>
        <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all">
          <FiFilter />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 border-b border-white/5">
              <th className="px-10 py-8">Job Position</th>
              <th className="px-10 py-8">Category</th>
              <th className="px-10 py-8">Status</th>
              <th className="px-10 py-8 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {displayJobs
              .filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(job => (
              <tr key={job.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-10 py-8">
                  <p className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{job.title}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{job.location}</p>
                </td>
                <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-blue-500/80">{job.type}</td>
                <td className="px-10 py-8"><StatusBadge status={job.status} small /></td>
                <td className="px-10 py-8 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                    {job.status === "PENDING" && (
                      <button onClick={() => handleJobStatus(job.id, "APPROVED")} className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all">
                        <FiCheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button onClick={() => handleDeleteJob(job.id)} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayJobs.length === 0 && (
          <div className="p-24 text-center">
            <FiBriefcase className="w-20 h-20 text-white/5 mx-auto mb-6" />
            <p className="text-gray-600 font-black uppercase tracking-widest text-xs">The vault is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobInventory;
