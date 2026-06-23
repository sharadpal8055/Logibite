import api from "./api";

export const getRecommendations =
  (prompt) =>
    api.post(
      "/ai/recommend",
      {
        prompt,
      }
    );