import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
// import '../../components/NavBar/NavBar.css';
import Searchbar from "../../components/Searchbar";
import Logout from "../../components/NavBar/Logout";

function UserNavbar() {
    const [dropDown, setDropDown] = useState(false);
    function showDropDown() {
      setDropDown(!dropDown);
    }
  return (
    <div className="flex place-content-between items-center bg-[#343a40] p-3 ">
      <div className="text-white flex gap-3 place-content-between items-center">
        <h1>User Management System</h1>
      </div>
      <div className="flex justify-center items-center gap-3 text-white mr-2">
        <Searchbar />
        <div className="dropdown" style={{ position: "relative" }}>
          <button
            onClick={showDropDown}
            className="dropbtn flex justify-center items-center text-[gray] hover:text-[white] focus:text-[white]"
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

export default UserNavbar;
