import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import { useUser } from "../context/context";
import { toast } from "react-toastify";
import { Button } from "../common/Button";
import {
  FiBook, FiSearch, FiClock, FiUsers,
  FiStar, FiChevronRight, FiPlus, FiBarChart2, FiX, FiLayers, FiZap, FiTarget,
  FiEdit3, FiUser, FiDollarSign, FiYoutube, FiFileText, FiAward
} from "react-icons/fi";

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const CATEGORIES = [
  "All Categories", "IT Software", "IT Hardware", "Accounting",
  "Banking & Finance", "Civil Engineering", "HR & Training", "Business", "Design", "Other"
];

const LEVEL_COLORS = {
  Beginner: "text-emerald-400 bg-emerald-400/10",
  Intermediate: "text-amber-400 bg-amber-400/10",
  Advanced: "text-rose-400 bg-rose-400/10",
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
    level: "Beginner", duration: "", price: "Free", instructor: "", syllabus: "",
    videoUrl: "" 
  });
  const [enrolledIds, setEnrolledIds] = useState(new Set());

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [res, enrolledRes] = await Promise.allSettled([
          instance.get("/courses/published"),
          user ? instance.get("/courses/enrolled") : Promise.resolve({ data: [] })
        ]);
        
        if (res.status === "fulfilled") setCourses(res.value.data);
        if (enrolledRes.status === "fulfilled") {
          setEnrolledIds(new Set(enrolledRes.value.data.map(e => e.course.id)));
        }
      } catch (err) {
        toast.error("Network synchronization failed.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  const handleEnroll = async (id) => {
    if (!user) return navigate("/login");
    if (enrolledIds.has(id)) return navigate(`/course/${id}/viewer`);
    
    setEnrolling(id);
    try {
      await instance.post(`/courses/${id}/enroll`);
      setEnrolledIds(prev => new Set([...prev, id]));
      // Direct jump to Viewer for immediate access
      navigate(`/course/${id}/viewer`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Protocol error.");
    } finally {
      setEnrolling(false);
    }
  };

  const filtered = useMemo(() => courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.instructor || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All Categories" || c.category === selectedCategory;
    const matchLevel = selectedLevel === "All Levels" || c.level === selectedLevel;
    return matchSearch && matchCat && matchLevel;
  }), [courses, search, selectedCategory, selectedLevel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await instance.post("/courses", createForm);
      toast.success("Project blueprint submitted for review.");
      setShowCreateModal(false);
      // Refresh list
      const res = await instance.get("/courses/published");
      setCourses(res.data);
    } catch (err) {
      toast.error("Protocol initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#050508] text-slate-200 selection:bg-blue-500/30 overflow-hidden font-sans flex flex-col">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/5 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/5 blur-[180px] rounded-full" />
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)} className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 sm:rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-4xl p-10 sm:p-16 h-[100vh] sm:h-[95vh] overflow-y-auto no-scrollbar">
              
              <button type="button" onClick={() => setShowCreateModal(false)} className="absolute top-10 right-10 p-3 hover:bg-white/5 rounded-full transition-colors group">
                <FiX size={24} className="text-gray-500 group-hover:text-white" />
              </button>
              
              <div className="mb-12">
                <h2 className="text-5xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600 tracking-tighter">Architect Learning</h2>
                <p className="text-gray-500 font-medium tracking-wide">Synthesize your expertise into a world-class educational experience.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { key: "title", label: "Program Designation", placeholder: "e.g. Full-Stack Systems Design" },
                  { key: "instructor", label: "Lead Architect", placeholder: "Your Name" },
                  { key: "duration", label: "Project Timeline", placeholder: "e.g. 12 Weeks" },
                  { key: "price", label: "Investment Protocol", placeholder: "e.g. Free / Premium" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3 ml-1">{label}</label>
                    <input required value={createForm[key]} onChange={e => setCreateForm({ ...createForm, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm font-medium focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all placeholder:text-gray-700" />
                  </div>
                ))}
              </div>
              
              <div className="mt-8 space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3 ml-1">Curriculum Abstract</label>
                  <textarea 
                    required
                    rows={4}
                    value={createForm.description}
                    onChange={e => setCreateForm({ ...createForm, description: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm font-medium focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all placeholder:text-gray-700 resize-none"
                    placeholder="Summarize the core learning objectives..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3 ml-1">Content Repository (YouTube URL)</label>
                  <input 
                    value={createForm.videoUrl}
                    onChange={e => setCreateForm({ ...createForm, videoUrl: e.target.value })}
                    placeholder="e.g. https://www.youtube.com/watch?v=..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm font-medium focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] outline-none transition-all placeholder:text-gray-700"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} variant="primary" size="large" className="w-full mt-12 uppercase tracking-widest">
                {loading ? "SYNCHRONIZING..." : "Initialize Program"}
              </Button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32 flex-1 overflow-y-auto w-full no-scrollbar">
        
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-blue-500" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">The Knowledge Matrix</h4>
            </div>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-700 leading-tight">
              Future-Proof <br /> Your Career.
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
              Unlock industry-leading specializations curated by global experts. 
              From deep-tech systems to executive leadership.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
              <Button onClick={() => setShowCreateModal(true)} variant="primary" size="large">
                CURATE PROGRAM <FiPlus className="w-6 h-6" />
              </Button>
          </motion.div>
        </header>

        {/* Global Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
          <GlobalStat label="Curated Programs" value={courses.length} icon={FiZap} color="text-blue-400" />
          <GlobalStat label="Active Nodes" value={courses.reduce((a, c) => a + (c.enrollmentCount || 0), 0)} icon={FiTarget} color="text-purple-400" />
          <GlobalStat label="Global Reach" value="24/7" icon={FiLayers} color="text-emerald-400" />
          <GlobalStat label="Mastery Rating" value="4.9/5" icon={FiStar} color="text-amber-400" />
        </section>

        {/* Discovery Interface */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-6 mb-16">
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors w-6 h-6" />
            <input type="text" placeholder="Scan repositories..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-20 pr-8 py-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-sm font-bold focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" />
          </div>
          <div className="flex gap-4">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
              className="px-10 py-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] outline-none cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all">
              {CATEGORIES.map(c => <option key={c} className="bg-[#050508]">{c}</option>)}
            </select>
            <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}
              className="px-10 py-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] outline-none cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all">
              {LEVELS.map(l => <option key={l} className="bg-[#050508]">{l}</option>)}
            </select>
          </div>
        </motion.div>

        {/* Cinematic Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => <div key={i} className="h-[500px] rounded-[3.5rem] bg-white/5 animate-pulse border border-white/5" />)}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {filtered.map((course, i) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  i={i} 
                  onEnroll={() => handleEnroll(course.id)}
                  isEnrolling={enrolling === course.id}
                  enrolledIds={enrolledIds}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-48 text-center">
            <FiBook size={64} className="text-slate-800 mx-auto mb-8" />
            <h3 className="text-4xl font-black text-slate-700 italic tracking-tight">No Entities Found In This Registry</h3>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const GlobalStat = ({ label, value, icon: Icon, color }) => (
  <motion.div whileHover={{ y: -8 }} className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/5 hover:bg-white/[0.04] transition-all">
    <div className={`p-4 rounded-2xl bg-white/5 ${color} mb-8 w-fit`}>
      <Icon size={28} />
    </div>
    <div className="text-5xl font-black text-white tracking-tighter mb-2">{value}</div>
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">{label}</p>
  </motion.div>
);

const CourseCard = ({ course, i, onEnroll, isEnrolling, enrolledIds }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="group relative bg-[#0a0a0a] rounded-[3.5rem] border border-white/5 overflow-hidden transition-all hover:border-blue-500/30 shadow-2xl flex flex-col h-full"
  >
    <div className="relative aspect-video overflow-hidden">
      <img 
        src={course.thumbnail || `https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop`} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
        alt={course.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
      <div className="absolute top-8 left-8">
        <span className="px-5 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">
          {course.category}
        </span>
      </div>
    </div>

    <div className="p-12 flex flex-col flex-1 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="flex items-center gap-6 mb-8">
        <div className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${LEVEL_COLORS[course.level] || "text-blue-400 bg-blue-400/10"}`}>
          {course.level}
        </div>
        <div className="flex items-center gap-2 text-slate-500">
           <FiUsers className="w-3.5 h-3.5" />
           <span className="text-[10px] font-black uppercase tracking-widest">{course.enrollmentCount || 0} Operators</span>
        </div>
      </div>

      <h3 className="text-3xl font-black text-white mb-6 leading-[1.1] tracking-tighter group-hover:text-blue-400 transition-colors">
        {course.title}
      </h3>
      
      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed font-medium mb-10 flex-1">
        {course.description}
      </p>

      <div className="pt-10 border-t border-white/5 space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Lead Architect</span>
            <span className="text-xs font-bold text-slate-300">{course.instructor || "Nexus System"}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 block mb-1">Session Intensity</span>
            <span className="text-xs font-bold text-white italic">{course.duration}</span>
          </div>
        </div>
        
        <Button
          onClick={onEnroll}
          variant={enrolledIds.has(course.id) ? "primary" : "bgBlack"}
          size="medium"
          className="w-full"
        >
          {isEnrolling ? "SYNCHRONIZING..." : enrolledIds.has(course.id) ? "WATCH NOW" : "ACCESS PROJECT"}
          <FiChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </motion.div>
);

export default CoursesPage;