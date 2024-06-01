// controllers/classController.js
const Class = require("../models/Class");

exports.createClass = async (req, res) => {
  try {
    const { name, subject } = req.body;
    const teacherID = req.user._id;

    const newClass = new Class({ name, subject, teacherID });
    await newClass.save();

    res
      .status(201)
      .json({ message: "Class created successfully", class: newClass });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.joinClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const studentID = req.user._id;

    const classToJoin = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { studentIDs: studentID } },
      { new: true }
    );

    if (!classToJoin) {
      return res.status(404).json({ message: "Class not found" });
    }

    res
      .status(200)
      .json({ message: "Joined class successfully", class: classToJoin });
  } catch (error) {
    console.error("Error joining class:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
