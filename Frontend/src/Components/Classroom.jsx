import { useEffect, useState } from "react";
import classroomImg from "../assets/idea-text-brain-drawn-outline-face-blackboard.jpg";
import PropTypes from "prop-types";
import AssignmentCard from "./AssignmentCard";
import axios from "axios";

const AnnouncementCard = () => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <h3 className="text-lg font-semibold mb-2">Announcements</h3>
    <p>Teacher announcement...</p>
  </div>
);

const ClassRoom = ({ classId }) => {
  const [classData, setClassData] = useState([
    [
      {
        assignmentFile: "665ec64ace9439ff7b81e901",
        classID: "665cf1289ecbcb7834dc879a",
        description: "programming?",
        dueDate: "2024-06-07T19:00:00.000Z",
        name: "assignment 1",
      },
    ],
  ]);
  const [showAssignment, setShowAssignment] = useState(false);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/ClassData/${classId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClassData(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClassData();
  }, [classId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAssignment(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  console.log(classData.classes);
  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-semibold mb-4">Classroom</h2>
      <div className="bg-white p-4 rounded shadow mb-4 flex items-center">
        <img
          src={classroomImg}
          alt="Class"
          className="h-16 w-16 rounded-full mr-4"
        />
        <div>
          {classData.classes && (
            <h3 className="text-lg font-semibold">
              Class Name: {classData.classes.subject} -{" "}
              {classData.classes.section}
            </h3>
          )}
        </div>
      </div>
      <AnnouncementCard />
      {showAssignment && <AssignmentCard assignments={classData} />}
    </div>
  );
};

ClassRoom.propTypes = {
  classId: PropTypes.string.isRequired,
};

export default ClassRoom;
