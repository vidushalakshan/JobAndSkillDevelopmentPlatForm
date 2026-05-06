import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Removed legacy links import
import { BriefcaseIcon, AcademicCapIcon, RocketLaunchIcon, ArrowRightIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/context";
import { useEffect, useState } from "react";
import instance from "../service/axios";
import { AnimatePresence } from "framer-motion";
import ApplyModal from "../components/ApplyModal";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await instance.get("job/approved");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApproved();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/hero.png"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Elevate Your Career with Skill Development
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Connect with top employers and master the skills needed for tomorrow's job market. Your journey to excellence starts here.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            {!user ? (
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Get Started <ArrowRightIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => navigate(user.role === 'ADMIN' ? '/admin' : '/my-jobs')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Go to {user.role === 'ADMIN' ? 'Admin Console' : 'My Activity'} <ArrowRightIcon className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => navigate("/jobs")}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg transition-all"
            >
              Explore Jobs
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Jobs", value: "10K+", icon: <BriefcaseIcon className="w-6 h-6 text-blue-500" /> },
            { label: "Top Trainers", value: "500+", icon: <AcademicCapIcon className="w-6 h-6 text-green-500" /> },
            { label: "Success Stories", value: "25K+", icon: <RocketLaunchIcon className="w-6 h-6 text-purple-500" /> },
            { label: "Skills Covered", value: "100+", icon: <AcademicCapIcon className="w-6 h-6 text-orange-500" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-white dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Featured Opportunities</h2>
              <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
            </div>
            <button 
              onClick={() => navigate("/jobs")}
              className="text-blue-500 font-bold hover:underline flex items-center gap-1"
            >
              View all opportunities <ArrowRightIcon className="w-4 h-4" />
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
                className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 hover:shadow-2xl transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl">
                    <BriefcaseIcon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full">New</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">{job.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <MapPinIcon className="w-4 h-4" /> {job.location}
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-white/10">
                  <div className="font-bold text-blue-500">{job.salary || 'Competitive'}</div>
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-xl hover:scale-105 transition-transform"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-20 text-gray-400 italic">
                Scanning for new opportunities...
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedJob && (
          <ApplyModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
          />
        )}
      </AnimatePresence>

      {/* Post a Job CTA */}
      <section className="py-24 bg-white dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-900 p-12 md:p-20 text-center text-white shadow-2xl">
            {/* Background Orbs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 max-w-2xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Looking to hire top talent?</h2>
              <p className="text-lg md:text-xl text-blue-100 mb-10 font-medium">
                Join thousands of employers and reach the best candidates for your team. Post your job today and find the perfect match.
              </p>
              <button 
                onClick={() => navigate(user ? "/my-jobs" : "/login")}
                className="px-10 py-5 bg-white text-blue-600 rounded-full font-black text-xl shadow-2xl hover:scale-105 transition-transform"
              >
                Post a Job Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-20 bg-gray-50 dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Explore by Industry</h2>
            <p className="text-gray-600 dark:text-gray-400">Choose from a wide range of industries and start your growth.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "IT Software", "IT Hardware", "Accounting", "Banking & Finance",
              "Civil Engineering", "HR & Training", "Office Admin", "IT Telecom"
            ].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate("/jobs")}
                className="cursor-pointer group relative overflow-hidden rounded-3xl h-64 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg p-8 flex flex-col justify-end"
              >
                <div className="absolute top-8 left-8 p-3 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <BriefcaseIcon className="w-6 h-6" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                    {category}
                  </h3>
                  <div className="w-0 group-hover:w-12 h-1 bg-blue-500 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-6">JobSkill Platform</div>
          <div className="flex justify-center gap-8 mb-8 text-gray-500 dark:text-gray-400">
            <a href="/jobs" className="hover:text-blue-500 transition">Find Jobs</a>
            <a href="/courses" className="hover:text-blue-500 transition">Courses</a>
            <a href="#" className="hover:text-blue-500 transition">About Us</a>
            <a href="#" className="hover:text-blue-500 transition">Privacy Policy</a>
          </div>
          <p className="text-gray-400 text-sm">© 2026 JobSkill Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
