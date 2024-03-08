import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import axios from "axios";
import { setToken } from "../../redux/slice/userSlice";
import UserRegister from "../User/UserRegister";
import "./auth.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(""); //admin@gmail.com
  const [password, setPassword] = useState(""); //admin@12345
  const [message, setMessage] = useState(false); //email validation
  const [passMessage, setPassMessage] = useState(false); //password validation
  const userDetails = useSelector((state) => state.auth.user);
  function loginUser(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/api/login", user)
      .then((response) => {
        const token = response.data.access_token;

        dispatch(setToken(token));
        // console.log(response.data);
        if (response.data.role == "admin") {
          navigate("/login/homepage");
        } else if (response.data.role == "agent") {
          // console.log(response);
          navigate("/user/userHomepage");
        } else if (response.data.role == "supervisor") {
          // console.log(response);
          navigate("/supervisorPage");
        } else {
          console.log("Not Login");
        }
      })
      .catch((error) => console.log(error));
  }
  function userRegister() {
    setOpen(true);
  }
  //validation
  const emailvalidation = (e) => {
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    var emailValue = e.target.value;
    setEmail(emailValue);
    if (email.match(pattern)) {
      setMessage(true);
    } else {
      console.log("Email should be in 'exp@gmail.com'");
    }
  };

  const passwordvalidation = (e) => {
    var passPattern = /^(?=.*[a-zA-Z0-9]).{8,}$/;
    var passwordvalue = e.target.value;
    setPassword(passwordvalue);
    if (password.match(passPattern)) {
      setPassMessage(true);
    } else {
      console.log(
        "Password should contain atleast 1 alphanumeric and min-length =8"
      );
    }
  };

  return (
    <div className="h-[100vh] bg-[#007bff] border flex flex-col items-center">
      <div className="flex flex-col border pb-3 rounded-md bg-white m-[20px] mt-[50px] items-center md:w-[600px] w-[300px]">
        <div className="border-b border-gray-300 w-full flex flex-col items-center p-[20px]">
          <h1 className="text-[30px]">Login</h1>
        </div>
        <form className="p-5 flex flex-col w-full">
          <div className="gap-3 mb-6 flex flex-col w-full pt-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <div className="input-field ">
                <input
                  type="email"
                  id="email"
                  className={`bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-md block w-full p-3 ${
                    email.length == 0
                      ? "input-control fill-email"
                      : message
                      ? "input-control valid-email"
                      : "input-control invalid-email"
                  }`}
                  placeholder="Enter email address"
                  required
                  value={email}
                  onChange={emailvalidation}
                />
              </div>
            </div>
            <p
              className={`text-[13px] ${
                email.length == 0
                  ? "text-message fill-colour"
                  : message
                  ? "text-message success-colour"
                  : "text-message error-colour"
              }`}
            >
              {/* Please fill in the email field */}
              {email.length == 0
                ? "Please fill in the email field"
                : message
                ? "Email you entered is valid"
                : "Email you entered is invalid"}
            </p>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="input-field ">
                <input
                  type="password"
                  id="password"
                  className={`bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-md block w-full p-3 ${
                    password.length == 0
                      ? "input-control fill-password"
                      : passMessage
                      ? "input-control valid-password"
                      : "input-control invalid-password"
                  }`}
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={passwordvalidation}
                />
              </div>
            </div>
            <p
              className={`text-[13px] ${
                password.length == 0
                  ? "text-message fill-colour"
                  : passMessage
                  ? "text-message success-colour"
                  : "text-message error-colour"
              }`}
            >
              {/* Please fill in the password field */}
              {password.length == 0
                ? "Please fill in the password field"
                : passMessage
                ? "password you entered is valid"
                : "Should contain min 8 and atleast 1 alphanumeric character"}
            </p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="rememberPswd" required />
            <label htmlFor="rememberPswd" className="text-gray-800 ml-2">
              Remember Password
            </label>
          </div>
          <div className="flex place-content-between items-center">
            <Link to="/login/forgotPassword" className="text-[#007bff] text-sm">
              Forgot Password?
            </Link>
            <button
              type="submit"
              className="text-white block bg-[#007bff] hover:bg-blue-600  font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
              onClick={loginUser}
            >
              Login
            </button>
          </div>
        </form>
        <div className="border-t mt-5 text-[#007bff] border-gray-300 w-full flex flex-col items-center pt-4 text-sm">
          <button onClick={userRegister}>Need an account? Sign up!</button>
        </div>
        {open ? <UserRegister open={open} setOpen={setOpen} /> : ""}
      </div>
    </div>
  );
}

export default Login;
