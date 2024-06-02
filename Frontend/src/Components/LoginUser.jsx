import { useState } from "react";
import axios from "axios";
import google from "../assets/google.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a login data object
    const loginData = {
      email,
      password,
      role,
    };

    try {
      console.log(loginData); // Log the loginData object (for testing purposes)
      // Send a POST request to the backend with the loginData
      const response = await axios.post(
        "http://localhost:8080/api/login",
        loginData
      );
      console.log(response.data); // Log the response data
      console.log(response.status); // Log the response status (for testing purposes
      if (response.status === 200 || response.status === 201) {
        showToast(response.data.message, "success");
        //stroing the token in local storage
        localStorage.setItem("token", response.data.token);
      }
      // Navigate to the appropriate path based on the role
      setTimeout(() => {
        navigate(response.data.path);
      }, 3000);
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error (e.g., display error message to the user)
    }
  };

  return (
    <div className="h-screen bg-green-950 flex justify-center items-center">
      <div className="relative flex justify-center items-center w-3/4">
        <div className="bg-green-300 rounded-lg shadow-lg mt-14 p-8 w-2/5">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 p-2 text-black ">
              Class Companion - Login
            </h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block p-2 text-sm font-medium text-gray-950"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block p-2 text-sm font-medium text-gray-950"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block p-2 text-sm font-medium text-gray-950"
              >
                Role
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                <label htmlFor="student" className="mr-4">
                  Student
                </label>
                <input
                  type="radio"
                  id="teacher"
                  name="role"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                <label htmlFor="teacher">Teacher</label>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-5 py-3 mr-3 text-base font-medium text-center text-white dark:bg-green-950 rounded-lg  bg-opacity-70 hover:bg-opacity-100 focus:ring-4 focus:ring-primary-300 shadow-lg focus:shadow-lg hover:shadow-xl focus:ring-opacity-50 hover:bg-green-500 transition-all duration-300 ease-in-out"
            >
              Login
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-5 py-3 mr-3 mt-5 text-base font-medium text-center text-blue-950 bg-gradient-to-br from-sky-100 to-green-300 rounded-lg  bg-opacity-70 hover:bg-opacity-100 focus:ring-4 focus:ring-primary-300 shadow-lg focus:shadow-lg hover:shadow-xl focus:ring-opacity-50 hover:bg-green-500 transition-all duration-300 ease-in-out"
            >
              <img className="h-5 w-5 mr-3" src={google} alt="" />
              Continue with Google
            </button>
            <Link
              className="flex items-center justify-center mt-3"
              to="/signup"
            >
              Dont have an account? Signup
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginUser;
