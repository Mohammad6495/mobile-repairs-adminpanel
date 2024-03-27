import axios from "axios";
import { baseUrl, tokenKey } from "./SERVICE-CONSTANTS";
import { getItem, removeItem, setItem } from "../utils/localstorage";

const setToken = (tokenKey, token) => {
  setItem(tokenKey, token);
};

const getToken = (tokenKey) => {
  return getItem(tokenKey);
};

const removeToken = (tokenKey) => {
  removeItem(tokenKey);
};

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = baseUrl;

axiosInstance.interceptors.response.use(
  (response) => {
    if(response?.data?.statusCode == 401) {
      removeItem(tokenKey);
      if (window.location.pathname !== "/auth")
        window.location.href = "/auth";
    } 
    return response
  },
  async (error) => {
    try {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (expectedError) {
        if (error.response.status === 401) {
          removeItem(tokenKey);
          if (window.location.pathname !== "/auth")
            window.location.href = "/auth";
        }
      }
    } catch (error) {}
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
    // if (!config.headers) config.headers = {}
  config.headers['Authorization'] = 'bearer ' + getItem(tokenKey)
  return config;
});

const http = {
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  get: axiosInstance.get,
  setToken,
  getToken,
  removeToken,
  tokenKey,
};

export default http;
