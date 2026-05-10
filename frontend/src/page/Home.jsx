import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import instance from "../service/axios";

// --- Components ---
import HeroSection from "../components/home/HeroSection";
import FeatureGrid from "../components/home/FeatureGrid";
import StatsSection from "../components/home/StatsSection";
import JobCatalog from "../components/home/JobCatalog";
import CallToAction from "../components/home/CallToAction";
import ApplyModal from "../components/ApplyModal";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax Values
  const textY = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const textOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.2], [0.6, 0]);

  useEffect(() => {
    const fetchApproved = async () => {
      setLoading(true);
      try {
        const res = await instance.get("job/approved");
        setJobs(res.data);
      } catch (err) { 
        console.error("Market data sync failure:", err); 
      } finally {
        setLoading(false);
      }
    };
    fetchApproved();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020408] text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      {/* Scroll Progress Node */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left shadow-[0_0_20px_rgba(37,99,235,0.5)]" style={{ scaleX }} />

      <HeroSection 
        bgOpacity={bgOpacity} 
        textY={textY} 
        textOpacity={textOpacity} 
        user={user} 
        navigate={navigate} 
      />

      <StatsSection />

      <FeatureGrid />

      <JobCatalog jobs={jobs} loading={loading} setSelectedJob={setSelectedJob} />

      <CallToAction navigate={navigate} />

      <AnimatePresence>
        {selectedJob && (
          <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;