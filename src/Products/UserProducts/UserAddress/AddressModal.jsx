import * as React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaRegAddressCard } from "react-icons/fa";
import { BsHouseAdd } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import DeleteConfirmation from "./DeleteConfirmation";

export default function AddressModal(props) {
  const [addresses, setAddresses] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [addr_Id, setAddr_Id] = React.useState("");
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  const [selectedAddress, setSelectedAddress] = React.useState({});
  function handleOpen(id) {
    setAddr_Id(id);
    setOpen(true);
  }
  function viewSingleAddress() {
    axios
      .get("http://localhost:8000/api/address-view", {
        headers: {
          Authorization: tokenFromLS || adminToken,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        setAddresses(response.data.result[0].address);
      });
  }
  React.useEffect(() => {
    console.log('addressModal',props);
    viewSingleAddress();
  }, []);

  function editAddress(address, id) {
    props.dashboardMenu("editaddress", "", id, address);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="rounded-lg bg-[#e9ecef] w-[900px] ml-7 mr-7 p-4">
        <div id="modal-modal-title" variant="h6" component="h2">
          <div className="border-b-white w-full border-b-2 flex items-center justify-between pl-7 uppercase text-[18px]">
            <div className="gap-3 flex items-center justify-start">
              <FaRegAddressCard />
              <h1>Delivery Address</h1>
            </div>
            <div>
              <button
                className="btn m-4"
                onClick={() => {
                  props.dashboardMenu(
                    "buyproduct",
                    props.products,
                    props.pId,
                    selectedAddress,
                    "",
                    props.fromPage
                  );
                }}
              >
                <TiTick />
              </button>
              <button
                className="btn m-4"
                onClick={() => {
                  props.dashboardMenu("addaddress", "", "", addresses);
                }}
              >
                <BsHouseAdd />
              </button>
            </div>
          </div>
        </div>
        <div id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="flex flex-col justify-between">
            {addresses.map((address, i) => (
              <div
                key={i}
                className="flex items-center justify-between"
                onClick={() => {
                  setSelectedAddress(address);
                }}
              >
                <div className="flex items-center justify-between">
                  <input type="radio" id={i} value={address} name={address} />
                  <label
                    htmlFor={i}
                    className="flex flex-col p-6 uppercase  text-md"
                  >
                    <h1 className="text-lg font-semibold">
                      {address.fullName}
                    </h1>
                    <p>
                      {address.buildingName} {address.area}
                    </p>
                    <p>
                      {address.city} {address.state} ,{address.pincode}
                    </p>
                    <p className="text-sm">Landmark: {address.landmark}</p>
                    <p className="italic">Ph No: {address.phoneNumber}</p>
                  </label>
                </div>
                <div className="flex">
                  <div>
                    <button
                      className="btn m-4 "
                      onClick={() => editAddress(address, address._id)}
                    >
                      <LiaEdit />
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn m-4 "
                      onClick={() => handleOpen(address._id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {open ? (
              <DeleteConfirmation
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
                id={addr_Id}
                viewSingleAddress={viewSingleAddress}
                dashboardMenu={props.dashboardMenu}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
