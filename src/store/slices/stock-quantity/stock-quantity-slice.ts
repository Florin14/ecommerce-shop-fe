import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SizesInterface {
  payload: string;
}

export interface SizesSlice {
    sizes: [],
  }

const initialState: SizesSlice = {
  sizes: [],
};

const stockQuantitySlice = createSlice({
  name: "stockQuantity",
  initialState,
  reducers: {
    setToEmpty(state, action) {
      state.sizes = [];
    },

    setSizes(state, action) {
      state.sizes = action.payload;
    },
  },
});

export const stockQuantityActions = stockQuantitySlice.actions;
export default stockQuantitySlice.reducer;
