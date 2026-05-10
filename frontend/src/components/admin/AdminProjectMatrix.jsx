import React from "react";
import { FiPlus, FiCheckCircle, FiXCircle, FiTrash2, FiBook } from "react-icons/fi";

const AdminProjectMatrix = ({ courses, searchTerm, setShowCourseModal, handlePublishCourse, handleUnpublishCourse, handleDeleteCourse }) => {
  return (
    <div className="bg-white/5 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-md">
      <div className="p-10 border-b border-white/5 flex items-center justify-between">
        <h3 className="font-black text-xl text-white">Project Matrix</h3>
        <button onClick={() => setShowCourseModal(true)} className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2">
          <FiPlus /> New Project
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 border-b border-white/5">
              <th className="px-10 py-8">Project Designation</th>
              <th className="px-10 py-8">Vertical</th>
              <th className="px-10 py-8">Complexity</th>
              <th className="px-10 py-8">Status</th>
              <th className="px-10 py-8 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {courses
              .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(course => (
              <tr key={course.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-10 py-8">
                  <p className="font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{course.title}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">By {course.instructor}</p>
                </td>
                <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-blue-400">{course.category}</td>
                <td className="px-10 py-8">
                  <span className="text-[9px] font-black px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-400 uppercase tracking-widest">
                    {course.level}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${course.published ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}>
                    {course.published ? "LIVE" : "DRAFT"}
                  </span>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                    {course.published ? (
                      <button onClick={() => handleUnpublishCourse(course.id)} title="Unpublish" className="p-3 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white transition-all"><FiXCircle className="w-5 h-5" /></button>
                    ) : (
                      <button onClick={() => handlePublishCourse(course.id)} title="Publish" className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"><FiCheckCircle className="w-5 h-5" /></button>
                    )}
                    <button onClick={() => handleDeleteCourse(course.id)} title="Delete" className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><FiTrash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && (
          <div className="p-24 text-center">
            <FiBook className="w-20 h-20 text-white/5 mx-auto mb-6" />
            <p className="text-gray-600 font-black uppercase tracking-widest text-xs">The matrix is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjectMatrix;
