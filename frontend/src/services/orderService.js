import api from "./api";

export const checkout = () =>
  api.get(
    "/orders/checkout"
  );

export const placeCODOrder = (
  data
) =>
  api.post(
    "/orders/cod",
    data
  );

export const getOrders = () =>
  api.get(
    "/orders/my-orders"
  );