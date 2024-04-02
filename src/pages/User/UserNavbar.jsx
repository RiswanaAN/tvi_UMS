import { useState } from "react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import Searchbar from "../../components/Searchbar";
import Logout from "../../components/NavBar/Logout";
import CartBadge from "../../components/Badge/CartBadge";
import WishlistBadge from "../../components/Badge/WishlistBadge";

function UserNavBar(props) {
  const [dropDown, setDropDown] = useState(false);
  function showDropDown() {
    setDropDown(!dropDown);
  }
  return (
    <div className="flex place-content-between items-center bg-[#343a40] p-3 ">
      <div className="text-white flex gap-3 place-content-between items-center">
        <h1 className="text-xl">User Management System</h1>
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
      <div className="flex justify-center items-center gap-5 text-white mr-2">
        <Searchbar />
        <IoMdNotificationsOutline className="text-2xl" />
        <WishlistBadge />
        <CartBadge />

        <div className="dropdown" style={{ position: "relative" }}>
          <button
            onClick={showDropDown}
            className="dropbtn hover:text-white flex justify-center items-center text-[gray] focus:text-[white]"
          >
            <div className="p-[6px] bg-teal-600 text-white rounded-full hover:bg-teal-500 focus:bg-teal-500">
              {props.icon}
            </div>

            <IoMdArrowDropdown />
          </button>
          {dropDown && <Logout />}
        </div>
      </div>
    </div>
  );
}

export default UserNavBar;
