import { Brand } from "../../types";
import { baseApi } from "./baseApi";

export const brandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/brands",
      providesTags: ["Brands"],
    }),
    createBrand: builder.mutation<Brand, { name: string }>({
      query: (body) => ({ url: "/brands", method: "POST", body }),
      invalidatesTags: ["Brands"],
    }),
    updateBrand: builder.mutation<Brand, { id: number; name: string }>({
      query: ({ id, ...body }) => ({ url: `/brands/${id}`, method: "PUT", body }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: builder.mutation<void, number>({
      query: (id) => ({ url: `/brands/${id}`, method: "DELETE" }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
