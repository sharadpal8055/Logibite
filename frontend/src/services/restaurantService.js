import api from "./api";

export const getRestaurants =
  () =>
    api.get(
      "/restaurants/all"
    );

export const getRestaurant =
  (id) =>
    api.get(
      `/restaurants/${id}`
    );