import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  classID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  solution: { type: String, required: true },
  solutionText: { type: String }, // New field to store extracted text
  grade: { type: Number, default: 0 },
  feedback: { type: String },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
