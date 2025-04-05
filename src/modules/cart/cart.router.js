import { Router } from "express";
import * as controller from "./cart.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();


router.get("/", auth('user'), controller.addToCart);

export default router;