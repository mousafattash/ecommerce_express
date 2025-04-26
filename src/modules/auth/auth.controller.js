import bcrypt from "bcryptjs";
import User from "../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail.js";
import {customAlphabet, nanoid} from "nanoid";


export const register = async (req, res) => { 
    
    
    const {email, password, name} = req.body;
    const user = await User.findOne({email});

   if(user){
    return res.status(404).json({message: "User already exists"});
   }

   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = await User.create({email, password: hashedPassword, name});

   const token = jwt.sign({userId: newUser._id}, process.env.confirmemailsignature, {expiresIn: "1h"});
   const html= `
   <h1>Hello ${name}!</h1>
   <p>Please confirm your email by clicking the link below</p>
   <a href="${process.env.FRONTEND_URL}/confirm-email/${token}">Confirm Email</a>
   `
   await sendEmail(email, "Confirm Email", html);

   res.status(201).json({message: "User created successfully",user: newUser});
}

export const confirmEmail = async (req, res) => {
const {token} = req.params;
const decoded = jwt.verify(token, process.env.confirmemailsignature);
await User.findByIdAndUpdate(decoded.userId, {isEmailConfirmed: true});

return res.json({message: "Email confirmed"});
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    if(!user.isEmailConfirmed){
        return res.status(401).json({message: "Email not confirmed"});
    }

    if(user.status === "inactive"){
        return res.status(401).json({message: "User is blocked"});

        
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({message: "Invalid password"});
    }

    const token = jwt.sign({userId: user._id}, process.env.login_signature, {expiresIn: "1h"});
    return res.json({message: "Login successful", token});
}

export const sendCode = async (req, res) => {
    const {email} = req.body;
    const code=customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 6);
    const user=await User.findOneAndUpdate({email},{$set:{sendCode:code()}},{new:true});
    const html= `<h2>Your code is ${code}</h2>`;
    await sendEmail(email,'reset password',html)
    return res.status(200).json({ success: true, message: "Code sent successfully"});
}

export const resetPassword = async (req, res) => {
    const {email, password,code} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    if(user.sendCode !== code){
        return res.status(401).json({message: "Invalid code"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, {$set:{password: hashedPassword, sendCode: null}});
    return res.status(200).json({success: true, message: "Password reset successfully"});
}

