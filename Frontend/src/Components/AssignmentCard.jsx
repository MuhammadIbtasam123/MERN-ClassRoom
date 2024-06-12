import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignmentCard = ({ assignments }) => {
  console.log(assignments.assignments);
  const [file, setFile] = useState(null);
  const [marks, setMarks] = useState({}); // Change from a single marks state to an object

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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (assignmentId) => {
    console.log("Assignment ID:", assignmentId);
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/submission/${assignmentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      if (response.status === 200 || response.status === 201) {
        showToast(response.data.message, "success");
      }

      // Add any additional logic here after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
      showToast("Assignment already submitted!", "error");
      // Handle error
    }
  };

  const getMarksByStudents = async (assignmentId) => {
    try {
      console.log("Assignment ID:", assignmentId);
      const response = await axios.get(
        `http://localhost:8080/api/getMarksStudent/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Marks:", response.data);

      setMarks((prevMarks) => ({
        ...prevMarks,
        [assignmentId]: response.data,
      }));

      if (response.status === 200) {
        showToast(response.data.message, "success");
      }
    } catch (error) {
      console.error("Error fetching marks:", error);
      showToast("Error fetching marks!", "error");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Assignments</h3>
      <ul>
        {assignments.assignments.map((assignment) => (
          <li key={assignment?._id || "default-id"}>
            <div className="flex items-center justify-between">
              <h4 className="text-green-500 text-lg ">{assignment.name}</h4>
              <p className="text-black font-bold text-lg">
                Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            </div>
            <p className="mt-2 mb-2">{assignment.description}</p>
            <div>
              <a
                href={`http://localhost:8080/api/assignemnts/${assignment.assignmentFile}`}
                className="text-green-500"
              >
                View Assignment
              </a>
            </div>
            <div className="bg-white p-4 rounded shadow mb-4">
              <h3 className="text-lg font-semibold mb-2">Submit Assignment</h3>
              <input type="file" className="mb-2" onChange={handleFileChange} />
              <button
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                onClick={() => handleSubmit(assignment._id)}
              >
                Submit
              </button>
              <h3 className="text-lg font-semibold mb- mt-5 mb-2">
                Assignment Results
              </h3>
              {marks[assignment._id] ? (
                <p className="text-black font-bold text-lg">
                  Marks: {marks[assignment._id]}
                </p>
              ) : (
                <p className="text-black font-bold text-lg">
                  Marks: Not yet graded
                </p>
              )}
              <button
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ml-0"
                onClick={() => getMarksByStudents(assignment._id)}
              >
                View Marks
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

AssignmentCard.propTypes = {
  assignments: PropTypes.array.isRequired,
};

export default AssignmentCard;
