import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  placeCODOrder,
  createRazorpayOrder,
  verifyPayment,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  checkout
} from "../controllers/orderController.js";

const router = express.Router();
router.get(
  "/checkout",
  authMiddleware,
  checkout
);
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
router.get(
  "/:id",
  authMiddleware,
  getOrderById
);
router.patch(
  "/cancel/:id",
  authMiddleware,
  cancelOrder
);
router.put(
"/status/:id",
authMiddleware,
adminMiddleware,
updateOrderStatus
);

export default router;