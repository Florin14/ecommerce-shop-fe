import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BrandResponseDTO } from "../../../types/brands/Brands";

export interface BrandsInterface {
  brands: BrandResponseDTO[]
}

const initialState: BrandsInterface = {
  brands: []
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setToEmpty(state) {
      state.brands = [];
    },

    setBrands(state, action) {
      state.brands = action.payload;
    },

    addBrand(state, action) {
      state.brands.push(action.payload.item);
    },

    editBrand(state, action) {
      const index = state.brands.findIndex(
        (item) => item.id === action.payload.item.id
      );
      state.brands[index] = action.payload.item;
    },

    deleteBrand(state, action) {
      const tmp = state.brands;
      const item = tmp.find((item) => item.id === action.payload.id);
      state.brands = tmp.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const brandsActions = brandsSlice.actions;
export default brandsSlice.reducer;
