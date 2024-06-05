import { useState, useEffect } from "react";
import NavBar from "../Components/StudentDashboardClassroonNav";
import SideBar from "../Components/Sidebar";
import ClassRoom from "../Components/Classroom";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentClassroom = () => {
  const [showClassroom, setShowClassroom] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/enrolledClasses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClasses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [id]);

  const handleClassroomClick = () => {
    setShowClassroom(true);
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideBar
          onClassroomClick={handleClassroomClick}
          classes={classes}
          setClassId={setClassId}
        />
        <div className="flex-1 p-4">
          {showClassroom ? (
            <ClassRoom classes={classes} classId={classId} />
          ) : (
            <p>Select an option from the sidebar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentClassroom;
