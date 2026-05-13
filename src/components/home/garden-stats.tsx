"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Users, Leaf, Award } from "lucide-react";

const stats = [
  { label: "Gardeners Joined",  end: 12000,  suffix: "+", icon: Users,  color: "text-blue-600",    bg: "bg-blue-50 dark:bg-blue-950/30" },
  { label: "Tips Shared",       end: 45000,  suffix: "+", icon: Sprout, color: "text-green-600",   bg: "bg-green-50 dark:bg-green-950/30" },
  { label: "Sustainable Gardens", end: 8500, suffix: "+", icon: Leaf,   color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { label: "AI Tips Generated", end: 150000, suffix: "+", icon: Award,  color: "text-purple-600",  bg: "bg-purple-50 dark:bg-purple-950/30" },
];

function useCountUp(end: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return count;
}

function StatCard({ stat, index, started }: { stat: typeof stats[0]; index: number; started: boolean }) {
  const count = useCountUp(stat.end, 2000, started);

  const formatted = count >= 1000
    ? count >= 100000
      ? `${Math.floor(count / 1000)}k`
      : `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k`
    : count.toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center space-y-4"
    >
      <div className={`mx-auto w-16 h-16 ${stat.bg} rounded-2xl shadow-md flex items-center justify-center`}>
        <stat.icon className={`w-8 h-8 ${stat.color}`} />
      </div>
      <div>
        <h3 className="text-3xl md:text-5xl font-black text-foreground tabular-nums">
          {started ? `${formatted}${stat.suffix}` : "0"}
        </h3>
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mt-1">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export function GardenStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect(); // fire only once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section className="py-20 bg-green-50/50 dark:bg-green-950/10" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
