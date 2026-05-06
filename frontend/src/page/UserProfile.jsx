import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import instance from "../service/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser, FiMapPin, FiPhone, FiGlobe, FiBriefcase,
  FiEdit3, FiSave, FiX, FiArrowLeft, FiAward, FiLink,
  FiBook, FiPlus, FiTrash2, FiCalendar
} from "react-icons/fi";

const SKILL_SUGGESTIONS = [
  "JavaScript", "React", "Node.js", "Python", "Java", "Spring Boot",
  "SQL", "Machine Learning", "UI/UX Design", "Project Management",
  "Data Analysis", "AWS", "Docker", "TypeScript", "Figma"
];

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
  const [eduForm, setEduForm] = useState({ institution: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "", description: "", current: false });
  const [expForm, setExpForm] = useState({ company: "", role: "", description: "", startDate: "", endDate: "", current: false, location: "" });


  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [profRes, eduRes, expRes] = await Promise.all([
          instance.get("/users/profile"),
          instance.get("/profile/education"),
          instance.get("/profile/experience")
        ]);

        setProfile(profRes.data);
        const fetchedSkills = profRes.data.skills ? profRes.data.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
        setSkills(fetchedSkills);
        setForm({
          username: profRes.data.username || "",
          headline: profRes.data.headline || "",
          bio: profRes.data.bio || "",
          phone: profRes.data.phone || "",
          location: profRes.data.location || "",
          website: profRes.data.website || "",
          resumeUrl: profRes.data.resumeUrl || "",
        });

        setEducation(eduRes.data);
        setExperience(expRes.data);
      } catch (err) {
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchAllData();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await instance.put("/users/profile", {
        ...form,
        skills: skills.join(", "),
      });
      setProfile(res.data);
      login({ ...user, username: res.data.username });
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill) => setSkills(skills.filter(s => s !== skill));

  const handleSaveEdu = async () => {
    try {
      const res = await instance.post("/profile/education", eduForm);
      setEducation([...education, res.data]);
      setShowEduModal(false);
      setEduForm({ institution: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "", description: "", current: false });
      toast.success("Education added!");
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
      toast.success("Experience added!");
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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a14] pb-20" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[30%] -right-[10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Education Modal */}
      <AnimatePresence>
        {showEduModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowEduModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl w-full max-w-lg p-8 z-10">
               <h3 className="text-2xl font-black mb-6">Add Education</h3>
               <div className="space-y-4">
                 <input placeholder="Institution (e.g. Stanford University)" value={eduForm.institution} onChange={e => setEduForm({...eduForm, institution: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />
                 <input placeholder="Degree (e.g. BSc Computer Science)" value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />
                 <input placeholder="Field of Study" value={eduForm.fieldOfStudy} onChange={e => setEduForm({...eduForm, fieldOfStudy: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />
                 <div className="flex gap-4">
                    <input placeholder="Start Year" value={eduForm.startYear} onChange={e => setEduForm({...eduForm, startYear: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />
                    {!eduForm.current && <input placeholder="End Year" value={eduForm.endYear} onChange={e => setEduForm({...eduForm, endYear: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />}
                 </div>
                 <label className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
                   <input type="checkbox" checked={eduForm.current} onChange={e => setEduForm({...eduForm, current: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> I currently study here
                 </label>
                 <button onClick={handleSaveEdu} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black transition-all">Save Education</button>
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Experience Modal */}
      <AnimatePresence>
        {showExpModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowExpModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl w-full max-w-lg p-8 z-10">
               <h3 className="text-2xl font-black mb-6">Add Experience</h3>
               <div className="space-y-4">
                 <input placeholder="Company (e.g. Google)" value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />
                 <input placeholder="Role (e.g. Senior Developer)" value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />
                 <input placeholder="Location" value={expForm.location} onChange={e => setExpForm({...expForm, location: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />
                 <div className="flex gap-4">
                    <input placeholder="Start Date (e.g. Jan 2022)" value={expForm.startDate} onChange={e => setExpForm({...expForm, startDate: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />
                    {!expForm.current && <input placeholder="End Date" value={expForm.endDate} onChange={e => setExpForm({...expForm, endDate: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none" />}
                 </div>
                 <label className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
                   <input type="checkbox" checked={expForm.current} onChange={e => setExpForm({...expForm, current: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> I currently work here
                 </label>
                 <textarea placeholder="Describe your responsibilities and achievements..." rows={3} value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none" />
                 <button onClick={handleSaveExp} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black transition-all">Save Experience</button>
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-8 pt-16">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-all mb-10">
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back
        </button>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-white dark:bg-[#111127] rounded-[2rem] animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Header Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="relative bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl overflow-hidden">
              {/* Cover Gradient */}
              <div className="h-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30"></div>
              </div>

              <div className="px-10 pb-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 -mt-12 mb-8">
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-black border-4 border-white dark:border-[#111127] shadow-xl overflow-hidden">
                    {profile?.pictureUrl ? (
                      <img src={profile.pictureUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      (profile?.username || "U")[0].toUpperCase()
                    )}
                  </div>

                  {/* Edit / Save Buttons */}
                  <div className="flex gap-3">
                    {editing ? (
                      <>
                        <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                          <FiX /> Cancel
                        </button>
                        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-black shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                          <FiSave /> {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </>
                    ) : (
                      <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-sm font-black transition-all border border-gray-200 dark:border-white/10">
                        <FiEdit3 /> Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                {/* Name & Headline */}
                {editing ? (
                  <div className="space-y-4 mb-6">
                    <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                      placeholder="Full Name"
                      className="text-3xl font-black w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-6 py-3 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500" />
                    <input value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })}
                      placeholder="Your professional headline (e.g. Senior Software Engineer at Google)"
                      className="text-base font-medium w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-6 py-3 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-500" />
                  </div>
                ) : (
                  <div className="mb-6">
                    <h1 className="text-4xl font-black mb-2">{profile?.username}</h1>
                    <p className="text-lg text-blue-500 font-bold">{profile?.headline || <span className="text-gray-400 italic font-medium text-base">Add a professional headline...</span>}</p>
                  </div>
                )}

                {/* Meta Info */}
                {editing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: "location", icon: FiMapPin, placeholder: "City, Country" },
                      { key: "phone", icon: FiPhone, placeholder: "Phone number" },
                      { key: "website", icon: FiGlobe, placeholder: "https://yourwebsite.com" },
                      { key: "resumeUrl", icon: FiLink, placeholder: "Resume URL (Google Drive, etc.)" },
                    ].map(({ key, icon: Icon, placeholder }) => (
                      <div key={key} className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 border border-gray-200 dark:border-white/10">
                        <Icon className="w-5 h-5 text-gray-400 shrink-0" />
                        <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                          placeholder={placeholder}
                          className="flex-1 text-sm font-medium bg-transparent focus:outline-none placeholder:text-gray-400" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-500 dark:text-gray-400">
                    {profile?.location && <span className="flex items-center gap-1.5"><FiMapPin />{profile.location}</span>}
                    {profile?.phone && <span className="flex items-center gap-1.5"><FiPhone />{profile.phone}</span>}
                    {profile?.website && <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-500 hover:underline"><FiGlobe />{profile.website}</a>}
                    {profile?.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-indigo-500 hover:underline"><FiLink />View Resume</a>}
                  </div>
                )}
              </div>
            </motion.div>

            {/* About / Bio */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl p-10">
              <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div> About Me
              </h2>
              {editing ? (
                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                  placeholder="Write a short bio about yourself, your experience, and what you're looking for..."
                  rows={5}
                  className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-6 py-4 text-sm font-medium leading-relaxed border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 resize-none" />
              ) : (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium text-base">
                  {profile?.bio || <span className="text-gray-400 italic">No bio yet. Click "Edit Profile" to add one.</span>}
                </p>
              )}
            </motion.div>

            {/* Experience Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl p-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div> Work Experience
                </h2>
                {editing && (
                  <button onClick={() => setShowExpModal(true)} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-xl transition-all">
                    <FiPlus /> Add
                  </button>
                )}
              </div>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-white/10 before:to-transparent">
                {experience.length === 0 ? (
                  <p className="text-gray-400 italic text-sm text-center">No experience added yet.</p>
                ) : (
                  experience.map((exp, i) => (
                    <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      {/* Timeline Dot */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#111127] bg-purple-500 text-white shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 shadow-sm z-10">
                        <FiBriefcase className="w-4 h-4" />
                      </div>
                      
                      {/* Content Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-black text-lg text-gray-900 dark:text-white">{exp.role}</h4>
                          {editing && (
                            <button onClick={() => handleDeleteExp(exp.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">{exp.company}</p>
                        <p className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-2">
                          <FiCalendar /> {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </p>
                        {exp.description && <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{exp.description}</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Education Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl p-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div> Education
                </h2>
                {editing && (
                  <button onClick={() => setShowEduModal(true)} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-xl transition-all">
                    <FiPlus /> Add
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {education.length === 0 ? (
                  <p className="text-gray-400 italic text-sm">No education added yet.</p>
                ) : (
                  education.map(edu => (
                    <div key={edu.id} className="flex gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 group">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <FiBook className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-black text-lg text-gray-900 dark:text-white">{edu.institution}</h4>
                            <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                            <p className="text-xs font-bold text-gray-400 mb-2">{edu.startYear} - {edu.current ? "Present" : edu.endYear}</p>
                          </div>
                          {editing && (
                            <button onClick={() => handleDeleteEdu(edu.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-white dark:bg-[#111127] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl p-10">
              <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div> Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {skills.map(skill => (
                  <span key={skill} className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-sm font-bold rounded-2xl border border-blue-200 dark:border-blue-500/20">
                    {skill}
                    {editing && <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors"><FiX className="w-3.5 h-3.5" /></button>}
                  </span>
                ))}
                {skills.length === 0 && !editing && <p className="text-gray-400 italic text-sm">No skills added yet.</p>}
              </div>

              {editing && (
                <div className="mt-6">
                  <div className="flex gap-3 mb-4">
                    <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill(skillInput))}
                      placeholder="Type a skill and press Enter..."
                      className="flex-1 bg-gray-50 dark:bg-white/5 rounded-2xl px-6 py-3 text-sm font-medium border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500" />
                    <button onClick={() => addSkill(skillInput)}
                      className="px-6 py-3 bg-blue-600 text-white text-sm font-black rounded-2xl hover:bg-blue-700 transition-all">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <p className="w-full text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Quick Add:</p>
                    {SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).slice(0, 8).map(s => (
                      <button key={s} onClick={() => addSkill(s)}
                        className="px-3 py-1.5 text-xs font-bold rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 transition-all border border-gray-200 dark:border-white/10">
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
