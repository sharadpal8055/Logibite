import express from "express";
import {
  createReview,
  getFoodReviews,
  analyzeRestaurantReviews,
} from "../controllers/reviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createReview
);

router.get(
  "/food/:foodId",
  getFoodReviews
);

router.get(
  "/analyze/:restaurantId",
  analyzeRestaurantReviews
);

export default router;