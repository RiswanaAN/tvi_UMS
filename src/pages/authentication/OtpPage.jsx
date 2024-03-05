import React from 'react'
import { Link } from 'react-router-dom'

function OtpPage() {
  return (
    <div className="h-screen bg-[#007bff] border flex flex-col items-center">
      <div className="flex flex-col border pb-1 rounded-md bg-white m-[20px] w-[500px] mt-[50px] items-center">
        <div className="border-b border-gray-300 w-[500px] flex flex-col items-center p-[20px]">
          <h1 className="text-[30px]  text-gray-800">Password Recovery</h1>
        </div>
        <form className="p-5 flex flex-col w-full">
          <div className="gap-3 mb-6 flex flex-col w-full pt-4">
            <div>
                <p className=" text-gray-700 text-sm">Enter the OTP which we send to your registered email.</p>
            </div>
            <div>
              <label
                htmlFor="otp"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Generated OTP
              </label>
              <input
                type="password"
                id="otp"
                className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-md block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="*******"
                required
              />
            </div>
          </div>
         
          <div className="flex place-content-between items-center">
            <a href="#" className="text-[#007bff] text-sm">
              Return to login
            </a>
            <button
              type="submit"
              className="text-white block bg-[#007bff] hover:bg-blue-600  font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
            >
              Verify
            </button>
          </div>
          <div className="border-t  mt-5 text-[#007bff] border-gray-300 w-full flex flex-col items-center pt-4 text-sm">
            <Link to= '/register'>Need an account? Sign up!</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OtpPage