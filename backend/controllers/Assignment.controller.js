// controllers/assignmentController.js
const Assignment = require("../models/Assignment");
const { generateFeedback } = require("../utils/openai");

exports.createAssignment = async (req, res) => {
  try {
    const {
      name,
      description,
      prompt,
      dueDate,
      classID,
      type,
      rubric,
      testCases,
    } = req.body;

    const newAssignment = new Assignment({
      name,
      description,
      prompt,
      dueDate,
      classID,
      type,
      rubric,
      testCases,
    });

    await newAssignment.save();

    res
      .status(201)
      .json({
        message: "Assignment created successfully",
        assignment: newAssignment,
      });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.gradeAssignment = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { solution } = req.body;
    const submission = await Submission.findById(submissionId).populate(
      "assignmentID"
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const { prompt, rubric } = submission.assignmentID;

    if (submission.assignmentID.type === "theory") {
      const feedback = await generateFeedback(prompt, rubric, solution);
      submission.feedback = feedback;
      submission.grade = feedback.includes("Grade: ")
        ? parseInt(feedback.split("Grade: ")[1])
        : 0;
    } else {
      // Implement grading logic for coding assignments
    }

    await submission.save();

    res
      .status(200)
      .json({ message: "Submission graded successfully", submission });
  } catch (error) {
    console.error("Error grading submission:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
