import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellIcon, CheckCircleIcon, InformationCircleIcon, BriefcaseIcon, AcademicCapIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../../context/NotificationContext";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-white transition-all group"
      >
        <BellIcon className="w-5 h-5 group-hover:rotate-12 transition-all" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full text-[8px] font-black text-white flex items-center justify-center shadow-lg animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="absolute right-0 mt-6 w-96 bg-[#0a0a0f] rounded-[2.5rem] shadow-2xl border border-white/10 p-5 z-20 overflow-hidden backdrop-blur-3xl"
            >
              <div className="flex justify-between items-center mb-6 px-2">
                <div>
                  <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">Command Feed</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{unreadCount} Pending Intel</p>
                </div>
                <button 
                  onClick={() => {}}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-blue-400 hover:text-white transition-colors"
                  title="Clear all"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[480px] overflow-y-auto no-scrollbar space-y-3 pr-1">
                {notifications.length === 0 ? (
                  <div className="py-24 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mx-auto mb-6">
                      <BellIcon className="w-10 h-10 text-slate-800" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 italic">No incoming transmissions</p>
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const Icon = {
                      'JOB_UPDATE': BriefcaseIcon,
                      'ENROLLMENT': AcademicCapIcon,
                      'PROFILE_VIEW': UserCircleIcon,
                      'SYSTEM': InformationCircleIcon,
                      'COURSE_UPDATE': AcademicCapIcon,
                      'ACCOUNT': UserCircleIcon,
                    }[notif.type] || InformationCircleIcon;

                    const Color = {
                      'JOB_UPDATE': 'from-blue-500 to-indigo-600',
                      'ENROLLMENT': 'from-emerald-500 to-teal-600',
                      'PROFILE_VIEW': 'from-purple-500 to-pink-600',
                      'SYSTEM': 'from-amber-500 to-orange-600',
                      'COURSE_UPDATE': 'from-cyan-500 to-blue-600',
                      'ACCOUNT': 'from-rose-500 to-red-600',
                    }[notif.type] || 'from-slate-500 to-slate-600';

                    return (
                      <motion.button
                        layout
                        key={notif.id}
                        onClick={() => { markAsRead(notif.id); }}
                        className={`w-full group p-5 rounded-[2rem] text-left transition-all border relative overflow-hidden ${
                          notif.read 
                          ? "bg-transparent border-transparent opacity-40 hover:opacity-100" 
                          : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                      >
                        {!notif.read && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                        )}
                        
                        <div className="flex gap-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${Color} shadow-lg shadow-black/20`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-sm font-black text-white truncate uppercase tracking-tight italic group-hover:text-blue-400 transition-colors">
                                {notif.title}
                              </p>
                              {!notif.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium line-clamp-2">
                              {notif.message}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">
                                {new Date(notif.createdAt).toLocaleDateString()}
                              </span>
                              <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest italic">
                                {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-center">
                 <button className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] hover:text-white transition-all group">
                    Sync Intelligence Feed
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-ping" />
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
