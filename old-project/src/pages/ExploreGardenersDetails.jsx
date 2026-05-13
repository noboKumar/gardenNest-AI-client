import React from "react";
import { HiOutlineArrowLeft, HiOutlineLightBulb } from "react-icons/hi";
import { useLoaderData, useNavigate } from "react-router";

const ExploreGardenersDetails = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-base-200 p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold text-error mb-4">
            Gardener Not Found
          </h2>
          <button
            className="btn btn-secondary mt-2"
            onClick={() => navigate(-1)}
          >
            <HiOutlineArrowLeft className="inline mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    name,
    age,
    experience,
    gender,
    image,
    location,
    specialty,
    totalSharedTips,
    status,
  } = data;

  return (
    <main className="min-h-screen bg-base-100 text-base-content py-10 px-4 flex justify-center">
      <section className="w-full max-w-2xl bg-base-200 rounded-2xl shadow-lg p-6 md:p-10 flex flex-col items-center relative border border-primary">
        <div
          className={`avatar ${
            status === "Active" ? "avatar-online" : "avatar-offline"
          }`}
        >
          <div className="w-40 h-40 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 overflow-hidden mb-4">
            <img
              src={image}
              alt={`${name}'s photo`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-secondary text-center">
          {name}
        </h1>
        <span className="badge badge-secondary badge-outline text-base px-4 py-2 my-2">
          {specialty}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-4">
          <div>
            <h3 className="font-semibold mb-1">Location</h3>
            <p>{location}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Experience</h3>
            <p>{experience}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Gender</h3>
            <p>{gender}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Age</h3>
            <p>{age}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-base-300 px-6 py-2 rounded-2xl my-6">
          <HiOutlineLightBulb size={24} />
          <span className="text-lg font-medium">
            Total Tips Shared: {totalSharedTips}
          </span>
        </div>

        <button
          className="btn btn-outline rounded-full btn-secondary mt-2 absolute top-2 left-4 md:top-5 md:left-10"
          onClick={() => navigate(-1)}
        >
          <HiOutlineArrowLeft className="inline" />
        </button>
      </section>
    </main>
  );
};

export default ExploreGardenersDetails;
