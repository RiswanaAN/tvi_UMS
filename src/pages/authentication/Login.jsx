import { useState } from "react";
import React from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/slice/userSlice";
import UserRegister from "../User/UserRegister";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");//admin@gmail.com
  const [password, setPassword] = useState("");//admin@12345
  const userDetails= useSelector((state)=> state.auth.user)
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
        // console.log("Token:", token);
        if(response.data.role =="admin"){
          navigate("/login/homepage");
        }
        else if (response.data.role== "agent") {
          console.log(response);
          navigate("/user/userHomepage");
        }
        else if (response.data.role== "supervisor") {
          console.log(response);
          navigate("/supervisorPage");
        } 
         else {
          console.log("Not Login");
        }
        
      })
      .catch((error) => console.log(error));
  }
  function userRegister() {
    setOpen(true);
  }

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
              <input
                type="email"
                id="email"
                className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-md block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter email address"
                required
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 rounded-md block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter password"
                required
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </div>
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
