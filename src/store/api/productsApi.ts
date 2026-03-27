import { Product } from "../../types";
import { baseApi } from "./baseApi";

interface ProductResources {
  brands: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  genders: { id: number; name: string }[];
  sizes: { id: number; name: string }[];
}

interface SearchResult {
  total: number;
  products: Product[];
  page: number;
  size: number;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      { skip?: number; limit?: number; sort_by?: string; sort_order?: string } | void
    >({
      query: (params) => ({
        url: "/products",
        params: params || {},
      }),
      providesTags: ["Products"],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Product", id }],
    }),
    getProductResources: builder.query<ProductResources, void>({
      query: () => "/products/resources",
    }),
    searchProducts: builder.query<SearchResult, Record<string, string | number | undefined>>({
      query: (params) => ({ url: "/products/search", params }),
    }),
    autocompleteProducts: builder.query<Product[], string>({
      query: (q) => ({ url: "/products/autocomplete", params: { q } }),
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<Product, { id: number; data: Partial<Product> }>({
      query: ({ id, data }) => ({ url: `/products/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_result, _err, { id }) => ["Products", { type: "Product", id }],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductResourcesQuery,
  useSearchProductsQuery,
  useAutocompleteProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
