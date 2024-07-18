import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: `https://team-lydia-demo.onrender.com`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
