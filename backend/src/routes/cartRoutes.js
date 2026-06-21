import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addToCart,
  getUserCart,
  removeCartItem,
  updateCartQuantity,
  clearCart,
} from "../controllers/cartController.js";

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

router.patch(
  "/update/:id",
  authMiddleware,
  updateCartQuantity
);

router.delete(
  "/remove/:id",
  authMiddleware,
  removeCartItem
);

router.delete(
  "/clear",
  authMiddleware,
  clearCart
);

export default router;