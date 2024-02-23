import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductInterface {
  payload: string;
}

export interface ProductsInterface {
  products: []
}

export interface ProductSlice {
    products: [],
    resources: {},
  }

const initialState: ProductSlice = {
  products: [],
  resources: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setToEmpty(state, action) {
      state.products = [];
    },

    setProducts(state, action) {
      state.products = action.payload;
    },

    setResources(state, action) {
      state.resources = action.payload;
    },

    addProduct(state, action: PayloadAction<ProductInterface>) {
      state.products.push(action.payload.item);
    },

    editProduct(state, action) {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.item.id
      );
      state.products[index] = action.payload.item;
    },

    deleteProduct(state, action) {
      const tmp = state.products;
      const item = tmp.find((item) => item.id === action.payload.id);
      state.products = tmp.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
