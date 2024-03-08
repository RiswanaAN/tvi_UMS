import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 550,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
};

export default function UserRegister(props) {
  const handleClose = () => props.setOpen(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345678");
  const [role, setRole] = useState("agent");

  function registerUser(e) {
    const user = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
      role: role,
    };
    axios.post("http://localhost:8000/api/add", user)
    .then((response)=> console.log(response));
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
          <Typography id="modal-modal-title" variant="h4" component="h1" className="flex items-center justify-center font-medium">
            User Register
          </Typography>
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
                    className=" bg-gray-50 focus:outline-none border border-gray-300 rounded-md text-gray-90 -md block w-full p-3"
                    placeholder="Enter first name"
                    value={fname}
                    onInput={(e) => setFname(e.target.value)}
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
                    className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3 "
                    placeholder="Enter last name"
                    value={lname}
                    onInput={(e) => setLname(e.target.value)}
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
                  className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3"
                  placeholder="Enter email address"
                  required
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col place-content-between gap-2 md:flex-row">
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3 "
                    placeholder="Enter password"
                    required
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="confirm_password"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3 "
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white block bg-[#007bff] hover:bg-blue-600 mt-3 font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
                onClick={registerUser}
              >
                Login
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
