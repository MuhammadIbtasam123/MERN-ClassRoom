import Class from "../model/classes.model.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"; // Import UUID library
import mongoose from "mongoose";
import User from "../model/users.model.js";
import Assignment from "../model/assignments.model.js";
import streamToBase64 from "../helperFunctions/invite.js";

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

export const enrolledStudents = async (req, res) => {
  try {
    const { id } = req.params;
    // creating proper object id
    const objectId = new mongoose.Types.ObjectId(id);

    const classes = await Class.find({ _id: objectId });
    if (classes.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    //sending student data
    const students = await User.find({ _id: { $in: classes[0].studentIDs } });

    //filter id and name and email only
    const filterStudents = students.map((student) => {
      return {
        _id: student._id,
        name: student.name,
        email: student.email,
      };
    });

    res.status(200).json(filterStudents);
  } catch (error) {
    console.error("Error fetching enrolled students:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const allStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });

    //filter id and email only
    const filterStudents = students.map((student) => {
      return {
        _id: student._id,
        name: student.name,
        email: student.email,
      };
    });
    res.status(200).json(filterStudents);
  } catch (error) {
    console.error("Error fetching all students:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const joinClass = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const studentID = decoded.userId.trim();
    const id = req.params.id.trim();

    // Find the class by invite link ID
    const findClass = await Class.findOne({ inviteLink: id });

    if (!findClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if the student is already enrolled in the class
    if (findClass.studentIDs.includes(studentID)) {
      return res
        .status(400)
        .json({ message: "Student already enrolled in the class" });
    }

    // Update the class to add the student ID to the list of enrolled students
    findClass.studentIDs.push(studentID);
    await findClass.save();

    console.log("Class joined successfully:", findClass);
    res.status(200).json({ message: "Class joined successfully" });
  } catch (error) {
    console.error("Error joining class:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const allClassesStudentEnrolled = async (req, res) => {
  try {
    const { id } = req.params;

    // Find all classes where the studentId appears in the studentIDs array
    const classes = await Class.find({ studentIDs: id });

    let ClassesData = [];

    //send filtered data
    const filteredData = classes.map((object) => {
      const { _id, section, subject } = object;
      ClassesData.push({ _id, section, subject });
    });

    res.status(200).json(ClassesData);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getClassData = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);

    // Find all classes where the _id matches the given id
    const classes = await Class.findById(objectId);
    if (!classes) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Find all assignments where the classID matches the given id
    const assignments = await Assignment.find({ classID: objectId });

    // Map assignments to include file data
    const assignmentsWithFileData = await Promise.all(
      assignments.map(async (assignment) => {
        const { _id, assignmentFile } = assignment;

        // Read the file data for assignment file
        let assignmentFileData = null;
        if (assignmentFile) {
          const bucket = new mongoose.mongo.GridFSBucket(
            mongoose.connection.db
          );
          const downloadStream = bucket.openDownloadStream(
            new mongoose.Types.ObjectId(assignmentFile)
          );
          assignmentFileData = await streamToBase64(downloadStream);
        }

        // Return assignment data with file data included
        return {
          _id,
          assignmentFile: assignmentFileData,
          ...assignment._doc, // Include other assignment fields
        };
      })
    );

    // Construct the response
    const responseData = {
      classData: classes,
      assignments: assignmentsWithFileData,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching class data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
