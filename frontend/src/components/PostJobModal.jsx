import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import { toast } from "react-toastify";
import { FiX, FiBriefcase, FiMapPin, FiDollarSign, FiCalendar, FiMail, FiLayers } from "react-icons/fi";

const JOB_CATEGORIES = [
  "IT Software", "IT Hardware", "IT Telecom", "Accounting",
  "Banking & Finance", "Civil Engineering", "HR & Training", "Office Admin", "Other"
];

const PostJobModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    title: "", description: "", location: "",
    type: "IT Software", salary: "", deadline: "",
    contactEmail: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await instance.post("/job/create", form);
      toast.success("Engagement request submitted successfully.");
      if (onCreated) onCreated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Internal submission error.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose} 
          className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="relative bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl w-full max-w-2xl p-12 overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />
          
          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full transition-colors group"
          >
            <FiX size={24} className="text-gray-500 group-hover:text-white" />
          </button>
          
          <div className="mb-10">
            <h2 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 tracking-tighter">
              Define Requirement
            </h2>
            <p className="text-gray-500 font-medium tracking-wide text-sm">
              Publish your professional opportunity to our elite talent pool.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Title Input */}
              <div className="relative group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 ml-1">Opportunity Title</label>
                <div className="relative">
                  <FiBriefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required 
                    value={form.title} 
                    onChange={handleChange("title")} 
                    placeholder="e.g. Lead System Architect"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-gray-700" 
                  />
                </div>
              </div>

              {/* Description Textarea */}
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 ml-1">Scope & Responsibilities</label>
                <textarea 
                  required 
                  rows={4} 
                  value={form.description} 
                  onChange={handleChange("description")} 
                  placeholder="Describe the technical requirements and project goals..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-gray-700 resize-none" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 ml-1">Location</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      required 
                      value={form.location} 
                      onChange={handleChange("location")} 
                      placeholder="e.g. Remote / Colombo"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-gray-700" 
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 ml-1">Compensation Range</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      value={form.salary} 
                      onChange={handleChange("salary")} 
                      placeholder="e.g. $120k - $150k"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-gray-700" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 ml-1">Industry Vertical</label>
                  <div className="relative">
                    <FiLayers className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                    <select 
                      value={form.type} 
                      onChange={handleChange("type")}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                    >
                      {JOB_CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 ml-1">Submission Deadline</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      type="date" 
                      required 
                      value={form.deadline} 
                      onChange={handleChange("deadline")}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:border-blue-500 outline-none transition-all text-gray-300" 
                    />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 ml-1">Direct Contact Email</label>
                <div className="relative">
                  <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    required 
                    type="email" 
                    value={form.contactEmail} 
                    onChange={handleChange("contactEmail")} 
                    placeholder="employer@corporate.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:border-blue-500 outline-none transition-all placeholder:text-gray-700" 
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-5 rounded-[2rem] bg-white/5 border border-white/10 text-gray-500 font-black text-sm hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 py-5 rounded-[2rem] bg-white text-black font-black text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-gray-200 active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? "Processing..." : "Publish Requirement"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PostJobModal;
