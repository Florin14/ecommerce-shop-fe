import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { orderActions } from "./orders-slice";
// import { axiosInstance } from "../../../api/api";

export interface Category {
  name: string;
}

export const getOrders = createAsyncThunk(
  "getOrders",
  async ({}, thunkAPI) => {
    const options = {
      url: `/api/orders`,
      method: "GET",
    };

    try {
      const response = await Axios(options);
      const data = response?.data;
      thunkAPI.dispatch(orderActions.setOrders(data));
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const addOrder = createAsyncThunk(
  "addOrder",
  async ( name , thunkAPI) => {
    const options = {
      url: `/api/orders`,
      method: "POST",
      data: name,
    };
    try {
      const response = await Axios(options);
      thunkAPI.dispatch(orderActions.addOrder({ item: response }));
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const updateOrder = createAsyncThunk(
  "updateOrder",
  async ({ id, name }: { id: number; name: string }, thunkAPI) => {
    const options = {
      url: `/api/orders/${id}`,
      method: "PUT",
      data: { name },
    };
    try {
      const response = await Axios(options);
      // const data = response;
      thunkAPI.dispatch(orderActions.editOrder({ item: response?.data }));
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);
