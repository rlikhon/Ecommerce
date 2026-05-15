import axios from "axios";
import { toast } from "react-toastify";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/admin",
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const msg = err.response?.data?.message || err.message || "Something went wrong";

    if (!err.response) {
      toast.error("Network Error: Cannot connect to API. Ensure your backend is running and supports HTTPS if the frontend is HTTPS.");
      return Promise.reject(err);
    }

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminInfo");
      toast.error("Session expired. Please login again.");
      setTimeout(() => (window.location.href = "/admin/login"), 2000);
    } else if (status === 403) {
      toast.error("Access denied.");
    } else {
      toast.error(msg);
    }

    return Promise.reject(err);
  },
);

export default client;
