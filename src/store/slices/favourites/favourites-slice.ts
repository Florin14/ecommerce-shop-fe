import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryResponseDTO } from "../../../types/categories/Categories";

export interface FavouritesInterface {
  favourites: CategoryResponseDTO[];
}

const initialState: FavouritesInterface = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setToEmpty(state) {
      state.favourites = [];
    },

    setCategories(state, action) {
      state.favourites = action.payload;
    },

    addCategory(state, action) {
      state.favourites.push(action.payload.item);
    },

    editCategory(state, action) {
      const index = state.favourites.findIndex(
        (item) => item.id === action.payload.item.id
      );
      state.favourites[index] = action.payload.item;
    },

    deleteCategory(state, action) {
      const tmp = state.favourites;
      const item = tmp.find((item) => item.id === action.payload.id);
      state.favourites = tmp.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const favouritesActions = favouritesSlice.actions;
export default favouritesSlice.reducer;
