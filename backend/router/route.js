import express from "express";
import {
  signup,
  login,
  getStudentData,
  getTeacherData,
} from "../controllers/authController.controller.js";
import {
  createClass,
  getClasses,
  enrolledStudents,
  allStudents,
  joinClass,
  allClassesStudentEnrolled,
  getClassData,
} from "../controllers/Class.controller.js";
import { sendInvite } from "../controllers/invite.js";
import { uploadAssignment } from "../controllers/assignment.controller.js";
import { upload } from "../utils/storage.js"; // Ensure this points to your GridFS storage configuration
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
router.route("/allStudents").get(isAuthenticated, isTeacher, allStudents);
router
  .route("/enrolledStudents/:id")
  .get(isAuthenticated, isTeacher, enrolledStudents);
router.route("/joinClass/:id").post(isAuthenticated, isStudent, joinClass);
router
  .route("/enrolledClasses/:id")
  .get(isAuthenticated, isStudent, allClassesStudentEnrolled);
router.route("/ClassData/:id").get(isAuthenticated, isStudent, getClassData);

/* Student Invite Link */
router.route("/sendInvite").post(isAuthenticated, isTeacher, sendInvite);

// Update this route for handling assignment uploads
router.post(
  "/uploadAssignment/:id",
  isAuthenticated,
  isTeacher,
  upload.fields([
    { name: "assignmentFile", maxCount: 1 },
    { name: "rubricFile", maxCount: 1 },
    { name: "testCasesFile", maxCount: 10 },
  ]),
  uploadAssignment
);

export default router;
