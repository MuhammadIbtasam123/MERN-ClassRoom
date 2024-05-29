import { useState } from "react";

const TeacherAssignment = () => {
  const [assignmentType, setAssignmentType] = useState("theory");

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
          <label className="block mb-2">Upload Assignment File:</label>
          <input type="file" className="w-full p-2 rounded text-green-950" />
        </div>

        {assignmentType === "theory" && (
          <div className="mb-4">
            <label className="block mb-2">Upload Rubric File:</label>
            <input type="file" className="w-full p-2 rounded text-green-950" />
          </div>
        )}

        {assignmentType === "coding" && (
          <div className="mb-4">
            <label className="block mb-2">Upload Test Cases File:</label>
            <input type="file" className="w-full p-2 rounded text-green-950" />
          </div>
        )}

        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
          Submit Assignment
        </button>
      </div>
    </div>
  );
};

export default TeacherAssignment;
