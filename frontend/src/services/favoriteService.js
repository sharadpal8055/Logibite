import api from "./api";

export const getFavorites =
  () =>
    api.get(
      "/favorites"
    );

export const addFavorite = (
  foodId
) =>
  api.post(
    "/favorites",
    {
      foodId,
    }
  );

export const removeFavorite =
  (id) =>
    api.delete(
      `/favorites/${id}`
    );