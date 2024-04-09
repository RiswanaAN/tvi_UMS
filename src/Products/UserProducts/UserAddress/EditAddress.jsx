import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function EditAddress(props) {
  const [singleAddress, setSingleAddress] = useState({});
  const [fullname, setFullname] = useState(props.address.fullName);
  const [phoneNumber, setPhoneNumber] = useState(
    props.address.phoneNumber.toString()
  );
  const [alternateNumber, setAlternateNumber] = useState(
    props.address.alternateNumber.toString()
  );
  const [pincode, setPincode] = useState(props.address.pincode.toString());
  const [state, setState] = useState(props.address.state);
  const [city, setCity] = useState(props.address.city);
  const [buildingName, setBuildingName] = useState(props.address.buildingName);
  const [area, setArea] = useState(props.address.area);
  const [landmark, setLandmark] = useState(props.address.landmark);

  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");
  useEffect(() => {
    setSingleAddress(props.address);
  }, []);

  function EditAddress() {
    const address = {
      fullName: fullname,
      phoneNumber: phoneNumber,
      alternateNumber: alternateNumber,
      pincode: pincode,
      state: state,
      city: city,
      buildingName: buildingName,
      area: area,
      landmark: landmark,
    };

    axios
      .put(
        "http://localhost:8000/api/address-edit/" + singleAddress._id,
        address,
        {
          headers: {
            Authorization: tokenFromLS || adminToken,
            genericvalue: "agent",
          },
        }
      )
      .then((response) => {
        console.log(response);
        props.dashboardMenu("addressList")
      });
  }
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form className="bg-[#e9ecef] w-[700px] pl-[125px] pt-[50px] rounded-lg  flex flex-col">
        <div className="border-b-white border-b-4 gap-3 p-3 flex  items-start justify-start pl-7 uppercase text-[18px]">
          <h1>Edit Address</h1>
        </div>
        <div className="flex flex-wrap -mx-3  p-3 gap-5">
          <div className="flex flex-col">
            <label
              id="fullname"
              className="text-gray-700 font-bold text-xs uppercase mb-2"
            >
              Full name
            </label>
            <input
              type="text"
              htmlFor="fullname"
              className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
              placeholder="Full name"
              defaultValue={singleAddress.fullName}
              onChange={(e) => setFullname(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              id="phoneNumber"
              className="text-gray-700 font-bold text-xs uppercase mb-2 "
            >
              Mobile Number
            </label>
            <input
              type="text"
              htmlFor="phoneNumber"
              className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
              placeholder="xxx xxx xxxx"
              defaultValue={singleAddress.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3  p-3 gap-5">
          <div className="flex flex-col">
            <label
              id="buildingName"
              className="text-gray-700 font-bold text-xs uppercase mb-2 "
            >
              House name/ Building name/ Flat no.
            </label>
            <input
              type="text"
              htmlFor="buildingName"
              className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
              placeholder="House name"
              defaultValue={singleAddress.buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              id="area"
              className="text-gray-700 font-bold text-xs uppercase mb-2 "
            >
              Area
            </label>
            <input
              type="text"
              htmlFor="ofer"
              className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
              placeholder="area/ street name"
              defaultValue={singleAddress.area}
              onChange={(e) => setArea(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3  p-3 gap-5">
          <div className="flex flex-col">
            <label
              id="city"
              className="text-gray-700 font-bold text-xs uppercase mb-2 "
            >
              City
            </label>
            <input
              type="text"
              htmlFor="city"
              className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
              placeholder="city"
              defaultValue={singleAddress.city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              id="state"
              className="text-gray-700 font-bold text-xs uppercase mb-2 "
            >
              State
            </label>
            <input
              type="text"
              htmlFor="state"
              className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
              placeholder="State"
              defaultValue={singleAddress.state}
              onChange={(e) => setState(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              id="pincode"
              className="text-gray-700 font-bold text-xs uppercase mb-2 "
            >
              Pincode
            </label>
            <input
              type="text"
              htmlFor="pincode"
              className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
              placeholder="xxx xxx"
              defaultValue={singleAddress.pincode}
              onChange={(e) => setPincode(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3  p-3 gap-5">
          <div className="flex flex-col">
            <label
              id="landmark"
              className="text-gray-700 font-bold text-xs uppercase mb-2 "
            >
              Landmark
            </label>
            <input
              type="text"
              htmlFor="landmark"
              className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
              placeholder="Eg: Near Appollo Hospital/ School/..."
              defaultValue={singleAddress.landmark}
              onChange={(e) => setLandmark(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              id="alternateNumber"
              className="text-gray-700 font-bold text-xs uppercase mb-2 "
            >
              Alternate Mobile Number
            </label>
            <input
              type="text"
              htmlFor="alternateNumber"
              className="bg-gray-200 text-gray-700 rounded-md  py-2 px-4 mb-3 focus:outline-none focus:bg-white"
              placeholder="alternate Number"
              defaultValue={singleAddress.alternateNumber}
              onChange={(e) => setAlternateNumber(e.target.value)}
            ></input>
          </div>
        </div>
      </form>
      <div className="flex flex-wrap p-3 gap-5 justify-center">
        <div className="flex flex-col">
          <button className="btn font-bold" onClick={EditAddress}>
            Edit Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAddress;
