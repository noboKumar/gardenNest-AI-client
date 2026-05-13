"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Sprout } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GardenData {
  id: number;
  image: string;
  title: string;
  location: string;
  gardener: string;
  type: string;
  description: string;
}

export const GardenOfTheMonth = () => {
  const [gardens, setGardens] = useState<GardenData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/gardenOfTheMonth.json")
      .then((res) => res.json())
      .then((data) => {
        setGardens(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading garden data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Skeleton className="h-[400px] w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <section className="py-20 bg-green-50/50 dark:bg-green-950/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="text-green-600 border-green-200 dark:border-green-800 mb-2">
            Showcase
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Garden Of The Month
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover the most beautiful and inspiring gardens from our community members.
          </p>
        </motion.div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border bg-background border-green-100 dark:border-green-900">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={gardens.length > 1}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            className="h-full"
          >
            {gardens.map((garden) => (
              <SwiperSlide key={garden.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-[300px] md:h-[500px]">
                    <Image
                      src={garden.image}
                      alt={garden.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="space-y-4"
                    >
                      <h3 className="text-3xl md:text-4xl font-extrabold text-green-700 dark:text-green-500">
                        {garden.title}
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">{garden.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">{garden.gardener}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Sprout className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">{garden.type}</span>
                        </div>
                      </div>

                      <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-green-500 pl-4 py-2">
                        {garden.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #16a34a !important;
          background: rgba(255, 255, 255, 0.8);
          width: 44px !important;
          height: 44px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};
