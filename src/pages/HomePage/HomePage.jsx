import React, { useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import ChartComponent from "../../components/Chart/ChartComponent";
import BarChart from "../../components/Chart/BarChart";
import { FaChartArea } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { checkAuth } from "../../components/RouterProtector/checkAuth";

// import '../../components/SideBar/SideBar.css'

function HomePage() {
  const [isClicked, setIsClicked] = useState(false);
  function clickMenuButton() {
    setIsClicked((prev) => !prev);
  }
  return (
    <div className="flex flex-col w-screen">
      <div className="w-full">
        <NavBar clickMenuButton={clickMenuButton} />
      </div>
      <div className="flex">
        {/* {isClicked ? <SideBar /> : <></>} */}
        <div
          className={`transition-all duration-500 ${
            isClicked ? "w-[250px]" : "w-0"
          } overflow-hidden`}
        >
          <SideBar />
        </div>
        <div className="flex flex-col w-full">
          <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
            <h1 className="">Dashboard</h1>
            <div className="w-full bg-[#e9ecef] rounded-md">
              <p className="text-[15px] text-[#6c757d] p-[10px]">Dashboard</p>
            </div>
          </div>
          <div className="w-full flex gap-5 justify-evenly items-center">
            <div className="border rounded-md">
              <div className="border-b w-full p-2 pl-3 flex items-center gap-2 text-[#212529]">
                <FaChartArea />
                Area Chart
              </div>
              <div className="p-2">
                <ChartComponent />
              </div>
            </div>
            <div>
              <div className="border rounded-md">
                <div className="border-b w-full p-2 pl-3 flex items-center gap-2 text-[#212529]">
                  <FaChartBar />
                  Bar Chart
                </div>
                <div className="p-2">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(HomePage);
