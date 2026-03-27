import { baseApi } from "./baseApi";

interface WishlistItem {
  id: number;
  product_id: number;
  product?: import("../../types").Product;
  created_at: string;
}

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistItem[], void>({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation<WishlistItem, { product_id: number }>({
      query: (body) => ({ url: "/wishlist", method: "POST", body }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation<void, number>({
      query: (productId) => ({ url: `/wishlist/${productId}`, method: "DELETE" }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
