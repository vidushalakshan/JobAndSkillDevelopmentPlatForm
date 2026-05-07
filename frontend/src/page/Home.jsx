import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  BriefcaseIcon, AcademicCapIcon, RocketLaunchIcon, 
  ArrowRightIcon, MapPinIcon, SparklesIcon,
  MagnifyingGlassIcon, GlobeAltIcon, UserGroupIcon,
  CheckBadgeIcon, ChartBarIcon, ComputerDesktopIcon
} from "@heroicons/react/24/outline";
import { useUser } from "../context/context";
import { useEffect, useState, useRef } from "react";
import instance from "../service/axios";
import ApplyModal from "../components/ApplyModal";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

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
    <div className="bg-[#0b0f1a] text-slate-200 selection:bg-blue-500/30 font-sans">
      
      <section ref={targetRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>

        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-5xl w-full text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-10 shadow-lg"
          >
            <CheckBadgeIcon className="w-4 h-4" /> Global IT & Career Excellence
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-[5rem] font-extrabold tracking-tight leading-[1.05] mb-8 text-white"
          >
            Real-World <span className="text-blue-500">Skills</span> for the <br />
            Next Generation of IT.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Stop just learning. Start performing. We bridge the gap between academic theory and high-level corporate expectations with industry-led pathways.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button
              onClick={() => navigate(user ? "/courses" : "/signup")}
              className="px-8 py-4 md:px-10 md:py-5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3"
            >
              Start Learning Free <ArrowRightIcon className="w-5 h-5" />
            </button>
            {/* <button
              onClick={() => navigate("/jobs")}
              className="px-10 py-5 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl font-bold text-lg text-white hover:bg-slate-700 transition-all flex items-center gap-3"
            >
              Explore Careers
            </button> */}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Standardized Career Roadmaps</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Transition from no-experience to a specialist role using our proven framework.</p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp} className="group p-10 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
              <ComputerDesktopIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">IT Support Professional</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">The foundational step. Learn ticketing systems, AD management, and hardware troubleshooting.</p>
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckBadgeIcon className="w-4 h-4 text-emerald-500"/> Help Desk L1-L2</li>
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckBadgeIcon className="w-4 h-4 text-emerald-500"/> Office 365 Admin</li>
            </ul>
            <button className="text-blue-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
              View Path <ArrowRightIcon className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="group p-10 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-8 group-hover:scale-110 transition-transform">
              <ChartBarIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Systems Administrator</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">Advance into infrastructure. Learn server virtualization, Azure cloud, and networking.</p>
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckBadgeIcon className="w-4 h-4 text-emerald-500"/> VMware / Hyper-V</li>
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckBadgeIcon className="w-4 h-4 text-emerald-500"/> Cloud Infrastructure</li>
            </ul>
            <button className="text-indigo-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
              View Path <ArrowRightIcon className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="group p-10 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/50 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-8 group-hover:scale-110 transition-transform">
              <RocketLaunchIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Network Engineer</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">Master the connectivity. Focus on Cisco systems, security protocols, and firewalls.</p>
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckBadgeIcon className="w-4 h-4 text-emerald-500"/> Routing & Switching</li>
              <li className="flex items-center gap-2 text-sm text-slate-300"><CheckBadgeIcon className="w-4 h-4 text-emerald-500"/> Cybersecurity Basics</li>
            </ul>
            <button className="text-purple-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
              View Path <ArrowRightIcon className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 px-6 bg-[#0e1322]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Live Market</span>
              <h2 className="text-4xl font-bold text-white mt-2">Active Career Openings</h2>
            </div>
            <div className="flex gap-4">
               <button onClick={() => navigate("/jobs")} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
                Advanced Filter
               </button>
               <button onClick={() => navigate("/jobs")} className="px-6 py-3 bg-blue-600 rounded-xl text-sm font-bold flex items-center gap-2">
                 View All Careers <ArrowRightIcon className="w-4 h-4" />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length > 0 ? jobs.slice(0, 6).map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all shadow-xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-800 rounded-xl text-blue-400">
                    <BriefcaseIcon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase">Full Time</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{job.title}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-10">
                  <MapPinIcon className="w-4 h-4" /> {job.location}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-800/60">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Starting at</p>
                    <p className="font-bold text-white">{job.salary || '$55k - $80k'}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            )) : (
              [1, 2, 3].map(n => (
                <div key={n} className="h-64 rounded-3xl bg-slate-900/50 animate-pulse border border-slate-800" />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-slate-800 bg-[#0b0f1a]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
           <div>
              <h4 className="text-4xl font-black text-white mb-2">15k+</h4>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Success Stories</p>
           </div>
           <div>
              <h4 className="text-4xl font-black text-blue-500 mb-2">500+</h4>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">IT Courses</p>
           </div>
           <div>
              <h4 className="text-4xl font-black text-white mb-2">94%</h4>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Hire Rate</p>
           </div>
           <div>
              <h4 className="text-4xl font-black text-blue-500 mb-2">24/7</h4>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Lab Access</p>
           </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Home;