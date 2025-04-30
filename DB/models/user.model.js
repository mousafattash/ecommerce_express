import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {type: String, required: true, unique: true,match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    password: {type: String, required: true},
    name: {type: String, required: true,minlength: 3,maxlength: 50},
    isEmailConfirmed: {type: Boolean, default: false},
    image: {type: Object,},
    phone: {type: String, required: true,match: /^\+?[1-9]\d{1,14}$/},
    address: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    gender: {type: String, enum: ["male", "female"], required: true},
    status: {type: String, enum: ["active", "inactive"], default: "active"},
    role: {type: String, enum: ["user", "admin", "superadmin"], default: "user"},
    sendCode: {type: String, default: null},
}, {timestamps: true});

const User = mongoose.model("users", userSchema);

export default User;

