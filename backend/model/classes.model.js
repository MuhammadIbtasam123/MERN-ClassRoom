import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  section: { type: String, required: true },
  subject: { type: String, required: true },
  teacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  inviteLink: { type: String },
});

const Class = mongoose.model("Class", classSchema);

export default Class;
