import { baseApi } from "./baseApi";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckout: builder.mutation<
      { checkout_url: string; session_id: string },
      { order_id: number; success_url: string; cancel_url: string }
    >({
      query: (body) => ({ url: "/payments/create-checkout", method: "POST", body }),
    }),
  }),
});

export const { useCreateCheckoutMutation } = paymentsApi;
