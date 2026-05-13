"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface Gardener {
  _id: string;
  image: string;
  name: string;
  specialty: string;
}

export const ActiveGardeners = () => {
  const [gardeners, setGardeners] = useState<Gardener[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ph-assignment-10-server-pi.vercel.app/activeusers");
        setGardeners(response.data);
      } catch (error) {
        console.error("Error fetching active users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-green-700 dark:text-green-500">
            Active Gardeners
          </h2>
          <div className="h-1 w-24 bg-green-500 mx-auto mt-4 rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Meet our most dedicated contributors who share their passion and knowledge with the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-4">
                  <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))
            : gardeners.map((gardener, index) => (
                <motion.div
                  key={gardener._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center group"
                >
                  <div className="relative p-1 rounded-full border-2 border-green-500 transition-all group-hover:border-green-600 shadow-lg mb-4">
                    <Avatar className="h-24 w-24 md:h-32 md:w-32">
                      <AvatarImage src={gardener.image} alt={gardener.name} className="object-cover" />
                      <AvatarFallback>{gardener.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-green-600 transition-colors">
                    {gardener.name}
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    {gardener.specialty}
                  </p>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};
