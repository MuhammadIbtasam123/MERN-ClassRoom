// import React from "react";
import { Link } from "react-router-dom";

const classrooms = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Science" },
  { id: 3, name: "History" },
  // Add more classrooms as needed
];

const ClassroomCard = () => {
  return (
    <div>
      {classrooms.map((classroom) => (
        <div
          key={classroom.id}
          className="bg-white shadow-md rounded-lg p-4 mt-4"
        >
          <h2 className="text-2xl font-semibold mb-4">{classroom.name}</h2>
          <div className="flex space-x-4">
            <Link to={`/teacher/assignments/${classroom.id}`}>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Assignments
              </button>
            </Link>
            <Link to={`/teacher/students/${classroom.id}`}>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Students
              </button>
            </Link>
            <Link to={`/teacher/submissions/${classroom.id}`}>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Submissions
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassroomCard;
