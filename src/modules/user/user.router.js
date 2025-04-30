import express from "express";
import * as userController from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "./user.validation.js";
import { validate } from "../../middleware/validation.js";

const router = express.Router();

const roles = {
  USER: 'user',
  ADMIN: 'admin',
  superAdmin: 'superAdmin',
};

// User routes
router.get("/profile", auth("user"), userController.getProfile);
router.put("/profile", auth("user"), validate(updateProfileSchema), userController.updateProfile);
router.delete("/profile", auth("user"), userController.deleteProfile);
router.put("/change-password", auth("user"), validate(changePasswordSchema), userController.changePassword);

// Admin routes
router.get("/", auth("admin"), userController.getAllUsers);
router.get("/:id", auth("admin"), userController.getUserById);
router.put("/:id/role", auth("admin"), userController.updateUserRole);
router.put("/:id/status", auth("admin"), userController.updateUserStatus);
router.delete("/:id", auth("admin"), userController.deleteUser);


export default router;
