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

// Email templates
const templates = {
  welcome: (username) => `
    <h1>Welcome to Our E-commerce Store!</h1>
    <p>Hello ${username},</p>
    <p>Thank you for joining our community. We're excited to have you on board!</p>
    <p>Start shopping and enjoy exclusive deals.</p>
    <p>Best regards,<br/>The E-commerce Team</p>
  `,
  orderConfirmation: (username, orderId, total) => `
    <h1>Order Confirmation</h1>
    <p>Hello ${username},</p>
    <p>Thank you for your order! Your order #${orderId} has been received.</p>
    <p>Total Amount: $${total}</p>
    <p>We'll notify you once your order is shipped.</p>
    <p>Best regards,<br/>The E-commerce Team</p>
  `,
  passwordReset: (username, resetLink) => `
    <h1>Password Reset Request</h1>
    <p>Hello ${username},</p>
    <p>We received a request to reset your password. Click the link below to proceed:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Best regards,<br/>The E-commerce Team</p>
  `,
  accountUpdate: (username) => `
    <h1>Account Information Updated</h1>
    <p>Hello ${username},</p>
    <p>Your account information has been successfully updated.</p>
    <p>If you didn't make these changes, please contact our support team immediately.</p>
    <p>Best regards,<br/>The E-commerce Team</p>
  `
};

export const sendEmail = asyncHandler(async (toEmail, subject, html) => {
  const mailOptions = {
    from: `"E-commerce Store" <${process.env.EMAIL_FROM}>`,
    to: toEmail,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email sent successfully to ${toEmail}`);
});

export const sendWelcomeEmail = asyncHandler(async (toEmail, username) => {
  await sendEmail(toEmail, 'Welcome to Our Store!', templates.welcome(username));
});

export const sendOrderConfirmation = asyncHandler(async (toEmail, username, orderId, total) => {
  await sendEmail(toEmail, 'Order Confirmation', templates.orderConfirmation(username, orderId, total));
});

export const sendPasswordReset = asyncHandler(async (toEmail, username, resetLink) => {
  await sendEmail(toEmail, 'Password Reset Request', templates.passwordReset(username, resetLink));
});

export const sendAccountUpdate = asyncHandler(async (toEmail, username) => {
  await sendEmail(toEmail, 'Account Information Updated', templates.accountUpdate(username));
});