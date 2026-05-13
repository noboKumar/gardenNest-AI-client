import React from "react";
import { NavLink } from "react-router";
import Logo from "./Logo";
import {
  HiOutlineUserCircle,
  HiOutlineLightBulb,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="drawer-side border-r border-gray-300 z-50">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-xl space-y-2">
        <div className="py-2 border-b-2 mb-2">
          <Logo />
        </div>

        <li>
          <NavLink to="/dashBoard" end>
            <HiOutlineUserCircle size={26} className="inline mr-2" /> My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashBoard/MyTips">
            <HiOutlineLightBulb size={26} className="inline mr-2" /> My Tips
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashBoard/ShareGardenTip">
            <HiOutlinePlusCircle size={26} className="inline mr-2" /> Share a
            Garden Tip
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashBoard/allTips">
            <FaLeaf size={26} className="inline mr-2" /> All Tips
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
