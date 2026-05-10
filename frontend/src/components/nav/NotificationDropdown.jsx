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
              className="absolute right-0 mt-6 w-96 bg-[#0d0d15] rounded-[2.5rem] shadow-2xl border border-white/10 p-4 z-20 overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center mb-4">
                <h4 className="text-sm font-black text-white uppercase tracking-widest italic">System Alerts</h4>
                <span className="text-[10px] font-black text-slate-600 uppercase">{unreadCount} Unread</span>
              </div>

              <div className="max-h-[450px] overflow-y-auto no-scrollbar space-y-2">
                {notifications.length === 0 ? (
                  <div className="py-20 text-center">
                    <BellIcon className="w-12 h-12 text-white/5 mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">No signals detected</p>
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const Icon = {
                      'JOB_UPDATE': BriefcaseIcon,
                      'ENROLLMENT': AcademicCapIcon,
                      'PROFILE_VIEW': UserCircleIcon,
                    }[notif.type] || InformationCircleIcon;

                    const Color = {
                      'JOB_UPDATE': 'bg-blue-500/20 text-blue-500',
                      'ENROLLMENT': 'bg-green-500/20 text-green-500',
                      'PROFILE_VIEW': 'bg-purple-500/20 text-purple-500',
                    }[notif.type] || 'bg-slate-500/20 text-slate-500';

                    return (
                      <button
                        key={notif.id}
                        onClick={() => { markAsRead(notif.id); }}
                        className={`w-full p-5 rounded-3xl text-left transition-all border ${notif.read ? "bg-transparent border-transparent opacity-50" : "bg-white/5 border-white/5 hover:bg-white/10"}`}
                      >
                        <div className="flex gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${Color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-white truncate uppercase tracking-tight italic">{notif.title}</p>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">{notif.message}</p>
                          <p className="text-[8px] font-black text-slate-800 uppercase tracking-widest mt-2">Received: {new Date(notif.createdAt).toLocaleTimeString()}</p>
                        </div>
                        {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />}
                      </div>
                      </button>
                    );
                  })
                )}
              </div>

              <div className="mt-4 p-4 text-center">
                 <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Mark all as synchronized</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
