import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLogo } from "../utils";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, NavLink } from "react-router-dom";
import { useUser } from "../context/context";

const Nav = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="w-full py-4 sm:px-12 px-6 flex justify-center items-center transition-all duration-300">
        <nav className="flex w-full justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={navLogo} alt="Nav Logo" width={140} className="hover:opacity-80 transition" />
          </div>

          {/* Main Navigation Links */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100/80 dark:bg-white/5 px-2 py-1.5 rounded-full border border-gray-200 dark:border-white/10 backdrop-blur-sm">
            {[
              { label: "Find Jobs", to: "/jobs" },
              { label: "Courses", to: "/courses" },
            ].map(({ label, to }) => (
              <NavLink key={to} to={to} className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${isActive
                  ? "bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`
              }>
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="relative">
                <div
                  className="flex items-center gap-3 bg-gray-100 dark:bg-white/10 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  {user.pictureUrl ? (
                    <img src={user.pictureUrl} alt="User" className="w-8 h-8 rounded-full border-2 border-blue-500" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-black">
                      {(user.username || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200 hidden sm:block">
                    {user.username}
                  </span>
                </div>

                {/* Profile Popup */}
                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#1e1e2f] rounded-[2rem] shadow-2xl border border-gray-200 dark:border-white/10 p-6 z-[100]"
                    >
                      <div className="flex flex-col items-center text-center mb-6">
                        {user.pictureUrl ? (
                          <img src={user.pictureUrl} alt="User Large" className="w-20 h-20 rounded-full border-4 border-blue-500 mb-4 shadow-xl" />
                        ) : (
                          <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black mb-4 shadow-xl">
                            {(user.username || "U")[0].toUpperCase()}
                          </div>
                        )}
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">{user.username}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        <span className="mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black rounded-full uppercase tracking-wider">
                          {user.role}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {user.role === "ADMIN" && (
                          <button
                            onClick={() => { navigate("/admin"); setShowProfile(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-400 transition-colors"
                          >
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            Admin Console
                          </button>
                        )}
                        <button
                          onClick={() => { navigate("/profile"); setShowProfile(false); }}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-sm font-bold transition-colors flex items-center gap-3"
                        >
                          <UserCircleIcon className="w-5 h-5 text-gray-400" />
                          My Profile
                        </button>
                        <button
                          onClick={() => { navigate("/my-jobs"); setShowProfile(false); }}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-sm font-bold transition-colors flex items-center gap-3"
                        >
                          <span className="w-5 h-5 text-gray-400 flex items-center justify-center text-base">📋</span>
                          My Activity
                        </button>
                        <button
                          onClick={() => { navigate("/courses"); setShowProfile(false); }}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-sm font-bold transition-colors flex items-center gap-3"
                        >
                          <span className="w-5 h-5 text-gray-400 flex items-center justify-center text-base">🎓</span>
                          My Courses
                        </button>
                        <div className="pt-2 border-t border-gray-100 dark:border-white/5">
                          <button
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-bold transition-colors"
                            onClick={() => { logout(); navigate("/login"); setShowProfile(false); }}
                          >
                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="px-5 py-2.5 rounded-full text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button
                  className="px-6 py-2.5 rounded-full text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
                  onClick={() => navigate("/signup")}
                >
                  Join Now
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
