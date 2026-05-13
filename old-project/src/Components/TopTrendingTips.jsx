import React, { useEffect, useState } from "react";
import TopTrendingTipsCard from "./TopTrendingTipsCard";
import Loading from "./Loading";

const TopTrendingTips = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ph-assignment-10-server-pi.vercel.app/trendingTips")
      .then((res) => res.json())
      .then((data) => {
        setTrendingData(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="space-y-10 mt-20">
      {loading && <Loading></Loading>}
      <h1 className="text-2xl md:text-4xl font-semibold text-secondary text-center">
        Top Trending:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {trendingData.map((trending) => (
          <TopTrendingTipsCard
            key={trending._id}
            trending={trending}
          ></TopTrendingTipsCard>
        ))}
      </div>
    </div>
  );
};

export default TopTrendingTips;
