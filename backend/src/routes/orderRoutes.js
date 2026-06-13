import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  placeCODOrder,
  createRazorpayOrder,
  verifyPayment,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post(
  "/cod",
  authMiddleware,
  placeCODOrder
);

router.post(
  "/razorpay/create",
  authMiddleware,
  createRazorpayOrder
);

router.post(
  "/razorpay/verify",
  authMiddleware,
  verifyPayment
);

router.get(
  "/my-orders",
  authMiddleware,
  getUserOrders
);

router.put(
  "/status/:id",
  updateOrderStatus
);

export default router;