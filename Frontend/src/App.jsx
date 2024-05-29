// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import StudentDashboard from "./Pages/StudentDashboard";
import StudentProfileData from "./Pages/StudentProfileData";
import TeacherDashboard from "./Pages/TeacherDashboard";
import CreateClass from "./Pages/CreateClass";
import TeacherStudentData from "./Pages/TeacherStudentData";
import StudentClassroom from "./Pages/StudentClassroom";
import TeacherAssignmentUpload from "./Pages/TeacherAssignmentUpload";
import TeacherSubmissionPage from "./Pages/TeacherSubmissionPage";

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
        <Route
          path="/teacher/students/:classroomId"
          element={<TeacherStudentData />}
        />
        <Route
          path="/teacher/assignments/:classroomId"
          element={<TeacherAssignmentUpload />}
        />
        <Route
          path="/teacher/submissions/:classroomId"
          element={<TeacherSubmissionPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
