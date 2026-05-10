import React from "react";
import { motion } from "framer-motion";

const CallToAction = ({ navigate }) => {
  return (
    <section className="py-52 px-6 relative overflow-hidden bg-[#020408]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-6xl mx-auto rounded-[4rem] p-16 md:p-32 bg-white/[0.01] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden text-center group"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-14 tracking-tighter leading-none uppercase">
            Ready to become a <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">specialist?</span>
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="relative overflow-hidden inline-flex items-center justify-center px-16 py-8 rounded-[2rem] bg-white text-blue-600 font-black text-xl shadow-2xl transition-all uppercase tracking-widest"
          >
            <span className="relative z-10">Join the Ecosystem</span>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-out_infinite]" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
