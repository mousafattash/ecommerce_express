import { Router } from "express";
import * as controller from "./catagory.controller.js";
import { auth } from "../../middleware/auth.js";
import fileUpload from "../../utils/multer.js";
const router = Router();

router.post("/", auth('admin'), controller.createCategory);
router.get("/", controller.getAllCategories);
router.get("/active", controller.getActiveCategories);
router.get("/:id", controller.getCategoryById);
router.put("/:id", auth('admin'), controller.updateCategory);
router.delete("/:id", auth('admin'), controller.deleteCategory);

export default router;

// router.get('/',auth('admin'),fileUpload(fileValidation.image),controller.get);

//authentication is login register etc..
//authorization is access control after login

//http is stateless protocol which means that each request is independent

