import { Router } from "express";
import * as controller from "./order.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();


router.post("/", auth('user'), controller.createOrder);

router.get("/:id", auth('user'), controller.getOrdersCustomer);
router.get("/:status", auth('admin'), controller.getOrdersByStatus);
router.get("/", auth('admin'), controller.changeOrderStatus);





export default router;