import React, { use, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { GiTreeBranch } from "react-icons/gi";
import { AuthContext } from "../provider/AuthContext";
import MyTipsTable from "./MyTipsTable";
import Loading from "../Components/Loading";

const MyTips = () => {
  const { user } = use(AuthContext);
  const [myTips, setMyTips] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const userEmail = user.email;

  useEffect(() => {
    if (userEmail) {
      setLoading(true); // Start loading
      fetch("https://ph-assignment-10-server-pi.vercel.app/myTips", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMyTips(data);
        })
        .finally(() => {
          setLoading(false); // Stop loading in finally
        });
    }
  }, [userEmail]);

  return (
    <div className="space-y-5">
      <Helmet>
        <title>Garden Nest | My Tips</title>
      </Helmet>
      <div className="flex items-center gap-2 justify-center text-secondary">
        <GiTreeBranch size={35} />
        <h1 className="text-4xl font-semibold">My Tips:</h1>
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : myTips.length ? (
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>no.</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th className="text-center">image</th>
                  <th className="text-center">Button</th>
                </tr>
              </thead>
              <tbody>
                {myTips.map((tips, index) => (
                  <MyTipsTable
                    key={tips._id}
                    index={index}
                    tips={tips}
                    myTips={myTips}
                    setMyTips={setMyTips}
                  ></MyTipsTable>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="text-4xl text-center font-semibold py-10 bg-base-200 rounded-2xl">
            No Posts Yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default MyTips;
