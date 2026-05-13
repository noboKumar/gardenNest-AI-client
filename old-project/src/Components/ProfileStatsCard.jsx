import React, { useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import axios from "axios";
import moment from "moment/moment";

const ProfileStatsCard = () => {
  const { user } = React.useContext(AuthContext);
  const [allTipsCount, setAllTipsCount] = useState(0);
  const [myTipsCount, setMyTipsCount] = useState(0);
  const [mostLiked, setMostLiked] = useState({ title: "", likesCount: 0 });
  const [totalLikes, setTotalLikes] = useState(0);
  const [accountCreatedAt, setAccountCreatedAt] = useState("");
  const [latestTip, setLatestTip] = useState(null);

  useEffect(() => {
    // Fetch all tips
    axios
      .get("https://ph-assignment-10-server-pi.vercel.app/browseTips")
      .then((res) => {
        setAllTipsCount(res.data.length);
      });

    // Fetch my tips
    axios
      .post("https://ph-assignment-10-server-pi.vercel.app/myTips", {
        email: user.email,
      })
      .then((res) => {
        setMyTipsCount(res.data.length);

        // Total likes in my tips
        const total = res.data.reduce(
          (sum, tip) => sum + (tip.likedBy?.length || 0),
          0
        );
        setTotalLikes(total);

        // Find latest tip by createdAt
        const tipsWithDate = res.data.filter((tip) => tip.createdAt);
        if (tipsWithDate.length > 0) {
          const sorted = [...tipsWithDate].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLatestTip(sorted[0]);
        } else {
          setLatestTip(null);
        }
      });

    // Most liked tip
    axios
      .post("https://ph-assignment-10-server-pi.vercel.app/myMostLikedTip", {
        email: user.email,
      })
      .then((res) => {
        setMostLiked(res.data);
      });

    // Account created at (if available from auth)
    setAccountCreatedAt(user.metadata?.creationTime || "");
  }, [user.email, user.metadata]);

  const formatDate = (isoString) => {
    return moment(isoString).format("DD/MM/YYYY");
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-base-200 border border-primary rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        {/* Profile Photo */}
        <div className="flex-shrink-0 flex justify-center">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src={user.photoURL} alt="" />
            </div>
          </div>
        </div>

        {/* Name & Email */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center">
          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-base text-gray-500">{user.email}</p>
          {accountCreatedAt && (
            <p className="text-xs text-gray-400 mt-1">
              Joined: {formatDate(accountCreatedAt)}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat bg-base-300 rounded-xl shadow place-items-center">
          <div className="stat-title text-sm">All Posts</div>
          <div className="stat-value">{allTipsCount}</div>
          <div className="stat-desc">Total Posts</div>
        </div>
        <div className="stat bg-base-300 rounded-xl shadow place-items-center">
          <div className="stat-title text-sm">My Posts</div>
          <div className="stat-value">{myTipsCount}</div>
          <div className="stat-desc">Your Posts</div>
        </div>
        <div className="stat bg-base-300 rounded-xl shadow place-items-center">
          <div className="stat-title text-sm">Total Likes (My Posts)</div>
          <div className="stat-value">{totalLikes}</div>
          <div className="stat-desc">All Likes on Your Tips</div>
        </div>
        <div className="stat bg-base-300 rounded-xl shadow place-items-center">
          <div className="stat-title text-sm">Most Liked Tip</div>
          <div className="stat-value">{mostLiked.likesCount || 0}</div>
          <div className="stat-desc truncate max-w-[12rem]">
            {mostLiked?.title}
          </div>
        </div>
      </div>

      {/* Latest Post Stat */}
      <div className="mt-8">
        <div className="stat bg-base-300 rounded-xl shadow place-items-center">
          <div className="stat-title text-sm">Latest Post</div>
          <div className="stat-value">{latestTip?.title || "No posts yet"}</div>
          <div className="stat-desc">
            {latestTip?.createdAt
              ? "Posted at: " + formatDate(latestTip.createdAt)
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatsCard;
