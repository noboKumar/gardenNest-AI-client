import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router";

const TopTrendingTipsCard = ({ trending }) => {
  const { imageURL, title, description, likedBy, _id } = trending;
  return (
    <div className="flex flex-col border-2 border-secondary bg-base-200 rounded-2xl px-5 py-4 shadow-sm ">
      {imageURL && (
        <img
          className="h-40 object-cover rounded-2xl mx-auto"
          src={imageURL}
          alt="trending tips photo"
        />
      )}
      <h1 className="text-2xl text-center mt-2">{title}</h1>
      <div className="flex items-center gap-2 mt-2">
        <FaRegHeart />
        <div>
          <span className="font-bold">Total Liked: </span>
          {likedBy?.length}
        </div>
      </div>
      <p className="line-clamp-3 grow">{description}</p>
      <Link
        to={`/BrowseTips/${_id}`}
        className="btn btn-outline btn-secondary mt-auto"
      >
        See More
      </Link>
    </div>
  );
};

export default TopTrendingTipsCard;
