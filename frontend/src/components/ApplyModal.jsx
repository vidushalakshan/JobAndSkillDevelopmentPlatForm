import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import { toast } from "react-toastify";

const ApplyModal = ({ job, onClose }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await instance.post(`/apply/${job.id}`, coverLetter, {
        headers: { 'Content-Type': 'text/plain' }
      });
      toast.success("Application submitted successfully!");
      onClose();
    } catch (err) {
      toast.error("Failed to submit application.");
      console.error(err);
    } finally {
      setLoading(false);
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
        className="bg-white dark:bg-[#1e1e2f] rounded-[2.5rem] shadow-2xl p-8 w-full max-w-lg relative z-10 border border-gray-200 dark:border-white/10"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Apply for {job.title}</h2>
          <p className="text-gray-500 dark:text-gray-400">Share your interest and why you're a great fit.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 ml-1">Cover Letter / Note</label>
            <textarea 
              rows="6" 
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell us about your experience..." 
              className="w-full px-6 py-4 rounded-3xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all resize-none border border-transparent focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-8 py-4 rounded-2xl font-bold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-10 py-4 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Send Application"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ApplyModal;
