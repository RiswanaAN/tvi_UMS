import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import Profile from "../../assets/profile.png";
import { checkAuth } from "../../components/RouterProtector/checkAuth";
import NavBar from "../../components/NavBar/NavBar";

function UserDetails(props) {
  const [user, setUser] = useState({});
  const [icon, setIcon] = useState("");
  const [userImage, setUserImage] = useState("");
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
        console.log(response.data);
        setUser(response.data.result);
        const fName = response.data.result.firstName;
        const lName = response.data.result.lastName;
        const userIcon = fName.charAt(0) + lName.charAt(0);
        setIcon(userIcon);
        console.log(icon);
        
        // Check if the image exists
        if (response.data.result.imageURL) {
          setUserImage(response.data.result.imageURL);
        } else {
          setUserImage(null); // If no image, set to null
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function moveToBack() {
    navigate("/login");
  }
  function editUser() {
    navigate("/user/userHomepage/userEdit");
  }

  return (
    <div className="md:h-[100vh] border flex flex-col items-center">
      
      <div className="flex flex-col bg-gray-100 rounded-lg p-6 shadow-xl m-6 max-w-md">
        <div className="border-b border-gray-300 flex flex-col items-center p-4">
          <h1 className="text-2xl font-semibold text-gray-800 uppercase">Profile</h1>
        </div>
        <div className="p-4">
          <div className="flex justify-center items-center pb-4">
            {userImage ? (
              <img
                src={userImage}
                alt="User"
                className="h-[300px] w-[350px] rounded-full shadow-md"
              />
            ) : (
              <div className="bg-[#124338] text-white w-20 h-20 flex justify-center items-center rounded-full text-2xl shadow-md">{icon}</div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fname"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                First name
              </label>
              <input
                type="text"
                id="fname"
                className="bg-gray-200 focus:outline-none opacity-75 border border-b-gray-300 rounded-md text-gray-900 block w-full p-3 shadow-sm"
                disabled
                value={user.firstName}
              />
            </div>
            <div>
              <label
                htmlFor="lname"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="lname"
                className="bg-gray-200 focus:outline-none opacity-75 border border-b-gray-300 text-gray-900 rounded-md block w-full p-3 shadow-sm"
                disabled
                value={user.lastName}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-200 focus:outline-none opacity-75 border border-b-gray-300 text-gray-900 rounded-md block w-full p-3 shadow-sm"
              disabled
              required
              value={user.email}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="role"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role:
            </label>

            <input
              type="text"
              id="role"
              className="bg-gray-200 focus:outline-none opacity-75 border border-b-gray-300 text-gray-900 rounded-md block w-full p-3 shadow-sm"
              disabled
              required
              value={user.role}
            />
          </div>
        </div>
        <div className="flex justify-between p-4">
          <button
            type="button"
            className="text-white bg-[#e67e22] hover:bg-blue-600  font-medium rounded-md text-sm px-4 py-2"
            onClick={editUser}
          >
            Update
          </button>
          <button
            type="button"
            className="text-white bg-[#007bff] hover:bg-blue-600  font-medium rounded-md text-sm px-4 py-2"
            onClick={moveToBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
