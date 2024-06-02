import { useState, useEffect } from "react";
import axios from "axios";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    // Make API request to fetch student data
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
        console.log("Student Data:", response.data);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student ", error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="min-h-screen bg-green-950 text-white p-4 flex flex-col items-center">
      {studentData.map((student, index) => (
        <div key={index}>
          {/* User Image Card */}
          <div className="bg-green-300 text-green-950 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center">
              <img
                src={`http://localhost:8080/api/images/${student.imgId}`}
                alt="User"
                className="h-16 w-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {student ? student.name : "Loading..."}
                </h2>
              </div>
            </div>
          </div>

          {/* Student Information Card */}
          <div className="bg-green-300 text-green-950 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">Student Information</h3>
            {student ? (
              <div className="space-y-2">
                <p>
                  <strong>Student ID:</strong> {student.id}
                </p>
                <p>
                  <strong>Name:</strong> {student.name}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {student.dateOfBirth}
                </p>
                <p>
                  <strong>Gender:</strong> {student.gender}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          {/* Contact Information Card */}
          <div className="bg-green-300 text-green-950 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
            {student ? (
              <div className="space-y-2">
                <p>
                  <strong>Cell No:</strong> {student.contactNumber}
                </p>
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
                <p>
                  <strong>Address:</strong> {student.address}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentProfile;
