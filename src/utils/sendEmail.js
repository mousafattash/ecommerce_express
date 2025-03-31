import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {asyncHandler} from '../middleware/catchError.js'; 

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = asyncHandler(async (toEmail, username) => {
  const mailOptions = {
    from: `"project management" <${process.env.EMAIL_FROM}>`,
    to: toEmail,
    subject: 'Welcome to My App!',
    html: `
      <h1>Hello ${username}!</h1>
      <p>Welcome to My App! We're excited to have you on board.</p>
      <p>If you have any questions, feel free to reach out.</p>
      <p>Best regards,<br/>From our team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully!");
});