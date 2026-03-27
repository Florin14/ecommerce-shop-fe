import { Address } from "../../types";
import { baseApi } from "./baseApi";

export const addressesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<Address[], void>({
      query: () => "/addresses",
      providesTags: ["Addresses"],
    }),
    createAddress: builder.mutation<Address, Omit<Address, "id">>({
      query: (body) => ({ url: "/addresses", method: "POST", body }),
      invalidatesTags: ["Addresses"],
    }),
    updateAddress: builder.mutation<Address, { id: number; data: Partial<Address> }>({
      query: ({ id, data }) => ({ url: `/addresses/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Addresses"],
    }),
    deleteAddress: builder.mutation<void, number>({
      query: (id) => ({ url: `/addresses/${id}`, method: "DELETE" }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressesApi;
