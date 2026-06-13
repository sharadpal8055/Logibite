import express from "express";

import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,

} from "../controllers/restaurantController.js";
import { getRestaurantFoods } from "../controllers/foodController.js";

const router = express.Router();

router.post(
  "/create",
  createRestaurant
);

router.get(
  "/all",
  getRestaurants
);

router.get(
  "/:id",
  getRestaurantById
);

router.put(
  "/:id",
  updateRestaurant
);

router.delete(
  "/:id",
  deleteRestaurant
);


export default router;