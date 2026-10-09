import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { type AppDispatch } from "../store/store";
import { logout } from "../store/slices/authSlice";

// AxiosRequestConfig- for _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// Promise type
let refreshPromise: Promise<AxiosResponse> | null = null;

export const setupInterceptors = (store: { dispatch: AppDispatch }): void => {
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // check if would be autth in route
      const isAuthEndpoint =
        originalRequest.url?.includes("/auth/refresh") ||
        originalRequest.url?.includes("/auth/login");

      // if status code is 401 and route is not auth
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthEndpoint
      ) {
        originalRequest._retry = true;

        try {
          if (!refreshPromise) {
            refreshPromise = api
              .post("/auth/refresh", null)
              .finally(() => {
                refreshPromise = null;
              });
          }

          await refreshPromise;

          // send request again
          return api(originalRequest);
        } catch (refreshError) {

          // if refresh token is not
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default api;