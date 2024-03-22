import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../components/RouterProtector/checkAuth";
import NavBar from "../../components/NavBar/NavBar";

import UserSideBar from "./UserSideBar";
import UserNavbar from "./UserNavbar";
import UserDetails from "./UserDetails";
import ListUP from "../../Products/UserProducts/ListUP";

function UserHomePage() {
  const [menuClicks, setMenuClicks] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [user, setUser] = useState({});
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/me", {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        console.log(response.data.result);
        setUser(response.data.result);
        // console.log(response.data.data.firstName);
        const fName = response.data.result.firstName;
        const lName = response.data.result.lastName;
        // console.log(fName, lName);
        const userIcon = fName.charAt(0) + lName.charAt(0);
        setIcon(userIcon);
        console.log(icon);
      })
      .catch((error) => console.log(error));
  }, []);

  function moveToBack() {
    navigate("/login");
  }
  function editUser() {
    navigate("/user/userHomepage/userEdit");
  }
  function clickMenuButton() {
    console.log(menuClicks);
    setMenuClicks((prev) => !prev);
  }
  function dashboardMenu(msg) {
    setSelectedMenu(msg);
  }

  return (
    <div className="flex flex-col w-screen">
      <div className="w-full">
        <UserNavbar clickMenuButton={clickMenuButton} />
      </div>
      <div className="flex">
        <div
          className={`transition-all duration-500 ${
            menuClicks ? "w-[250px]" : "w-0"
          } overflow-hidden`}
        >
          <UserSideBar dashboardMenu={dashboardMenu}/>
        </div>

        {selectedMenu == "profile" ? (
          <div className="flex flex-col w-full">
            <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
              <h1 className="">User Detail</h1>
              <div className="w-full bg-[#e9ecef] rounded-md">
                <p className="text-[15px] text-[#6c757d] p-[10px]">User Detail</p>
              </div>
            </div>

            <div className="w-full">
              <UserDetails />
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full">
          <div className="dashboard p-3 pl-6 text-[35px] text-[#212529]">
            <h1 className="">HomePage</h1>
            <div className="w-full bg-[#e9ecef] rounded-md">
              <p className="text-[15px] text-[#6c757d] p-[10px]">Products</p>
            </div>
          </div>

          <div className="w-full">
            <ListUP />
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default UserHomePage;
