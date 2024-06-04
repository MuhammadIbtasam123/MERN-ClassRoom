// const mongoose = require("mongoose");
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
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
