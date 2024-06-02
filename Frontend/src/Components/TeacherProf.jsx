import { useState, useEffect } from "react";
import axios from "axios";

const TeacherProf = () => {
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    // Make API request to fetch student data
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/teacherData",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("teacgher Data:", response.data);
        setTeacherData(response.data);
      } catch (error) {
        console.error("Error fetching teacher ", error);
      }
    };

    fetchTeacherData();
  }, []);

  return (
    <div className="min-h-screen bg-green-950 text-white p-4 flex flex-col items-center">
      {teacherData.map((teacher, index) => (
        <div key={index}>
          {/* User Image Card */}
          <div className="bg-green-300 text-green-950 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center">
              <img
                src={`http://localhost:8080/api/images/${teacher.imgId}`}
                alt="User"
                className="h-16 w-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {teacher ? teacher.name : "Loading..."}
                </h2>
              </div>
            </div>
          </div>

          {/* teacher Information Card */}
          <div className="bg-green-300 text-green-950 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">Teacher Information</h3>
            {teacher ? (
              <div className="space-y-2">
                <p>
                  <strong>Teacher ID:</strong> {teacher.id}
                </p>
                <p>
                  <strong>Name:</strong> {teacher.name}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {teacher.dateOfBirth}
                </p>
                <p>
                  <strong>Gender:</strong> {teacher.gender}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          {/* Contact Information Card */}
          <div className="bg-green-300 text-green-950 w-full max-w-md rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
            {teacher ? (
              <div className="space-y-2">
                <p>
                  <strong>Cell No:</strong> {teacher.contactNumber}
                </p>
                <p>
                  <strong>Email:</strong> {teacher.email}
                </p>
                <p>
                  <strong>Address:</strong> {teacher.address}
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

export default TeacherProf;
