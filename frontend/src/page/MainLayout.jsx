import NavBar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#0a0a14] transition-colors duration-500 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky, premium Navigation Bar */}
      <div className="sticky top-0 z-[100] w-full backdrop-blur-xl bg-white/70 dark:bg-[#0a0a14]/70 border-b border-gray-200/50 dark:border-white/5 transition-all">
        <NavBar />
      </div>

      {/* Main Content Area with Page Transitions */}
      <main className="flex-1 flex flex-col relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 flex flex-col w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Unified Premium Footer */}
      <footer className="py-16 bg-white dark:bg-[#111127] border-t border-gray-200 dark:border-white/5 relative overflow-hidden">
        {/* Subtle Background Glow in Footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col items-center">
          <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-8 tracking-tight">
            JobSkill Platform
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-10 text-sm font-bold text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Find Jobs</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Post a Job</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} JobSkill Platform. Engineered for Excellence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
