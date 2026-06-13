import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});


import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

// Database Connection
await connectDB();

app.listen(PORT, () => {
  console.log(`
========================================
 Server Running Successfully
 Port : ${PORT}
 Environment : ${process.env.NODE_ENV}
========================================
`);
});