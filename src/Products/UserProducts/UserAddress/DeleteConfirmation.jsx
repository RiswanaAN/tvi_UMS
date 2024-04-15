import * as React from "react";
import { useDispatch } from "react-redux";
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

export default function DeleteConfirmation(props) {
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
  function deleteAddress() {
    axios
      .delete("http://localhost:8000/api/delete-address/" + props.id, {
        headers: {
          Authorization: tokenFromLS || adminToken,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        console.log(response);
        // console.log(addresses);
        props.dashboardMenu("addressList");
        props.viewSingleAddress();
        handleClose()
      });
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
          <div id="modal-modal-title" className="text-[25px] mb-3">
            Delete
          </div>
          <p>
            Are sure to delete?
          </p>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex justify-center gap-8"
          >
            <button
              onClick={handleCancel}
              className=" bg-[#e9ecef] font-mono text-[#515A5A] p-3 pl-5 pr-5  rounded-sm flex items-center justify-center hover:bg-gray-600 hover:text-white min-w-[100] text-[px]"
            >
              Cancel
            </button>
           
              <button
                onClick={deleteAddress}
                className="text-[white] font-mono bg-[#B03A2E] p-3 pl-5 pr-5  rounded-sm flex items-center justify-center hover:bg-[#cb4335] min-w-[100] "
              >
                Delete
              </button>
           
            
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
