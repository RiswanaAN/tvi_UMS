import React, { useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
// import '../../components/SideBar/SideBar.css'

function HomePage() {
  const [isClicked, setIsClicked] = useState(false);
  function clickMenuButton() {
    setIsClicked((prev) => !prev);
  }
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <NavBar clickMenuButton={clickMenuButton} />
      </div>
      <div className="flex">
        {isClicked ? <SideBar /> : <></>}
        <div className="flex flex-col w-full">
          <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
            <h1 className="">Dashboard</h1>
            <div className="w-full bg-[#e9ecef] rounded-md">
              <p className="text-[15px] text-[#6c757d] p-[10px]">Dashboard</p>
            </div>
          </div>

          <DataTable />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default HomePage;
