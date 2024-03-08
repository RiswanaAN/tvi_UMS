import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../components/DataTable/DataTable.css";
import { useNavigate } from "react-router-dom";
import { FaTable } from "react-icons/fa";


export default function SupervisorDataTable() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");


  function listUser() {
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "supervisor",
        },
      })
      .then((response) => {
        setUserDetails(response.data.users);
      })
      .catch((error) => console.error("Error", error));
  }
  useEffect(() => {
    listUser();
  }, []);

  

  const columns = [
    { field: "id", headerName: "ID", width: 180, headerClassName: "header-cell", },
    {
      field: "firstName",
      headerName: "First Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      headerClassName: "header-cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      headerClassName: "header-cell",
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      headerClassName: "header-cell",
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      headerClassName: "header-cell",
    },
   
  ];

  return (
    <div className="m-5 border border-[gray] rounded-md w-full">
      <div className="flex items-center ml-3">
        <FaTable />
        <h1 className="flex justify-start items-center m-3 text-lg">
          User Details
        </h1>
      </div>
      <div className="table-container">
        {/* style={{
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginTop: 30,
        }} */}
        <DataGrid
          className="data-table"
          rows={userDetails}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[2, 5, 10]}
        />
      </div>
      
    </div>
  );
}
