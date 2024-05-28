// import React from "react";
// import untitled from "../assets/heart.png";
import google from "../assets/google.png";
import { Link } from "react-router-dom";

const SignupUser = () => {
  return (
    // <div className="h-FULL bg-blue-950 flex justify-center items-center">
    <div className="h-full bg-green-950 flex justify-center items-center pb-4">
      {/* Container for login content */}
      <div className="relative flex justify-center items-center w-3/4">
        {/* Form container */}
        <div className="bg-green-300 rounded-lg shadow-lg mt-14 p-8 w-2/5">
          {/* Login form */}
          <form>
            <h2 className="text-2xl font-bold mb-4 p-2 text-black ">
              Class Companion - Signup
            </h2>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block p-2 text-sm font-medium text-geen-950"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your username"
              />
            </div>
            {/* email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block p-2 text-sm font-medium text-geen-950"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block p-2 text-sm font-medium text-geen-950"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block p-2 text-sm font-medium text-geen-950"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 p-2 focus:ring-blue-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-5 py-3 mr-3 text-base font-medium text-center text-white dark:bg-green-950 rounded-lg  bg-opacity-70 hover:bg-opacity-100 focus:ring-4 focus:ring-primary-300 shadow-lg focus:shadow-lg hover:shadow-xl focus:ring-opacity-50 hover:bg-green-500 transition-all duration-300 ease-in-out"
            >
              Sign up
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-5 py-3 mr-3 mt-5 text-base font-medium text-center text-green-950 bg-gradient-to-br from-sky-100 to-green-300 rounded-lg  bg-opacity-70 hover:bg-opacity-100 focus:ring-4 focus:ring-primary-300 shadow-lg focus:shadow-lg hover:shadow-xl focus:ring-opacity-50 hover:bg-green-500 transition-all duration-300 ease-in-out"
            >
              <img className="h-5 w-5 mr-3" src={google} alt="" />
              Continue with Google
            </button>

            <Link className="flex items-center justify-center mt-3" to="/login">
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupUser;
