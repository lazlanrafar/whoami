import { STORAGE_KEY } from "@/store";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_WHOAMI_URL;

const STORAGE = localStorage.getItem(STORAGE_KEY);
const accessToken = JSON.parse(STORAGE as string).state.accessToken;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default axiosInstance;
