import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import ApplyModal from "../components/ApplyModal";
import { 
  FiSearch, FiMapPin, FiBriefcase, FiFilter, 
  FiClock, FiDollarSign, FiChevronRight, FiCheckCircle
} from "react-icons/fi";

const JOB_CATEGORIES = [
  "All Categories", "IT Software", "IT Hardware", "IT Telecom", "Accounting",
  "Banking & Finance", "Civil Engineering", "HR & Training", "Office Admin", "Other"
];

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await instance.get("/job/approved");
        setJobs(res.data);
        if (res.data.length > 0) setSelectedJob(res.data[0]);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All Categories" || job.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [jobs, searchTerm, selectedCategory]);

  return (
    <div className="flex-1 flex flex-col w-full max-w-[1600px] mx-auto bg-[#f8fafc] dark:bg-[#0a0a14]">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none"></div>

      <AnimatePresence>
        {applyingJob && <ApplyModal job={applyingJob} onClose={() => setApplyingJob(null)} />}
      </AnimatePresence>

      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden relative z-10 p-4 gap-6">
        
        {/* Left Pane: Search & List */}
        <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%] flex flex-col h-full bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-2xl shadow-black/[0.03] overflow-hidden">
          
          {/* Search Header */}
          <div className="p-8 pb-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
            <h1 className="text-3xl font-black tracking-tight mb-6">Find Your Next Role</h1>
            
            <div className="space-y-4">
              <div className="relative group">
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by title, skill, or location..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-[#0a0a14] border border-gray-200 dark:border-white/10 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
              
              <div className="relative group">
                <FiFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-[#0a0a14] border border-gray-200 dark:border-white/10 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm appearance-none cursor-pointer"
                >
                  {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Job List Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse"></div>
              ))
            ) : filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center px-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                </div>
                <p className="font-bold text-lg text-gray-900 dark:text-white mb-1">No matches found</p>
                <p className="text-sm">Try adjusting your search terms or filters to find what you're looking for.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => setSelectedJob(job)}
                  className={`cursor-pointer p-6 rounded-[2rem] border transition-all duration-300 group ${
                    selectedJob?.id === job.id 
                      ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20 transform scale-[1.02]" 
                      : "bg-white dark:bg-[#0a0a14] border-gray-100 dark:border-white/5 hover:border-blue-500/50 hover:shadow-lg text-gray-900 dark:text-white"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-black text-lg leading-tight w-4/5">{job.title}</h3>
                    {selectedJob?.id === job.id && <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>}
                  </div>
                  <div className={`text-sm mb-4 line-clamp-2 font-medium ${selectedJob?.id === job.id ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
                    {job.description}
                  </div>
                  <div className={`flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-wider ${selectedJob?.id === job.id ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>
                    <span className="flex items-center gap-1"><FiMapPin /> {job.location}</span>
                    <span className="flex items-center gap-1"><FiBriefcase /> {job.type}</span>
                    {job.salary && <span className="flex items-center gap-1"><FiDollarSign /> {job.salary}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Pane: Job Details */}
        <div className="hidden md:flex flex-col flex-1 h-full bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-2xl shadow-black/[0.03] overflow-hidden relative">
          {selectedJob ? (
            <motion.div 
              key={selectedJob.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col h-full absolute inset-0"
            >
              {/* Job Detail Header */}
              <div className="p-10 border-b border-gray-100 dark:border-white/5 bg-gradient-to-br from-gray-50 to-white dark:from-[#0a0a14] dark:to-[#111127] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 border border-emerald-500/20">
                    <FiCheckCircle /> Actively Hiring
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                    {selectedJob.type}
                  </span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">{selectedJob.title}</h2>
                
                <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2"><FiMapPin className="w-5 h-5 text-gray-400" /> {selectedJob.location}</div>
                  {selectedJob.salary && <div className="flex items-center gap-2"><FiDollarSign className="w-5 h-5 text-gray-400" /> {selectedJob.salary}</div>}
                  {selectedJob.deadline && <div className="flex items-center gap-2"><FiClock className="w-5 h-5 text-gray-400" /> Applies until: {selectedJob.deadline}</div>}
                </div>
              </div>

              {/* Job Detail Body Scroll */}
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div> About the Role
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium whitespace-pre-wrap">
                    {selectedJob.description}
                  </p>
                </div>
                
                {/* Simulated Extra Details for realism */}
                <div className="mt-12 grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-[2rem] bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
                    <h4 className="font-black text-blue-900 dark:text-blue-400 mb-2 text-sm uppercase tracking-widest">Why Join Us?</h4>
                    <p className="text-sm font-medium text-blue-800/70 dark:text-blue-300/70 leading-relaxed">Work with cutting-edge tech in a collaborative environment that values continuous learning and innovation.</p>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-purple-50 dark:bg-purple-500/5 border border-purple-100 dark:border-purple-500/10">
                    <h4 className="font-black text-purple-900 dark:text-purple-400 mb-2 text-sm uppercase tracking-widest">Great Benefits</h4>
                    <p className="text-sm font-medium text-purple-800/70 dark:text-purple-300/70 leading-relaxed">Competitive salary, comprehensive health coverage, flexible working hours, and generous PTO.</p>
                  </div>
                </div>
              </div>

              {/* Application Footer */}
              <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#111127] flex justify-end shadow-[0_-10px_30px_rgba(0,0,0,0.02)] z-10">
                <button 
                  onClick={() => setApplyingJob(selectedJob)}
                  className="px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3 group"
                >
                  Apply for this position <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-10 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full"></div>
              <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-8 relative z-10 border border-gray-100 dark:border-white/10">
                <FiBriefcase className="w-10 h-10 text-gray-300 dark:text-gray-600" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 relative z-10">Select a position</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm relative z-10 font-medium">
                Click on any job card from the list on the left to view the full details and apply.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
