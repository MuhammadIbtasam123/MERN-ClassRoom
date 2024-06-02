import express from "express";
import {
  signup,
  login,
  getStudentData,
  getTeacherData,
} from "../controllers/authController.controller.js";
import { createClass, getClasses } from "../controllers/Class.controller.js";
import { upload } from "../utils/storage.js";
import { isAuthenticated, isTeacher, isStudent } from "../middleware/auth.js";

const router = express.Router();

// Authentication routes
router.post("/signup", upload.single("image"), signup); // Handle image upload during signup
router.post("/login", login);
// Route that requires authentication
router.get("/studentData", isAuthenticated, getStudentData);
router.get("/teacherData", isAuthenticated, isTeacher, getTeacherData);

/* Class related routes */
router.route("/createClass").post(isAuthenticated, isTeacher, createClass);
router.route("/getClasses").get(isAuthenticated, isTeacher, getClasses);

export default router;

/*

import express from "express";
import { signup, login, getStudentData } from "../controllers/authController.controller.js";
import { upload } from "../utils/storage.js";
import { isAuthenticated, isTeacher, isStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication routes
router.post("/signup", upload.single("image"), signup); // Handle image upload during signup
router.post("/login", login);

// Route that requires authentication
router.get("/studentData", isAuthenticated, getStudentData);

// Example route that requires authentication and checks if the user is a teacher
router.get("/teacherOnlyRoute", isAuthenticated, isTeacher, (req, res) => {
  // Logic for handling the route
});

// Example route that requires authentication and checks if the user is a student
router.get("/studentOnlyRoute", isAuthenticated, isStudent, (req, res) => {
  // Logic for handling the route
});

export default router;



*/
