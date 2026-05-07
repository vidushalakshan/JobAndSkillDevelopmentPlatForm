import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  BriefcaseIcon, AcademicCapIcon, RocketLaunchIcon, 
  ArrowRightIcon, MapPinIcon, SparklesIcon,
  MagnifyingGlassIcon, GlobeAltIcon, UserGroupIcon
} from "@heroicons/react/24/outline";
import { useUser } from "../context/context";
import { useEffect, useState, useRef } from "react";
import instance from "../service/axios";
import ApplyModal from "../components/ApplyModal";

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

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

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
    <div className="bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans">
      
      <section ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
  
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/15 blur-[100px] rounded-full animate-pulse delay-1000" />
        </div>

        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-6xl w-full text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <SparklesIcon className="w-4 h-4" /> Trusted by 500+ Companies
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[5.5rem] font-black tracking-tight leading-[1.1] mb-8 text-white"
          >
            Forge Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Professional Identity</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium"
          >
            The ecosystem for the modern workforce. Master in-demand skills, connect with industry giants, and secure your legacy in the digital age.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-5"
          >
            <button
              onClick={() => navigate(user ? "/my-jobs" : "/signup")}
              className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl shadow-blue-500/10 flex items-center gap-3"
            >
              Get Started <ArrowRightIcon className="w-5 h-5" />
            </button>
            <div className="p-[1px] rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-blue-500 hover:to-indigo-500 transition-all duration-500">
              <button
                onClick={() => navigate("/jobs")}
                className="px-8 py-4 bg-slate-950 rounded-2xl font-bold text-lg text-white w-full h-full flex items-center gap-3"
              >
                Browse Careers <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <GlobeAltIcon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Skill Intelligence Platform</h3>
              <p className="text-slate-400 text-lg max-w-md">Our AI matches your unique DNA with the most prestigious roles globally. Not just a job board, but a career architect.</p>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 bg-blue-600/10 blur-3xl rounded-full transition-all group-hover:bg-blue-600/20" />
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-10 rounded-[2.5rem] bg-indigo-950/30 border border-indigo-900/50 flex flex-col justify-between"
          >
             <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <UserGroupIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Mentor Network</h3>
                <p className="text-slate-400 text-sm">Direct access to 1:1 sessions with industry leaders from FAANG and Fortune 500.</p>
              </div>
          </motion.div>

          <motion.div 
             whileHover={{ y: -5 }}
             className="p-10 rounded-[2.5rem] bg-emerald-950/20 border border-emerald-900/30 flex flex-col justify-between"
          >
             <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <AcademicCapIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Verified Credentials</h3>
                <p className="text-slate-400 text-sm">Earn blockchain-backed certificates that are recognized by top HR departments.</p>
              </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden shadow-2xl shadow-blue-600/20"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-black mb-2">92%</h3>
                <p className="text-blue-100 font-bold uppercase tracking-wider text-xs">Placement Success Rate</p>
              </div>
              <div className="h-px w-full md:h-12 md:w-px bg-white/20" />
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-black mb-2">140K+</h3>
                <p className="text-blue-100 font-bold uppercase tracking-wider text-xs">Active Learners</p>
              </div>
              <div className="h-px w-full md:h-12 md:w-px bg-white/20" />
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-black mb-2">$85k</h3>
                <p className="text-blue-100 font-bold uppercase tracking-wider text-xs">Avg. Starting Salary</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#03081a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-white mb-4">Elite Opportunities</h2>
              <p className="text-slate-400">Curated positions for high-performance talent.</p>
            </div>
            <button onClick={() => navigate("/jobs")} className="hidden md:flex items-center gap-2 text-blue-400 font-bold hover:text-white transition-colors">
              View All <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length > 0 ? jobs.slice(0, 6).map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/60 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="p-3 bg-slate-800 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-500">
                    <BriefcaseIcon className="w-6 h-6" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-tighter">Verified</div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{job.title}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-10">
                  <MapPinIcon className="w-4 h-4" /> {job.location}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-800/60">
                  <div className="font-bold text-white text-lg">{job.salary || 'Executive'}</div>
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center text-slate-600 animate-pulse uppercase tracking-[0.3em] text-xs font-black">
                Syncing Market Data...
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-900 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="text-2xl font-black text-white mb-6">JOB<span className="text-blue-500">SKILL</span></div>
              <p className="text-slate-400 max-w-sm mb-6">The future of talent is decentralized and skill-first. We are building the infrastructure for the next billion careers.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Resources</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition">Job Board</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Skill Courses</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Career Roadmaps</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">© 2026 JobSkill Platform. All rights reserved.</p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">Built with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="text-red-500">❤</motion.span> for the future.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Home;