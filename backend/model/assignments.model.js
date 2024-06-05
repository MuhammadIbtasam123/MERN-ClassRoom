import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  classID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  type: { type: String, enum: ["theory", "coding"], required: true },
  assignmentFile: { type: String },
  rubric: { type: String },
  testCases: [{ type: String }],
  assignmentText: { type: String },
  rubricText: { type: String },
  submissions: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      file: { type: String, required: true },
      extractedText: { type: String, required: true },
    },
  ],
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
