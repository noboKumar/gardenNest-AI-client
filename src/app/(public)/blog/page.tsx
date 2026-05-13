"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Gardening",
    desc: "How machine learning is helping gardeners predict soil health and plant diseases.",
    author: "GardenNest Tech",
    date: "May 10, 2026",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1530836361253-ee294028ec52"
  },
  {
    id: 2,
    title: "10 Essential Tools for Urban Gardeners",
    desc: "Maximize your small space with these versatile and space-saving gardening tools.",
    author: "Master Gardener",
    date: "May 8, 2026",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b"
  },
  {
    id: 3,
    title: "Sustainable Composting: A Beginner's Guide",
    desc: "Turn your kitchen scraps into nutritional gold for your garden with zero waste.",
    author: "Soil Expert",
    date: "May 5, 2026",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e17"
  }
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3 h-3" />
          Garden Insights
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Our <span className="text-green-600">Blog</span></h1>
        <p className="text-muted-foreground text-lg italic">"Wisdom from the roots of the community."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all h-full flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border-none text-white font-bold">
                  {post.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</div>
                  <div className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</div>
                </div>
                <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href="#" className="inline-flex items-center gap-2 text-green-600 font-bold text-sm hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
