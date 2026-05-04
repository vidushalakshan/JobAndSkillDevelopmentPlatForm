import { useEffect, useState } from "react";
import instance from "../service/axios";
import { motion } from "framer-motion";
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon } from "@heroicons/react/24/outline";

const JobCategoryView = ({ title }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await instance.get("job/approved");
        // Filter by category if needed, assuming title is used as category filter
        const filtered = response.data.filter(j => 
          title === "All Jobs" || j.title.toLowerCase().includes(title.toLowerCase().split(' ')[0])
        );
        setJobs(filtered);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [title]);

  if (loading) return <div className="p-8 text-center animate-pulse">Loading jobs...</div>;

  const displayJobs = jobs;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
        <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
        <p className="text-gray-500 dark:text-gray-400 mt-4">Discover the best opportunities in the {title} sector.</p>
      </motion.div>

      <div className="grid gap-6">
        {displayJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-5">
              <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400">
                <BriefcaseIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{job.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <CurrencyDollarIcon className="w-4 h-4" /> {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" /> {job.type}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-500 rounded-full">{job.posted}</span>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20">
                Apply Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobCategoryView;
