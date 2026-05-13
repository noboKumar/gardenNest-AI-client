import React, { use, useState } from "react";
import { Helmet } from "react-helmet";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import moment from "moment";

const BrowseTipsDetails = () => {
  const {
    category,
    description,
    imageURL,
    level,
    title,
    type,
    _id,
    likedBy,
    createdAt,
  } = useLoaderData();
  const { user } = use(AuthContext);
  const userEmail = user.email;
  const [likeCount, setLikeCount] = useState(likedBy?.length || 0);
  const [isLiked, setIsLiked] = useState(likedBy?.includes(userEmail));
  const postTime = moment(createdAt).format("DD/MM/YYYY");

  const handleLikeButton = () => {
    fetch(`https://ph-assignment-10-server-pi.vercel.app/tips/${_id}/like`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setLikeCount(likeCount + 1);
          setIsLiked(true);
        }
      });
  };
  return (
    <div className="max-w-5xl mx-auto border-2 border-secondary bg-base-200 space-y-4 px-4 sm:px-10 py-5 rounded-2xl">
      <Helmet>
        <title>Garden Nest | Tips Details</title>
      </Helmet>
      <h1 className="text-4xl font-semibold mb-2 text-center">Tips Details:</h1>
      <div className="space-y-5">
        <div className="flex justify-center">
          <img
            className="rounded-3xl object-cover mx-auto w-full max-w-5xl h-64 sm:h-80 md:h-96"
            src={
              imageURL ||
              "https://i.ibb.co/0pmKb7y2/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-8.jpg"
            }
            alt={title}
          />
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-semibold text-secondary text-center">
              {title}
            </h1>
            <p className="text-center">Posted at: {postTime}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            <span className="badge badge-lg badge-outline">
              <span className="font-bold">Level:</span> {level}
            </span>
            <span className="badge badge-lg badge-outline">
              <span className="font-bold">Category:</span> {category}
            </span>
            <span className="badge badge-lg badge-outline">
              <span className="font-bold">Type:</span> {type}
            </span>
          </div>
          <p className="md:text-2xl max-w-3xl mx-auto text-center ">
            {description}
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLikeButton}
              className="flex items-center gap-2 btn text-xl text-secondary bg-base-200 border-secondary"
              disabled={isLiked}
              title={isLiked ? "You already liked this tip" : "Like this tip"}
            >
              {isLiked ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
              Like {likeCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseTipsDetails;
