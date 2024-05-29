import { useState } from "react";
import PropTypes from "prop-types";

const TeacherAddStudent = ({ allStudents, addStudentToClass, close }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = allStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendInvite = (student) => {
    console.log(`Invite sent to ${student.email}`); // Placeholder for actual invite logic
    addStudentToClass(student);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-1/2 overflow-auto">
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
        <div className="overflow-y-auto max-h-60">
          {filteredStudents.map((student) => (
            <div
              key={student.email}
              className="flex justify-between items-center mb-2"
            >
              <div>
                {student.name} ({student.email})
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => sendInvite(student)}
              >
                Send Invite
              </button>
            </div>
          ))}
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
    </div>
  );
};

TeacherAddStudent.propTypes = {
  allStudents: PropTypes.array.isRequired,
  addStudentToClass: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default TeacherAddStudent;
