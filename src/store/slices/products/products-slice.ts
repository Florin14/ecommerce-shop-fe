import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductInterface {
  // payload: string;
  item: any;
}

interface ProductSlice {
  products: any[];
  resources: {};
  product: any;
  sortBy: string | null,
  sortType: string | null
}

const initialState: ProductSlice = {
  products: [],
  resources: {},
  product: null,
  sortBy: null,
  sortType: null
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setToEmpty(state, action) {
      state.products = [];
      state.resources = {};
      state.product = null;
      state.sortBy = null;
      state.sortType = null;
    },

    setSortBy(state, action) {
      state.sortBy = action.payload;
    },

    setSortType(state, action) {
      state.sortType = action.payload;
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

    setProduct(state, action: PayloadAction<ProductInterface>) {
      state.product = action.payload;
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
