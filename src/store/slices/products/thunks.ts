import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { productActions } from "./products-slice";
// import { axiosInstance } from "../../../api/api";

export const getProductsResources = createAsyncThunk(
  "getProductsResources",
  async ({}, thunkAPI) => {
    const options = {
      url: `/api/products/resources`,
      method: "GET",
    };
    try {
      const response = await Axios(options);
      const data = response?.data;
      thunkAPI.dispatch(productActions.setResources(data));
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const getProducts = createAsyncThunk(
  "getProducts",
  async ({}, thunkAPI) => {
    const options = {
      url: `/api/products`,
      method: "GET",
    };
    try {
      const response = await Axios(options);
      const data = response?.data;
      // thunkAPI.dispatch(productActions.setProducts(data?.items));
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);

export const addProducts = createAsyncThunk(
  "addProducts",
  async (
    {
      name,
      description,
      price,
      stockQuantity,
      brandId,
      categoryId,
      genderId,
      sku,
    },
    thunkAPI
  ) => {
    const options = {
      url: `/api/products`,
      method: "POST",
      data: {
        name: name,
        description: description,
        price: price,
        stockQuantity: stockQuantity,
        brand_id: brandId,
        category_id: categoryId,
        gender_id: genderId,
        sku: sku,
      },
    };
    try {
      const response = await Axios(options);
      const data = response?.data;
      // thunkAPI.dispatch(productActions.setProducts(data?.items));
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);
