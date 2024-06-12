import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherAddStudent = ({ allStudents, close }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { classroomId } = useParams();

  const filteredStudents = allStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const sendInvite = async (student) => {
    try {
      console.log(`Invite sent to ${student.email}`); // Placeholder for actual invite logic
      console.log("classroom id", classroomId);
      const response = await axios.post(
        "http://localhost:8080/api/sendInvite",
        {
          classId: classroomId,
          studentEmail: student.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", response.status); // Placeholder for actual invite logic
      if (response.status === 200 || response.status === 201) {
        showToast(response.data.message, "success");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      showToast("Error sending invites", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Add Student to Class</h2>
        <div className="mb-4">
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.email} className="border-b">
                  <td className="px-4 py-2 text-center">{student._id}</td>
                  <td className="px-4 py-2 text-center">{student.name}</td>
                  <td className="px-4 py-2 text-center">{student.email}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => sendInvite(student)}
                    >
                      Send Invite
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

TeacherAddStudent.propTypes = {
  allStudents: PropTypes.array.isRequired,
  addStudentToClass: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default TeacherAddStudent;
