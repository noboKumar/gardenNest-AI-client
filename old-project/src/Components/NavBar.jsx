import React, { use } from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import ThemeController from "./ThemeController";

const NavBar = () => {
  const { user, LogOutUser } = use(AuthContext);
  const navBarLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/ExploreGardeners"}>Explore Gardeners</NavLink>
      </li>
      <li>
        <NavLink to={"/browseTipsCard"}>Browse Tips</NavLink>
      </li>
      <li>
        <NavLink to={"/aboutUs"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to={"/dashBoard"}>DashBoard</NavLink>
        </li>
      )}
    </>
  );
  const userImg = (
    <>
      <a data-tooltip-id="user-tooltip">
        <img
          className="w-10 h-10 md:w-15 md:h-15 object-cover rounded-full border-2 border-gray-400 md:p-1 cursor-pointer"
          src={user?.photoURL}
          referrerPolicy="no-referrer"
          alt=""
        />
      </a>
    </>
  );

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out",
    }).then((result) => {
      if (result.isConfirmed) {
        LogOutUser()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged Out Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <div className="shadow-sm bg-base-200 sticky z-10 top-0 py-2">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="cursor-pointer lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navBarLinks}
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl gap-2 font-medium">
            {navBarLinks}
          </ul>
        </div>
        <div className="navbar-end gap-2 md:gap-5">
          <Tooltip className="z-50" id="user-tooltip">
            {user?.displayName}
          </Tooltip>
          {user ? (
            <>
              <div className="flex items-center gap-2">
                {userImg}
                <button
                  onClick={handleLogOut}
                  className="btn bg-red-700 text-white"
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-primary text-white px-1 md:px-5"
            >
              Log In
            </Link>
          )}
          <div>
            <ThemeController></ThemeController>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
