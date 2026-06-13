import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import restaurantRoutes
from "./routes/restaurantRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

const app = express();

/* ========================================
   MIDDLEWARES
======================================== */

// Parse JSON Requests
app.use(express.json({ limit: "10mb" }));

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Parse Cookies
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
    ],
    credentials: true,
  })
);

/* ========================================
   HEALTH CHECK
======================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LogiBite AI Backend Running Successfully ",
    timestamp: new Date().toISOString(),
  });
});

/* ========================================
   API ROUTES
======================================== */

app.use("/api/auth", authRoutes);

// app.use("/api/users", userRoutes);

app.use("/api/foods", foodRoutes);
app.use(
  "/api/restaurants",
  restaurantRoutes
);
app.use("/api/cart", cartRoutes);
app.use("/api/favorites", favoriteRoutes);

app.use("/api/orders", orderRoutes);

// app.use("/api/reviews", reviewRoutes);

// app.use("/api/ai", aiRoutes);

/* ========================================
   404 HANDLER
======================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* ========================================
   GLOBAL ERROR HANDLER
======================================== */

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.stack,
  });
});

export default app;