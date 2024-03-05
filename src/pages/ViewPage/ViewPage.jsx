import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 530,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
};

export default function ViewPage(props) {
  const navigate = useNavigate();
  const handleClose = () => props.setOpen(false);
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  const [user, setUser] = useState({});
  useEffect(() => {
    props.userDetails.map((userD) => {
      if (userD.id == props.viewId) {
        setUser(userD);
        console.log(userD);
      }
    });
    axios.get("http://localhost:8000/api/user/" + props.viewId, {
      headers: {
        Authorization: adminToken || tokenFromLS,
        genericvalue: "admin",
      },
    });
  }, []);
  function handleUser() {
    navigate("/login/homePage");
  }
  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            View User
          </Typography>
          <div className="flex justify-center border pt-3">
            <FaUser />
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="flex flex-col justify-center">
              <div>
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
                    readOnly
                    className=" bg-gray-50  focus:outline-none border border-white border-b-gray-300 text-[#212529] block p-1 font-semibold "
                    defaultValue={user.firstName}
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
                    readOnly
                    className=" bg-gray-50  focus:outline-none border border-white border-b-gray-300 text-[#212529] block p-1 font-semibold "                    defaultValue={user.lastName}
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
                  className=" bg-gray-50  focus:outline-none border border-white border-b-gray-300 text-[#212529] block p-1 font-semibold "                  readOnly
                  required
                  defaultValue={user.email}
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
                  className=" bg-gray-50  focus:outline-none border border-white border-b-gray-300 text-[#212529] block p-1 font-semibold "                  readOnly
                  required
                  defaultValue={user.role}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  className=" bg-gray-50  focus:outline-none border border-white border-b-gray-300 text-[#212529] block p-1 font-semibold "                  readOnly
                  required
                  defaultValue={user.password}
                />
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="text-white bg-[#007bff] hover:bg-blue-600 block font-medium rounded-md text-sm mt-3  mb-3 px-5 py-2.5 text-center"
                  onClick={handleUser}
                >
                  Back
                </button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
