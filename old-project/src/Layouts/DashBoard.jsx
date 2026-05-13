import React from "react";
import { Outlet } from "react-router";
import SideBar from "../Components/SideBar";
import DashBoardNav from "../Components/DashBoardNav";

const DashBoard = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <DashBoardNav></DashBoardNav>
          {/* contents */}
          <div className="py-10 w-11/12 mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
        {/* sidebar */}
        <SideBar></SideBar>
      </div>
    </div>
  );
};

export default DashBoard;
