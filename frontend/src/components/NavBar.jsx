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
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useUser } from "../context/context";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for a "floating" feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Find Jobs", to: "/jobs", icon: <BriefcaseIcon className="w-4 h-4" /> },
    { label: "Courses", to: "/courses", icon: <AcademicCapIcon className="w-4 h-4" /> },
    { label: "Talents", to: "/talents", icon: <UserGroupIcon className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? "py-3 px-4" : "py-5 px-6"
    }`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-[2rem] px-6 py-2 ${
        scrolled 
        ? "bg-white/80 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20 dark:border-white/10" 
        : "bg-transparent"
      }`}>
        
        {/* --- LOGO SECTION --- */}
        <div 
          className="group flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate("/")}
        >
          <div className="bg-blue-600 p-2 rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-blue-500/20">
             <img src={navLogo} alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">
            CAREER<span className="text-blue-600">FLOW</span>
          </span>
        </div>

        {/* --- CENTER NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, to, icon }) => (
            <NavLink 
              key={to} 
              to={to} 
              className={({ isActive }) => `
                relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                ${isActive 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"}
              `}
            >
              {({ isActive }) => (
                <>
                  {icon}
                  {label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block mr-2">
            <ThemeToggle />
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:shadow-md transition-all active:scale-95"
              >
                <div className="relative">
                    {user.pictureUrl ? (
                    <img src={user.pictureUrl} alt="User" className="w-8 h-8 rounded-full border border-white dark:border-gray-800" />
                    ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black">
                        {(user.username || "U")[0].toUpperCase()}
                    </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${showProfile ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-72 bg-white dark:bg-[#0f1115] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/5 p-2 z-20 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="p-4 bg-gray-50 dark:bg-white/[0.02] rounded-[1.5rem] mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Authenticated as</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black">
                                {(user.username || "U")[0].toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="text-sm font-black truncate text-gray-900 dark:text-white">{user.username}</h4>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-1 space-y-1">
                        {user.role === "ADMIN" && (
                           <MenuButton onClick={() => navigate("/admin")} icon={<Squares2X2Icon className="w-4 h-4 text-blue-500" />} label="Admin Console" highlight />
                        )}
                        <MenuButton onClick={() => navigate("/profile")} icon={<UserCircleIcon className="w-4 h-4" />} label="Account Settings" />
                        <MenuButton onClick={() => navigate("/my-jobs")} icon={<BriefcaseIcon className="w-4 h-4" />} label="My Applications" />
                        
                        <div className="h-px bg-gray-100 dark:bg-white/5 my-2 mx-4" />
                        
                        <button
                          onClick={() => { logout(); navigate("/login"); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-bold transition-all"
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="hidden sm:block px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="px-6 py-2.5 rounded-xl text-sm font-black bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all active:scale-95"
                onClick={() => navigate("/signup")}
              >
                Join Free
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Reusable Menu Button Component
const MenuButton = ({ icon, label, onClick, highlight = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
      ${highlight 
        ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" 
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"}
    `}
  >
    {icon}
    {label}
  </button>
);

export default Nav;