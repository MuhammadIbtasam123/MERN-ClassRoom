// import nodemailer from 'nodemailer';

import nodemailer from "nodemailer";

export async function sendClassInvite(email, inviteLink) {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER, // your Gmail email address
      pass: process.env.PASS, // your Gmail password
    },
  });

  // Mail options
  const mailOptions = {
    from: process.env.GMAIL_USER, // sender address
    to: email, // receiver address
    subject: `Class Invite`,
    text: `
    You've been invited to join a class. Click the following link to join: http://localhost:5173/student/join-class/${inviteLink}.
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true, message: "Email sent successfully" });
    }
  });
}
