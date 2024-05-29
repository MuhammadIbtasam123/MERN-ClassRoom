// import React from "react";
import PropTypes from "prop-types";

const classrooms = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Science" },
  { id: 3, name: "History" },
  // Add more classrooms as needed
];

const SideBar = ({ onClassroomClick }) => {
  return (
    <div className="bg-green-800 text-white w-64 h-screen p-4 mt-2 ml-1 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      {classrooms.map((classroom) => (
        <button
          key={classroom.id}
          onClick={() => onClassroomClick(classroom.id)}
          className="w-full flex items-center p-2 mb-2 bg-green-300 text-green-950 rounded hover:bg-green-400 transition"
        >
          <img
            src="path/to/classrooms-icon.png"
            alt="Classrooms"
            className="h-6 w-6 mr-2"
          />
          {classroom.name}
        </button>
      ))}
    </div>
  );
};

SideBar.propTypes = {
  onClassroomClick: PropTypes.func.isRequired,
};

export default SideBar;
