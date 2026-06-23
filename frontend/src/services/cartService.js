
import api from "./api";

// ==============================
// Add Item
// ==============================

export const addToCart = (data) =>
  api.post("/cart/add", data);

// ==============================
// Get User Cart
// ==============================

export const getCart = async () => {
  const response = await api.get("/cart/my-cart");

  console.log("getCart Response:", response);

  return response;
};

// ==============================
// Update Quantity
// ==============================

export const updateCartItem = (id, quantity) =>
  api.patch(`/cart/update/${id}`, {
    quantity,
  });

// ==============================
// Remove Item
// ==============================

export const removeCartItem = (id) =>
  api.delete(`/cart/remove/${id}`);

// ==============================
// Clear Cart
// ==============================

export const clearCart = () =>
  api.delete("/cart/clear");

