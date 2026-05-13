import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { PiPottedPlantBold } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";

const BrowseTipsCards = () => {
  const initialTips = useLoaderData();
  const [browseTips, setBrowseTips] = useState(initialTips);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortOrder, setSortOrder] = useState("new");

  useEffect(() => {
    if (selectedLevel) {
      fetch(
        `https://ph-assignment-10-server-pi.vercel.app/tips/${selectedLevel}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBrowseTips(data);
        });
    } else {
      setBrowseTips(initialTips);
      fetch("https://ph-assignment-10-server-pi.vercel.app/sortedTips", {
        headers: {
          "sort-order": sortOrder,
        },
      })
        .then((res) => res.json())
        .then((data) => setBrowseTips(data));
    }
  }, [selectedLevel, initialTips, sortOrder]);

  const handleFiltering = (e) => {
    const level = e.target.value;
    setSelectedLevel(level);
  };
  const handleSorting = (e) => {
    const sort = e.target.value;
    setSortOrder(sort);
  };
  return (
    <div className="space-y-5">
      <Helmet>
        <title>Garden Nest | Browse Tips</title>
      </Helmet>
      <div className="flex items-center gap-2 justify-center text-secondary">
        <PiPottedPlantBold size={35} />
        <h1 className="text-4xl font-semibold">Browse Tips:</h1>
      </div>
      <div className="text-center flex justify-center gap-5">
        <form>
          <select
            onChange={handleFiltering}
            defaultValue={selectedLevel}
            className="select bg-base-300"
          >
            <option value={""} disabled={true}>
              Filter by Level
            </option>
            <option value={"Easy"}>Easy</option>
            <option value={"Medium"}>Medium</option>
            <option value={"Hard"}>Hard</option>
          </select>
        </form>
        <form>
          <select
            onChange={handleSorting}
            defaultValue={selectedLevel}
            className="select bg-base-300"
          >
            <option value={"new"}>Newest</option>
            <option value={"old"}>Oldest</option>
          </select>
        </form>
      </div>
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {browseTips.map((tip) => (
          <div
            key={tip._id}
            className="flex flex-col bg-base-200 border-2 border-base-300 rounded-xl shadow-sm p-5"
          >
            <img
              className="h-56 w-full object-cover rounded-lg mb-4"
              src={
                tip.imageURL ||
                "https://i.ibb.co/0pmKb7y2/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-8.jpg"
              }
              alt={tip.title}
            />
            <div className="mb-2 flex-1">
              <h3 className="text-xl font-bold mb-1">{tip.title}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="badge badge-outline ">{tip.level}</span>
                <span className="badge badge-outline">{tip.category}</span>
              </div>
              <p className="line-clamp-3">{tip.description}</p>
            </div>
            <Link to={`/BrowseTips/${tip._id}`} className="mt-auto">
              <button className="btn btn-outline btn-primary w-full flex items-center justify-center gap-2 rounded-xl">
                <FaRegEye size={18} />
                See More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTipsCards;
