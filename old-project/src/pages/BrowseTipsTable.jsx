import React from "react";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router";

const BrowseTipsTable = ({ tips, index }) => {
  const { category, imageURL, title, _id, level } = tips;
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <th>{title}</th>
        <td>{level}</td>
        <td>{category}</td>
        <td>
          <img
            className="md:h-32 md:w-44 mx-auto rounded-xl"
            src={
              imageURL ||
              "https://i.ibb.co/0pmKb7y2/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-8.jpg"
            }
            alt="tips photo"
          />
        </td>
        <td>
          <Link to={`/BrowseTips/${_id}`}>
            <button className="btn px-1 md:px-6">
              <FaRegEye size={20} />
            </button>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default BrowseTipsTable;
