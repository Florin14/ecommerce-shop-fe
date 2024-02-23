import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { categoryActions } from "./categories-slice";
// import { axiosInstance } from "../../../api/api";

export interface Category {
  name: string;
}

export const getCategories = createAsyncThunk(
  "getCategories",
  async ({}, thunkAPI) => {
    const options = {
      url: `/api/categories`,
      method: "GET",
    };

    try {
      const response = await Axios(options);
      const data = response?.data;
      thunkAPI.dispatch(categoryActions.setCategories(data));
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const addCategory = createAsyncThunk(
  "addCategory",
  async (name, thunkAPI) => {
    const options = {
      url: `/api/categories`,
      method: "POST",
      data: name,
    };
    try {
      const response = await Axios(options);
      const data = response?.data;
      thunkAPI.dispatch(categoryActions.addCategory({ item: data }));
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async ({ id, name }: { id: number; name: string }, thunkAPI) => {
    const options = {
      url: `/api/categories/${id}`,
      method: "PUT",
      data: { name },
    };
    try {
      const response = await Axios(options);
      // const data = response;
      thunkAPI.dispatch(categoryActions.editCategory({ item: response?.data }));
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);
