import { Order } from "../../types";
import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
    getOrder: builder.query<Order, number>({
      query: (id) => `/orders/${id}`,
    }),
    createOrder: builder.mutation<
      Order,
      { items: { product_id: number; product_size_id: number; quantity: number }[]; shipping_address_id?: number }
    >({
      query: (body) => ({ url: "/orders", method: "POST", body }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation<Order, { id: number; order_state: string }>({
      query: ({ id, ...body }) => ({ url: `/orders/${id}`, method: "PUT", body }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation<void, number>({
      query: (id) => ({ url: `/orders/${id}`, method: "DELETE" }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
