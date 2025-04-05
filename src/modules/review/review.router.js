import { Router } from "express";
import * as controller from "./review.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router({mergeParams : true});

//mousa.com/products/:productId/reviews/number

router.post("/", auth('user'), controller.createReview);
router.get("/number", controller.getReviewsCount);
