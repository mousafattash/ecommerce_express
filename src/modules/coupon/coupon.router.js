import { Router } from "express";
import * as controller from "./coupon.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

router.post("/", auth('admin'), controller.createCoupon);
router.get("/",auth('admin'), controller.getAllCoupons);
router.get("/active",auth('admin'), controller.getActiveCoupons);
router.get("/:id", controller.getCouponById);
router.delete("/:id", auth('admin'), controller.deleteCoupon);
router.put("/:id", auth('admin'), controller.updateCoupon);
router.get('/search/:keyword',auth('admin'), controller.searchCoupons);

export default router;