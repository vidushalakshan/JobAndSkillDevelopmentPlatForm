import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseIcon, RocketLaunchIcon, ArrowRightIcon, 
  MapPinIcon, ComputerDesktopIcon, ShieldCheckIcon, 
  BeakerIcon, SparklesIcon, GlobeAltIcon,
  UserGroupIcon, AcademicCapIcon, BoltIcon
} from "@heroicons/react/24/outline";
import { useUser } from "../context/context";
import instance from "../service/axios";
import ApplyModal from "../components/ApplyModal";
import { Button } from "../common/Button";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Hero Parallax Logic
  const textY = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const textOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.2], [0.6, 0]);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await instance.get("job/approved");
        setJobs(res.data);
      } catch (err) { console.error(err); }
    };
    fetchApproved();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020408] text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      {/* Top Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left" style={{ scaleX }} />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]" />
        </motion.div>

        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 max-w-5xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 backdrop-blur-md text-blue-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-10"
          >
            <SparklesIcon className="w-4 h-4" /> The Future of Career Flow
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8 text-white uppercase"
          >
            Architect Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500">Digital Destiny.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium"
          >
            Professional-grade laboratories. Direct industry pipelines. <br />
            The elite standard for IT career evolution.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-center gap-8 items-center">
            <Button variant="primary" className="!px-10 !py-5 rounded-full" onClick={() => navigate(user ? "/courses" : "/signup")}>
              Begin Journey <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* --- CORE PILLARS: BENTO GRID --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-20">
        <div className="mb-20">
          <h2 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Core Ecosystem</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Beyond Just Learning.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          <BentoCard 
            className="md:col-span-3 md:row-span-2"
            icon={<RocketLaunchIcon />}
            title="Accelerated Growth"
            desc="Our proprietary algorithm matches your skill growth with real-time market demands, ensuring you're never learning outdated tech."
            img="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
          />
          <BentoCard 
            className="md:col-span-3 md:row-span-1"
            icon={<AcademicCapIcon />}
            title="Industrial Labs"
            desc="Access to 24/7 sandbox environments mimicking Fortune 500 infrastructure."
          />
          <BentoCard 
            className="md:col-span-1.5 md:row-span-1"
            icon={<UserGroupIcon />}
            title="Expert Mentor"
          />
          <BentoCard 
            className="md:col-span-1.5 md:row-span-1"
            icon={<GlobeAltIcon />}
            title="Global Pipeline"
          />
        </div>
      </section>

      {/* --- LIVE STATS --- */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <StatItem label="Hire Rate" val="94%" />
          <StatItem label="Expert Mentors" val="150+" />
          <StatItem label="Active Learners" val="12k+" />
          <StatItem label="Industry Partners" val="500+" />
        </div>
      </section>

      {/* --- JOB PIPELINE: MAGNETIC CARDS --- */}
      <section className="py-40 px-6 relative bg-[#04060b] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
             <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-4 block">Market Flow</span>
               <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">Active <br /> <span className="text-blue-600">Opportunities.</span></h3>
             </motion.div>
             <motion.button whileHover={{ x: 5 }} onClick={() => navigate("/jobs")} className="flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-[0.3em] group hover:text-white transition-colors">
               View All Pipeline <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {jobs.length > 0 ? jobs.slice(0, 3).map((job, i) => (
              <MagneticJobCard key={job.id} job={job} index={i} setSelectedJob={setSelectedJob} />
            )) : (
              [1, 2, 3].map(n => <div key={n} className="h-[400px] rounded-[2.5rem] bg-white/[0.02] animate-pulse border border-white/5" />)
            )}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION: GLASSMORPHISM NEXT LEVEL --- */}
      <section className="py-52 px-6 relative overflow-hidden bg-[#020408]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 blur-[120px] rounded-full" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-6xl mx-auto rounded-[4rem] p-16 md:p-32 bg-white/[0.01] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden text-center group"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-14 tracking-tighter leading-none uppercase">
              Ready to become a <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">specialist?</span>
            </h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="relative overflow-hidden inline-flex items-center justify-center px-16 py-8 rounded-[2rem] bg-white text-blue-600 font-black text-xl shadow-2xl transition-all uppercase tracking-widest"
            >
              <span className="relative z-10">Join the Ecosystem</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-out_infinite]" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
    </div>
  );
};

// --- SUPPORTING COMPONENTS ---

const BentoCard = ({ className, icon, title, desc, img }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`${className} group relative rounded-[2rem] bg-white/[0.03] border border-white/5 overflow-hidden p-8 flex flex-col justify-between`}
  >
    {img && <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"><img src={img} className="w-full h-full object-cover" alt="" /></div>}
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{title}</h4>
      {desc && <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>}
    </div>
    <div className="absolute bottom-0 left-0 h-1 bg-blue-600 w-0 group-hover:w-full transition-all duration-500" />
  </motion.div>
);

const StatItem = ({ label, val }) => (
  <motion.div whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}>
    <h4 className="text-4xl md:text-5xl font-black text-white mb-2">{val}</h4>
    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">{label}</p>
  </motion.div>
);

const MagneticJobCard = ({ job, index, setSelectedJob }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group p-10 rounded-[3rem] bg-[#0d1117]/80 border border-white/5 hover:border-blue-500/40 transition-all flex flex-col justify-between h-[420px] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div>
        <div className="flex justify-between items-start mb-10">
          <div className="p-4 bg-white/5 rounded-2xl text-slate-500 group-hover:text-blue-500 transition-colors">
            <BriefcaseIcon className="w-8 h-8" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-emerald-500 uppercase">Live</span>
          </div>
        </div>
        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{job.title}</h3>
        <p className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest"><MapPinIcon className="w-4 h-4 text-blue-500" /> {job.location || 'Colombo'}</p>
      </div>
      <div className="pt-10 border-t border-white/5 flex items-center justify-between relative z-10">
        <span className="text-xl font-black text-white">{job.salary || "LKR 75k+"}</span>
        <button onClick={() => setSelectedJob(job)} className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl">Analyze</button>
      </div>
    </motion.div>
  );
};

export default Home;