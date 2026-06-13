import express from "express";

import {
  addFavorite,
  getFavorites,
} from "../controllers/favoriteController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  addFavorite
);

router.get(
  "/my-favorites",
  authMiddleware,
  getFavorites
);

export default router;