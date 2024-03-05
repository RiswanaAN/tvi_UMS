import React from "react";
import "./auth.css";
// import '../index.css'

function NewPassword() {
  return (
    <div className="h-[100vh] bg-[#007bff] border flex flex-col items-center">
      <div className="flex flex-col border pb-3 rounded-md bg-white m-[20px] mt-[50px] items-center w-[600px]">
        <div className="border-b border-gray-300 w-full flex flex-col items-center p-[20px]">
          <h1 className="text-[30px]">Reset Password</h1>
        </div>
        <form className="p-5 flex flex-col w-full">
          <div className="gap-3 mb-6 flex flex-col w-full pt-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-md block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter new password"
                required
              />
            </div>

            <div>
              <label
                htmlFor="conf_password"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="conf_password"
                className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 rounded-md block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter confirm password"
                required
              />
            </div>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="rememberPswd" className=""/>
            <label htmlFor="rememberPswd" className="text-gray-800 ml-2">Remember Password</label>
          </div>
          <button
            type="submit"
            className="text-white block bg-[#007bff] hover:bg-blue-600  font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center mt-2"
          >
            Reset
          </button>
          <div className="border-t mt-5 text-[#007bff] border-gray-300 w-full flex flex-col items-center pt-4 text-sm">
            <a href="#">Need an account? Sign up!</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
