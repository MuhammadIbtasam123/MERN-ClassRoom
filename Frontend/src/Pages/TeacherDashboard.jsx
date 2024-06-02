// import React from 'react';
import Navbar from "../Components/StudentDashboardClassroonNav";
import ClassroomCard from "../Components/ClassRoomCard";
import NewClassButton from "../Components/NewClassButton";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow p-4">
        <div>
          <h1 className="text-3xl">Welcome, Eric!</h1>
          <Link to={"/teacherProfile"}>
            <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded">
              View Profile
            </button>
          </Link>

          <NewClassButton />
        </div>
        <ClassroomCard className="mt-4" />
      </div>
    </div>
  );
};

export default TeacherDashboard;
