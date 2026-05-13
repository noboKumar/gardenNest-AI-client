import React from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Link } from "react-router";

const ExploreGardenersCard = ({ gardner }) => {
  const { _id, name, image, specialty, totalSharedTips, status } = gardner;
  return (
    <div className="rounded-2xl border-2 border-secondary bg-base-200 shadow-sm px-6 py-8 flex flex-col items-center gap-4">
      <div
        className={`avatar ${
          status === "Active" ? "avatar-online" : "avatar-offline"
        }`}
      >
        <div className="w-36 h-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 overflow-hidden mx-auto">
          <img
            src={image}
            alt={`${name} photo`}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold text-secondary text-center mt-2">
        {name}
      </h1>

      <div className="w-full">
        <h3 className="text-lg font-semibold mb-1 text-base-content text-center">
          {specialty}
        </h3>
      </div>

      <div className="flex items-center gap-2 bg-base-300 px-6 py-1 rounded-2xl w-fit mb-2">
        <HiOutlineLightBulb size={22} />
        <span className="text-base">Total Tips Shared: {totalSharedTips}</span>
      </div>

      <div className="w-full">
        <Link
          to={`/ExploreGardeners/${_id}`}
          className="btn btn-secondary btn-block text-white font-semibold mt-2"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ExploreGardenersCard;
