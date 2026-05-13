import React, { use } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const UpdateMyTips = () => {
  const { category, description, imageURL, level, status, title, type, _id } =
    useLoaderData();

  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const tipsUpdateData = Object.fromEntries(formData.entries());

    fetch(`https://ph-assignment-10-server-pi.vercel.app/tips/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tipsUpdateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myTips");
        }
      });
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 justify-center text-secondary">
        <FiEdit3 size={35} />
        <h1 className="text-2xl md:text-4xl font-semibold">
          Update Your Tips:
        </h1>
      </div>
      <form onSubmit={handleUpdate}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[400px] mx-auto border p-5">
          {/* title */}
          <label className="label text-sm">Title</label>
          <input
            defaultValue={title}
            required
            name="title"
            type="text"
            className="input w-full bg-base-200"
            placeholder="Enter Tips Title"
          />
          {/* plant type */}
          <label className="label text-sm">Plant Type</label>
          <input
            defaultValue={type}
            name="type"
            type="text"
            className="input w-full bg-base-200"
            placeholder="Enter plant Type"
          />
          {/* difficulty level */}
          <label className="label text-sm">Difficulty Level</label>
          <select
            name="level"
            defaultValue={level}
            className="select w-full bg-base-200"
          >
            <option disabled={true}>Pick a Level</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          {/* description */}
          <label className="label text-sm">Description</label>
          <textarea
            defaultValue={description}
            name="description"
            className="textarea w-full bg-base-200"
            placeholder="Enter Description Here"
          ></textarea>
          {/* image URL */}
          <label className="label text-sm">Image URL</label>
          <input
            defaultValue={imageURL}
            name="imageURL"
            type="text"
            className="input w-full bg-base-200"
            placeholder="Enter Image URL here"
          />
          <div className="flex gap-2">
            <div>
              <label className="label text-sm">Category:</label>
              <select
                name="category"
                defaultValue={category}
                className="select w-full bg-base-200"
              >
                <option disabled={true}>Pick a category</option>
                <option>Composting</option>
                <option>Plant Care</option>
                <option>Vertical Gardening</option>
                <option>Garden Bugs</option>
              </select>
            </div>
            <div>
              <label className="label text-sm">Availability:</label>
              <select
                defaultValue={status}
                name="status"
                className="select w-full bg-base-200"
              >
                <option disabled={true}>select availability</option>
                <option>Public</option>
                <option>Hidden</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              {/* user name */}
              <label className="input validator w-full bg-base-200">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  readOnly
                  defaultValue={user?.displayName}
                  type="text"
                  required
                  placeholder="Username"
                />
              </label>
            </div>
            {/* email */}
            <div>
              <label className="input validator w-full bg-base-200">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  name="email"
                  readOnly
                  defaultValue={user?.email}
                  type="email"
                  placeholder="mail@site.com"
                  required
                />
              </label>
            </div>
          </div>
          {/* button */}
          <button className="btn bg-[#2e7d32] border-none shadow text-white">
            Update
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateMyTips;
