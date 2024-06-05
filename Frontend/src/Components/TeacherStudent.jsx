import { useState } from "react";
import TeacherAddStudent from "./TeacherAddStudent";
import PropTypes from "prop-types";

const TeacherStudent = ({ enrolledStudents, allStudents }) => {
  const [showAddStudent, setShowAddStudent] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Students</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowAddStudent(true)}
        >
          Add Student
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Sr No.</th>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrolledStudents.map((student) => (
            <tr key={student.email}>
              <td className="border-b p-2">{student._id}</td>
              <td className="border-b p-2">{student.name}</td>
              <td className="border-b p-2">{student.email}</td>
              <td className="border-b p-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddStudent && (
        <TeacherAddStudent
          allStudents={allStudents}
          close={() => setShowAddStudent(false)}
        />
      )}
    </div>
  );
};

TeacherStudent.propTypes = {
  enrolledStudents: PropTypes.array.isRequired,
  allStudents: PropTypes.array.isRequired,
};

export default TeacherStudent;
