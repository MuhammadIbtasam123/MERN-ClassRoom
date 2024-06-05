import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewClassForm = () => {
  const [className, setClassName] = useState("");
  const [subjects, setSubjects] = useState([
    "Math",
    "Science",
    "History",
    "English",
    "Geography",
    "Computer Science",
    "Art",
    "Physical Education",
  ]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

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

  const addNewSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/createClass",
        {
          name: className,
          subject: selectedSubject,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Class created successfully:", response.data);
      if (response.status === 200 || response.status === 201) {
        showToast(response.data.message, "success");
      }
      // You can handle success behavior here, like showing a success message or redirecting
    } catch (error) {
      console.error("Error creating class:", error);
      showToast("Error creating class", "error");
      // You can handle error behavior here, like showing an error message
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Class Name:</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Subject:</label>
          <select
            className="mt-1 p-2 border rounded w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <div className="flex mt-2">
            <input
              type="text"
              className="flex-grow p-2 border rounded"
              placeholder="Add new subject"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              onClick={addNewSubject}
            >
              Add
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Class
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewClassForm;
