import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../../common/Button";

const HeroSection = ({ bgOpacity, textY, textOpacity, user, navigate }) => {
  return (
    <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 backdrop-blur-md text-blue-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-10"
        >
          <SparklesIcon className="w-4 h-4" /> The Future of Career Flow
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8 text-white uppercase"
        >
          Architect Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500">Digital Destiny.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium"
        >
          Professional-grade laboratories. Direct industry pipelines. <br />
          The elite standard for IT career evolution.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-center gap-8 items-center">
          <Button variant="primary" className="!px-10 !py-5 rounded-full" onClick={() => navigate(user ? "/courses" : "/signup")}>
            Begin Journey <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
