import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa";
import { FaList } from "react-icons/fa";

import "./SideBar.css";

function SideBar(props) {
  const navigate = useNavigate();
  function createUserPage() {
    navigate("/register");
  }
  
  return (
    <div className="sidebar flex flex-col bg-[#212529] p-4 ">
      <div className="text-white flex flex-col gap-3">
        <div className="text-[#FFFFFF40] text-[14px] pl-3">
          core
          <div className="text-[#FFFFFF80] flex justify-center items-center gap-2">
            <AiOutlineDashboard className="text-[#FFFFFF40]" />
            <button
              onClick={(e)=>props.dashboardMenu("dashboard")}
              className="text-[#FFFFFF80] hover:text-white text-[20px] italic focus:text-white"
            >
              Dashboard
            </button>
          </div>
        </div>
        <div className="text-[#FFFFFF40] text-[16px] pl-3">
          Interface
          <div className="text-[#FFFFFF80] flex justify-center items-center gap-2">
            <FaBookOpen className="text-[#FFFFFF40]" />
            <button
              onClick={createUserPage}
              className="text-[#FFFFFF80]  hover:text-white italic text-[20px]"
            >
              Add User
            </button>
          </div>
        </div>
        <div className="text-[#FFFFFF40] text-[16px] pl-3">
          Products
          <div className="text-[#FFFFFF80] flex justify-center items-center gap-2">
          <FaList className="text-[#FFFFFF40]"/>

            <button
              onClick={(e)=>props.dashboardMenu("product")}
              className="text-[#FFFFFF80]  hover:text-white text-[20px] italic focus:text-white"
            >
              Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
