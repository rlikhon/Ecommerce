import axios from "axios";
import { toast } from "react-toastify";

const publicClient = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  }
});

// Request Interceptor to safely inject customer tokens
publicClient.interceptors.request.use(
  (config) => {
    try {
      const rawUserInfo = localStorage.getItem("userInfo");
      if (rawUserInfo && rawUserInfo !== "undefined") {
        const user = JSON.parse(rawUserInfo);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (e) {
      console.error("Token injection failure:", e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global Response Interceptor: Handles all errors centrally
publicClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Server connection failure. Please check your network connectivity.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 401: // Unauthorized / Session Expired
        if (localStorage.getItem("userInfo")) {
          localStorage.removeItem("userInfo");
          toast.error("Your session has expired. Redirecting to login...");
          setTimeout(() => { window.location.href = "/account/login"; }, 1500);
        }
        break;

      case 422: // Laravel Validation Validation Errors
        if (data?.errors) {
          // Flatten nested validation arrays and toast the explicit server errors
          Object.values(data.errors).flat().forEach(message => {
            toast.error(message);
          });
        } else {
          toast.error(data?.message || "Validation validation parameters rejected.");
        }
        break;

      case 500: // Internal Server Crash
        toast.error(data?.message || "Internal server crash. Please contact system administrators.");
        break;

      default:
        toast.error(data?.message || "An unexpected error occurred.");
        break;
    }

    return Promise.reject(error);
  }
);

export default publicClient;
