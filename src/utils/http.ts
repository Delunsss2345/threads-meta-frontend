import type { ApiError, PromiseHandlers } from "@/types/axios.type";
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_BASE_API;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
});
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

let isRefreshing = false;

let failedQueue: PromiseHandlers[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const result = await axios.post(`${baseURL}/auth/refresh-token`, {
      refresh_token: localStorage.getItem("refreshToken"),
    });

    localStorage.setItem("accessToken", result.data.data.access_token);
    localStorage.setItem("refreshToken", result.data.data.refresh_token);

    processQueue(null);
  } catch (error) {
    processQueue(error);
    throw error;
  }
};

const getNewToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    await refreshToken();
    isRefreshing = false;
    return;
  }

  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  });
};

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const shouldRenewToken =
      error.response.status === 401 && !originalRequest._retry;

    if (shouldRenewToken) {
      originalRequest._retry = true;

      try {
        await getNewToken();

        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

class AxiosHttp {
  private _send = async (
    method: string,
    path: string,
    data?: object,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await axiosInstance.request({
        method,
        url: path,
        data,
        ...config,
      });

      return response.data;
    } catch (error: any) {
      const err: ApiError = {
        status: error.response?.status || 500,
        message:
          error.response?.data?.message || error.message || "Server Error",
      };
      throw err;
    }
  };

  get = (path: string, config?: AxiosRequestConfig) => {
    return this._send("get", path, undefined, config);
  };

  post = (path: string, data?: object, config?: AxiosRequestConfig) => {
    return this._send("post", path, data, config);
  };

  put = (path: string, data: object, config?: AxiosRequestConfig) => {
    return this._send("put", path, data, config);
  };

  patch = (path: string, data: object, config?: AxiosRequestConfig) => {
    return this._send("patch", path, data, config);
  };

  del = (path: string, config?: AxiosRequestConfig) => {
    return this._send("delete", path, undefined, config);
  };
}
export const http = new AxiosHttp();
