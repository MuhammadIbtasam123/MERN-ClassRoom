// // middleware/auth.js
// const jwt = require("jsonwebtoken");

// exports.isAuthenticated = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// exports.isTeacher = (req, res, next) => {
//   if (req.user.role !== "teacher") {
//     return res.status(403).json({ message: "Forbidden" });
//   }
//   next();
// };

// exports.isStudent = (req, res, next) => {
//   if (req.user.role !== "student") {
//     return res.status(403).json({ message: "Forbidden" });
//   }
//   next();
// };
