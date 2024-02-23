import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { brandsActions } from "./brands-slice";

export interface Brand {
  name: string;
}

export const getBrands = createAsyncThunk(
  "getBrands",
  async ({}, thunkAPI) => {
    const options = {
      url: `/api/brands`,
      method: "GET",
    };

    try {
      const response = await Axios(options);
      const data = response?.data;
      thunkAPI.dispatch(brandsActions.setBrands(data));
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const addBrand = createAsyncThunk(
  "addBrand",
  async ( name , thunkAPI) => {
    const options = {
      url: `/api/brands`,
      method: "POST",
      data: name,
    };
    try {
      const response = await Axios(options);
      const data = response?.data;
      thunkAPI.dispatch(brandsActions.addBrand({ item: data }));
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const updateBrand = createAsyncThunk(
  "updateBrand",
  async ({ id, name }: { id: number; name: string }, thunkAPI) => {
    const options = {
      url: `/api/brands/${id}`,
      method: "PUT",
      data: { name },
    };
    try {
      const response = await Axios(options);
      const data = response?.data;
      thunkAPI.dispatch(brandsActions.editBrand({ item: data }));
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);
