import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { PiPottedPlantBold } from "react-icons/pi";
import { useLoaderData } from "react-router";
import BrowseTipsTable from "./BrowseTipsTable";

const BrowseTips = () => {
  const initialTips = useLoaderData();
  const [browseTips, setBrowseTips] = useState(initialTips);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortOrder, setSortOrder] = useState("new");

  useEffect(() => {
    let url = "";
    let fetchOptions = {};

    if (selectedLevel) {
      url = `https://ph-assignment-10-server-pi.vercel.app/tips/${selectedLevel}`;
      fetchOptions = {};
    } else {
      url = "https://ph-assignment-10-server-pi.vercel.app/sortedTips";
      fetchOptions = {
        headers: {
          "sort-order": sortOrder,
        },
      };
    }

    fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        setBrowseTips(data);
      });
  }, [selectedLevel, sortOrder, initialTips]);

  const handleLevelFiltering = (e) => {
    const level = e.target.value;
    setSelectedLevel(level);
  };

  const handleSorting = (e) => {
    const sort = e.target.value;
    setSortOrder(sort);
    setSelectedLevel(""); // reset filter when sorting (optional)
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
            onChange={handleLevelFiltering}
            value={selectedLevel}
            className="select bg-base-300"
          >
            <option value={""}>Filter by Level</option>
            <option value={"Easy"}>Easy</option>
            <option value={"Medium"}>Medium</option>
            <option value={"Hard"}>Hard</option>
          </select>
        </form>
        <form>
          <select
            onChange={handleSorting}
            value={sortOrder}
            className="select bg-base-300"
          >
            <option value={"new"}>Newest</option>
            <option value={"old"}>Oldest</option>
          </select>
        </form>
      </div>
      <div>
        <div className="overflow-x-auto my-10 rounded-box border border-base-content/5 bg-base-200">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Level</th>
                <th>Category</th>
                <th className="text-center">Image</th>
                <th>See More</th>
              </tr>
            </thead>
            <tbody>
              {browseTips.map((tips, index) => (
                <BrowseTipsTable
                  index={index}
                  key={tips._id}
                  tips={tips}
                ></BrowseTipsTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowseTips;
