import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="text-base-content min-h-screen">
      <NavBar></NavBar>
      <div className="min-h-[calc(100vh-360px)] w-11/12 mx-auto my-5">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
