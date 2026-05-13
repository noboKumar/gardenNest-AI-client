import React from "react";
import { Helmet } from "react-helmet";
import Slider from "../Components/Slider";
import ActiveGardener from "../Components/ActiveGardener";
import TopTrendingTips from "../Components/TopTrendingTips";
import GardenOfTheMonth from "../Components/GardenOfTheMonth";
import UpcomingEvents from "../Components/UpcomingEvents";
import JoinEventModal from "../Components/JoinEventModal";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Garden Nest | Home</title>
      </Helmet>
      <Slider></Slider>
      <ActiveGardener></ActiveGardener>
      <TopTrendingTips></TopTrendingTips>
      <GardenOfTheMonth></GardenOfTheMonth>
      <UpcomingEvents></UpcomingEvents>
      <JoinEventModal />
    </div>
  );
};

export default Home;
