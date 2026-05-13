"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sprout, Users, Leaf, Award } from "lucide-react";

const stats = [
  { label: "Gardeners Joined", value: "12,000+", icon: Users, color: "text-blue-600" },
  { label: "Tips Shared", value: "45,000+", icon: Sprout, color: "text-green-600" },
  { label: "Sustainable Gardens", value: "8,500+", icon: Leaf, color: "text-emerald-600" },
  { label: "AI Tips Generated", value: "150,000+", icon: Award, color: "text-purple-600" },
];

export function GardenStats() {
  return (
    <section className="py-20 bg-green-50/50 dark:bg-green-950/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-3"
            >
              <div className="mx-auto w-16 h-16 bg-white dark:bg-green-900 rounded-2xl shadow-lg flex items-center justify-center">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-foreground">{stat.value}</h3>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
