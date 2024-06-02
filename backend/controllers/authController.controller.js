import User from "../model/users.model.js";
import jwt from "jsonwebtoken";

import { configDotenv } from "dotenv";
configDotenv();

export const signup = async (req, res) => {
  try {
    const { username, email, password, role, gender, dob, address, contactNo } =
      req.body;
    const imageUrl = req.file ? req.file.id : null; // Get the image ID instead of URL

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name: username,
      email,
      password,
      role,
      imageUrl,
      gender,
      dateOfBirth: dob,
      address,
      contactNumber: contactNo,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    if (role === "student") {
      return res
        .status(200)
        .json({ token, path: "/student", message: "Login Successfully!" });
    }
    if (role === "teacher") {
      return res
        .status(200)
        .json({ token, path: "/teacher", message: "Login Successfully!" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getStudentData = async (req, res) => {
  try {
    const studentData = await User.find({ role: "student" });
    const responseData = await Promise.all(
      studentData.map(async (student) => {
        // Construct the image URL using the image ID
        return {
          id: student._id,
          name: student.name,
          email: student.email,
          gender: student.gender,
          dateOfBirth: student.dateOfBirth.toLocaleDateString(),
          address: student.address,
          contactNumber: student.contactNumber,
          imgId: student.imageUrl,
          imageUrl: `http://localhost:8080/api/images/${student.imageId}`, // Include the image URL in the response
        };
      })
    );

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTeacherData = async (req, res) => {
  try {
    const teacherData = await User.find({ role: "teacher" });
    const responseData = await Promise.all(
      teacherData.map(async (teacher) => {
        // Construct the image URL using the image ID
        return {
          id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          gender: teacher.gender,
          dateOfBirth: teacher.dateOfBirth.toLocaleDateString(),
          address: teacher.address,
          contactNumber: teacher.contactNumber,
          imgId: teacher.imageUrl,
          imageUrl: `http://localhost:8080/api/images/${teacher.imageId}`, // Include the image URL in the response
        };
      })
    );

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
