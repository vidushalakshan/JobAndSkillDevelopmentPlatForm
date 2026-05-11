import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../service/axios";
import { toast } from "react-toastify";

// --- Components ---
import CourseHeader from "../components/course/CourseHeader";
import CourseContentPlayer from "../components/course/CourseContentPlayer";

const CourseViewerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchCourseData = async () => {
    try {
      const [courseRes, enrolledRes] = await Promise.all([
        instance.get(`/courses/${id}`),
        instance.get("/courses/enrolled")
      ]);

      const courseData = courseRes.data;
      const enrollment = enrolledRes.data.find(e => e.course.id === parseInt(id));

      if (!enrollment || (enrollment.status !== "ENROLLED" && enrollment.status !== "COMPLETED")) {
        toast.warn("Access Denied: You must be approved by an admin to view this content.");
        navigate("/courses");
        return;
      }

      courseData.progress = enrollment.progress;
      setCourse(courseData);
    } catch (err) {
      toast.error("Security clearing failed. Returning to lobby.");
      navigate("/courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id, navigate]);

  const handleProgressUpdate = async (stepId, totalSteps) => {
    const newProgress = Math.min(Math.round((stepId / totalSteps) * 100), 100);
    try {
      await instance.post(`/courses/${id}/progress?progress=${newProgress}`);
      setCourse(prev => ({ ...prev, progress: newProgress }));
      toast.success(`Milestone Synced: ${newProgress}%`);
    } catch (err) {
      toast.error("Cloud synchronization failed.");
    }
  };

  const handleClaimCredential = () => {
    toast.info("Credential Minting... Your certificate will be issued to your registered email.");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full" />
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (!course) return null;

  const roadmapSteps = course.syllabus
    ? course.syllabus.split('\n').filter(s => s.trim()).map((s, i) => ({ id: i + 1, title: s.trim(), duration: "Flexible" }))
    : [
      { id: 1, title: "Foundational Protocols", duration: "45m" },
      { id: 2, title: "Infrastructure Orchestration", duration: "1h 20m" },
      { id: 3, title: "Edge Case Synthesis", duration: "30m" },
      { id: 4, title: "Final Deployment Hub", duration: "15m" },
    ];

  const getEmbedUrl = (url) => {
    if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ";
    if (url.includes("youtube.com/embed/")) return url;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const videoSrc = getEmbedUrl(course.videoUrl);

  return (
    <div className="h-screen bg-[#020203] text-slate-200 selection:bg-blue-500/30 overflow-hidden flex flex-col font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/[0.03] blur-[150px] rounded-full" />
      </div>

      <CourseHeader course={course} navigate={navigate} />

      <CourseContentPlayer
        course={course}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        roadmapSteps={roadmapSteps}
        handleProgressUpdate={handleProgressUpdate}
        handleClaimCredential={handleClaimCredential}
        videoSrc={videoSrc}
      />
    </div>
  );
};

export default CourseViewerPage;
