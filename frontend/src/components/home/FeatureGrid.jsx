import React from "react";
import { motion } from "framer-motion";
import { 
  RocketLaunchIcon, ComputerDesktopIcon, 
  ShieldCheckIcon, BeakerIcon 
} from "@heroicons/react/24/outline";

const BentoCard = ({ className, icon: Icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 overflow-hidden hover:border-blue-500/30 transition-all ${className}`}
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-blue-600/10 transition-colors" />
    <div className="relative z-10 h-full flex flex-col justify-end">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter leading-none">{title}</h4>
      <p className="text-slate-500 font-medium leading-relaxed max-w-xs">{desc}</p>
    </div>
  </motion.div>
);

const FeatureGrid = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative z-20">
      <div className="mb-20">
        <h2 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Core Ecosystem</h2>
        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Beyond Just Learning.</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        <BentoCard 
          className="md:col-span-3 md:row-span-2"
          icon={RocketLaunchIcon}
          title="Direct Industry Pipes"
          desc="Proprietary recruitment channels connecting our graduates to Tier-1 tech giants."
        />
        <BentoCard 
          className="md:col-span-3 md:row-span-1"
          icon={ComputerDesktopIcon}
          title="Simulated Environments"
          desc="Real-world sandbox labs that mirror actual enterprise production stacks."
          delay={0.2}
        />
        <BentoCard 
          className="md:col-span-1.5 md:row-span-1"
          icon={ShieldCheckIcon}
          title="Verified"
          desc="Blockchain-backed certification."
          delay={0.4}
        />
        <BentoCard 
          className="md:col-span-1.5 md:row-span-1"
          icon={BeakerIcon}
          title="Labs"
          desc="R&D focused modules."
          delay={0.6}
        />
      </div>
    </section>
  );
};

export default FeatureGrid;
