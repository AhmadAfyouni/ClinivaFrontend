import axios from "axios";
import { toast } from "react-toastify";
import useLoadingStore from "../store/useLoader";
import {BACKEND_URL} from "../config.ts";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await axios.post(`${BACKEND_URL}/auth/refresh-token`, {
    refreshToken,
  });

  const newAccessToken = response.data.data.accessToken;
  localStorage.setItem("token", newAccessToken);
  return newAccessToken;
};

const setLoading = useLoadingStore.getState().setLoading;
axiosInstance.interceptors.request.use(
  (config) => {
    setLoading(true);

    // const sessionToken = sessionStorage.getItem("token");
    if (config.url !== "/login") {
      const token = sessionStorage.getItem("token")
        ? sessionStorage.getItem("token")
        : localStorage.getItem("token");
      config.headers["Authorization"] = `Bearer ${token}`;
      const i18nextLng = localStorage.getItem("i18nextLng");
      config.headers["Accept-Language"] =
        i18nextLng && ["en", "ar"].includes(i18nextLng) ? i18nextLng : "en";
    }
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // const setLoading = useLoadingStore.getState().setLoading;
    setLoading(false);
    if (response.data.message) {
      switch (response?.config?.method) {
        case "get":
          // showToast(response.data.message, "success");
          break;
        case "post":
          showToast(
            response.data.message || "The operation was completed successfully",
            "success"
          );
          break;
        case "put":
          showToast("Updated: " + response.data.message, "success");
          break;
        case "patch":
          showToast(response.data.message, "success");
          break;
        case "delete":
          showToast("Deleted: success", "success");
          break;
        default:
          break;
      }
    }
    return response;
  },
  async function (error) {
    setLoading(false);
    console.log(error.response?.data?.message?.message);
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;

      switch (status) {
        case 404:
        case 419:
        case 422:
        case 500:
          showToast(
            errorData?.data?.message?.message || "An error occurred",
            "error"
          );
          break;
        case 405:
          if (errorData?.message) {
            Object.keys(errorData.message).forEach((key) =>
              showToast(errorData.message[key], "error")
            );
          }
          break;
        case 401:
          try {
            console.log("from api core");
            
            const newAccessToken = await refreshAccessToken();
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            console.log("from api core success");
            return axiosInstance(error.config);
          } catch (refreshError) {
            console.log("from api core error", refreshError);
            showToast(
              "Session Expired For your security and privacy, your session has ended. Please log in again to continue your work",
              "error"
            );
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("refreshToken")
            console.log("from api core error navigate");

             setTimeout(() => {
              window.location.href = "/login"; 
            }, 4000);
          }
          break;
        case 403:
          showToast("Forbidden", "error");
          break;
        default:
          showToast(
            errorData?.message?.message || "An error occurred",
            "error"
          );
          break;
      }
    } else if (error?.request) {
      showToast("Network error occurred", "error");
    } else {
      showToast("An unexpected error occurred", "error");
    }

    return Promise.reject(error);
  }
);

const showToast = (message: string, variant: "success" | "error") => {
  if (variant === "success") {
    toast.success(message, { autoClose: 4000, position: "top-right" });
  } else {
    toast.error(message, { autoClose: 4000, position: "bottom-right" });
  }
};

export default axiosInstance;
