import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../components/NavBar/ConfirmationModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
};

export default function EditPage(props) {
  const handleClose = () => props.setOpen(false);
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  // const {id} = useParams();
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState(user.password);
  //modal
  const [editConfirmation, setEditConfirmation] = useState(false);
  useEffect(() => {
    props.userDetails.map((userD) => {
      if (userD.id == props.editId) {
        setUser(userD);
        setFirstName(userD.firstName);
        setLastName(userD.lastName);
        setEmail(userD.email);
        setRole(userD.role);
        setPassword(userD.password);
        console.log(userD);
      }
    });
    axios.get("http://localhost:8000/api/user/" + props.editId, {
      headers: {
        Authorization: adminToken || tokenFromLS,
        genericvalue: "admin",
      },
    });
  }, []);
  //editConfirmation
  function editConfirm() {
    setEditConfirmation(true);
  }
  function editUser(e) {
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      password: password,
    };
    axios
      .put("http://localhost:8000/api/update/" + props.editId, userDetails, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        console.log(response);
        props.listUser();
        handleClose();
        setEditConfirmation(false);
      })
      .catch((error) => {
        console.log(error);
        props.listUser();
        handleClose();
      });
    console.log(user);
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
            Edit User Details
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
                    className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3 "
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
                  className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3"
                  placeholder="Enter email address"
                  defaultValue={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="role"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select the Role:
                </label>

                <select
                  name="role"
                  id="role"
                  defaultValue={user.role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="qc">QC</option>
                  <option value="qa">QA</option>
                  <option value="agent">Agent</option>
                  <option value="supervisor">Supervisor</option>
                </select>
              </div>

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
                  defaultValue={user.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </Typography>
          <div className="w-full">
            <button
              type="submit"
              className="text-white bg-[#007bff] hover:bg-blue-600 block font-medium rounded-md text-sm mt-3  px-5 py-2.5 text-center"
              onClick={editConfirm}
            >
              Edit
            </button>
            {editConfirmation ? (
              <ConfirmationModal
                open={editConfirmation}
                setOpen={setEditConfirmation}
                handleOpen={editConfirm}
                message="edit"
                editId={props.editId}
                editUser={editUser}
              />
            ) : (
              ""
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
