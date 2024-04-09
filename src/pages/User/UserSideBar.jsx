import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdOutlineStore } from "react-icons/md";
import "../../components/SideBar/SideBar.css";

function UserSideBar(props) {
  // useEffect(()=>{
  //   console.log(props);
  // })
  return (
    <div className="sidebar flex flex-col bg-[#212529] p-4 h-[100vh]">
      <div className="text-white flex flex-col gap-3">
        <div className="text-[#FFFFFF40] text-[14px] pl-3">
          core
          <div className="text-[#FFFFFF80] flex justify-center items-center gap-2">
            <AiOutlineDashboard className="text-[#FFFFFF40]" />
            <button
              onClick={(e)=>props.dashboardMenu("profile")}
              className="text-[#FFFFFF80] hover:text-white text-[20px] italic focus:text-white"
            >
              Profile
            </button>
          </div>
        </div>
        <div className="text-[#FFFFFF40] text-[16px] pl-3">
          Interface
          <div className="text-[#FFFFFF80]  flex justify-center items-center gap-2">
           
           <MdOutlineStore className="text-[#FFFFFF40]" />
          

            <button
              onClick={(e)=>props.dashboardMenu("store")}
              className="text-[#FFFFFF80]  hover:text-white focus:text-[white] italic text-[20px]"
            >
              Store
            </button>
          </div>
        </div>
        <div className="text-[#FFFFFF40] text-[16px] pl-3">
          Item
          <div className="text-[#FFFFFF80] flex justify-center items-center gap-2">
          <IoIosHeartEmpty className="text-[#FFFFFF40]"/>


            <button
              onClick={(e)=>props.dashboardMenu("wishlist")}
              className="text-[#FFFFFF80]  hover:text-white text-[20px] italic focus:text-white"
            >
              WishList
            </button>
          </div>
          <div className="text-[#FFFFFF80]  flex justify-center items-center gap-2">
           <HiOutlineShoppingCart className="text-[#FFFFFF40]" />  
            <button
              onClick={(e)=>props.dashboardMenu("cart")}
              className="text-[#FFFFFF80]  hover:text-white focus:text-[white] italic text-[20px]"
            >
              Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSideBar;
