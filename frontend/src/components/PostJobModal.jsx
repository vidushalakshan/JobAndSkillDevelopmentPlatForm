import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import { toast } from "react-toastify";

const JOB_CATEGORIES = [
  "IT Software", "IT Hardware", "IT Telecom", "Accounting",
  "Banking & Finance", "Civil Engineering", "HR & Training", "Office Admin", "Other"
];

const PostJobModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    title: "", description: "", location: "",
    type: "IT Software", salary: "", deadline: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await instance.post("/job/create", form);
      toast.success("Job submitted! It will appear after admin approval.");
      if (onCreated) onCreated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit job.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <motion.div initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          className="relative z-10 bg-white dark:bg-[#111127] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl w-full max-w-lg p-8">

          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Post a Job</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Your job will be reviewed by the admin before going live.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Job Title *</label>
              <input required value={form.title} onChange={handleChange("title")} placeholder="e.g. Senior React Developer"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description *</label>
              <textarea required rows={3} value={form.description} onChange={handleChange("description")} placeholder="Describe the role, responsibilities..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Location *</label>
                <input required value={form.location} onChange={handleChange("location")} placeholder="e.g. Colombo"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Salary</label>
                <input value={form.salary} onChange={handleChange("salary")} placeholder="e.g. LKR 80,000"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Category *</label>
                <select value={form.type} onChange={handleChange("type")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1a35] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition">
                  {JOB_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Deadline *</label>
                <input type="date" required value={form.deadline} onChange={handleChange("deadline")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition">
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 transition disabled:opacity-50">
                {loading ? "Submitting..." : "Submit for Approval"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PostJobModal;
