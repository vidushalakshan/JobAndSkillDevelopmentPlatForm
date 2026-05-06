import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context";
import instance from "../service/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser, FiMapPin, FiPhone, FiGlobe, FiBriefcase,
  FiEdit3, FiSave, FiX, FiArrowLeft, FiAward, FiLink
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

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get("/users/profile");
        setProfile(res.data);
        const fetchedSkills = res.data.skills ? res.data.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
        setSkills(fetchedSkills);
        setForm({
          username: res.data.username || "",
          headline: res.data.headline || "",
          bio: res.data.bio || "",
          phone: res.data.phone || "",
          location: res.data.location || "",
          website: res.data.website || "",
          resumeUrl: res.data.resumeUrl || "",
        });
      } catch (err) {
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProfile();
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a14] pb-20" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[30%] -right-[10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
      </div>

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

            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
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

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "Profile Views", value: "—", icon: FiUser, color: "text-blue-500" },
                { label: "Skills Listed", value: skills.length, icon: FiAward, color: "text-indigo-500" },
                { label: "Member Since", value: "2026", icon: FiBriefcase, color: "text-purple-500" },
              ].map((stat, i) => (
                <div key={stat.label} className="bg-white dark:bg-[#111127] rounded-[2rem] border border-gray-100 dark:border-white/5 p-8 shadow-xl">
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                  <div className="text-4xl font-black mb-1">{stat.value}</div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
