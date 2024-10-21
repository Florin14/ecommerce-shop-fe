import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { categoryActions } from "./users-slice";
// import { axiosInstance } from "../../../api/api";

export interface Category {
  name: string;
}

export const getCategories = createAsyncThunk(
  "getCategories",
  async ({}, thunkAPI) => {
    const options = {
      url: `/api/category`,
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
  async ( name , thunkAPI) => {
    const options = {
      url: `/api/category`,
      method: "POST",
      data: name,
    };
    try {
      const response = await Axios(options);
      thunkAPI.dispatch(categoryActions.addCategory({ item: response }));
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
      url: `/api/category/${id}`,
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

export const login = createAsyncThunk(
  "login",
  async ( { email, password }: {email: string; password: string }, thunkAPI) => {
    const options = {
      url: `/api/login`,
      method: "POST",
      data: {email, password},
    };
    try {
      const response = await Axios(options);
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: true,
        message: "SomethingWentWrong",
      });
    }
  }
);
export interface LoginUserDTO {
  email: string
  password: string
}

export interface LoginResponseBody {
  value: string // JWT token
  email: string
  authorities: string[]
}

import axios, { AxiosRequestConfig } from 'axios'
import { AxiosResponse } from 'axios'

const hostName = 'localhost'
const port = 3000

export const axiosInstance = axios.create({
  baseURL: `http://${hostName}:${port}/api/`,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }

  return config
})


// IMPORTANT: Sending an already existing JWT Token through 'Authorization' will result in 403 Forbidden Response
export const loginCall = async (user: LoginUserDTO): Promise<AxiosResponse<LoginResponseBody>> =>
  axiosInstance.post('/login', user, { headers: { Authorization: undefined } })


export const authenticateUser = createAsyncThunk('authenticateUser', async (user: LoginUserDTO, { dispatch }) => {
  const response = await loginCall(user)
})
