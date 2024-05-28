import { useState } from "react";
import NavBar from "../Components/StudentDashboardClassroonNav";
import SideBar from "../Components/Sidebar";
import ClassRoom from "../Components/Classroom";

const StudentClassroom = () => {
  const [showClassroom, setShowClassroom] = useState(false);

  const handleClassroomClick = () => {
    setShowClassroom(true);
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideBar onClassroomClick={handleClassroomClick} />
        <div className="flex-1 p-4">
          {showClassroom ? (
            <ClassRoom />
          ) : (
            <p>Select an option from the sidebar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentClassroom;
