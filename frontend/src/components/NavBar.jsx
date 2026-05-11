import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLogo } from "../utils";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  Squares2X2Icon,
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useUser } from "../context/context";
import { Button } from "../common/Button";
import NotificationDropdown from "./nav/NotificationDropdown";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(window.scrollY > 20);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowProfile(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Courses", to: "/courses", icon: <AcademicCapIcon className="w-4 h-4" /> },
    { label: "Talents", to: "/talents", icon: <UserGroupIcon className="w-4 h-4" /> },
    { label: "Find Jobs", to: "/jobs", icon: <BriefcaseIcon className="w-4 h-4" /> },
    { label: "AI Resume", to: "/ai-resume", icon: <SparklesIcon className="w-4 h-4 text-purple-500" /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
      scrolled ? "py-3 px-4" : "py-6 px-8"
    }`}>
      <motion.div 
        layout
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-[2.5rem] px-8 py-3 ${
          scrolled 
          ? "bg-[#050508]/80 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" 
          : "bg-transparent border-transparent"
        }`}
      >
        {/* --- LOGO --- */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
          <div className="bg-blue-600 p-2 rounded-2xl shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-all">
             <img src={navLogo} alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
            Career<span className="text-blue-600">Flow</span>
          </span>
        </div>

        {/* --- DESKTOP NAV --- */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-2xl border border-white/5">
          {navLinks.map(({ label, to, icon }) => (
            <NavLink 
              key={to} 
              to={to} 
              className={({ isActive }) => `
                relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all
                ${isActive 
                  ? "bg-white text-black shadow-2xl scale-105" 
                  : "text-slate-500 hover:text-white"}
              `}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex p-3 rounded-xl bg-white/5 text-slate-500 hover:text-blue-500 transition-colors">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
          
          {user && <NotificationDropdown />}
          
          <ThemeToggle />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg">
                    {(user.username || "U")[0].toUpperCase()}
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-slate-500 transition-transform ${showProfile ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 mt-6 w-80 bg-[#0d0d15] rounded-[2.5rem] shadow-2xl border border-white/10 p-4 z-20 overflow-hidden"
                    >
                      <div className="p-6 bg-white/[0.03] rounded-[2rem] mb-4 border border-white/5">
                        <h4 className="text-lg font-black text-white truncate italic uppercase tracking-tighter">{user.username}</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest truncate">{user.email}</p>
                      </div>

                      <div className="space-y-2">
                        <MenuButton onClick={() => navigate("/profile")} icon={<UserCircleIcon className="w-5 h-5" />} label="Terminal Profile" />
                        <MenuButton onClick={() => navigate("/my-jobs")} icon={<BriefcaseIcon className="w-5 h-5" />} label="Activity Hub" />
                       
                        <div className="h-px bg-white/5 my-2 mx-4" />
                        <button
                          onClick={() => { logout(); navigate("/login"); }}
                          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          <ArrowRightOnRectangleIcon className="w-5 h-5" />
                          Terminate Session
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button variant="primary" size="small" onClick={() => navigate("/signup")} className="!px-8 !rounded-2xl shadow-blue-500/10">
              Initiate
            </Button>
          )}

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden p-3 rounded-2xl bg-white/5 border border-white/5 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </motion.div>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-[#050508] p-12 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-20">
               <span className="text-3xl font-black tracking-tighter text-white uppercase italic">Career<span className="text-blue-600">Flow</span></span>
               <button onClick={() => setMobileMenuOpen(false)} className="p-4 rounded-full bg-white/5 text-white">
                 <XMarkIcon className="w-8 h-8" />
               </button>
            </div>

            <div className="space-y-8">
              {navLinks.map(({ label, to, icon }) => (
                <NavLink 
                  key={to} 
                  to={to} 
                  className={({ isActive }) => `
                    flex items-center gap-6 text-4xl font-black uppercase tracking-tighter transition-all
                    ${isActive ? "text-blue-500 italic" : "text-slate-700 hover:text-white"}
                  `}
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/5">
               <Button variant="primary" className="w-full !py-6 !rounded-3xl !text-xl" onClick={() => navigate("/signup")}>Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MenuButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition-all"
  >
    <span className="text-blue-500/50">{icon}</span>
    {label}
  </button>
);

export default Nav;