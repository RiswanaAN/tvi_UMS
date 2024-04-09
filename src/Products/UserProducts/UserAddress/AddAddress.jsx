import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddAddress(props) {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
     
  const navigate= useNavigate()
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS = window.localStorage.getItem("tokenStorage");

  function addNewAddress(){
    const address={
        fullName: fullname,
        phoneNumber: phoneNumber,
        alternateNumber: alternateNumber,
        pincode: pincode,
        state: state,
        city: city,
        buildingName: buildingName,
        area: area,
        landmark: landmark
     }
     
    axios
      .post("http://localhost:8000/api/address", address, {
        headers: {
          Authorization: tokenFromLS || adminToken,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        console.log(response);
        console.log(props.allAddress);

        props.dashboardMenu("addressList")
      });
  }
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form className="bg-[#e9ecef] w-[700px] pl-[125px] pt-[50px] rounded-lg  flex flex-col">
        <div className="border-b-white border-b-4 gap-3 p-3 flex  items-start justify-start pl-7 uppercase text-[18px]">
          <h1>Add Address</h1>
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
              value={fullname}
              onInput={(e) => setFullname(e.target.value)}
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
              value={phoneNumber}
              onInput={(e) => setPhoneNumber(e.target.value)}
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
              value={buildingName}
              onInput={(e) => setBuildingName(e.target.value)}
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
              value={area}
              onInput={(e) => setArea(e.target.value)}
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
              value={city}
              onInput={(e) => setCity(e.target.value)}
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
              value={state}
              onInput={(e) => setState(e.target.value)}
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
              value={pincode}
              onInput={(e) => setPincode(e.target.value)}
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
              value={landmark}
              onInput={(e) => setLandmark(e.target.value)}
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
              value={alternateNumber}
              onInput={(e) => setAlternateNumber(e.target.value)}
            ></input>
          </div>
        </div>
      </form>
      <div className="flex flex-wrap p-3 gap-5 justify-center">
        <div className="flex flex-col">
          <button className="btn font-bold" onClick={addNewAddress}>Add Address</button>
        </div>
      </div>
      
    
    </div>
  );
}

export default AddAddress;
