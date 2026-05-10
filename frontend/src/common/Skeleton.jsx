import React from "react";
import { motion } from "framer-motion";

const Skeleton = ({ className }) => (
  <div className={`bg-white/[0.03] animate-pulse rounded-2xl ${className}`} />
);

export const SkeletonCard = () => (
  <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-6">
    <div className="flex justify-between items-start">
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <Skeleton className="w-24 h-6 rounded-full" />
    </div>
    <div className="space-y-3">
      <Skeleton className="w-3/4 h-8" />
      <Skeleton className="w-1/2 h-4" />
    </div>
    <div className="pt-8 border-t border-white/5 flex justify-between">
      <Skeleton className="w-20 h-6" />
      <Skeleton className="w-24 h-10 rounded-xl" />
    </div>
  </div>
);

export const SkeletonRow = () => (
  <div className="flex items-center justify-between p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] mb-4">
    <div className="flex items-center gap-6">
      <Skeleton className="w-14 h-14 rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="w-48 h-6" />
        <Skeleton className="w-24 h-3" />
      </div>
    </div>
    <div className="flex items-center gap-10">
      <Skeleton className="w-32 h-2 rounded-full" />
      <Skeleton className="w-12 h-12 rounded-xl" />
    </div>
  </div>
);

export default Skeleton;
