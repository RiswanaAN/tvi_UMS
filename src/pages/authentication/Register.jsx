import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

// import '../index.css'

function Register() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345678");
  const [cPassword, setCPassword]= useState("")
  const [role, setRole] = useState("agent");
  const adminToken = useSelector((state) => state.auth.adminToken);
  const tokenFromLS= window.localStorage.getItem("tokenStorage")
  function registerUser(e) {
    e.preventDefault();
    const user = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
      role: role,
    };

    if(password==cPassword){
      axios
      .post("http://localhost:8000/api/user", user, {
        headers: {
          genericvalue: "admin",
          Authorization: adminToken || tokenFromLS,
        },
      })
      .then((response) => {
        navigate("/login/homePage");
      })
      .catch((error) => console.log("error"));
    }else{
      alert("Passwords are different");
    }
    
  }
  return (
    <div className="md:h-[100vh] bg-[#007bff] border flex flex-col items-center">
      <div className="flex flex-col border pb-3 rounded-lg bg-white m-[20px] mt-[50px] items-center md:w-[600px] w-[300px]">
        <div className="border-b border-gray-300 flex flex-col items-center p-[20px] w-full">
          <h1 className="text-[30px]  text-gray-800">Create Account</h1>
        </div>
        <form className="p-5 flex flex-col w-full">
          <div className="gap-3 mb-6 flex flex-col w-full pt-4">
            <div className="flex flex-col place-content-between gap-2 md:flex-row">
              <div className="w-full">
                <label
                  htmlFor="fname"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="fname"
                  className=" bg-gray-50 focus:outline-none border border-gray-300 rounded-md text-gray-90 -md block w-full p-3"
                  placeholder="Enter first name"
                  value={fname}
                  onInput={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lname"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lname"
                  className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3 "
                  placeholder="Enter last name"
                  value={lname}
                  onInput={(e) => setLname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3"
                placeholder="Enter email address"
                required
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="role"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select the Role:
              </label>

              <select
                name="role"
                id="role"
                value={role}
                onInput={(e) => setRole(e.target.value)}
              >
                <option value="qc">QC</option>
                <option value="qa">QA</option>
                <option value="agent">Agent</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>
            <div className="flex flex-col place-content-between gap-2 md:flex-row">
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3 "
                  placeholder="Enter password"
                  required
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="confirm_password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className="bg-gray-50  focus:outline-none border border-gray-300 text-gray-900 rounded-md block w-full p-3 "
                  placeholder="Confirm password"
                  required
                  value={cPassword}
                  onInput={(e) => setCPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-white block bg-[#007bff] hover:bg-blue-600  font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
            onClick={registerUser}
          >
            Create Account
          </button>
          <div className="border-t mt-5 text-[#007bff] border-gray-300 w-full flex flex-col items-center pt-4 text-sm">
            <Link to="/login">Have an account? Go to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
