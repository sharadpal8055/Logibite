import express from "express";

import {
  addToCart,
  getUserCart,
  removeCartItem,
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  addToCart
);

router.get(
  "/my-cart",
  authMiddleware,
  getUserCart
);

router.delete(
  "/:id",
  authMiddleware,
  removeCartItem
);

export default router;