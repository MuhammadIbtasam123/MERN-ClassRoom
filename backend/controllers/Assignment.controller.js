// const { generateFeedback } = require("../utils/openai");
import Assignment from "../model/assignments.model.js";
import Submission from "../model/submissions.model.js";
import User from "../model/users.model.js";
import mongoose from "mongoose";
import extractTextFromImage from "../helperFunctions/extractTextFromImage.js";
import { extractTextFromPdf } from "../helperFunctions/extractTextFromPdf.js";
import { generateFeedback } from "../BardModel/Feedback.js";
import { evaluateCodingAssignment } from "../BardModel/evaluateCodingAssignemnt.js";

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
// export const uploadAssignment = async (req, res) => {
//   try {
//     const { name, description, dueDate, type, classID } = req.body;

//     console.log(req.body);
//     console.log(req.files);

//     const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

//     // Extract text from the assignment file
//     let assignmentText = "";
//     if (
//       req.files &&
//       req.files.assignmentFile &&
//       req.files.assignmentFile.length > 0
//     ) {
//       const assignmentFileId = req.files.assignmentFile[0].id;
//       const assignmentFileStream = bucket.openDownloadStream(
//         new mongoose.Types.ObjectId(assignmentFileId)
//       );
//       const assignmentFileBuffer = await streamToBuffer(assignmentFileStream);
//       assignmentText = await extractTextFromImage(assignmentFileBuffer);
//       console.log("Assignment Text:", assignmentText);
//     }

//     // Extract text from the rubric file
//     let rubricText = "";
//     if (req.files && req.files.rubricFile && req.files.rubricFile.length > 0) {
//       const rubricFileId = req.files.rubricFile[0].id;
//       const rubricFileStream = bucket.openDownloadStream(
//         new mongoose.Types.ObjectId(rubricFileId)
//       );
//       const rubricFileBuffer = await streamToBuffer(rubricFileStream);
//       rubricText = await extractTextFromImage(rubricFileBuffer);
//       console.log("Rubric Text:", rubricText);
//     }

//     const newAssignment = new Assignment({
//       name,
//       description,
//       dueDate,
//       type,
//       classID,
//       assignmentFile: req.files.assignmentFile
//         ? req.files.assignmentFile[0].id
//         : null,
//       rubric: req.files.rubricFile ? req.files.rubricFile[0].id : null,
//       testCases: req.files.testCasesFile
//         ? req.files.testCasesFile.map((file) => file.id)
//         : [],
//       assignmentText,
//       rubricText,
//     });

//     await newAssignment.save();

//     res.status(201).json({
//       message: "Assignment created successfully",
//       assignment: newAssignment,
//     });
//   } catch (error) {
//     console.error("Error creating assignment:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
export const uploadAssignment = async (req, res) => {
  try {
    const { name, description, dueDate, type, classID } = req.body;

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

    let assignmentText = "";
    let rubricText = ""; // This remains for theory type assignments
    let testCasesText = ""; // This will be used for coding assignments

    if (type === "theory") {
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

      if (
        req.files &&
        req.files.rubricFile &&
        req.files.rubricFile.length > 0
      ) {
        const rubricFileId = req.files.rubricFile[0].id;
        const rubricFileStream = bucket.openDownloadStream(
          new mongoose.Types.ObjectId(rubricFileId)
        );
        const rubricFileBuffer = await streamToBuffer(rubricFileStream);
        rubricText = await extractTextFromImage(rubricFileBuffer);
      }
    } else if (type === "coding") {
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
        assignmentText = await extractTextFromPdf(assignmentFileBuffer);

        console.log("Assignment Text:", assignmentText);
      }

      if (
        req.files &&
        req.files.testCasesFile &&
        req.files.testCasesFile.length > 0
      ) {
        const testCasesFileId = req.files.testCasesFile[0].id;
        const testCasesFileStream = bucket.openDownloadStream(
          new mongoose.Types.ObjectId(testCasesFileId)
        );
        const testCasesFileBuffer = await streamToBuffer(testCasesFileStream);
        testCasesText = await extractTextFromPdf(testCasesFileBuffer);

        console.log("Test Cases Text:", testCasesText);
      }
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
      testCasesText, // Store the extracted text from test cases
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

// Upload Assignment by Student Controller
export const uploadAssignmentByStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const studentID = req.user.userId;
    const { file } = req;

    // Find the assignment using its ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found against which you are submitting!",
      });
    }

    // Access the class ID from the assignment
    const classID = assignment.classID;

    // Check if the assignment is already submitted
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

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

    // Extract text from the solution file
    let solutionText = "";
    if (file) {
      const solutionFileId = file.id;
      const solutionFileStream = bucket.openDownloadStream(
        new mongoose.Types.ObjectId(solutionFileId)
      );
      const solutionFileBuffer = await streamToBuffer(solutionFileStream);

      if (file.mimetype === "application/pdf") {
        // Extract text from PDF for coding-based assignment
        solutionText = await extractTextFromPdf(solutionFileBuffer);
      } else {
        // Extract text from image for theory-based assignment
        solutionText = await extractTextFromImage(solutionFileBuffer);
      }

      console.log("Solution Text:", solutionText);
    }

    // Create a new submission
    const newSubmission = new Submission({
      studentID,
      assignmentID: id,
      classID,
      solution: file.id,
      solutionText, // Store extracted text
    });

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

// export const assignmentEvaluation = async (req, res) => {
//   const { SubmissionId } = req.params;
//   console.log("Submission ID:", SubmissionId);

//   // Fetch the submission using its ID
//   const submission = await Submission.findById(SubmissionId);
//   console.log("Submission:", submission);

//   // now we need to fetch the assignment details using submission.assignmentID

//   const assignment = await Assignment.findById(submission.assignmentID);

//   if (!assignment) {
//     return res.status(404).json({ message: "Assignment not found" });
//   }

//   console.log("Assignment:", assignment);

//   console.log(
//     submission.solutionText,
//     assignment.assignmentText,
//     assignment.rubricText
//   );

//   // Evaluate the submission using OpenAI API
//   const feedback = await generateFeedback(
//     submission.solutionText,
//     assignment.assignmentText,
//     assignment.rubricText
//   );

//   // console.log("Feedback:", feedback);

//   if (!feedback) {
//     return res.status(500).json({ message: "Error generating feedback" });
//   }

//   // rounding off the score to 2 decimal places

//   const updatedScore = parseFloat(feedback.score.toFixed(2));

//   // save the feedback and score in the submission
//   const updatedSubmission = await Submission.findByIdAndUpdate(
//     SubmissionId,
//     {
//       feedback: feedback.feedback,
//       grade: updatedScore,
//     },
//     { new: true }
//   );

//   res.status(200).json({
//     message: "Submission evaluated successfully",
//   });

//   try {
//     // const submission = await Submission.findById(id);
//   } catch (error) {
//     console.error("Error fetching submission:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
export const assignmentEvaluation = async (req, res) => {
  const { SubmissionId } = req.params;
  console.log("Submission ID:", SubmissionId);

  try {
    // Fetch the submission using its ID
    const submission = await Submission.findById(SubmissionId);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    console.log("Submission:", submission);

    // Fetch the assignment details using submission.assignmentID
    const assignment = await Assignment.findById(submission.assignmentID);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    console.log("Assignment:", assignment);

    let feedback;

    if (assignment.type === "theory") {
      // Evaluate the theory-based assignment using OpenAI API
      feedback = await generateFeedback(
        submission.solutionText,
        assignment.assignmentText,
        assignment.rubricText
      );
    } else if (assignment.type === "coding") {
      // Evaluate the coding-based assignment
      feedback = await evaluateCodingAssignment(
        submission.solutionText,
        assignment.assignmentText,
        assignment.testCasesText
      );
    }

    if (!feedback) {
      return res.status(500).json({ message: "Error generating feedback" });
    }

    // Rounding off the score to 2 decimal places
    const updatedScore = parseFloat(feedback.score.toFixed(2));

    // Save the feedback and score in the submission
    const updatedSubmission = await Submission.findByIdAndUpdate(
      SubmissionId,
      {
        feedback: feedback.feedback,
        grade: updatedScore,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Submission evaluated successfully",
      submission: updatedSubmission,
    });
  } catch (error) {
    console.error("Error evaluating submission:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getMArks = async (req, res) => {
  try {
    const { SubmissionId } = req.params;
    console.log("Submission ID:", SubmissionId);

    // Fetch the submission using its ID
    const submission = await Submission.findById(SubmissionId);

    res.status(200).json({ submission });
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMarksByStudents = async (req, res) => {
  try {
    const { AssignmentId } = req.params;
    const { userId } = req.user;
    console.log("Assignment ID:", AssignmentId);
    console.log("User ID:", userId);

    // Find all submissions for the given assignment
    const submissions = await Submission.find({
      studentID: userId,
      assignmentID: AssignmentId,
    });

    res.status(200).json(submissions[0].grade);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
