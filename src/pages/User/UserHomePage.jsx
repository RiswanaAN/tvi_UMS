import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function UserHomePage() {
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  useEffect(() => 
    axios.get("http://localhost:8000/api/get/" + id),
    {
      header: {
        Authorization: adminToken || tokenFromLS,
        genericvalue: "agent",
      },
    },
    []
  );
  return (
    <div>
      <div>Profile</div>
      <div className="flex flex-col">
        <div>
          <label>First Name</label>
          <p></p>
          <label>Last Name</label>
          <p></p>
        </div>
        <div>
          <label>Email</label>
          <p></p>
        </div>
        <div>
          <label>Role</label>
          <p></p>
          <label>Password</label>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
