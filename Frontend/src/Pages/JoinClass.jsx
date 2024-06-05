// import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinClassPage = () => {
  const { id } = useParams();
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

  const handleJoinClass = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/joinClass/${id}`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Join Class Response:", response.data);
      showToast("Class joined Scuccesfully", "success");

      // Optionally, you can redirect the user to the classroom page or show a success message
    } catch (error) {
      console.error("Error joining class:", error);
      showToast("Error joining class", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Join Class Page</h1>
      <button
        onClick={handleJoinClass}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Join Class
      </button>
      <ToastContainer />
    </div>
  );
};

export default JoinClassPage;
