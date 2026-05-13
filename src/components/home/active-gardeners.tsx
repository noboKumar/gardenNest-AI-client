"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const staticGardeners = [
  {
    _id: "1",
    name: "Dr. Sarah Green",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    specialty: "Urban Permaculture",
  },
  {
    _id: "2",
    name: "James Root",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    specialty: "Organic Composting",
  },
  {
    _id: "3",
    name: "Elena Moss",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    specialty: "Indoor Succulents",
  },
  {
    _id: "4",
    name: "Marcus Thorn",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    specialty: "Hydroponics Expert",
  },
  {
    _id: "5",
    name: "Lily Bloom",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    specialty: "Floral Design",
  },
  {
    _id: "6",
    name: "Oliver Branch",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    specialty: "Orchard Management",
  }
];

export const ActiveGardeners = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-green-700 dark:text-green-500 text-center w-full">
            Active Gardeners
          </h2>
          <div className="h-1 w-24 bg-green-500 mx-auto mt-4 rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Meet our most dedicated contributors who share their passion and knowledge with the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {staticGardeners.map((gardener, index) => (
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
                  <AvatarFallback>{gardener.name?.charAt(0)}</AvatarFallback>
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
