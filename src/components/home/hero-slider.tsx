"use client";

import React from "react";
import Image from "next/image";
import slider1 from "@/assets/slider-1.jpg";
import slider2 from "@/assets/slider2.jpg";
import slider3 from "@/assets/slider-3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const sliderData = [
  {
    imgUrl: slider1,
    title: "Urban Gardening Expo 2025",
    subtitle: "Rooftop Celebration",
    description:
      "Get ready for the largest urban gardening event of the year — Urban Gardening Expo 2025! This three-day celebration brings together garden enthusiasts, sustainability advocates, and green-tech innovators.",
  },
  {
    imgUrl: slider2,
    title: "Tree Planting Drive",
    subtitle: "Citywide Initiative",
    description:
      "Join the movement to green our city—one tree at a time. In celebration of Earth Day, we’re organizing a citywide planting initiative that starts at Gulshan Lake Park.",
  },
  {
    imgUrl: slider3,
    title: "Green Roof Meetup",
    subtitle: "Sky-High Gardening",
    description:
      "Explore the sky-high world of rooftop gardening at the Green Roof Meetup — an inspiring, hands-on gathering of urban garden lovers!",
  },
];

export const HeroSlider = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        className="h-[500px] md:h-[700px] group"
      >
        {sliderData.map((slider, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slider.imgUrl}
                alt={slider.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="container px-4 mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl text-white space-y-6"
                  >
                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-600 text-xs font-bold uppercase tracking-wider">
                        {slider.subtitle}
                      </span>
                      <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
                        {slider.title}
                      </h1>
                    </div>
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
                      {slider.description}
                    </p>
                    <div className="flex gap-4 pt-4">
                      <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 rounded-full transition-transform hover:scale-105">
                        Join Event Now
                      </Button>
                      <Button variant="outline" size="lg" className="rounded-full border-white text-black hover:bg-white transition-all">
                        Learn More
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
