import * as React from "react";
import { useDispatch } from "react-redux";
import { removeToken } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  margin: "auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid white",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

export default function ConfirmationModal(props) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => props.setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //token
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  function handleLogout() {
    dispatch(removeToken());
    navigate("/login");
  }
  function handleCancel() {
    props.setOpen(false);
    navigate("/login/homePage");
  }
  function handleRemove() {
    axios
      .delete(`http://localhost:8000/api/delete/${props.deleteId}`, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        console.log(response);
        props.setOpen(false);
        props.listUser();
        navigate("/login/homePage");
      })
      .catch((error) => console.log("Error: ", error));
  }
  

  const editUserDetails=() => { 
    props.editUser();
    handleClose();
   }
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <button
        onClick={props.handleOpen}
        className="text-[black] flex items-center justify-center hover:text-[gray]"
      >
        {props.message == "logout"
          ? "Logout"
          : props.message == "delete"
          ? "Delete"
          : "Editsd"}
      </button>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title" className="text-[25px] mb-3">
            {props.message == "logout"
              ? "Logout"
              : props.message == "delete"
              ? "Delete"
              : "Edit"}
          </div>
          <p>
            {props.message == "logout"
              ? "Do you want to logout?"
              : props.message == "delete"
              ? "Do you want to delete?"
              : "Do you want to edit?"}
          </p>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex justify-center gap-8"
          >
            <button
              onClick={handleCancel}
              className=" bg-[#e9ecef] font-mono text-[#515A5A] p-3 pl-5 pr-5  rounded-sm flex items-center justify-center hover:bg-gray-600 hover:text-white min-w-[100] text-[13px]"
            >
              Cancel
            </button>
            {props.message == "logout" ? (
              <button
                onClick={handleLogout}
                className="text-[white] font-mono bg-[#B03A2E] p-3 pl-5 pr-5  rounded-sm flex items-center justify-center hover:bg-[#cb4335] min-w-[100] text-[13px]"
              >
                Logout
              </button>
            ) : props.message == "delete" ? (
              <button
                onClick={handleRemove}
                className="text-[white] font-mono bg-[#B03A2E] p-3 pl-5 pr-5  rounded-sm flex items-center justify-center hover:bg-[#cb4335] min-w-[100] text-[13px]"
              >
                Delete
              </button>
            ) : (
              <button
                onClick={editUserDetails}
                className="text-[white] font-mono bg-[#B03A2E] p-3 pl-5 pr-5  rounded-sm flex items-center justify-center hover:bg-[#cb4335] min-w-[100] text-[13px]"
              >
                Edit
              </button>
            )}
            
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
