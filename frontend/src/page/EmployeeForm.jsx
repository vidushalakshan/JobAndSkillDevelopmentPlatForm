import React, { useState } from 'react';
import axios from 'axios';

const PostJobModal = ({ onClose, onJobPosted }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    salary: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:8080/job/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onJobPosted(response.data); // optional: update parent list
        onClose();
      }
    } catch (err) {
      console.error('Error posting job:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-[#1e1e2f] rounded-xl shadow-xl p-6 w-full max-w-md text-black dark:text-white">
        <h2 className="text-xl font-bold mb-4">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
          <input type="text" name="type" placeholder="Type (e.g., Full-time)" onChange={handleChange} required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
          <input type="text" name="salary" placeholder="Salary" onChange={handleChange} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
          <input type="date" name="deadline" placeholder="Deadline" onChange={handleChange} required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
          <textarea name="description" placeholder="Job Description" onChange={handleChange} required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobModal;
