import express from "express";

import {
generateDishDescription,
analyzeReviews,
recommendFood,
searchFoodAI
}
from "../controllers/aiController.js";

const router = express.Router();

router.post(
"/generate-description",
generateDishDescription
);

router.post(
"/review-analysis",
analyzeReviews
);

router.post(
"/recommend-food",
recommendFood
);

router.post(
"/search-food",
searchFoodAI
);

export default router;