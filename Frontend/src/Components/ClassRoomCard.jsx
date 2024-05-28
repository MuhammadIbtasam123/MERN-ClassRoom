// import React from "react";

const ClassroomCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-2xl font-semibold mb-4">Classroom Name</h2>
      <div className="flex space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Dashboard
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Assignments
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Students
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Submissions
        </button>
      </div>
    </div>
  );
};

export default ClassroomCard;
