import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "",
});
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url !== "/login") {
      const token = localStorage.getItem("token");
      config.headers["Authorization"] = `Bearer ${token}`;
      const i18nextLng = localStorage.getItem("i18nextLng");
      config.headers["Accept-Language"] =
        i18nextLng && ["en", "ar"].includes(i18nextLng) ? i18nextLng : "en";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    switch (response?.config?.method) {
      case "post": {
        if (response.data.message === "" || response?.data.messages === "") {
          showToast("The operation was completed successfully", "success");
        } else {
          showToast(response.data.message, "success");
        }
        break;
      }
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

    return response;
  },
  function (error) {
    if (error.response) {
      switch (error?.response?.status) {
        case 404:
        case 419:
        case 422:
        case 500:
          if (typeof error.response.data.errors === "string")
            toast.error(`Error placing order: ${error.response.data.errors}`);
          else {
            const e = Object.values(error.response.data.errors)
              .flatMap((err) => err)
              .join("\n");
            showToast(e, "error");
          }
          break;
        case 405:
          Object.keys(error.response.data.message).map((key) =>
            showToast(error.response.data.message[key], "error")
          );
          break;
        case 401:
          // navigate("/");
          showToast(error.response.data.message, "error");
          break;
        case 403:
          // navigate("/");
          break;
        default:
          showToast(error.response?.data?.message, "error");
          break;
      }
    } else if (error?.request) {
      showToast(error.message, "error");
    } else {
      // Something happened in setting up the request that triggered an Error
      showToast("Unknown Error", "error");
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
export const APIKeyGoogleMap = "AIzaSyC9AEfwxO9TCxGzZgugExbTuW2xWzTqv_o";
export const MapID = "b6e7d03b3e41a8db";

export default axiosInstance;
