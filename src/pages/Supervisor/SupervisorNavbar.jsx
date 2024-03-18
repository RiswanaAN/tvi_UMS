import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
// import '../../components/NavBar/NavBar.css';
import Searchbar from "../../components/Searchbar";
import Logout from "../../components/NavBar/Logout";

function SupervisorNavbar() {
  const [dropDown, setDropDown] = useState(false)
  function showDropDown() {
    setDropDown(!dropDown);
  }
  return (
    <div className="flex place-content-between items-center bg-[#343a40] p-3 ">
      <div className="text-wte flex gap-3 place-content-between items-center">
        <h1>Supervisor Dashboard</h1>
      </div>
      <div className="flex justify-center items-center gap-3 text-wte mr-2">
        <Searchbar />
        
        <div className="dropdown" style={{ position: "relative" }}>
          <button
            onClick={showDropDown}
            className="dropbtn flex justify-center items-center text-[gray] hover:text-[wte] focus:text-[wte]"
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

export default SupervisorNavbar;
