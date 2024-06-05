// // import TeacherDashboard from "./TeacherDashboard";
// import TeacherStudent from "../Components/TeacherStudent";
// import NavBar from "../Components/StudentDashboardClassroonNav";

// const enrolledStudents = [
//   { name: "John Doe", email: "john@example.com" },
//   { name: "Jane Smith", email: "jane@example.com" },
// ];

// const allStudents = [
//   { name: "John Doe", email: "john@example.com" },
//   { name: "Jane Smith", email: "jane@example.com" },
//   { name: "Bob Brown", email: "bob@example.com" },
//   { name: "Alice Johnson", email: "alice@example.com" },
// ];
// const TeacherStudentData = () => {
//   return (
//     <div>
//       <NavBar />
//       <TeacherStudent
//         enrolledStudents={enrolledStudents}
//         allStudents={allStudents}
//       />
//     </div>
//   );
// };

// export default TeacherStudentData;

import { useState, useEffect } from "react";
import axios from "axios";
import TeacherStudent from "../Components/TeacherStudent";
import NavBar from "../Components/StudentDashboardClassroonNav";
import { useParams } from "react-router-dom";
const TeacherStudentData = () => {
  // State to store enrolled students for a particular class
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const { classroomId } = useParams();

  // State to store all students
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    // Function to fetch enrolled students for a particular class
    const fetchEnrolledStudents = async () => {
      try {
        console.log("id", classroomId);
        // Make an HTTP GET request to your backend API endpoint
        const response = await axios.get(
          `http://localhost:8080/api/enrolledStudents/${classroomId} `,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Enrolled students fetched successfully:", response.data);
        // Update the state with the fetched enrolled students
        setEnrolledStudents(response.data);
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      }
    };

    // Function to fetch all students
    const fetchAllStudents = async () => {
      try {
        // Make an HTTP GET request to your backend API endpoint
        const response = await axios.get(
          "http://localhost:8080/api/allStudents",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("All students fetched successfully:", response.data);

        // Update the state with the fetched all students
        setAllStudents(response.data);
      } catch (error) {
        console.error("Error fetching all students:", error);
      }
    };

    // Call the functions to fetch enrolled students and all students when the component mounts
    fetchEnrolledStudents();
    fetchAllStudents();
  }, []);

  return (
    <div>
      <NavBar />
      {/* Pass the fetched enrolled students and all students to the TeacherStudent component */}
      <TeacherStudent
        enrolledStudents={enrolledStudents}
        allStudents={allStudents}
      />
    </div>
  );
};

export default TeacherStudentData;
