import React from "react";
import { FiPlus, FiCheckCircle, FiXCircle, FiTrash2, FiBook, FiAlertCircle } from "react-icons/fi";

const AdminProjectMatrix = ({ 
  courses, pendingEnrollments, searchTerm, 
  setShowCourseModal, handlePublishCourse, handleUnpublishCourse, handleDeleteCourse,
  handleApproveEnrollment, handleRejectEnrollment
}) => {
  const pendingCourses = courses.filter(c => !c.published);
  const liveCourses = courses.filter(c => c.published && c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-12">
      {pendingCourses.length > 0 && (
        <div className="bg-white/5 rounded-[3rem] border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.1)] overflow-hidden backdrop-blur-md">
          <div className="p-10 border-b border-white/5 bg-amber-500/5 flex items-center justify-between">
            <div>
              <h3 className="font-black text-xl text-white uppercase italic tracking-tighter text-amber-500 flex items-center gap-2">
                <FiAlertCircle className="w-5 h-5" /> Course Submissions
              </h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
                {pendingCourses.length} blueprints awaiting architectural validation
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 border-b border-white/5">
                  <th className="px-10 py-6">Program Designation</th>
                  <th className="px-10 py-6">Lead Architect</th>
                  <th className="px-10 py-6 text-right">Review Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pendingCourses.map(course => (
                  <tr key={course.id} className="group hover:bg-amber-500/5 transition-colors">
                    <td className="px-10 py-6">
                      <p className="font-bold text-white group-hover:text-amber-500 transition-colors">{course.title}</p>
                      <p className="text-[9px] text-slate-500 uppercase">{course.category}</p>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[8px] font-black">{course.instructor?.charAt(0)}</div>
                         <span className="text-xs font-bold text-slate-400">{course.instructor}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => handlePublishCourse(course.id)} className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Approve & Publish</button>
                        <button onClick={() => handleDeleteCourse(course.id)} className="px-5 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pendingEnrollments?.length > 0 && (
        <div className="bg-white/5 rounded-[3rem] border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.1)] overflow-hidden backdrop-blur-md">
          <div className="p-10 border-b border-white/5 bg-blue-500/5">
            <h3 className="font-black text-xl text-white uppercase italic tracking-tighter">Access Requests</h3>
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mt-1">{pendingEnrollments.length} Operators pending clearance</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/50 border-b border-white/5">
                  <th className="px-10 py-6">Operator</th>
                  <th className="px-10 py-6">Requested Project</th>
                  <th className="px-10 py-6 text-right">Clearance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pendingEnrollments.map(enrollment => (
                  <tr key={enrollment.id} className="group hover:bg-blue-500/5 transition-colors">
                    <td className="px-10 py-6">
                      <div>
                        <p className="font-bold text-white mb-0.5 group-hover:text-blue-400 transition-colors">{enrollment.user?.username || "Unknown"}</p>
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">{enrollment.user?.email}</p>
                      </div>
                    </td>
                    <td className="px-10 py-6 font-bold text-slate-300">{enrollment.course.title}</td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => handleApproveEnrollment(enrollment.id)} className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">Approve</button>
                        <button onClick={() => handleRejectEnrollment(enrollment.id)} className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">Deny</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white/5 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-black text-xl text-white uppercase italic tracking-tighter">Live Matrix</h3>
          <button onClick={() => setShowCourseModal(true)} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <FiPlus /> New Architect
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 border-b border-white/5">
                <th className="px-10 py-8">Project Designation</th>
                <th className="px-10 py-8">Vertical</th>
                <th className="px-10 py-8 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {liveCourses.map(course => (
                <tr key={course.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-10 py-8">
                    <p className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{course.title}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Architect: {course.instructor}</p>
                  </td>
                  <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-blue-400">{course.category}</td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleUnpublishCourse(course.id)} className="p-3 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white transition-all"><FiXCircle className="w-5 h-5" /></button>
                      <button onClick={() => handleDeleteCourse(course.id)} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><FiTrash2 className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {liveCourses.length === 0 && (
            <div className="p-24 text-center">
              <FiBook className="w-20 h-20 text-white/5 mx-auto mb-6" />
              <p className="text-gray-600 font-black uppercase tracking-widest text-xs">No live deployments detected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjectMatrix;
