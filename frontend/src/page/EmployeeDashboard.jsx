import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { FiEdit2, FiTrash2, FiCheck, FiX, FiActivity, FiUsers, FiBriefcase } from 'react-icons/fi';
import PostJobModal from '../page/EmployeeForm';
import { motion, AnimatePresence } from "framer-motion";
import instance from '../service/axios';
import { useUser } from '../context/context';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('ALL');

  const fetchJobs = async () => {
    try {
      const endpoint = user?.role === 'ADMIN' ? 'job/all' : 'job/approved';
      const response = await instance.get(endpoint);
      setJobs(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      const msg = err.response?.data || "Failed to load jobs";
      toast.error(typeof msg === 'string' ? msg : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await instance.put(`job/${id}/status?status=${status}`);
      toast.success(`Job ${status.toLowerCase()} successfully`);
      fetchJobs();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await instance.delete(`job/${id}`);
      toast.success("Job deleted");
      fetchJobs();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const stats = [
    { label: "Total Jobs", value: jobs.length, icon: <FiBriefcase />, color: "bg-blue-500" },
    { label: "Pending", value: jobs.filter(j => j.status === 'PENDING').length, icon: <FiActivity />, color: "bg-amber-500" },
    { label: "Approved", value: jobs.filter(j => j.status === 'APPROVED').length, icon: <FiCheck />, color: "bg-emerald-500" },
  ];

  return (
    <section className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f172a] transition-colors duration-500">
      <div className="shrink-0 z-50 w-full glassmorphism">
        <NavBar />
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Control Center</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Global oversight of all job vacancies and applications.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 font-bold flex items-center gap-2"
              >
                + New Vacancy
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-gray-200 dark:border-white/10 flex items-center gap-5"
              >
                <div className={`p-4 rounded-2xl text-white ${stat.color} shadow-lg shadow-current/20 text-2xl`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                  <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Position</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Location</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Salary</th>
                  <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400 text-center">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {loading ? (
                  <tr><td colSpan="5" className="p-10 text-center animate-pulse">Synchronizing database...</td></tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-gray-400">
                        <FiBriefcase className="text-6xl opacity-20" />
                        <p className="text-xl font-medium">No job postings found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{job.title}</span>
                          <span className="text-xs text-gray-500">ID: {job.id}</span>
                        </div>
                      </td>
                      <td className="p-6 text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          {job.location}
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          job.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20' :
                          job.status === 'REJECTED' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20' :
                          'bg-amber-100 text-amber-600 dark:bg-amber-500/20'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-6 text-gray-600 dark:text-gray-300 font-medium">{job.salary || '—'}</td>
                      <td className="p-6">
                        <div className="flex justify-center gap-2">
                          {job.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(job.id, 'APPROVED')}
                                className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                title="Approve"
                              >
                                <FiCheck className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(job.id, 'REJECTED')}
                                className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                title="Reject"
                              >
                                <FiX className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="p-3 rounded-2xl bg-gray-500/10 text-gray-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Delete Permanently"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {showModal && (
          <PostJobModal
            onClose={() => setShowModal(false)}
            onJobPosted={() => fetchJobs()}
          />
        )}
      </main>
    </section>
  );
};

export default AdminDashboard;
