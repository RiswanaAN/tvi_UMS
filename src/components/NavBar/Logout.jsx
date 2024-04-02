import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function Logout() {
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
        width: "150px",
        marginTop: "10px",
        borderRadius: "10px"
      }}
    >
      <ConfirmationModal
        handleOpen={handleOpen}
        open={openModal}
        setOpen={setOpenModal}
        message="logout"
      />
    </div>
  );
}

export default Logout;
