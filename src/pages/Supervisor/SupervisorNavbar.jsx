import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import '../../components/NavBar/NavBar.css';
import Searchbar from "../../components/Searchbar";

function SupervisorNavbar() {
  
  return (
    <div className="flex place-content-between items-center bg-[#343a40] p-3 ">
      <div className="text-white flex gap-3 place-content-between items-center">
        <h1>Supervisor Dashboard</h1>
      </div>
      <div className="flex justify-center items-center gap-3 text-white mr-2">
        <Searchbar />
        
          <button className="flex justify-center items-center text-[gray] focus:text-[white]">
          <FaUser size="18px" color="gray"/>
          <IoMdArrowDropdown />
          </button>
      </div>
    </div>
  );
}

export default SupervisorNavbar;
