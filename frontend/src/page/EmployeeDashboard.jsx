import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import PostJobModal from '../page/EmployeeForm';

const EmployeeDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const handleJobPosted = (newJob) => {
    if (editJob) {
      const updated = jobs.map((job) =>
        job.id === editJob.id ? { ...newJob, id: editJob.id } : job
      );
      setJobs(updated);
    } else {
      setJobs([...jobs, { ...newJob, id: Date.now() }]);
    }
    setEditJob(null);
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <section className="h-screen flex flex-col bg-white dark:bg-gradient-to-br from-[#7f5af0] via-[#2cb67d] to-[#16161a]">
      <div className="shrink-0 z-20 w-full">
        <NavBar />
      </div>

      <main className="flex-1 overflow-y-auto p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Posts</h1>
          <button
            onClick={() => {
              setEditJob(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            + Post a Job
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-left bg-white text-black rounded-xl shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Location</th>
                <th className="p-2">Type</th>
                <th className="p-2">Salary</th>
                <th className="p-2">Deadline</th>
                <th className="p-2">Posted By</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="p-2">{job.title}</td>
                  <td className="p-2">{job.location}</td>
                  <td className="p-2">{job.type}</td>
                  <td className="p-2">{job.salary || '—'}</td>
                  <td className="p-2">{job.deadline}</td>
                  <td className="p-2">{job.postedBy?.username || '—'}</td>
                  <td className="p-2 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(job)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <PostJobModal
            onClose={() => {
              setShowModal(false);
              setEditJob(null);
            }}
            onJobPosted={handleJobPosted}
            jobToEdit={editJob}
          />
        )}
      </main>
    </section>
  );
};

export default EmployeeDashboard;
