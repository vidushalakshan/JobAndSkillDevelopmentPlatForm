import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";

const PostJobModal = ({ onClose, onJobPosted }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    salary: '',
    deadline: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      deadline: formData.deadline || null,
      salary: formData.salary || null,
    };

    try {
      const response = await instance.post(
        'job/create',
        submissionData
      );

      if (response.status === 200 || response.status === 201) {
        onJobPosted(response.data);
        onClose();
      }
    } catch (err) {
      console.error('Error posting job:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white dark:bg-[#1e1e2f] rounded-3xl shadow-2xl p-8 w-full max-w-lg relative z-10 border border-gray-200 dark:border-white/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Post a New Vacancy</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Job Title</label>
              <input type="text" name="title" placeholder="Software Engineer" onChange={handleChange} required className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Location</label>
              <input type="text" name="location" placeholder="Remote / City" onChange={handleChange} required className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Job Type</label>
              <input type="text" name="type" placeholder="Full-time / Part-time" onChange={handleChange} required className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Salary Range</label>
              <input type="text" name="salary" placeholder="$1000 - $2000" onChange={handleChange} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Application Deadline</label>
            <input type="date" name="deadline" onChange={handleChange} required className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Description</label>
            <textarea name="description" placeholder="Briefly describe the role..." rows="3" onChange={handleChange} required className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-2xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">Cancel</button>
            <button type="submit" className="px-8 py-3 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02]">Post Job</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PostJobModal;
