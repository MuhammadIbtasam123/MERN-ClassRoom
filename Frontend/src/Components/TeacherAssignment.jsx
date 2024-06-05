import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherAssignment = () => {
  const [name, setName] = useState("");
  const [assignmentType, setAssignmentType] = useState("theory");
  const [description, setDescription] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [rubricFile, setRubricFile] = useState(null);
  const [testCasesFile, setTestCasesFile] = useState(null);
  const [dueDate, setDueDate] = useState(null); // State for due date
  const { classroomId } = useParams();

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

  const handleAssignmentFileChange = (e) => {
    const file = e.target.files[0];
    setAssignmentFile(file);
  };

  const handleRubricFileChange = (e) => {
    const file = e.target.files[0];
    setRubricFile(file);
  };

  const handleTestCasesFileChange = (e) => {
    const file = e.target.files[0];
    setTestCasesFile(file);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("dueDate", dueDate); // Append dueDate to form data
      formData.append("type", assignmentType);
      formData.append("classID", classroomId);

      // Append files based on assignment type
      formData.append("assignmentFile", assignmentFile);
      if (assignmentType === "theory") {
        formData.append("rubricFile", rubricFile);
      } else if (assignmentType === "coding") {
        formData.append("testCasesFile", testCasesFile);
      }

      const response = await axios.post(
        `http://localhost:8080/api/uploadAssignment/${classroomId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Assignment submitted successfully:", response.data);
      if (response.status === 200 || response.status === 201) {
        showToast(response.data.message, "success");
      }
      // Add any additional logic after successful submission
    } catch (error) {
      console.error("Error submitting assignment:", error);
      showToast("Error submitting assignment", "error");
      // Handle error logic
    }
  };

  return (
    <div className="min-h-screen bg-green-300 text-white p-4 flex flex-col items-center">
      <div className="bg-green-950 text-green-100 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Upload Assignment</h2>

        <div className="mb-4">
          <label className="block mb-2">Assignment Type:</label>
          <select
            value={assignmentType}
            onChange={(e) => setAssignmentType(e.target.value)}
            className="w-full p-2 rounded text-green-950"
          >
            <option value="theory">Theory Based</option>
            <option value="coding">Coding Based</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded text-green-950"
            placeholder="Enter assignment name..."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Assignment Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded text-green-950"
            rows="4"
            placeholder="Enter assignment description..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Due Date:</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            className="w-full p-2 rounded text-green-950"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Upload Assignment File:</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleAssignmentFileChange}
            className="w-full p-2 rounded text-green-950"
          />
        </div>

        {assignmentType === "theory" && (
          <div className="mb-4">
            <label className="block mb-2">Upload Rubric File:</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleRubricFileChange}
              className="w-full p-2 rounded text-green-950"
            />
          </div>
        )}

        {assignmentType === "coding" && (
          <div className="mb-4">
            <label className="block mb-2">Upload Test Cases File:</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleTestCasesFileChange}
              className="w-full p-2 rounded text-green-950"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Submit Assignment
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TeacherAssignment;
