import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
// import { axiosInstance } from "../../../api/api";

export const updateProductToFavourite = createAsyncThunk(
  "updateProductToFavourite",
  async ({ id, name }: { id: number; name: string }, thunkAPI) => {
    const options = {
      url: `/api/products/${id}/add-to-favourites`,
      method: "PUT",
      data: { name },
    };
    try {
      const response = await Axios(options);
      // const data = response;
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);
