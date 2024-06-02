import Class from "../model/classes.model.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; // Import UUID library

export const createClass = async (req, res) => {
  try {
    const { name, subject } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacherID = decoded.userId;

    // Generate a unique token for the invite link
    const inviteToken = uuidv4(); // Generate a UUID

    const newClass = new Class({
      section: name,
      subject,
      teacherID,
      inviteLink: inviteToken,
    });
    await newClass.save();

    // Construct the invite link
    const inviteLink = `${req.protocol}://${req.get(
      "host"
    )}/invite/${inviteToken}`;

    // console.log("Class created successfully:", newClass, inviteLink);

    res.status(201).json({
      message: "Class created successfully",
    });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getClasses = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacherID = decoded.userId;
    const classes = await Class.find({ teacherID: teacherID });
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes by teacher:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const joinClass = async (req, res) => {
//   try {
//     const { classId } = req.params;
//     const studentID = req.user._id;

//     const classToJoin = await Class.findByIdAndUpdate(
//       classId,
//       { $addToSet: { studentIDs: studentID } },
//       { new: true }
//     );

//     if (!classToJoin) {
//       return res.status(404).json({ message: "Class not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Joined class successfully", class: classToJoin });
//   } catch (error) {
//     console.error("Error joining class:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
