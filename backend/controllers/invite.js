import Class from "../model/classes.model.js";
import { sendClassInvite } from "./mailer.js";

export const sendInvite = async (req, res) => {
  try {
    const { classId, studentEmail } = req.body;

    // extract the invite link of a class from the database using the classId
    const classToJoin = await Class.findById(classId);
    if (!classToJoin) {
      return res.status(404).json({ message: "Class not found" });
    }

    console.log("Class to join:", classToJoin);
    console.log("Student email:", studentEmail);
    console.log("Class invite link:", classToJoin.inviteLink);

    // Send the invite link to the student
    await sendClassInvite(studentEmail, classToJoin.inviteLink);

    res
      .status(200)
      .json({ message: "Joined class successfully", class: classToJoin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
