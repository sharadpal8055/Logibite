import api from "./api";

// Validate checkout
export const checkout = () =>
  api.get("/orders/checkout");

// Place COD order
export const placeCODOrder = (data) =>
  api.post("/orders/cod", data);

// Create Razorpay Order
export const createRazorpayOrder = (data) =>
  api.post("/orders/razorpay", data);

// Verify Razorpay Payment
export const verifyPayment = (data) =>
  api.post("/orders/verify", data);

// User Orders
export const getMyOrders = () =>
  api.get("/orders/my-orders");