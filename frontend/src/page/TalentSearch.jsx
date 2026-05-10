import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import instance from "../service/axios";
import { toast } from "react-toastify";
import { Button } from "../common/Button";
import {
  FiSearch, FiFilter, FiMapPin, FiAward, 
  FiChevronRight, FiUsers, FiCpu, FiTrendingUp
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
        toast.error("Failed to sync talent repository.");
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-4">Elite Professional Network</p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-[0.9]">
              The Talent <br /> Ecosystem.
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-xl leading-relaxed">
              Precision-curated experts for the world's most ambitious enterprises. 
              Search the repository of specialized brilliance.
            </p>
          </motion.div>
        </header>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 mb-16"
        >
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Query by name, specialized skill, or global location..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-6 rounded-3xl bg-white/[0.03] border border-white/10 text-base font-medium focus:outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all placeholder:text-gray-600" 
            />
          </div>
          <Button variant="primary" size="medium">
            <FiFilter /> Filter Search
          </Button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-white/[0.03] rounded-[3rem] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredTalents.map((talent) => (
                <motion.div 
                  key={talent.id} 
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className="group relative bg-[#0a0a0a] rounded-[3rem] border border-white/5 overflow-hidden transition-all flex flex-col h-full"
                >
                  <div className="h-32 bg-gradient-to-tr from-blue-900/40 via-indigo-950/20 to-black relative">
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  </div>

                  <div className="px-8 pb-10 flex flex-col flex-1 relative -mt-16">
                    <div className="w-24 h-24 rounded-[2rem] bg-black border-[6px] border-[#0a0a0a] mb-6 overflow-hidden shadow-2xl">
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white">
                        {talent.pictureUrl ? (
                          <img src={talent.pictureUrl} alt={talent.username} className="w-full h-full object-cover" />
                        ) : (
                          (talent.username || "U")[0].toUpperCase()
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-black mb-1 group-hover:text-blue-400 transition-colors tracking-tight">
                        {talent.username}
                      </h3>
                      <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-6">
                        {talent.headline || "Unclassified Professional"}
                      </p>

                      <div className="flex flex-col gap-3 text-xs font-bold text-gray-500 mb-8">
                        <span className="flex items-center gap-3"><FiMapPin className="text-blue-500"/> {talent.location || "Remote Origin"}</span>
                        <span className="flex items-center gap-3"><FiAward className="text-blue-500"/> {talent.educations?.[0]?.degree || "Expert Certificated"}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {(talent.skills ? talent.skills.split(",").slice(0, 3) : []).map(skill => (
                          <span key={skill} className="px-4 py-1.5 bg-white/[0.03] border border-white/5 text-[9px] font-black uppercase tracking-[0.1em] rounded-xl text-gray-400">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                      <Button variant="bgBlack" size="medium" className="w-full">
                        Inspect Profile <FiChevronRight />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TalentSearch;