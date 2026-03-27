import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Products",
    "Product",
    "Orders",
    "Brands",
    "Categories",
    "Genders",
    "Sizes",
    "Users",
    "Profile",
    "Wishlist",
    "Addresses",
    "Notifications",
  ],
  endpoints: () => ({}),
});
