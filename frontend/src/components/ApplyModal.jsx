import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import { toast } from "react-toastify";
import { 
  FiSend, FiX, FiInfo, FiMapPin, FiBriefcase, FiAlertCircle 
} from "react-icons/fi";

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
      toast.success("Application dispatched successfully!");
      onClose();
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: -10 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          rotateX: 0,
          transition: { type: "spring", damping: 25, stiffness: 300 } 
        }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0b0f1a] rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] w-full max-w-xl relative z-10 border border-white/10 overflow-y-auto max-h-[90vh] no-scrollbar"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

        <div className="p-8 sm:p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                <FiInfo /> Official Application
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
                Apply for <span className="text-blue-500">{job.title}</span>
              </h2>
              <div className="flex items-center gap-4 mt-3 text-slate-500 text-sm font-medium">
                <span className="flex items-center gap-1.5"><FiMapPin /> {job.location}</span>
                <span className="flex items-center gap-1.5"><FiBriefcase /> {job.type || 'Full-time'}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative">
              <div className="flex justify-between items-end mb-3 px-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  Personal Pitch
                </label>
                <span className="text-[10px] text-slate-600 font-bold">
                  {coverLetter.length} / 2000
                </span>
              </div>
              
              <textarea 
                rows="6" 
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Briefly describe your expertise and why you're interested..." 
                className="w-full px-6 py-5 rounded-[1.5rem] bg-white/5 text-white border border-white/5 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all resize-none placeholder:text-slate-600 leading-relaxed font-medium"
                required
              />

              <div className="mt-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                <FiAlertCircle className="text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  <strong className="text-blue-400 uppercase">Tip:</strong> Mention specific technical achievements or certifications that align with this role's requirements.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
              <button 
                type="button" 
                onClick={onClose} 
                className="order-2 sm:order-1 px-8 py-4 rounded-2xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm uppercase tracking-widest"
              >
                Discard
              </button>
              <button 
                type="submit" 
                disabled={loading || !coverLetter.trim()}
                className="order-1 sm:order-2 relative group px-10 py-4 rounded-2xl font-black bg-white text-slate-950 shadow-[0_20px_40px_-12px_rgba(255,255,255,0.2)] hover:shadow-blue-500/40 hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 uppercase tracking-widest text-sm">
                  {loading ? "Transmitting..." : "Send Application"}
                </span>
                {!loading && <FiSend className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplyModal;