// import React from 'react'
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import StudentDashboard from "./Pages/StudentDashboard";
import StudentProfileData from "./Pages/StudentProfileData";
import TeacherDashboard from "./Pages/TeacherDashboard";
import CreateClass from "./Pages/CreateClass";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentClassroom from "./Pages/StudentClassroom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/studentProfile" element={<StudentProfileData />} />
        <Route path="/studentClassroom" element={<StudentClassroom />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/newClass" element={<CreateClass />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
