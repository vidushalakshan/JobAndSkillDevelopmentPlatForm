import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import instance from "../service/axios";
import { toast } from "react-toastify";
import {
  FiSearch, FiFilter, FiMapPin, FiBriefcase,
  FiAward, FiStar, FiChevronRight, FiUsers
} from "react-icons/fi";

const TalentSearch = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const res = await instance.get("/profile/talents");
        setTalents(res.data);
      } catch (err) {
        toast.error("Failed to load talent pool.");
      } finally {
        setLoading(false);
      }
    };
    fetchTalents();
  }, []);

  const filteredTalents = talents.filter(t => {
    const term = search.toLowerCase();
    return (
      (t.username || "").toLowerCase().includes(term) ||
      (t.headline || "").toLowerCase().includes(term) ||
      (t.skills || "").toLowerCase().includes(term) ||
      (t.location || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a14]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-16 pb-24">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-3">Employer Portal</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">Discover Top Talent</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
            Browse through our curated pool of professionals. Find the perfect fit for your next big project.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input type="text" placeholder="Search by name, role, skills, or location..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-white dark:bg-[#111127] border border-gray-200 dark:border-white/10 text-base font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-xl shadow-black/[0.02]" />
          </div>
          <button className="px-8 py-5 bg-white dark:bg-[#111127] border border-gray-200 dark:border-white/10 rounded-[2rem] text-gray-600 dark:text-gray-300 font-bold flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-xl shadow-black/[0.02]">
            <FiFilter /> Filters
          </button>
        </div>

        {/* Talent Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-80 bg-white dark:bg-[#111127] rounded-[2.5rem] animate-pulse" />)}
          </div>
        ) : filteredTalents.length === 0 ? (
          <div className="py-32 text-center">
            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiUsers className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-black mb-2">No talent found</h3>
            <p className="text-gray-500 max-w-sm mx-auto font-medium">Try adjusting your search criteria to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalents.map((talent, i) => (
              <motion.div key={talent.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex flex-col overflow-hidden relative">
                
                {/* Header Gradient */}
                <div className="h-24 bg-gradient-to-br from-blue-500 to-indigo-600 relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-20"></div>
                </div>

                <div className="p-8 flex flex-col flex-1 relative -mt-12">
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-[#111127] p-1.5 mb-4 shadow-xl">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-500/20 dark:to-indigo-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-2xl overflow-hidden">
                      {talent.pictureUrl ? (
                        <img src={talent.pictureUrl} alt={talent.username} className="w-full h-full object-cover" />
                      ) : (
                        (talent.username || "U")[0].toUpperCase()
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-black mb-1 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{talent.username}</h3>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-4 line-clamp-1">{talent.headline || "Professional"}</p>

                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-6">
                    {talent.location && <span className="flex items-center gap-1.5"><FiMapPin />{talent.location}</span>}
                    {talent.educations?.length > 0 && <span className="flex items-center gap-1.5"><FiAward />{talent.educations[0].degree}</span>}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(talent.skills ? talent.skills.split(",").map(s => s.trim()).filter(Boolean) : []).slice(0, 3).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-[10px] font-black uppercase tracking-wider rounded-lg border border-gray-200 dark:border-white/5">
                        {skill}
                      </span>
                    ))}
                    {talent.skills && talent.skills.split(",").length > 3 && (
                      <span className="px-3 py-1 bg-gray-50 dark:bg-transparent text-gray-400 text-[10px] font-black rounded-lg">
                        +{talent.skills.split(",").length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5">
                    <button className="w-full py-4 rounded-2xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 font-black text-sm flex items-center justify-center gap-2 transition-all">
                      View Full Profile <FiChevronRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentSearch;
