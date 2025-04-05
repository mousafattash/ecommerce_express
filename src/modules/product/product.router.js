import { Router } from "express";
import * as controller from "./product.controller.js";
import { auth } from "../../middleware/auth.js";
import fileUpload,{fileValidation} from "../../utils/multer.js";
import reviewRouter from "../review/review.router.js";
const router = Router();
//mousa.com/products/:productId

router.post("/", auth('admin'), 
fileUpload(fileValidation.image).fields([{name:'mainImage',maxCount:1},{name:'subImages',maxCount:4}]), controller.createProduct);
router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.delete("/:id", auth('admin'), controller.deleteProduct);

// router.get("/active", controller.getActiveProducts);

// router.put("/:id", auth('admin'), fileUpload(['image/jpeg', 'image/jpg', 'image/png', 'image/gif','image/webp']), controller.updateProduct);
// router.get('/search/:keyword', controller.searchProducts);

//mousa.com/products/:productId/reviews
application.use('/products/:productId/reviews',reviewRouter);

export default router;