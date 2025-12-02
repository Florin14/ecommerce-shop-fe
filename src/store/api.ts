import axios, { InternalAxiosRequestConfig } from "axios";

const hostName = "localhost";
const port = 8002;

export const axiosInstance = axios.create({
  baseURL: `http://${hostName}:${port}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("jwtToken")}`;
  }
  return config;
});
