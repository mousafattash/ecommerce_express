import express from "express";
import * as userController from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "./user.validation.js";

const router = express.Router();

// Public routes
router.get("/profile", auth(), userController.getProfile);
router.patch("/profile", auth(), userController.updateProfile);
router.delete("/profile", auth(), userController.deleteProfile);

// Admin routes
router.get("/", auth(roles.ADMIN), userController.getAllUsers);
router.get("/:id", auth(roles.ADMIN), userController.getUserById);
router.patch("/:id/role", auth(roles.ADMIN), userController.updateUserRole);
router.delete("/:id", auth(roles.ADMIN), userController.deleteUser);

// Update user profile
router.put(
  "/update",
  auth("user"),
  validation(updateProfileSchema),
  userController.updateProfile
);

// Change password
router.put(
  "/change-password",
  auth("user"),
  validation(changePasswordSchema),
  userController.changePassword
);

export default router;
