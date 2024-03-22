import { useState } from "react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import Searchbar from "../Searchbar";
import { IoMdArrowDropdown } from "react-icons/io";
// import './NavBar.css'

import Logout from "./Logout";

function NavBar(props) {
  const [dropDown, setDropDown] = useState(false);
  function showDropDown() {
    setDropDown(!dropDown);
  }
  return (
    <div className="flex place-content-between items-center bg-[#343a40] p-3 ">
      <div className="text-white flex gap-3 place-content-between items-center">
        <h1>User Management System</h1>
        <button
          onClick={props.clickMenuButton}
          className="border border-[#343a40] focus:outline-none focus:ring-5 focus:border-[#007bff] hover:text-white"
        >
          <IoMenuSharp
            size="20px"
            color="gray"
            className="sideBarButton focus:outline-none focus:ring-5 focus:border-[#007bff] hover:text-white"
          />
        </button>
      </div>
      <div className="flex justify-center items-center gap-3 text-white mr-2">
        <Searchbar />

        <div className="dropdown" style={{ position: "relative" }}>
          <button
            onClick={showDropDown}
            className="dropbtn hover:text-white flex justify-center items-center text-[gray] focus:text-[white]"
          >
            <FaUser size="18px" />
            <IoMdArrowDropdown />
          </button>
          {dropDown && <Logout />}
        </div>
      </div>
    </div>
  );
}

export default NavBar;

