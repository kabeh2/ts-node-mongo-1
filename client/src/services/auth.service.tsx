import axios, { AxiosInstance } from "axios";

export const apiUrl = "http://localhost:3001/api";

export const getToken: () => string | null = () => {
  return localStorage.getItem("token");
};

export const setToken = (payload: string): void => {
  return localStorage.setItem("token", payload);
};

export const removeToken = (): void => {
  return localStorage.removeItem("token");
};

export const axiosAuth: () => AxiosInstance = () => {
  const token = getToken();

  return axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: token,
    },
  });
};

export default { apiUrl, getToken, setToken, removeToken, axiosAuth };
