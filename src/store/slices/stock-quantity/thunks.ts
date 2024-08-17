import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { stockQuantityActions } from "./stock-quantity-slice";

export const getProductSizes = createAsyncThunk(
  "getProductSizes",
  async ({}, thunkAPI) => {
    const options = {
      url: `/api/product-sizes`,
      method: "GET",
    };
    try {
      const response = await Axios(options);
      const data = response?.data;
      thunkAPI.dispatch(stockQuantityActions.setSizes(data));
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);
