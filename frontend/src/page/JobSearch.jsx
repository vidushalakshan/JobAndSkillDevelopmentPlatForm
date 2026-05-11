import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import instance from "../service/axios";
import { 
  FiSearch, FiMapPin, FiBriefcase, FiFilter, 
  FiClock, FiDollarSign, FiChevronRight, FiCheckCircle, FiCompass, FiZap
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
  const scrollParentRef = useRef(null);

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
                            job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All Categories" || job.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [jobs, searchTerm, selectedCategory]);

  return (
    <div className="h-screen bg-[#050505] text-slate-200 overflow-hidden flex flex-col font-sans">
  
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>


      <main className="flex-1 flex overflow-hidden relative z-10 p-4 gap-4">
        
        <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl mt-[100px]">

          <div className="p-6 space-y-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                <FiCompass className="text-blue-500" /> Discover
              </h1>
              <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md uppercase tracking-tighter">
                {filteredJobs.length} Roles Found
              </span>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Role, skill or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-slate-600 font-medium"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {JOB_CATEGORIES.slice(0, 5).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                      selectedCategory === cat 
                      ? "bg-white text-black border-white" 
                      : "bg-white/5 text-slate-400 border-white/5 hover:border-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar" ref={scrollParentRef}>
            <LayoutGroup>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-28 bg-white/5 rounded-2xl animate-pulse" />
                ))
              ) : (
                filteredJobs.map((job) => (
                  <motion.div
                    layout
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ x: 4 }}
                    className={`relative cursor-pointer p-5 rounded-2xl transition-all border ${
                      selectedJob?.id === job.id 
                      ? "bg-white/[0.07] border-white/20 shadow-lg shadow-black" 
                      : "bg-transparent border-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    {selectedJob?.id === job.id && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute left-0 top-1/4 w-1 h-1/2 bg-blue-500 rounded-full" 
                      />
                    )}
                    <h3 className={`font-bold text-base mb-1 ${selectedJob?.id === job.id ? "text-white" : "text-slate-300"}`}>
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-4 font-medium">{job.location} • {job.type}</p>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {job.salary || 'Executive'}
                       </span>
                       <FiChevronRight className={`transition-transform ${selectedJob?.id === job.id ? "translate-x-1 text-blue-500" : "text-slate-700"}`} />
                    </div>
                  </motion.div>
                ))
              )}
            </LayoutGroup>
          </div>
        </div>

        <div className="hidden md:flex flex-1 flex-col bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden relative shadow-2xl">
          <AnimatePresence mode="wait">
            {selectedJob ? (
              <motion.div
                key={selectedJob.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col h-full"
              >

                <div className="h-32 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                  <div className="absolute -bottom-10 left-10 p-4 bg-[#111] border border-white/10 rounded-2xl shadow-2xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                      <FiZap size={24} />
                    </div>
                  </div>
                </div>

                <div className="pt-16 px-10 pb-10 flex-1 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                          <FiCheckCircle /> Verified Listing
                        </span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{selectedJob.type}</span>
                      </div>
                      <h2 className="text-4xl font-black text-white tracking-tighter">{selectedJob.title}</h2>
                    </div>
                    
                    {selectedJob.contactEmail ? (
                      <a 
                        href={`mailto:${selectedJob.contactEmail}?subject=Application for ${selectedJob.title}`}
                        className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5 flex items-center gap-2"
                      >
                        Apply Job
                      </a>
                    ) : (
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg">
                        Contact Info Not Provided
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                      { icon: <FiMapPin />, label: "Location", val: selectedJob.location },
                      { icon: <FiDollarSign />, label: "Compensation", val: selectedJob.salary || 'Market Rate' },
                      { icon: <FiBriefcase />, label: "Category", val: selectedJob.type },
                      { icon: <FiClock />, label: "Posted", val: "2 days ago" },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <div className="text-slate-500 mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                          {stat.icon} {stat.label}
                        </div>
                        <div className="text-sm font-bold text-slate-200">{stat.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-8 max-w-3xl">
                    <section>
                      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-4">Job Description</h4>
                      <p className="text-slate-400 leading-relaxed font-medium text-base whitespace-pre-wrap">
                        {selectedJob.description}
                      </p>
                    </section>

                    <section className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-[2rem]">
                      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-blue-400 mb-3">Application Requirements</h4>
                      <ul className="space-y-2 text-sm text-slate-400 font-medium list-disc list-inside">
                        <li>Relevant professional experience in the field</li>
                        <li>Updated portfolio or CV matching the role description</li>
                        <li>Ability to work within the specified location/timezone</li>
                      </ul>
                    </section>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <FiBriefcase size={32} />
                </div>
                <h2 className="text-xl font-bold">Select a role to preview</h2>
                <p className="text-sm max-w-[200px] mx-auto mt-2 text-slate-500">Pick a position from the left panel to see full details.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default JobSearch;