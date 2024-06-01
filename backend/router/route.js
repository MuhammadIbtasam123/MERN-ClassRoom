const express = require("express");
const router = express.Router();

const authController = require("./controllers/authController");
const classController = require("./controllers/classController");
const assignmentController = require("./controllers/assignmentController");
const submissionController = require("./controllers/submissionController");

// Authentication routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Class routes
router.post(
  "/classes/create",
  authController.isTeacher,
  classController.createClass
);
router.get(
  "/classes/:classId",
  authController.isAuthorized,
  classController.getClassDetails
);
router.post(
  "/classes/:classId/join",
  authController.isStudent,
  classController.joinClass
);
router.get("/classes", authController.isAuthorized, classController.getClasses);

// Assignment routes
router.post(
  "/assignments/create",
  authController.isTeacher,
  assignmentController.createAssignment
);
router.get(
  "/assignments/:assignmentId",
  authController.isAuthorized,
  assignmentController.getAssignmentDetails
);
router.get(
  "/classes/:classId/assignments",
  authController.isAuthorized,
  assignmentController.getAssignmentsByClass
);

// Submission routes
router.post(
  "/submissions/create",
  authController.isStudent,
  submissionController.createSubmission
);
router.get(
  "/submissions/:submissionId",
  authController.isAuthorized,
  submissionController.getSubmissionDetails
);
router.post(
  "/submissions/:submissionId/grade",
  authController.isTeacher,
  submissionController.gradeSubmission
);
router.get(
  "/assignments/:assignmentId/submissions",
  authController.isAuthorized,
  submissionController.getSubmissionsByAssignment
);

module.exports = router;
