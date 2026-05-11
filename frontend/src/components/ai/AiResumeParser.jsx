import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, FileText, CheckCircle2, AlertCircle, Loader2, Save } from 'lucide-react';
import axios from '../../service/axios';

const AiResumeParser = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const [syncSuccess, setSyncSuccess] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first");
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8081/api/ai/parse-resume', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to parse resume');

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSyncToProfile = async () => {
        if (!data) return;
        setSyncing(true);
        setError(null);
        
        try {
            await axios.put('/users/profile', {
                headline: "AI Extracted Profile",
                bio: data.summary,
                location: data.location,
                skills: data.skills?.join(", ") || ""
            });

            if (data.experiences) {
                for (const exp of data.experiences) {
                    await axios.post('/profile/experience', {
                        company: exp.company,
                        role: exp.role,
                        description: exp.description,
                        startDate: exp.duration?.split("-")[0]?.trim() || exp.duration,
                        endDate: exp.duration?.split("-")[1]?.trim() || "",
                        current: exp.duration?.toLowerCase().includes("present")
                    });
                }
            }

            if (data.educations) {
                for (const edu of data.educations) {
                    await axios.post('/profile/education', {
                        institution: edu.institution,
                        degree: edu.degree,
                        startYear: edu.year,
                        endYear: edu.year
                    });
                }
            }

            setSyncSuccess(true);
            setTimeout(() => setSyncSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to sync profile");
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className="pt-24 pb-12 px-6 bg-[#050508]">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} /> Next-Gen AI Integration
                    </motion.div>
                    <h1 className="text-5xl font-black bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent italic uppercase tracking-tighter mb-4">
                        AI Resume Architect
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        Transform your static PDF resume into a high-performance digital profile using advanced language models.
                    </p>
                </div>

                {!data ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0d0d15] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-16 text-center shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-50" />
                        
                        <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-16 transition-all hover:border-purple-500/30 hover:bg-white/[0.02] group">
                            <input
                                type="file"
                                id="resume-upload"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.txt"
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer">
                                <div className="bg-purple-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <Upload className="text-purple-400 w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {file ? file.name : "Drop your resume here"}
                                </h3>
                                <p className="text-gray-500">Supports PDF and Text formats</p>
                            </label>
                        </div>

                        {error && (
                            <div className="mt-6 flex items-center gap-2 text-red-400 justify-center">
                                <AlertCircle size={20} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            onClick={handleUpload}
                            disabled={loading || !file}
                            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed px-12 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <Sparkles size={20} />
                            )}
                            {loading ? "Analyzing with AI..." : "Extract Data"}
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="bg-[#0d0d15] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600" />
                            
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                                <div>
                                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">{data.fullName}</h2>
                                    <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
                                        <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">{data.email}</span>
                                        <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">{data.location}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setData(null)}
                                    className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:border-white transition-all"
                                >
                                    Upload New
                                </button>
                            </div>

                            <div className="mb-12">
                                <h3 className="text-[10px] font-black tracking-[0.2em] text-blue-500 italic uppercase mb-4">PROFESSIONAL DOSSIER</h3>
                                <p className="text-slate-400 leading-relaxed font-medium text-lg italic">"{data.summary}"</p>
                            </div>

                            <div className="mb-12">
                                <h3 className="text-[10px] font-black tracking-[0.2em] text-blue-500 italic uppercase mb-6">SKILL MATRIX</h3>
                                <div className="flex flex-wrap gap-3">
                                    {data.skills?.map((skill, i) => (
                                        <motion.span 
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            className="bg-white/5 text-white px-6 py-2.5 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest hover:border-purple-500/50 transition-all"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-[10px] font-black tracking-[0.2em] text-blue-500 italic uppercase mb-8 flex items-center gap-3">
                                        <FileText size={16} /> OPERATIONAL EXPERIENCE
                                    </h3>
                                    <div className="space-y-10">
                                        {data.experiences?.map((exp, i) => (
                                            <div key={i} className="relative pl-8 border-l border-white/10">
                                                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                                <h4 className="font-black text-white italic uppercase tracking-tighter text-xl mb-1">{exp.role}</h4>
                                                <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-4">{exp.company} • {exp.duration}</p>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black tracking-[0.2em] text-blue-500 italic uppercase mb-8 flex items-center gap-3">
                                        <CheckCircle2 size={16} /> EDUCATIONAL FOUNDATION
                                    </h3>
                                    <div className="space-y-10">
                                        {data.educations?.map((edu, i) => (
                                            <div key={i} className="relative pl-8 border-l border-white/10">
                                                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
                                                <h4 className="font-black text-white italic uppercase tracking-tighter text-xl mb-1">{edu.degree}</h4>
                                                <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-2">{edu.institution}</p>
                                                <p className="text-xs text-slate-500 font-black uppercase">{edu.year}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-6 mt-8">
                            <button 
                                onClick={handleSyncToProfile}
                                disabled={syncing}
                                className="flex-1 bg-white text-black py-6 rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all transform hover:scale-[1.02] shadow-2xl shadow-white/5 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {syncing ? <Loader2 className="animate-spin" /> : (syncSuccess ? <CheckCircle2 className="text-green-500" /> : <Save size={16} />)}
                                {syncing ? "SYNCING..." : (syncSuccess ? "SYNCED SUCCESSFULLY" : "SYNC TO PROFILE")}
                            </button>
                            <button 
                                onClick={() => setData(null)}
                                className="flex-1 bg-white/5 hover:bg-white/10 py-6 rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all border border-white/10 text-slate-400"
                            >
                                DISCARD
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AiResumeParser;
