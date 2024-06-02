// Import necessary libraries
import { useState } from "react";
import axios from "axios";
import google from "../assets/google.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// SignupUser component
const SignupUser = () => {
  // State variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [gender, setGender] = useState(""); // Gender state
  const [dob, setDob] = useState(""); // Date of birth state
  const [address, setAddress] = useState(""); // Address state
  const [contactNo, setContactNo] = useState(""); // Contact number state
  const [image, setImage] = useState(null);

  // Function to show toast notifications
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

  // Event handlers
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDob(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleContactNoChange = (e) => {
    setContactNo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("address", address);
    formData.append("contactNo", contactNo);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        showToast(response.data.message, "success");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      showToast(error.response.data.message, "error");
    }
  };

  // Render JSX
  return (
    <div className="h-full bg-green-950 flex justify-center items-center pb-4">
      <div className="relative flex justify-center items-center w-3/4">
        <div className="bg-green-300 rounded-lg shadow-lg mt-14 p-8 w-2/5">
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
                value={username}
                onChange={handleUsernameChange}
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block p-2 text-sm font-medium text-geen-950"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
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
                value={email}
                onChange={handleEmailChange}
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
                value={password}
                onChange={handlePasswordChange}
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
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="mt-1 p-2 focus:ring-blue-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Confirm your password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block p-2 text-sm font-medium text-geen-950"
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
            {/* Gender radio buttons */}
            <div className="mb-4">
              <label className="block p-2 text-sm font-medium text-geen-950">
                Gender
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                <label htmlFor="male" className="mr-4">
                  Male
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            {/* Date of Birth calendar input */}
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block p-2 text-sm font-medium text-geen-950"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={handleDateOfBirthChange}
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {/* Address input field */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block p-2 text-sm font-medium text-geen-950"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleAddressChange}
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your address"
              />
            </div>
            {/* Contact Number input field */}
            <div className="mb-4">
              <label
                htmlFor="contactNo"
                className="block p-2 text-sm font-medium text-geen-950"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={contactNo}
                onChange={handleContactNoChange}
                className="mt-1 p-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your contact number"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
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
      <ToastContainer />
    </div>
  );
};

export default SignupUser;
