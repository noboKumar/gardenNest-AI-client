import React from "react";
import { Helmet } from "react-helmet";
import { PiPlantFill } from "react-icons/pi";
import { useLoaderData } from "react-router";
import ExploreGardenersCard from "./ExploregardenersCard";

const ExploreGardeners = () => {
  const userData = useLoaderData();

  return (
    <div>
      <Helmet>
        <title>Garden Nest | Explore Gardeners</title>
      </Helmet>
      <div className="space-y-5">
        <div className="flex items-center gap-2 justify-center text-secondary">
          <PiPlantFill size={35} />
          <h1 className="text-2xl md:text-4xl font-semibold">
            Explore Gardeners:
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {userData.map((gardner) => (
            <ExploreGardenersCard
              key={gardner._id}
              gardner={gardner}
            ></ExploreGardenersCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreGardeners;
