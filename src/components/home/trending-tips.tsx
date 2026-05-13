"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TrendingTip {
  _id: string;
  imageURL: string;
  title: string;
  description: string;
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-end justify-between"
        >
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold text-green-700 dark:text-green-500">
              Trending Tips
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Check out the most popular gardening advice from our community experts.
            </p>
          </div>
          <Button variant="ghost" className="text-green-600 dark:text-green-400 font-bold" asChild>
            <Link href="/browse-tips">View All Tips</Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))
            : tips.map((tip, index) => (
                <motion.div
                  key={tip._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col group overflow-hidden border-green-100 dark:border-green-950 transition-all hover:shadow-xl hover:border-green-300 dark:hover:border-green-800">
                    <CardHeader className="p-0 relative aspect-video overflow-hidden">
                      <Image
                        src={tip.imageURL || "https://images.unsplash.com/photo-1416870230247-3b4a80247961"}
                        alt={tip.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-md flex items-center gap-1">
                          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                          {tip.likedBy?.length || 0}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <h3 className="text-lg font-bold line-clamp-1 mb-2 group-hover:text-green-600 transition-colors">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {tip.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" className="mt-5 w-full border-green-200 dark:border-green-900 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-all" asChild>
                        <Link href={`/browse-tips/${tip._id}`}>Read More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};
