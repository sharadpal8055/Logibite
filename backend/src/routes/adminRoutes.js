import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAllOrders,
  getOrderByIdAdmin,
    updateOrderStatusAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

/* ==========================================
   Admin Routes
========================================== */

router.get(
  "/orders",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);
router.get(
  "/orders/:id",
  authMiddleware,
  adminMiddleware,
  getOrderByIdAdmin
);
router.put(
  "/orders/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatusAdmin
);
export default router;