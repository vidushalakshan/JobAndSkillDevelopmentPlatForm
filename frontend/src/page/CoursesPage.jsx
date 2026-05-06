import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import { useUser } from "../context/context";
import { toast } from "react-toastify";
import {
  FiBook, FiSearch, FiFilter, FiClock, FiUsers,
  FiStar, FiChevronRight, FiPlus, FiArrowLeft, FiBarChart2
} from "react-icons/fi";

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const CATEGORIES = [
  "All Categories", "IT Software", "IT Hardware", "Accounting",
  "Banking & Finance", "Civil Engineering", "HR & Training", "Business", "Design", "Other"
];

const LEVEL_COLOR = {
  Beginner: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20" },
  Intermediate: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20" },
  Advanced: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", border: "border-red-500/20" },
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
  const [createForm, setCreateForm] = useState({ title: "", description: "", category: "IT Software", level: "Beginner", duration: "", price: "Free", instructor: "", syllabus: "" });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await instance.get("/courses/published");
        setCourses(res.data);
      } catch (err) {
        toast.error("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = useMemo(() => courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      (c.instructor || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All Categories" || c.category === selectedCategory;
    const matchLevel = selectedLevel === "All Levels" || c.level === selectedLevel;
    return matchSearch && matchCat && matchLevel;
  }), [courses, search, selectedCategory, selectedLevel]);

  const handleEnroll = async (id) => {
    if (!user) { navigate("/login"); return; }
    setEnrolling(id);
    try {
      await instance.post(`/courses/${id}/enroll`);
      toast.success("Enrolled successfully!");
      setCourses(prev => prev.map(c => c.id === id ? { ...c, enrollmentCount: c.enrollmentCount + 1 } : c));
    } catch (err) {
      toast.error("Enrollment failed.");
    } finally {
      setEnrolling(null);
    }
  };

  const handleCreate = async () => {
    try {
      await instance.post("/courses", createForm);
      toast.success("Course submitted for review!");
      setShowCreateModal(false);
      setCreateForm({ title: "", description: "", category: "IT Software", level: "Beginner", duration: "", price: "Free", instructor: "", syllabus: "" });
    } catch (err) {
      toast.error("Failed to create course.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a14]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] left-[20%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[40%] -right-[5%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Create Course Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl w-full max-w-2xl p-10 max-h-[90vh] overflow-y-auto z-10">
              <h2 className="text-3xl font-black mb-2">Submit a Course</h2>
              <p className="text-gray-500 mb-8 font-medium">Fill in the details. Admins will review and publish it.</p>
              <div className="space-y-4">
                {[
                  { key: "title", label: "Course Title", placeholder: "e.g. React.js for Beginners" },
                  { key: "instructor", label: "Instructor Name", placeholder: "Your name or the trainer's name" },
                  { key: "duration", label: "Duration", placeholder: "e.g. 8 Weeks, 24 Hours" },
                  { key: "price", label: "Price", placeholder: "e.g. Free, LKR 5000, $29" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">{label}</label>
                    <input value={createForm[key]} onChange={e => setCreateForm({ ...createForm, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3.5 text-sm font-medium border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500" />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Category</label>
                    <select value={createForm.category} onChange={e => setCreateForm({ ...createForm, category: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3.5 text-sm font-medium border border-gray-200 dark:border-white/10 focus:outline-none appearance-none">
                      {CATEGORIES.filter(c => c !== "All Categories").map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Level</label>
                    <select value={createForm.level} onChange={e => setCreateForm({ ...createForm, level: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3.5 text-sm font-medium border border-gray-200 dark:border-white/10 focus:outline-none appearance-none">
                      {LEVELS.filter(l => l !== "All Levels").map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Description</label>
                  <textarea value={createForm.description} onChange={e => setCreateForm({ ...createForm, description: e.target.value })}
                    rows={4} placeholder="What will students learn in this course?"
                    className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3.5 text-sm font-medium border border-gray-200 dark:border-white/10 focus:outline-none resize-none" />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-4 rounded-2xl border border-gray-200 dark:border-white/10 font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={handleCreate} className="flex-1 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-500/20 transition-all">Submit for Review</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-8 pt-16 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-3">Skill Development</p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">Advance Your Skills</h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-xl">Discover expert-led courses and training programs to accelerate your career growth.</p>
          </div>
          {user && (
            <button onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-2xl shadow-purple-500/30 transition-all hover:scale-[1.03] active:scale-95">
              <FiPlus className="w-5 h-5" /> Submit a Course
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { label: "Courses Available", value: courses.length, icon: FiBook, color: "text-blue-500" },
            { label: "Total Learners", value: courses.reduce((a, c) => a + (c.enrollmentCount || 0), 0), icon: FiUsers, color: "text-purple-500" },
            { label: "Categories", value: CATEGORIES.length - 1, icon: FiBarChart2, color: "text-indigo-500" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-[#111127] rounded-[2rem] border border-gray-100 dark:border-white/5 p-8 shadow-xl">
              <s.icon className={`w-7 h-7 ${s.color} mb-4`} />
              <div className="text-4xl font-black mb-1">{s.value}</div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input type="text" placeholder="Search courses, instructors, topics..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-[#111127] border border-gray-200 dark:border-white/10 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm" />
          </div>
          <div className="flex gap-3">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
              className="px-5 py-4 rounded-2xl bg-white dark:bg-[#111127] border border-gray-200 dark:border-white/10 text-sm font-bold focus:outline-none appearance-none cursor-pointer shadow-sm">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}
              className="px-5 py-4 rounded-2xl bg-white dark:bg-[#111127] border border-gray-200 dark:border-white/10 text-sm font-bold focus:outline-none appearance-none cursor-pointer shadow-sm">
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-white dark:bg-[#111127] rounded-[2rem] animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-32 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBook className="w-10 h-10 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-2xl font-black mb-2">No courses found</h3>
            <p className="text-gray-500 max-w-sm mx-auto font-medium">Be the first to submit a course and help others grow their skills.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => {
              const levelCfg = LEVEL_COLOR[course.level] || LEVEL_COLOR.Beginner;
              return (
                <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl hover:shadow-purple-500/5 transition-all flex flex-col overflow-hidden">
                  {/* Card Header */}
                  <div className="h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500" />
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${levelCfg.bg} ${levelCfg.text} ${levelCfg.border}`}>
                        <FiBarChart2 className="w-3 h-3" /> {course.level || "Beginner"}
                      </div>
                      <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
                        {course.price || "Free"}
                      </span>
                    </div>

                    <h3 className="text-xl font-black mb-3 group-hover:text-blue-600 transition-colors leading-tight">{course.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-3 font-medium leading-relaxed flex-1">{course.description}</p>

                    <div className="border-t border-gray-50 dark:border-white/5 pt-6 space-y-4">
                      <div className="flex justify-between text-xs font-bold text-gray-400 dark:text-gray-500">
                        {course.instructor && <span className="flex items-center gap-1.5"><FiStar className="text-yellow-500" />{course.instructor}</span>}
                        {course.duration && <span className="flex items-center gap-1.5"><FiClock />{course.duration}</span>}
                        {course.enrollmentCount > 0 && <span className="flex items-center gap-1.5"><FiUsers />{course.enrollmentCount}</span>}
                      </div>
                      <button
                        onClick={() => handleEnroll(course.id)}
                        disabled={enrolling === course.id}
                        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-black rounded-2xl shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 group/btn"
                      >
                        {enrolling === course.id ? "Enrolling..." : "Enroll Now"}
                        <FiChevronRight className="transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
