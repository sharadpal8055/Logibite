import api from "./api";

export const getAddresses =
  () =>
    api.get(
      "/addresses"
    );

export const addAddress = (
  data
) =>
  api.post(
    "/addresses",
    data
  );