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
          <Typography id="modal-modal-title" variant="h6" component="h2" className="flex justify-center items-center pb-4">
           {` ${user.firstName} ${user.lastName}`} 
          </Typography>
          <div className="flex justify-center border border-white">
            {/* <FaUser /> */}
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
              className="w-[80px]"
            ></img>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className="flex flex-col justify-center">
              <div>
                <label
                  htmlFor="id"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Id :
                </label>
                <input
                  type="text"
                  id="id"
                  className=" bg-gray-50  focus:outline-none border border-white  text-[#212529] block p-1 "
                  readOnly
                  required
                  defaultValue={props.viewId}
                />
              </div>
              <div className="flex">
                <div className="">
                  <label
                    htmlFor="fname"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    First name :
                  </label>
                  <input
                    type="text"
                    id="fname"
                    readOnly
                    className=" bg-gray-50  focus:outline-none border border-white  text-[#212529] p-1 "
                    defaultValue={user.firstName}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="lname"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name :
                  </label>
                  <input
                    type="text"
                    id="lname"
                    readOnly
                    className=" bg-gray-50  focus:outline-none border border-white  text-[#212529]  p-1  w-[80px]"
                    defaultValue={user.lastName}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  email :
                </label>
                <input
                  type="email"
                  id="email"
                  className=" bg-gray-50  focus:outline-none border border-white  text-[#212529] block p-1 "
                  readOnly
                  required
                  defaultValue={user.email}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="role"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role :
                </label>

                <input
                  type="text"
                  id="role"
                  className=" bg-gray-50  focus:outline-none border border-white  text-[#212529] block p-1 "
                  readOnly
                  required
                  defaultValue={user.role}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password :
                </label>
                <input
                  type="text"
                  id="password"
                  className=" bg-gray-50  focus:outline-none border border-white  text-[#212529] block p-1 "
                  readOnly
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
// https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png
