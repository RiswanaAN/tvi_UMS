import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa";

import "./SideBar.css";

function SideBar() {
  const navigate = useNavigate();
  function createUserPage() {
    navigate("/register");
  }
  function movetoDashboard(){
    navigate('/login/homePage')
  }
  return (
    <div className="sidebar flex flex-col bg-[#212529] p-4 ">
      <div className="text-white flex flex-col gap-3">
        <div className="text-[#FFFFFF40] text-[13px] pl-3">
          core
          <div className="text-[#FFFFFF80] flex justify-center items-center gap-2">
            <AiOutlineDashboard className="text-[#FFFFFF40]" />
            <button
              onClick={movetoDashboard}
              className="text-[#FFFFFF80] hover:text-white text-[15px]"
            >
              Dashboard
            </button>
          </div>
        </div>
        <div className="text-[#FFFFFF40] text-[13px] pl-3">
          Interface
          <div className="text-[#FFFFFF80] flex justify-center items-center gap-2">
            <FaBookOpen className="text-[#FFFFFF40]" />
            <button
              onClick={createUserPage}
              className="text-[#FFFFFF80]  hover:text-white text-[15px]"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
