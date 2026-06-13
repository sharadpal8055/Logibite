import express from "express";

import {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
  getRestaurantFoods,
} from "../controllers/foodController.js";

const router =
  express.Router();

router.post(
  "/add",
  addFood
);

router.get(
  "/all",
  getFoods
);

router.get(
  "/:id",
  getFoodById
);

router.put(
  "/:id",
  updateFood
);

router.delete(
  "/:id",
  deleteFood
);
router.get(
  "/restaurant/:id",
  getRestaurantFoods
);

export default router;