import api from "./api";

export const addToCart = (data) =>
  api.post("/cart/add", data);

export const getCart = () =>
  api.get("/cart/my-cart");

export const updateCartQuantity = (
  id,
  quantity
) =>
  api.put(`/cart/${id}`, {
    quantity,
  });

export const removeCartItem = (id) =>
  api.delete(`/cart/${id}`);

export const clearCart = () =>
  api.delete("/cart/clear");