import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import {type AppDispatch } from "../store/store";
import { logout } from "../store/slices/authSlice";

// AxiosRequestConfig extend for _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Promise type
let refreshPromise: Promise<AxiosResponse> | null = null;

export const setupInterceptors = (store: { dispatch: AppDispatch }): void => {
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // if is not error.config 
      if (!originalRequest) {
        return Promise.reject(error);
      }

      // check is send request on auth endponts
      const isAuthEndpoint =
        originalRequest.url?.includes("/auth/refresh") ||
        originalRequest.url?.includes("/auth/login");

      // send refresh, when is 401 error from server 
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthEndpoint
      ) {
        originalRequest._retry = true;

        try {
          // if request is sent, we are waiting result
          if (!refreshPromise) {
            refreshPromise = axios
              .post("/api/v1/auth/refresh", null, { withCredentials: true })
              .finally(() => {
                refreshPromise = null;
              });
          }

          await refreshPromise;

          // send request once again
          return api(originalRequest);
        } catch (refreshError) {
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default api;