import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { FaUserCog } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  padding: "24px"
};

export default function ViewPage(props) {
  const navigate = useNavigate();
  const handleClose = () => props.setOpen(false);
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  const [user, setUser] = useState({});
  const [icon, setIcon] = useState("");
  const [fullname, setFullname] = useState("");
  const [profilePic, setProfilePic]= useState("");


  useEffect(() => {
    props.userDetails.forEach((userD) => {
      if (userD._id === props.viewId) {
        setUser(userD);
        const full = `${userD.firstName} ${userD.lastName}`;
        const userIcon = `${userD.firstName.charAt(0)}${userD.lastName.charAt(0)}`;
        setIcon(userIcon);
        setFullname(full);
      }
    });

    axios.get(`http://localhost:8000/api/user/${props.viewId}`, {
      headers: {
        Authorization: adminToken || tokenFromLS,
        genericvalue: "admin"
      }
    }).then((response)=> {
      console.log(response.data.result)
      const image= response.data.result.image?.data
      console.log(image);
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(image))
        );
        
        setProfilePic(base64String);
    
    });
  }, []);

  function handleUser() {
    navigate("/login/homePage");
  }

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" align="center" gutterBottom>
          {fullname}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          {user.image ? (
            <img src={`data:image/png;base64,${profilePic}`} alt="User" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
          ) : (
            <div className="w-[80px] h-[80px] rounded-[50%] bg-[#124338] flex justify-center items-center text-[2rem] text-white">
              {icon}
            </div>
          )}
        </div>
        <div>
          <form>
            <div className="flex items-center mb-2">
              <TfiEmail className="mr-[8px]" />
              <input
                type="email"
                className="input-field"
                disabled
                defaultValue={user.email}
              />
            </div>
            <div className="flex items-center mb-2">
              <FaUserCog className="mr-[8px]" />
              <input
                type="text"
                className="input-field"
                disabled
                defaultValue={user.role}
              />
            </div>
            <div className="flex items-center">
              <TbPasswordUser className="mr-[8px]" />
              <input
                type="text"
                className="input-field"
                disabled
                defaultValue={user.password}
              />
            </div>
            {/* <button
          className="button"
          onClick={handleUser}
        >
          Back
        </button> */}
          </form>
        </div>
       
      </Box>
    </Modal>
  );
}
