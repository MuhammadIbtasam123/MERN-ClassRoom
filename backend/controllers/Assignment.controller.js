// const { generateFeedback } = require("../utils/openai");
import Assignment from "../model/assignments.model.js";

export const uploadAssignment = async (req, res) => {
  try {
    const { name, description, dueDate, type, classID } = req.body;

    console.log(
      "Assignment File ID:",
      req.files.assignmentFile ? req.files.assignmentFile[0].id : null
    );
    console.log(
      "Rubric File ID:",
      req.files.rubricFile ? req.files.rubricFile[0].id : null
    );
    console.log(
      "Test Case File IDs:",
      req.files.testCasesFile
        ? req.files.testCasesFile.map((file) => file.id)
        : []
    );
    const newAssignment = new Assignment({
      name,
      description,
      dueDate,
      type,
      classID,
      assignmentFile: req.files.assignmentFile[0].id,
      rubric: req.files.rubricFile ? req.files.rubricFile[0].id : null,
      testCases: req.files.testCasesFile
        ? req.files.testCasesFile.map((file) => file.id)
        : [],
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

// exports.gradeAssignment = async (req, res) => {
//   try {
//     const { submissionId } = req.params;
//     const { solution } = req.body;
//     const submission = await Submission.findById(submissionId).populate(
//       "assignmentID"
//     );

//     if (!submission) {
//       return res.status(404).json({ message: "Submission not found" });
//     }

//     const { prompt, rubric } = submission.assignmentID;

//     if (submission.assignmentID.type === "theory") {
//       const feedback = await generateFeedback(prompt, rubric, solution);
//       submission.feedback = feedback;
//       submission.grade = feedback.includes("Grade: ")
//         ? parseInt(feedback.split("Grade: ")[1])
//         : 0;
//     } else {
//       // Implement grading logic for coding assignments
//     }

//     await submission.save();

//     res
//       .status(200)
//       .json({ message: "Submission graded successfully", submission });
//   } catch (error) {
//     console.error("Error grading submission:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
