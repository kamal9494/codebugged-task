import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user, logoutUser } = useContext(UserContext);

  const closeMenu = () => setMenu(false);

  return (
    <nav className="top-0 sticky w-full bg-[#0A0A0A] z-50">
      <div className="h-[80px] p-5 md:px-20 w-full flex justify-between border-b-2 border-white items-center">
        <NavLink
          to="/"
          className="text-xl md:text-3xl font-bold text-white hover:text-red-600"
        >
          React FaceAPI
        </NavLink>

        <div className="flex gap-10">
          <ul className="hidden md:flex font-medium gap-10 items-center">
            <NavLink to="/">Home</NavLink>
            {!user ? (
              <NavLink to="/login">Login</NavLink>
            ) : (
              <button
                className="bg-red-500 w-[70px] p-3 rounded-lg text-white"
                onClick={logoutUser}
              >
                Logout
              </button>
            )}
          </ul>

          <div className="hidden md:flex  items-center justify-center">
            <a href="#">
              <FaGithub className="text-white" size={34} />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-5 text-white md:hidden">
          <div className="flex md:hidden  items-center justify-center">
            <a href="#">
              <FaGithub className="text-white" size={34} />
            </a>
          </div>
          {menu ? (
            <RxCross1
              className="cursor-pointer"
              onClick={() => setMenu((prev) => !prev)}
              size={25}
            />
          ) : (
            <AiOutlineMenu
              className="cursor-pointer"
              onClick={() => setMenu((prev) => !prev)}
              size={25}
            />
          )}
        </div>
      </div>
      <div
        className={`h-screen menu absolute bg-[#0A0A0A] w-full transition-all duration-200 ease-in-out ${
          menu ? "" : "mt-[-500%]"
        }`}
      >
        <ul className="flex flex-col text-white mt-10 font-medium gap-10 items-center">
          <NavLink
            onClick={() => {
              closeMenu();
              setMenu(false);
            }}
            to="/"
          >
            Home
          </NavLink>
          {!user ? (
            <NavLink onClick={closeMenu} to="/login">
              Login
            </NavLink>
          ) : (
            <button
              className="bg-red-500 w-[70px] p-3 rounded-lg text-white"
              onClick={logoutUser}
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
