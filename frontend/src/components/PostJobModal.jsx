import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import { toast } from "react-toastify";
import {
  FiX, FiBriefcase, FiMapPin, FiDollarSign,
  FiCalendar, FiMail, FiLayers, FiChevronRight,
  FiChevronLeft, FiCheckCircle
} from "react-icons/fi";
import { Button } from "../common/Button";

const JOB_CATEGORIES = [
  "IT Software", "IT Hardware", "IT Telecom", "Accounting",
  "Banking & Finance", "Civil Engineering", "HR & Training", "Office Admin", "Other"
];

const PostJobModal = ({ onClose, onCreated }) => {
  const [step, setStep] = useState(1);
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
      toast.success("Opportunity broadcasted to the network.");
      if (onCreated) onCreated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { type: "spring", damping: 20, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  };

  const stepVariants = {
    initial: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -50 : 50, opacity: 0 })
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#020205]/95 backdrop-blur-2xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-[#08080a] border border-white/10 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-3xl overflow-y-auto max-h-[90vh] no-scrollbar"
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-600 animate-pulse" />

        <button
          onClick={onClose}
          className="absolute top-10 right-10 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all group z-50"
        >
          <FiX size={20} className="text-slate-400 group-hover:text-white group-hover:rotate-90 transition-transform" />
        </button>

        <div className="p-10 sm:p-16">
          <div className="flex items-center gap-3 mb-12">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-blue-500' : 'w-6 bg-white/10'}`}
              />
            ))}
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Phase 0{step}</span>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait" custom={step}>
              {step === 1 ? (
                <motion.div
                  key="step1"
                  custom={1}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-10"
                >
                  <header>
                    <h2 className="text-5xl font-black text-white tracking-tighter mb-4">Core <span className="text-blue-500 italic">Identity.</span></h2>
                    <p className="text-slate-500 font-medium">Define the primary parameters of this professional engagement.</p>
                  </header>

                  <div className="space-y-8">
                    <InputField
                      label="Requirement Title"
                      icon={FiBriefcase}
                      value={form.title}
                      onChange={handleChange("title")}
                      placeholder="e.g. Senior Cloud Architect"
                    />
                    <div className="group">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Context & Scope</label>
                      <textarea
                        required
                        rows={5}
                        value={form.description}
                        onChange={handleChange("description")}
                        placeholder="Detail the technical stack and expectations..."
                        className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-8 py-6 text-sm font-medium focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-700 resize-none text-slate-400 focus:text-white"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    variant="primary"
                    size="medium"
                  >
                    Proceed to Details <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  custom={1}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-10"
                >
                  <header>
                    <h2 className="text-5xl font-black text-white tracking-tighter mb-4">Final <span className="text-blue-500 italic">Metrics.</span></h2>
                    <p className="text-slate-500 font-medium">Logistics, compensation, and submission deadlines.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Geography" icon={FiMapPin} value={form.location} onChange={handleChange("location")} placeholder="Remote / Global" />
                    <InputField label="Compensation" icon={FiDollarSign} value={form.salary} onChange={handleChange("salary")} placeholder="Fixed or Range" />

                    <div className="group">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 ml-1">Industry</label>
                      <div className="relative">
                        <FiLayers className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500" />
                        <select
                          value={form.type}
                          onChange={handleChange("type")}
                          className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] pl-16 pr-8 py-5 text-sm font-bold focus:border-blue-500/50 outline-none transition-all appearance-none cursor-pointer text-slate-400 focus:text-white"
                        >
                          {JOB_CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0a0a0a] text-white">{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <InputField label="Deadline" icon={FiCalendar} type="date" value={form.deadline} onChange={handleChange("deadline")} />
                  </div>

                  <InputField label="Direct Liaison" icon={FiMail} type="email" value={form.contactEmail} onChange={handleChange("contactEmail")} placeholder="lead@company.com" />

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="p-3 rounded-[2.5rem] bg-white/5 text-slate-400 hover:text-white transition-all border border-white/5"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <Button
                      type="submit"
                      disabled={loading}
                      variant="primary"
                      size="medium"
                    >
                      {loading ? "Processing..." : "Finalize Posting"}
                      <FiCheckCircle />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="group relative">
    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 ml-1 group-focus-within:text-blue-500 transition-colors">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
      <input
        required
        {...props}
        className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] pl-16 pr-8 py-5 text-sm font-bold focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-700 text-slate-400 focus:text-white"
      />
    </div>
  </div>
);

export default PostJobModal;