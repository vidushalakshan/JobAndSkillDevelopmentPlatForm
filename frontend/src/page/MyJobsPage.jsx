import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { toast } from "react-toastify";
import instance from "../service/axios";

// --- Components ---
import ActivityHeader from "../components/activity/ActivityHeader";
import JobPostingsList from "../components/activity/JobPostingsList";
import LearningTrackList from "../components/activity/LearningTrackList";
import PostJobModal from "../components/PostJobModal";
import CreateCourseModal from "../components/course/CreateCourseModal";

const MyJobsPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [activeTab, setActiveTab] = useState("postings");
  const [courseForm, setCourseForm] = useState({ 
    title: "", description: "", category: "IT Software", 
    level: "Beginner", duration: "", price: "Free", instructor: "", syllabus: "",
    videoUrl: "", thumbnail: ""
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, enrolledRes] = await Promise.allSettled([
        instance.get("/job/my"),
        instance.get("/courses/enrolled")
      ]);
      
      if (jobsRes.status === "fulfilled") setJobs(jobsRes.value.data);
      if (enrolledRes.status === "fulfilled") setEnrolledCourses(enrolledRes.value.data);
    } catch (err) {
      toast.error("Protocol synchronization failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchData();
  }, [user, navigate]);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await instance.post("/courses", courseForm);
      toast.success("Project blueprint submitted for review.");
      setShowCourseModal(false);
      fetchData();
    } catch (err) {
      toast.error("Protocol initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently remove this posting?")) return;
    try {
      await instance.delete(`/job/${id}`);
      toast.success("Posting decommissioned successfully");
      fetchData();
    } catch {
      toast.error("Deletion protocol failed");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050508] text-slate-200 selection:bg-blue-500/30">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50 shadow-[0_0_20px_rgba(37,99,235,0.5)]" style={{ scaleX }} />

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {showModal && <PostJobModal onClose={() => setShowModal(false)} onCreated={fetchData} />}
        {showCourseModal && (
          <CreateCourseModal 
            isOpen={showCourseModal} 
            onClose={() => setShowCourseModal(false)} 
            onSubmit={handleCourseSubmit}
            form={courseForm}
            setForm={setCourseForm}
            loading={loading}
          />
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <ActivityHeader 
          user={user} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          navigate={navigate} 
          setShowModal={setShowModal} 
          setShowCourseModal={setShowCourseModal}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {activeTab === "postings" && (
            <JobPostingsList jobs={jobs} loading={loading} handleDelete={handleDelete} />
          )}
          {activeTab === "learning" && (
            <LearningTrackList courses={enrolledCourses} loading={loading} navigate={navigate} />
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default MyJobsPage;