import { useState } from "react";
import TeacherAddStudent from "./TeacherAddStudent";
import PropTypes from "prop-types";

const TeacherStudent = ({ enrolledStudents, allStudents }) => {
  const [students, setStudents] = useState(enrolledStudents);
  const [showAddStudent, setShowAddStudent] = useState(false);

  const removeStudent = (email) => {
    setStudents(students.filter((student) => student.email !== email));
  };

  const addStudentToClass = (student) => {
    if (!students.find((s) => s.email === student.email)) {
      setStudents([...students, student]);
    }
    setShowAddStudent(false);
  };

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
          {students.map((student, index) => (
            <tr key={student.email}>
              <td className="border-b p-2">{index + 1}</td>
              <td className="border-b p-2">{student.name}</td>
              <td className="border-b p-2">{student.email}</td>
              <td className="border-b p-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => removeStudent(student.email)}
                >
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
          addStudentToClass={addStudentToClass}
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
