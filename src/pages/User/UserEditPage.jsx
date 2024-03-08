import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import Profile from "../../assets/profile.png";

function UserEditPage() {
  const [user, setUser] = useState({});
  const editId = user.id;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
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
        console.log(response.data.data);
        setUser(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function editUser() {
    console.log("Am entered");
    const userD = {
      firstName: firstName,
      lastName: lastName,
      // imageURL: { Profile },
    };
    axios
      .put("http://localhost:8000/api/me/update-user", userD, {
        headers: {
          genericvalue: "agent",
          Authorization: adminToken || tokenFromLS,
        },
      })
      .then((response) => {

        console.log(response);
        moveToBack();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  function moveToBack() {
    navigate("/user/userHomepage");
  }
  return (
    <div className="md:h-[100vh] border flex flex-col items-center">
      <div className="w-full">
        <UserNavbar />
      </div>
      <div className="flex flex-col border border-gray-300 pb-3 shadow-xl bg-[#e9ecef] m-[20px] mt-[50px] items-center md:w-[600px] w-[300px]">
        <div className="border-b border-gray-300 flex flex-col items-center p-[20px] w-full">
          <h1 className="text-[30px]  text-gray-800">Edit Details</h1>
        </div>
        <form className="p-5 flex flex-col w-full">
          <div className="gap-3 mb-6 flex flex-col w-full pt-4">
            <div>
              <label
                htmlFor="id"
                className="mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Id
              </label>
              <input
                type="text"
                id="id"
                className="bg-gray-50 opacity-75 focus:outline-none border border-b-gray-300 text-gray-900 rounded-md block w-full p-3"
                disabled
                required
                defaultValue={user.id}
                // onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="flex flex-col place-content-between gap-2 md:flex-row">
              <div className="w-full">
                <label
                  htmlFor="fname"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="fname"
                  className=" bg-gray-50 focus:outline-none border border-b-gray-300 rounded-md text-gray-90 -md block w-full p-3"
                  placeholder="Enter first name"
                  defaultValue={user.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lname"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lname"
                  className="bg-gray-50  focus:outline-none border border-b-gray-300 text-gray-900 rounded-md block w-full p-3 "
                  placeholder="Enter last name"
                  defaultValue={user.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 opacity-75 focus:outline-none border border-b-gray-300 text-gray-900 rounded-md block w-full p-3"
                disabled
                required
                defaultValue={user.email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="role"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role:
              </label>

              <input
                type="text"
                id="role"
                className="bg-gray-50 opacity-75 focus:outline-none border border-b-gray-300 text-gray-900 rounded-md block w-full p-3"
                required
                defaultValue={user.role}
                // onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-white block bg-[green] hover:bg-green-600  font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
              onClick={editUser}
            >
              Save
            </button>
            <button
              type="button"
              className="text-white block bg-[#007bff] hover:bg-blue-600  font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
              onClick={moveToBack}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEditPage;
