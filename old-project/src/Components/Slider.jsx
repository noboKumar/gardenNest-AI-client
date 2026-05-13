import React from "react";
import slider1 from "../assets/slider-1.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider-3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";

const sliderData = [
  {
    imgUrl: slider1,
    title: "Urban Gardening Expo 2025",
    description:
      "Get ready for the largest urban gardening event of the year — Urban Gardening Expo 2025! This three-day celebration brings together garden enthusiasts, sustainability advocates, and green-tech innovators on one vibrant rooftop. Whether you're just starting your indoor plant journey or you're a seasoned vertical gardener, this expo offers something for everyone.",
  },
  {
    imgUrl: slider2,
    title: "Tree Planting Drive",
    description:
      "Join the movement to green our city—one tree at a time—with the Tree Planting Drive hosted by GardenNest. In celebration of Earth Day, we’re organizing a citywide planting initiative that starts at Gulshan Lake Park and extends to residential rooftops, school yards, and community gardens. Our goal: plant over 500 trees and inspire long-term care for urban flora.",
  },
  {
    imgUrl: slider3,
    title: "Green Roof Meetup",
    description:
      "Explore the sky-high world of rooftop gardening at the Green Roof Meetup — an inspiring, hands-on gathering of urban garden lovers! This exclusive event brings together DIY rooftop gardeners, eco-designers, architects, and community planners to exchange ideas, share plant stories, and inspire rooftop transformations.",
  },
];

const Slider = () => {
  return (
    <div className="relative md:w-full">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, Keyboard]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        keyboard={{ enabled: true }}
      >
        {sliderData.map((slider, index) => (
          <SwiperSlide key={index}>
            <div>
              <img
                className="w-full h-[300px] md:h-[500px] rounded-2xl object-center object-cover"
                src={slider.imgUrl}
                alt="slider-images"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/60 rounded-2xl"></div>
              <div className="absolute top-20 left-5 md:top-3/7 md:left-20 z-10 text-white w-4/6 md:w-6/12 space-y-2 md:space-y-5 text-shadow-2xs">
                <h1 className="md:text-4xl text-2xl font-bold">
                  {slider.title}
                </h1>
                <p className="md:text-xl line-clamp-3 md:line-clamp-5">
                  {slider.description}
                </p>
                <button
                  onClick={() =>
                    document.getElementById("join_event_modal").showModal()
                  }
                  className="btn bg-secondary border-none shadow text-white"
                >
                  Join Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
