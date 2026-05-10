import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseIcon, RocketLaunchIcon, ArrowRightIcon, 
  MapPinIcon, ComputerDesktopIcon, ShieldCheckIcon, 
  BeakerIcon, SparklesIcon, ChartBarIcon, GlobeAltIcon,
  UserGroupIcon, AcademicCapIcon
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
    <div ref={containerRef} className="bg-[#020408] text-slate-200 selection:bg-blue-500/30 font-sans">
      
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
          {/* Main Large Card */}
          <BentoCard 
            className="md:col-span-3 md:row-span-2"
            icon={<RocketLaunchIcon />}
            title="Accelerated Growth"
            desc="Our proprietary algorithm matches your skill growth with real-time market demands, ensuring you're never learning outdated tech."
            img="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
          />
          {/* Medium Card */}
          <BentoCard 
            className="md:col-span-3 md:row-span-1"
            icon={<AcademicCapIcon />}
            title="Industrial Labs"
            desc="Access to 24/7 sandbox environments mimicking Fortune 500 infrastructure."
          />
          {/* Small Cards */}
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

      {/* --- LIVE STATS: SCROLL REVEAL --- */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <StatItem label="Hire Rate" val="94%" />
          <StatItem label="Expert Mentors" val="150+" />
          <StatItem label="Active Learners" val="12k+" />
          <StatItem label="Industry Partners" val="500+" />
        </div>
      </section>

      {/* --- JOB PIPELINE: MODERN CARDS --- */}
      <section className="py-32 px-6 bg-[#04060b]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
             <div>
               <h2 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Market Flow</h2>
               <h3 className="text-4xl font-black text-white tracking-tighter uppercase">Active Opportunities.</h3>
             </div>
             <button onClick={() => navigate("/jobs")} className="group flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest mt-8">
               View All <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jobs.length > 0 ? jobs.slice(0, 3).map((job, i) => (
              <JobCard key={job.id} job={job} index={i} setSelectedJob={setSelectedJob} />
            )) : <div className="col-span-3 h-64 border border-white/5 rounded-3xl animate-pulse bg-white/5" />}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-40 px-6">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }}
          className="max-w-5xl mx-auto p-12 md:p-24 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-900 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 relative z-10 leading-tight uppercase tracking-tighter">
            Ready to become a <br /> specialist?
          </h2>
          <Button variant="secondary" className="!bg-white !text-blue-600 !px-12 !py-6 !text-lg !rounded-full relative z-10 hover:scale-105 transition-transform" onClick={() => navigate("/signup")}>
            Join the Ecosystem
          </Button>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
    </div>
  );
};

const BentoCard = ({ className, icon, title, desc, img }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`${className} group relative rounded-[2rem] bg-white/[0.03] border border-white/5 overflow-hidden p-8 flex flex-col justify-between`}
  >
    {img && <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"><img src={img} className="w-full h-full object-cover" /></div>}
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

const JobCard = ({ job, index, setSelectedJob }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
    className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col justify-between h-[340px] hover:bg-white/[0.04] transition-all group"
  >
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-blue-500/5 rounded-xl border border-white/5"><BriefcaseIcon className="w-5 h-5 text-slate-500" /></div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Live</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight group-hover:text-blue-400 transition-colors">{job.title}</h3>
      <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
        <MapPinIcon className="w-3 h-3" /> {job.location}
      </div>
    </div>
    <div className="flex items-center justify-between pt-6 border-t border-white/5">
      <span className="text-sm font-black text-white uppercase tracking-tighter">{job.salary || "$70,000+"}</span>
      <button onClick={() => setSelectedJob(job)} className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Details</button>
    </div>
  </motion.div>
);

export default Home;