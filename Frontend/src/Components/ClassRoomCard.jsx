// ClassroomCard.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ClassroomCard = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getClasses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Classes fetched successfully:", response.data);
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      {classes.map((classroom) => (
        <div
          key={classroom._id}
          className="bg-white shadow-md rounded-lg p-4 mt-4"
        >
          <h1 className="text-2xl font-medium mb-4">
            {classroom.subject} : {classroom.section}
          </h1>
          <div className="flex space-x-4">
            <Link to={`/teacher/assignments/${classroom._id}`}>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Assignments
              </button>
            </Link>
            <Link to={`/teacher/students/${classroom._id}`}>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Students
              </button>
            </Link>
            <Link to={`/teacher/submissions/${classroom._id}`}>
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
