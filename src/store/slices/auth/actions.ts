import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUserCall, loginCall } from "./services";
import { LoginUserDTO, RegisterUserDTO } from "../../../types/users/Users";

export const authenticateUser = createAsyncThunk(
  "authenticateUser",
  async (user: LoginUserDTO, { dispatch }) => {
    const response = await loginCall(user);
    console.log(response);
    if (response?.status === 200) {
      localStorage.setItem("jwtToken", response.data.value);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("authorities", response.data.authorities.toString());
    }
  }
);

export const addUser = createAsyncThunk('addUser', async (user: RegisterUserDTO) => addUserCall(user))

