// const mongoose = require("mongoose");

// const assignmentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   prompt: { type: String, required: true },
//   dueDate: { type: Date, required: true },
//   classID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Class",
//     required: true,
//   },
//   type: { type: String, enum: ["theory", "coding"], required: true },
//   rubric: { type: String, required: true },
//   testCases: [{ type: String }], // Only for coding assignments
// });

// const Assignment = mongoose.model("Assignment", assignmentSchema);
// module.exports = Assignment;
