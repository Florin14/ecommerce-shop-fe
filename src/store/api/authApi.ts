import { TokenResponse, User } from "../../types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, { username: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    register: builder.mutation<
      TokenResponse,
      { full_name: string; username: string; password: string }
    >({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    getProfile: builder.query<User, void>({
      query: () => "/users/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (body) => ({ url: "/users/profile", method: "PUT", body }),
      invalidatesTags: ["Profile"],
    }),
    uploadProfilePicture: builder.mutation<User, FormData>({
      query: (body) => ({ url: "/users/profile/picture", method: "PUT", body }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfilePictureMutation,
} = authApi;
