import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditPage from "../../pages/EditPage/EditPage";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaTable } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import "./DataTable.css";
import ViewPage from "../../pages/ViewPage/ViewPage";

export default function DataTable() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  //token
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  //edit
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState();
  //view
  const [openDetails, setOpenDetails] = useState(false);
  const [viewId, setViewId] = useState();

  function listUser() {
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        setUserDetails(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => console.error("Error", error));
  }
  useEffect(() => {
    listUser();
  }, []);

  function handleEdit(id) {
    setEditId(id);
    setOpen(true);
  }
  function handleView(id) {
    setViewId(id);
    setOpenDetails(true);
  }
  //delete
  function handleRemove(id) {
    axios
      .delete(`http://localhost:8000/api/delete/${id}`, {
        headers: {
          Authorization: adminToken || tokenFromLS,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        console.log(response);
        listUser();
      })
      .catch((error) => console.log("Error: ", error));
  }

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
    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => (
        <button className="edit-button" onClick={() => handleEdit(params.row.id)}>
          <FaEdit className="iconEdit"/>
        </button>
      ),
      headerClassName: "header-cell",
    },
    {
      field: "remove",
      headerName: "Remove",
      width: 140,
      renderCell: (params) => (
        <button className="delete-button" onClick={() => handleRemove(params.row.id)}>
          <RiDeleteBin5Fill className="iconRemove"/>
        </button>
      ),
      headerClassName: "header-cell",
    },
    {
      field: "view",
      headerName: "View",
      width: 140,
      renderCell: (params) => (
        <button className="view-button" onClick={() => handleView(params.row.id)}>
          <IoIosEye className="iconView"/> 
        </button>
      ),
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
      {open ? (
        <EditPage
          open={open}
          setOpen={setOpen}
          editId={editId}
          userDetails={userDetails}
        />
      ) : (
        ""
      )}
      {openDetails ? (
        <ViewPage open={openDetails}
        setOpen={setOpenDetails}
        viewId={viewId}
        userDetails={userDetails}/>
      ) : (
        ""
      )}
    </div>
  );
}