import { Router } from "express";
import * as controller from "./auth.controller.js";
const router = Router();

router.post("/register", controller.register);
router.get("/confirm-email/:token", controller.confirmEmail);
router.post("/login", controller.login);
router.post("/send-code", controller.sendCode);
router.post("/reset-password", controller.resetPassword);
export default router;
