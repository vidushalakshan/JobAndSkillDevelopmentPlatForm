import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Button } from "../../common/Button";

const CreateCourseModal = ({ isOpen, onClose, onSubmit, form, setForm, loading }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center sm:p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
        <motion.form 
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 sm:rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-4xl p-10 sm:p-16 h-[100vh] sm:h-[95vh] overflow-y-auto no-scrollbar">
          
          <button type="button" onClick={onClose} className="absolute top-10 right-10 p-3 hover:bg-white/5 rounded-full transition-colors group">
            <FiX size={24} className="text-gray-500 group-hover:text-white" />
          </button>
          
          <div className="mb-12">
            <h2 className="text-5xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600 tracking-tighter">Architect Learning</h2>
            <p className="text-gray-500 font-medium tracking-wide">Synthesize your expertise into a world-class educational experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { key: "title", label: "Program Designation", placeholder: "e.g. Full-Stack Systems Design" },
              { key: "instructor", label: "Lead Architect", placeholder: "Your Name" },
              { key: "duration", label: "Project Timeline", placeholder: "e.g. 12 Weeks" },
              { key: "price", label: "Investment Protocol", placeholder: "e.g. Free / Premium" },
              { key: "thumbnail", label: "Cover Asset URL", placeholder: "Image URL (Unsplash/Direct)" },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="group">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3 ml-1">{label}</label>
                <input required={key !== "thumbnail"} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm font-medium focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all placeholder:text-gray-700" />
              </div>
            ))}
          </div>
          
          <div className="mt-8 space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3 ml-1">Curriculum Abstract</label>
              <textarea 
                required
                rows={4}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm font-medium focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all placeholder:text-gray-700 resize-none"
                placeholder="Summarize the core learning objectives..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3 ml-1">Content Repository (YouTube URL)</label>
              <input 
                value={form.videoUrl}
                onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="e.g. https://www.youtube.com/watch?v=..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm font-medium focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all placeholder:text-gray-700"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} variant="primary" size="large" className="w-full mt-12 uppercase tracking-widest">
            {loading ? "SYNCHRONIZING..." : "Initialize Program"}
          </Button>
        </motion.form>
      </div>
    </AnimatePresence>
  );
};

export default CreateCourseModal;
