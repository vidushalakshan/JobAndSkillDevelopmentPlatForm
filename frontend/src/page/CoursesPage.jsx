import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import { useUser } from "../context/context";
import { toast } from "react-toastify";
import {
  FiBook, FiSearch, FiClock, FiUsers,
  FiStar, FiChevronRight, FiPlus, FiBarChart2, FiX, FiLayers
} from "react-icons/fi";

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const CATEGORIES = [
  "All Categories", "IT Software", "IT Hardware", "Accounting",
  "Banking & Finance", "Civil Engineering", "HR & Training", "Business", "Design", "Other"
];

const LEVEL_THEME = {
  Beginner: "from-emerald-400 to-teal-500",
  Intermediate: "from-amber-400 to-orange-500",
  Advanced: "from-rose-400 to-red-600",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const CoursesPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [enrolling, setEnrolling] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ 
    title: "", description: "", category: "IT Software", 
    level: "Beginner", duration: "", price: "Free", instructor: "", syllabus: "" 
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await instance.get("/courses/published");
        setCourses(res.data);
      } catch (err) {
        toast.error("Failed to sync library.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = useMemo(() => courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.instructor || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All Categories" || c.category === selectedCategory;
    const matchLevel = selectedLevel === "All Levels" || c.level === selectedLevel;
    return matchSearch && matchCat && matchLevel;
  }), [courses, search, selectedCategory, selectedLevel]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
      
     
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

     
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl w-full max-w-3xl p-12 max-h-[85vh] overflow-y-auto no-scrollbar">
              <button onClick={() => setShowCreateModal(false)} className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full transition-colors">
                <FiX size={24} className="text-gray-500 hover:text-white" />
              </button>
              
              <h2 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Curate Excellence</h2>
              <p className="text-gray-500 mb-10 font-medium tracking-wide">Enter the details of your masterclass.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "title", label: "Program Title", placeholder: "e.g. Architectural Design Systems" },
                  { key: "instructor", label: "Curator Name", placeholder: "Your Name" },
                  { key: "duration", label: "Timeline", placeholder: "e.g. 12 Weeks" },
                  { key: "price", label: "Investment", placeholder: "e.g. Free or $99" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">{label}</label>
                    <input value={createForm[key]} onChange={e => setCreateForm({ ...createForm, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium focus:border-blue-500 outline-none transition-all" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-5 rounded-[2rem] bg-white text-black font-black text-lg hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Submit for Curation
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        
        
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4">The Skill Repository</h4>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
              Elevate Your <br /> Expertise.
            </h1>
            <p className="text-lg text-gray-400 max-w-xl font-medium leading-relaxed">
              Access an exclusive library of courses designed for the next generation of global leaders and innovators.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            {user && (
              <button onClick={() => setShowCreateModal(true)}
                className="group flex items-center gap-4 px-10 py-5 bg-white text-black font-black rounded-full shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all">
                <FiPlus className="w-6 h-6" /> Curate Program
              </button>
            )}
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { label: "Elite Courses", value: courses.length, icon: FiLayers, color: "text-blue-500" },
            { label: "Active Learners", value: courses.reduce((a, c) => a + (c.enrollmentCount || 0), 0), icon: FiUsers, color: "text-purple-500" },
            { label: "Specializations", value: CATEGORIES.length - 1, icon: FiBarChart2, color: "text-indigo-500" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              className="group bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] border border-white/5 p-8 hover:border-white/20 transition-all">
              <s.icon className={`w-6 h-6 ${s.color} mb-6`} />
              <div className="text-5xl font-black tracking-tighter mb-2">{s.value}</div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input type="text" placeholder="Search Masterclasses..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-5 rounded-3xl bg-white/[0.03] border border-white/10 text-sm font-bold focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" />
          </div>
          <div className="flex gap-3">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
              className="px-8 py-5 rounded-3xl bg-white/[0.03] border border-white/10 text-xs font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-white/5 transition-all">
              {CATEGORIES.map(c => <option key={c} className="bg-[#0a0a0a]">{c}</option>)}
            </select>
            <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}
              className="px-8 py-5 rounded-3xl bg-white/[0.03] border border-white/10 text-xs font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-white/5 transition-all">
              {LEVELS.map(l => <option key={l} className="bg-[#0a0a0a]">{l}</option>)}
            </select>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((course) => (
            <motion.div key={course.id} variants={itemVariants}
              className="group relative bg-white/[0.03] backdrop-blur-xl rounded-[3rem] border border-white/5 overflow-hidden hover:border-white/20 transition-all">
              
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${LEVEL_THEME[course.level] || LEVEL_THEME.Beginner} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="p-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10 bg-white/5`}>
                    {course.level || "Beginner"}
                  </span>
                  <span className="text-xs font-bold text-blue-400">
                    {course.price || "Free"}
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-blue-400 transition-colors">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-8 line-clamp-3 leading-relaxed font-medium">
                  {course.description}
                </p>

                <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-6">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><FiStar className="text-yellow-500"/> {course.instructor || "Expert"}</span>
                    <span className="flex items-center gap-2"><FiClock/> {course.duration || "Self-paced"}</span>
                  </div>
                  
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="w-full py-5 rounded-[2rem] bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    {enrolling === course.id ? "Syncing..." : "Access Program"}
                    <FiChevronRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {!loading && filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center">
            <FiBook className="w-16 h-16 text-gray-800 mx-auto mb-6" />
            <h3 className="text-3xl font-black text-gray-600">No programs found</h3>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;