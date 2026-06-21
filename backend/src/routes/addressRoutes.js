import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";

const router = express.Router();

/* ==========================================
   Address Routes
========================================== */

// Add Address
router.post(
  "/",
  authMiddleware,
  addAddress
);

// Get All Addresses
router.get(
  "/",
  authMiddleware,
  getAddresses
);

// Get Single Address
router.get(
  "/:id",
  authMiddleware,
  getAddressById
);

// Update Address
router.put(
  "/:id",
  authMiddleware,
  updateAddress
);

// Delete Address
router.delete(
  "/:id",
  authMiddleware,
  deleteAddress
);

// Set Default Address
router.patch(
  "/default/:id",
  authMiddleware,
  setDefaultAddress
);

export default router;