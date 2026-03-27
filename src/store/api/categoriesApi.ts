import { Category } from "../../types";
import { baseApi } from "./baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<Category, { name: string }>({
      query: (body) => ({ url: "/categories", method: "POST", body }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<Category, { id: number; name: string }>({
      query: ({ id, ...body }) => ({ url: `/categories/${id}`, method: "PUT", body }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
