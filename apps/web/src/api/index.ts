import { STORAGE_KEY } from "@/store";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_WHOAMI_URL;
let accessToken = "";

if (typeof window !== "undefined") {
  const STORAGE = localStorage.getItem(STORAGE_KEY);
  accessToken = JSON.parse(STORAGE as string).state.accessToken;
}

export type AxiosResponse<T> = {
  status: number;
  message: string;
  data: T;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem(STORAGE_KEY);
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use((response) => {
  const { data } = response;

  return {
    ...response,
    message: data.message,
    data: data.data,
  };
});

export default axiosInstance;
