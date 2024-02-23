import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryResponseDTO } from "../../../types/categories/Categories";

export interface CategoriesInterface {
  categories: CategoryResponseDTO[]
}

const initialState: CategoriesInterface = {
  categories: []
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setToEmpty(state) {
      state.categories = [];
    },

    setCategories(state, action) {
      state.categories = action.payload;
    },

    addCategory(state, action) {
      state.categories.push(action.payload.item);
    },

    editCategory(state, action) {
      const index = state.categories.findIndex(
        (item) => item.id === action.payload.item.id
      );
      state.categories[index] = action.payload.item;
    },

    deleteCategory(state, action) {
      const tmp = state.categories;
      const item = tmp.find((item) => item.id === action.payload.id);
      state.categories = tmp.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
