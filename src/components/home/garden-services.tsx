"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Droplets, Wind, Sun, Bug, Scissors } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const categories = [
  { 
    title: "Organic Gardening", 
    desc: "Learn to grow without synthetic chemicals using nature's own methods.", 
    icon: Sprout,
    color: "bg-green-100 text-green-700"
  },
  { 
    title: "Hydroponics", 
    desc: "Master the art of soil-less farming for faster growth and higher yields.", 
    icon: Droplets,
    color: "bg-blue-100 text-blue-700"
  },
  { 
    title: "Composting", 
    desc: "Turn your waste into black gold with our expert composting guides.", 
    icon: Box,
    color: "bg-amber-100 text-amber-700"
  },
  { 
    title: "Pest Management", 
    desc: "Identify and control garden pests using integrated organic strategies.", 
    icon: Bug,
    color: "bg-red-100 text-red-700"
  },
  { 
    title: "Urban Farming", 
    desc: "Small space? No problem. Grow big in balconies and tiny backyards.", 
    icon: Sun,
    color: "bg-orange-100 text-orange-700"
  },
  { 
    title: "Pruning & Care", 
    desc: "Seasonal maintenance tips to keep your plants healthy and beautiful.", 
    icon: Scissors,
    color: "bg-purple-100 text-purple-700"
  },
];

import { Sprout } from "lucide-react";

export function GardenServices() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-foreground">Specialized Expertise</h2>
          <p className="text-muted-foreground">From soil preparation to vertical farming, explore categories curated by our AI and human experts.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={`p-3 rounded-2xl ${cat.color} group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold">{cat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{cat.desc}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
