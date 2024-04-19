import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import MyOrder from "../../Products/UserProducts/MyOrder";
import { BsCartCheck } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";

function Logout(props) {
  const [openModal, setOpenModal] = useState(false);

  function handleOpen() {
    setOpenModal(true);
  }
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        right: 0,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        padding: "10px",
        width: "180px",
        marginTop: "10px",
        borderRadius: "10px",
      }}
    >
      <div className="flex items-center text-gray-700 gap-2 text-xl hover:text-[gray]">
        <BsCartCheck />

        <MyOrder dashboardMenu={props.dashboardMenu}/>
      </div>
      <div className="flex items-center text-gray-700 gap-2 text-xl hover:text-[gray]">
        <RiLogoutCircleRLine />

        <ConfirmationModal
          handleOpen={handleOpen}
          open={openModal}
          setOpen={setOpenModal}
          message="logout"
        />
      </div>
    </div>
  );
}

export default Logout;
