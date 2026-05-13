"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Heart, ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TrendingTip {
  _id: string;
  imageURL: string;
  title: string;
  description: string;
  category: string;
  level: string;
  likedBy: string[];
}

export const TrendingTips = () => {
  const [tips, setTips] = useState<TrendingTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/trendingTips`);
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching trending tips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/30 text-red-500 text-xs font-black uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5" />
              Community Favourites
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Trending <span className="text-green-600 dark:text-green-400">Tips</span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              The most loved gardening wisdom from our community — tried, tested, and approved.
            </p>
          </div>
          <Button variant="ghost" className="text-green-600 dark:text-green-400 font-bold gap-2 hover:gap-3 transition-all group self-start md:self-auto" asChild>
            <Link href="/browse-tips">
              View All Tips
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-52 w-full rounded-2xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))
            : tips.slice(0, 4).map((tip, index) => (
                <motion.div
                  key={tip._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/browse-tips/${tip._id}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-green-300 dark:hover:border-green-700 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden flex-shrink-0">
                        <Image
                          src={tip.imageURL || "https://images.unsplash.com/photo-1416870230247-3b4a80247961"}
                          alt={tip.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {/* Badges on image */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {tip.category && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded-full">
                              {tip.category}
                            </span>
                          )}
                        </div>

                        {/* Like count on image */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-md rounded-full px-2 py-1">
                          <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                          <span className="text-[10px] font-bold text-white">{tip.likedBy?.length || 0}</span>
                        </div>

                        {/* Title overlay at bottom of image */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white font-bold text-base leading-snug line-clamp-2 drop-shadow">
                            {tip.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 flex flex-col flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-grow">
                          {tip.description}
                        </p>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                          <Badge
                            variant="secondary"
                            className={
                              tip.level === "Easy"
                                ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-none text-[10px] font-bold"
                                : tip.level === "Medium"
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-none text-[10px] font-bold"
                                : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-none text-[10px] font-bold"
                            }
                          >
                            {tip.level || "Easy"}
                          </Badge>
                          <span className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read more <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};
