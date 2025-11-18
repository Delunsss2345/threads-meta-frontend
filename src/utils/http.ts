import type { ApiError, PromiseHandlers } from "@/types/axios";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const baseURL = import.meta.env.VITE_BASE_API;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
});

// Mỗi request đều gắn accessToken
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});
// Có đang refreshToken không
let isRefreshing = false;
// Ngăn xếp queue
let failedQueue: PromiseHandlers[] = [];

// Xử lí queue
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

// Gọi refreshToken
const refreshToken = async () => {
  try {
    const result = await axios.post(`${baseURL}/auth/refresh-token`, {
      refresh_token: localStorage.getItem("refreshToken"),
    });

    // Attach all token
    localStorage.setItem("accessToken", result.data.data.access_token);
    localStorage.setItem("refreshToken", result.data.data.refresh_token);

    // Gắn queue  null nếu thành công
    processQueue(null);
  } catch (error) {
    processQueue(error);
    throw error;
  }
};

// Get token mới
const getNewToken = async () => {
  // Chưa refresh token thì đánh giấu
  if (!isRefreshing) {
    isRefreshing = true;
    await refreshToken(); // gọi lại
    isRefreshing = false; // thành công đánh dấu
    return;
  }

  // đã từng gọi thì push mảng lỗi
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  });
};

/// Sử dụng bắt request
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: any) => {
    const originalRequest = error.config;

    // Đánh dấu lỗi
    const shouldRenewToken =
      error.response.status === 401 && !originalRequest._retry;

    // Nếu chưa từng đánh dấu thì vào
    if (shouldRenewToken) {
      // đánh dấu
      originalRequest._retry = true;

      // Gọi lại
      try {
        await getNewToken();
        return axiosInstance(originalRequest); // Trả request
      } catch (error) {
        return Promise.reject(error); // Lỗi ném reject
      }
    }
    // Đã từng đánh dấu thì ném reject
    return Promise.reject(error);
  }
);

// != T mặc định là any
class AxiosHttp {
  private _send = async <T = any>(
    method: "get" | "post" | "put" | "delete" | "patch",
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await axiosInstance.request<T>({
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

  get = <T = any>(path: string, config?: AxiosRequestConfig): Promise<T> => {
    return this._send<T>("get", path, undefined, config);
  };

  post = <T = any>(
    path: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return this._send<T>("post", path, data, config);
  };

  put = <T = any>(
    path: string,
    data: object,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return this._send<T>("put", path, data, config);
  };

  patch = <T = any>(
    path: string,
    data: object,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return this._send<T>("patch", path, data, config);
  };

  del = <T = any>(path: string, config?: AxiosRequestConfig): Promise<T> => {
    return this._send<T>("delete", path, undefined, config);
  };
}
export const http = new AxiosHttp();
