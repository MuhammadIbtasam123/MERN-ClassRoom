// const { generateFeedback } = require("../utils/openai");
import Assignment from "../model/assignments.model.js";
import Submission from "../model/submissions.model.js";
import User from "../model/users.model.js";
import mongoose from "mongoose";
import extractTextFromImage from "../helperFunctions/extractTextFromImage.js";

// Utility function to convert stream to buffer
const streamToBuffer = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
};

// Upload Assignment Controller
export const uploadAssignment = async (req, res) => {
  try {
    const { name, description, dueDate, type, classID } = req.body;

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

    // Extract text from the assignment file
    let assignmentText = "";
    if (
      req.files &&
      req.files.assignmentFile &&
      req.files.assignmentFile.length > 0
    ) {
      const assignmentFileId = req.files.assignmentFile[0].id;
      const assignmentFileStream = bucket.openDownloadStream(
        new mongoose.Types.ObjectId(assignmentFileId)
      );
      const assignmentFileBuffer = await streamToBuffer(assignmentFileStream);
      assignmentText = await extractTextFromImage(assignmentFileBuffer);
    }

    // Extract text from the rubric file
    let rubricText = "";
    if (req.files && req.files.rubricFile && req.files.rubricFile.length > 0) {
      const rubricFileId = req.files.rubricFile[0].id;
      const rubricFileStream = bucket.openDownloadStream(
        new mongoose.Types.ObjectId(rubricFileId)
      );
      const rubricFileBuffer = await streamToBuffer(rubricFileStream);
      rubricText = await extractTextFromImage(rubricFileBuffer);
    }

    const newAssignment = new Assignment({
      name,
      description,
      dueDate,
      type,
      classID,
      assignmentFile: req.files.assignmentFile
        ? req.files.assignmentFile[0].id
        : null,
      rubric: req.files.rubricFile ? req.files.rubricFile[0].id : null,
      testCases: req.files.testCasesFile
        ? req.files.testCasesFile.map((file) => file.id)
        : [],
      assignmentText,
      rubricText,
    });

    await newAssignment.save();

    res.status(201).json({
      message: "Assignment created successfully",
      assignment: newAssignment,
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const uploadAssignmentByStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const studentID = req.user.userId;
    const { file } = req;

    // Find the assignment using its ID
    const assignment = await Assignment.findById(id);

    console.log("Assignment:", assignment);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found against which you are submitting!",
      });
    }

    // Access the class ID from the assignment
    const classID = assignment.classID;

    // check if the assignment is already submitted
    const submitted = await Submission.findOne({
      studentID,
      assignmentID: id,
      classID,
    });

    if (submitted) {
      return res.status(400).json({
        message: "Assignment already submitted by the student",
      });
    }

    // Create a new submission
    const newSubmission = new Submission({
      studentID,
      assignmentID: id,
      classID,
      solution: file.id,
    });

    console.log("Submission:", newSubmission);
    // Save the submission
    await newSubmission.save();

    res.status(201).json({
      message: "Submission created successfully",
      submission: newSubmission,
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSubmittedAssignments = async (req, res) => {
  try {
    const { classId } = req.params;
    console.log("Class ID:", classId);
    console.log("User ID:", req.user);
    console.log(req.params);

    // Find all submissions for the given class
    const submissions = await Submission.find({
      classID: classId,
    });

    console.log("Submissions:", submissions);

    // now we need to fetch the unique assignment details for each submission
    const assignmentIds = submissions.map(
      (submission) => submission.assignmentID
    );
    const uniqueAssignmentIds = [...new Set(assignmentIds)];
    console.log("Assignment IDs:", assignmentIds);
    console.log("Unique Assignment IDs:", uniqueAssignmentIds);

    // now for each assignment ID, fetch the assignment details

    const assignments = await Assignment.find({
      _id: { $in: uniqueAssignmentIds },
    });

    console.log("Assignments:", assignments);

    res.status(200).json({ assignments });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const { Assignmentid } = req.params;
    console.log("Assignment ID:", req.params);

    // Find all submissions for the given assignment
    const submissions = await Submission.find({
      assignmentID: Assignmentid,
    });

    // fetch student details for each submission
    const studentIds = submissions.map((submission) => submission.studentID);
    const uniqueStudentIds = [...new Set(studentIds)];

    // now for each student ID, fetch the student details
    const students = await User.find({
      _id: { $in: uniqueStudentIds },
    });

    console.log("Students:", students);

    // now i need to create the response object in which we have user details and submission details

    const submissionDetails = submissions.map((submission) => {
      const student = students.find(
        (student) => student._id.toString() === submission.studentID.toString()
      );

      return {
        student,
        submission,
      };
    });

    console.log("Submission Details:", submissionDetails);

    res.status(200).json(submissionDetails);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
