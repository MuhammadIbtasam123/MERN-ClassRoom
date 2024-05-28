// import React from 'react'
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
