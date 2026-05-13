import React from "react";

const ActiveGardenerCard = ({ gardener }) => {
  const { image, name, specialty } = gardener;
  return (
    <div className="text-center">
      <img
        className="mx-auto w-28 h-28 object-center object-cover rounded-full border-4 border-secondary p-1"
        src={image}
        alt="user photo"
      />
      <h1 className="text-xl md:text-2xl font-semibold">{name}</h1>
      <p className="text-sm">{specialty}</p>
    </div>
  );
};

export default ActiveGardenerCard;
