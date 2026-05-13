import React from "react";
import logo from "../assets/gardenNest Logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
      className="flex items-center gap-2 btn py-7 btn-ghost md:text-2xl"
      to={"/"}
    >
      <div>
        <img className="w-12 h-12 md:w-14 md:h-14" src={logo} alt="logo" />
      </div>
      <div>
        <h1 className="poppins text-xl md:text-3xl font-semibold">
          <span className="text-secondary">Garden</span>Nest
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
