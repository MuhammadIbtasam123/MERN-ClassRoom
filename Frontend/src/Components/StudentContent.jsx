// // import React from 'react';
// import dash from "../assets/video.png";
// import user from "../assets/USer.png";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";

// const Dashboard = () => {

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
//         <Link to="/StudentProfile">
//           <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer transition">
//             <img
//               src={user}
//               alt="Profile"
//               className="h-32 w-32 rounded-full mb-4"
//             />
//             <h2 className="text-2xl font-semibold mb-2">Go to Profile</h2>
//           </div>
//         </Link>

//         <Link to="/studentClassroom/:id">
//           <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer transition">
//             <img
//               src={dash}
//               alt="Class Dashboard"
//               className="h-32 w-32 rounded-full mb-4"
//             />
//             <h2 className="text-2xl font-semibold mb-2">Class Dashboard</h2>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from "react";
import dash from "../assets/video.png";
import user from "../assets/USer.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    // Fetch student data from backend when component mounts
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/studentData",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudentId(response.data[0].id);
        // console.log(studentId);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
        <Link to="/StudentProfile">
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer transition">
            <img
              src={user}
              alt="Profile"
              className="h-32 w-32 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">Go to Profile</h2>
          </div>
        </Link>

        <Link to={`/studentClassroom/${studentId}`}>
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg cursor-pointer transition">
            <img
              src={dash}
              alt="Class Dashboard"
              className="h-32 w-32 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">Class Dashboard</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
