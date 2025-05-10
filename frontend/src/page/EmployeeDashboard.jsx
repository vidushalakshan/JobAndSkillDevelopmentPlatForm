import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiClock, FiDollarSign, FiMapPin, FiBriefcase, FiUser } from 'react-icons/fi';
import NavBar from '../components/NavBar';
import PostJobModal from '../page/EmployeeForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/getjobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error('Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  const handleJobPosted = async (newJob) => {
    try {
      if (editJob) {
        // Update existing job
        const response = await axios.put(`http://localhost:8080/api/v1/jobs/${editJob.id}`, newJob);
        const updated = jobs.map((job) =>
          job.id === editJob.id ? response.data : job
        );
        setJobs(updated);
        toast.success('Job updated successfully');
      } else {
        // Create new job
        const response = await axios.post('http://localhost:8080/api/v1/jobs', newJob);
        setJobs([...jobs, response.data]);
        toast.success('Job posted successfully');
      }
      setShowModal(false);
      setEditJob(null);
    } catch (err) {
      toast.error('Operation failed. Please try again.',err.message);
    }
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
      toast.success('Job deleted successfully');
    } catch (err) {
      toast.error('Failed to delete job', err.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="min-h-screen flex flex-col bg-gray-50 dark:bg-gradient-to-br from-[#7f5af0] via-[#2cb67d] to-[#16161a]">
      <div className="shrink-0 z-20 w-full">
        <NavBar />
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Job Management</h1>
            <button
              onClick={() => {
                setEditJob(null);
                setShowModal(true);
              }}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <span>+ Post New Job</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading jobs...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job Title</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Salary</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Deadline</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Posted By</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {jobs.length > 0 ? (
                      jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 dark:text-white">{job.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                              <FiBriefcase className="mr-1.5" />
                              {job.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <FiMapPin className="mr-1.5" />
                              {job.location}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                              <FiDollarSign className="mr-1.5" />
                              {job.salary ? formatCurrency(job.salary) : 'Negotiable'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <FiClock className="mr-1.5" />
                              {job.deadline ? formatDate(job.deadline) : 'No deadline'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <FiUser className="mr-1.5" />
                              {job.postedBy?.username || 'System'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => handleEdit(job)}
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                                title="Edit"
                              >
                                <FiEdit2 className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(job.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                title="Delete"
                              >
                                <FiTrash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                          No jobs found. Post your first job to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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