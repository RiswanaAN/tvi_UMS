import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import orderCompletedImage from "../../assets/image.png";

const style = {
  margin: "auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid white",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

export default function PlaceOrderConfirm(props) {
  const handleClose = () => props.setOpen(false);

  return (
    <div className="w-full">
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            id="modal-modal-title"
            className="text-[25px] mb-3 w-full flex  items-center justify-center text-gray-500 italic"
          >
            <img src={orderCompletedImage} />
            <div className="w-full ">
              Order Done Successfully!!!
              <p className="text-[15px] w-full flex justify-center items-center normal-case">Keep Shopping with us</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
