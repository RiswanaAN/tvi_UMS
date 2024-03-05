import React, { useState } from "react";


import SupervisorNavbar from "./SupervisorNavbar";
import SupervisorDataTable from "./SupervisorDataTable";
// import '../../components/SideBar/SideBar.css'

function SupervisorDashboard() {
  
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <SupervisorNavbar />
      </div>
      <div className="flex">
       
        <div className="flex flex-col w-full">
          <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
            <h1 className="">Dashboard</h1>
            <div className="w-full bg-[#e9ecef] rounded-md">
              <p className="text-[15px] text-[#6c757d] p-[10px]">Dashboard</p>
            </div>
          </div>

          <SupervisorDataTable />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default SupervisorDashboard;
