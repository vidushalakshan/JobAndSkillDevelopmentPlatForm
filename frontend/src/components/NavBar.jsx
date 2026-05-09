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
  
  // Set initial state based on current scroll to prevent "flashing" on navigation
  const [scrolled, setScrolled] = useState(window.scrollY > 20);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Call once to set correct state for current page
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // Re-run check when path changes

  const navLinks = [
    { label: "Find Jobs", to: "/jobs", icon: <BriefcaseIcon className="w-4 h-4" /> },
    { label: "Courses", to: "/courses", icon: <AcademicCapIcon className="w-4 h-4" /> },
    { label: "Talents", to: "/talents", icon: <UserGroupIcon className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
      scrolled ? "py-2 px-4" : "py-5 px-6"
    }`}>
      <motion.div 
        layout // Smoothly animates size changes
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-[2rem] px-6 py-2 ${
          scrolled 
          ? "bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-xl border border-white/20 dark:border-white/10" 
          : "bg-transparent border-transparent"
        }`}
      >
        
        {/* --- LOGO SECTION --- */}
        <div 
          className="group flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate("/")}
        >
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
             <img src={navLogo} alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
            Career<span className="text-blue-600">Flow</span>
          </span>
        </div>

        {/* --- CENTER NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-1 bg-gray-500/5 dark:bg-white/5 p-1 rounded-2xl border border-white/5">
          {navLinks.map(({ label, to, icon }) => (
            <NavLink 
              key={to} 
              to={to} 
              className={({ isActive }) => `
                relative flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300
                ${isActive 
                  ? "bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}
              `}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 pl-2 pr-4 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black">
                    {(user.username || "U")[0].toUpperCase()}
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${showProfile ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-72 bg-white dark:bg-[#0f1115] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/5 p-2 z-20 overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-3xl mb-2">
                        <h4 className="text-sm font-black text-gray-900 dark:text-white truncate">{user.username}</h4>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      <div className="p-1 space-y-1">
                        <MenuButton onClick={() => {navigate("/profile"); setShowProfile(false)}} icon={<UserCircleIcon className="w-4 h-4" />} label="My Profile" />
                        
                        <MenuButton 
                          onClick={() => {navigate("/my-jobs"); setShowProfile(false)}} 
                          icon={<BriefcaseIcon className="w-4 h-4" />} 
                          label="My Jobs & Postings" 
                        />

                        {user.role === "ADMIN" && (
                          <MenuButton 
                            onClick={() => {navigate("/admin"); setShowProfile(false)}} 
                            icon={<Squares2X2Icon className="w-4 h-4" />} 
                            label="Admin Dashboard" 
                          />
                        )}

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
            <button
              className="px-6 py-2.5 rounded-xl text-sm font-black bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all active:scale-95"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

const MenuButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
  >
    {icon}
    {label}
  </button>
);

export default Nav;