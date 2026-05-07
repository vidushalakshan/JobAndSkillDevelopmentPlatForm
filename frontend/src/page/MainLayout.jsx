import NavBar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white selection:bg-blue-500/30 font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <nav className="sticky top-0 z-[100] w-full backdrop-blur-2xl bg-black/20 border-b border-white/5 transition-all duration-500">
        <div className="max-w-7xl mx-auto">
          <NavBar />
        </div>
      </nav>
      
      <main className="flex-1 flex flex-col relative z-10 w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="flex-1 flex flex-col w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative pt-24 pb-12 bg-[#080808] border-t border-white/5 overflow-hidden z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 mb-6">
                JOBSKILL.
              </div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-medium">
                The premier ecosystem for elite professionals and industry-leading enterprises. Engineered for excellence.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-500 mb-2">Platform</h4>
              {["Find Jobs", "Post a Job", "Talent Pool"].map((link) => (
                <a key={link} href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-all duration-300 w-fit">{link}</a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-500 mb-2">Company</h4>
              {["About Us", "Privacy", "Terms"].map((link) => (
                <a key={link} href="#" className="text-sm font-semibold text-gray-400 hover:text-white transition-all duration-300 w-fit">{link}</a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-600">
              © {new Date().getFullYear()} JobSkill. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-all">
                <span className="sr-only">Social</span>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;