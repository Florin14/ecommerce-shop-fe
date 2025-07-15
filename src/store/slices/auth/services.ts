import { LoginResponseBody, LoginUserDTO, RegisterUserDTO, User } from "../../../types/users/Users";
import { axiosInstance } from "../../api";
import { AxiosResponse } from "axios";

// IMPORTANT: Sending an already existing JWT Token through 'Authorization' will result in 403 Forbidden Response
export const loginCall = async (
  user: LoginUserDTO
): Promise<AxiosResponse<LoginResponseBody>> =>
  axiosInstance.post("/login", user, { headers: { Authorization: undefined } });


  export const addUserCall = async (user: RegisterUserDTO): Promise<User> => axiosInstance.post('/register', user)
