import React, { useEffect, useState } from "react";
import ActiveGardenerCard from "./ActivegardenerCard";
import Loading from "./Loading";

const ActiveGardener = () => {
  const [activeUserData, setActiveUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ph-assignment-10-server-pi.vercel.app/activeusers")
      .then((res) => res.json())
      .then((data) => {
        setActiveUserData(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="space-y-10 mt-10">
      {loading && <Loading></Loading>}
      <h1 className="text-2xl md:text-4xl font-semibold text-secondary text-center">
        Active gardeners:
      </h1>
      <div className="grid grid-cols-3 lg:grid-cols-6">
        {activeUserData.map((gardener) => (
          <ActiveGardenerCard
            key={gardener._id}
            gardener={gardener}
          ></ActiveGardenerCard>
        ))}
      </div>
    </div>
  );
};

export default ActiveGardener;
