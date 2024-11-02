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
  async (
    {
      sortBy = null,
      sortType = null,
    }: { sortBy: string | null; sortType: string | null },
    thunkAPI
  ) => {
    const options = {
      url: `/api/products`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      params: { sortBy, sortType },
    };
    try {
      const response = await Axios(options);
      const data = response?.data?.data;
      thunkAPI.dispatch(productActions.setProducts(data));
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
      productStock,
      brandId,
      categoryId,
      genderId,
      sku,
      images,
    }: {
      name: string;
      description: string;
      price: string;
      productStock: string;
      brandId: string;
      categoryId: string;
      genderId: string;
      sku: any;
      images: any;
    },
    thunkAPI
  ) => {
    const formData = new FormData();

    // Append JSON data as fields
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand_id", brandId);
    formData.append("category_id", categoryId);
    formData.append("gender_id", genderId);
    formData.append("sku", sku);

    // Append files
    images.forEach((image: any, index: number) => {
      formData.append(`images[${index}]`, image);
    });

    // Append product stock as JSON string
    formData.append("product_stock", JSON.stringify(productStock));
    const options = {
      url: `/api/products`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
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

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async ({ id }: { id: number }, thunkAPI) => {
    const options = {
      url: `/api/products/${id}`,
      method: "GET",
    };
    try {
      const response = await Axios(options);
      const data = response?.data;
      thunkAPI.dispatch(productActions.setProduct(data));
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);
