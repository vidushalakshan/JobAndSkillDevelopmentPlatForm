import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import instance from "../service/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser, FiMapPin, FiPhone, FiGlobe, FiBriefcase,
  FiEdit3, FiSave, FiX, FiArrowLeft, FiPlus, 
  FiTrash2, FiCalendar, FiBook, FiLink, FiCpu
} from "react-icons/fi";

const SKILL_SUGGESTIONS = [
  "JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "TypeScript", "Figma"
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const UserProfile = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [showEduModal, setShowEduModal] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);

  const [eduForm, setEduForm] = useState({ institution: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "", current: false });
  const [expForm, setExpForm] = useState({ company: "", role: "", description: "", startDate: "", endDate: "", current: false, location: "" });

  useEffect(() => {
    if (!user) navigate("/login");
    const fetchAllData = async () => {
      try {
        const [profRes, eduRes, expRes] = await Promise.all([
          instance.get("/users/profile"),
          instance.get("/profile/education"),
          instance.get("/profile/experience")
        ]);
        setProfile(profRes.data);
        setSkills(profRes.data.skills ? profRes.data.skills.split(",").map(s => s.trim()).filter(Boolean) : []);
        setForm({ ...profRes.data });
        setEducation(eduRes.data);
        setExperience(expRes.data);
      } catch (err) {
        toast.error("Failed to sync profile.");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchAllData();
  }, [user, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await instance.put("/users/profile", { ...form, skills: skills.join(", ") });
      setProfile(res.data);
      login({ ...user, username: res.data.username });
      setEditing(false);
      toast.success("Profile Polished.");
    } catch (err) {
      toast.error("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) setSkills([...skills, trimmed]);
    setSkillInput("");
  };

  const handleSaveEdu = async () => {
    try {
      const res = await instance.post("/profile/education", eduForm);
      setEducation([...education, res.data]);
      setShowEduModal(false);
      setEduForm({ institution: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "", current: false });
      toast.success("Education added.");
    } catch (err) {
      toast.error("Failed to add education.");
    }
  };

  const handleDeleteEdu = async (id) => {
    try {
      await instance.delete(`/profile/education/${id}`);
      setEducation(education.filter(e => e.id !== id));
      toast.success("Education removed.");
    } catch (err) {
      toast.error("Failed to remove education.");
    }
  };

  const handleSaveExp = async () => {
    try {
      const res = await instance.post("/profile/experience", expForm);
      setExperience([...experience, res.data]);
      setShowExpModal(false);
      setExpForm({ company: "", role: "", description: "", startDate: "", endDate: "", current: false, location: "" });
      toast.success("Experience added.");
    } catch (err) {
      toast.error("Failed to add experience.");
    }
  };

  const handleDeleteExp = async (id) => {
    try {
      await instance.delete(`/profile/experience/${id}`);
      setExperience(experience.filter(e => e.id !== id));
      toast.success("Experience removed.");
    } catch (err) {
      toast.error("Failed to remove experience.");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans antialiased overflow-x-hidden mt-[90px]">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <header className="flex justify-between items-center mb-12">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-white transition-all">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Feed
          </button>
          <div className="flex gap-4">
            {editing ? (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="px-8 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {saving ? "Processing..." : "Save Identity"}
                </button>
              </div>
            ) : (
              <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all text-sm font-medium">
                <FiEdit3 className="text-blue-400" /> Edit Profile
              </button>
            )}
          </div>
        </header>

        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="h-64 bg-white/5 rounded-[3rem]" />
            <div className="h-40 bg-white/5 rounded-[3rem]" />
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
            
            <motion.section variants={fadeInUp} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px]">
                      <div className="w-full h-full rounded-3xl bg-[#0a0a0a] flex items-center justify-center text-4xl font-light">
                         {profile?.pictureUrl ? <img src={profile.pictureUrl} className="w-full h-full object-cover rounded-3xl" /> : profile?.username?.[0]}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-4">
                    {editing ? (
                      <div className="space-y-3">
                        <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-full text-2xl font-bold focus:border-blue-500 outline-none" placeholder="Full Name" />
                        <input value={form.headline} onChange={e => setForm({...form, headline: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-full text-blue-400 focus:border-blue-500 outline-none" placeholder="Headline" />
                      </div>
                    ) : (
                      <>
                        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
                          {profile?.username}
                        </h1>
                        <p className="text-xl text-blue-400 font-medium">{profile?.headline || "Pioneer in tech"}</p>
                      </>
                    )}
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-400 pt-2">
                      <span className="flex items-center gap-2"><FiMapPin className="text-blue-500"/> {profile?.location || "Remote"}</span>
                      {profile?.website && <a href={profile.website} className="flex items-center gap-2 hover:text-white transition-colors"><FiGlobe className="text-blue-500"/> Portfolio</a>}
                      {profile?.resumeUrl && <a href={profile.resumeUrl} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"><FiLink /> CV</a>}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <motion.section variants={fadeInUp} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500"><FiUser size={16}/></span>
                    Professional Narrative
                  </h3>
                  {editing ? (
                    <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-gray-300 focus:border-blue-500 outline-none resize-none" />
                  ) : (
                    <p className="text-gray-400 leading-relaxed text-lg font-light">{profile?.bio || "No narrative established yet."}</p>
                  )}
                </motion.section>

                <motion.section variants={fadeInUp} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500"><FiBriefcase size={16}/></span>
                      Experience
                    </h3>
                    {editing && <button onClick={() => setShowExpModal(true)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-blue-400"><FiPlus size={20}/></button>}
                  </div>
                  
                  <div className="space-y-10 border-l border-white/10 ml-4 pl-8 relative">
                    {experience.map((exp, idx) => (
                      <div key={exp.id} className="relative">
                        <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#050505] border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                        <div className="flex justify-between items-start group">
                          <div>
                            <h4 className="text-xl font-bold">{exp.role}</h4>
                            <p className="text-purple-400 font-medium mb-2">{exp.company}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</p>
                            <p className="text-gray-400 font-light text-sm">{exp.description}</p>
                          </div>
                          {editing && <button onClick={() => handleDeleteExp(exp.id)} className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><FiTrash2 /></button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </div>

              <div className="space-y-8">
                <motion.section variants={fadeInUp} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500"><FiCpu size={16}/></span>
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span key={skill} className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs font-medium text-gray-300 flex items-center gap-2 hover:border-white/20 transition-all cursor-default">
                        {skill}
                        {editing && <FiX className="hover:text-red-400 cursor-pointer" onClick={() => setSkills(skills.filter(s => s !== skill))} />}
                      </span>
                    ))}
                  </div>
                  {editing && (
                    <div className="mt-4 flex gap-2">
                      <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill(skillInput)} placeholder="Add skill..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-blue-500" />
                    </div>
                  )}
                </motion.section>

                <motion.section variants={fadeInUp} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500"><FiBook size={16}/></span>
                      Education
                    </h3>
                    {editing && <button onClick={() => setShowEduModal(true)} className="text-blue-400"><FiPlus /></button>}
                  </div>
                  <div className="space-y-6">
                    {education.map(edu => (
                      <div key={edu.id} className="group relative">
                        <h4 className="text-sm font-bold">{edu.institution}</h4>
                        <p className="text-xs text-gray-500">{edu.degree}</p>
                        <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-tighter">{edu.startYear} - {edu.endYear}</p>
                        {editing && <button onClick={() => handleDeleteEdu(edu.id)} className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 text-red-500 transition-opacity"><FiTrash2 size={14}/></button>}
                      </div>
                    ))}
                  </div>
                </motion.section>
              </div>
            </div>

          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {(showEduModal || showExpModal) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => {setShowEduModal(false); setShowExpModal(false)}} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-[#111] border border-white/10 p-8 rounded-[3rem] w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar">
              <h2 className="text-2xl font-bold mb-6">{showEduModal ? "Academic Background" : "Work History"}</h2>
              <div className="space-y-4">
                {showEduModal ? (
                  <>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Institution</label>
                      <input value={eduForm.institution} onChange={e => setEduForm({...eduForm, institution: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" placeholder="e.g. Stanford University" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Degree</label>
                      <input value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" placeholder="e.g. B.S. Computer Science" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Start Year</label>
                        <input value={eduForm.startYear} onChange={e => setEduForm({...eduForm, startYear: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all" placeholder="2018" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">End Year</label>
                        <input value={eduForm.endYear} onChange={e => setEduForm({...eduForm, endYear: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all" placeholder="2022" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Role / Title</label>
                      <input value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" placeholder="e.g. Senior Developer" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Company</label>
                      <input value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-600" placeholder="e.g. Google" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Description</label>
                      <textarea rows="3" value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-600 resize-none" placeholder="Key responsibilities and achievements..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Start Date</label>
                        <input type="date" value={expForm.startDate} onChange={e => setExpForm({...expForm, startDate: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all [color-scheme:dark]" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">End Date</label>
                        <input type="date" value={expForm.endDate} onChange={e => setExpForm({...expForm, endDate: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all [color-scheme:dark]" />
                      </div>
                    </div>
                  </>
                )}
                
                 <button 
                  onClick={() => {
                    showEduModal ? handleSaveEdu() : handleSaveExp();
                  }}
                  className="w-full mt-4 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest text-sm"
                 >
                  Confirm Entry
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;