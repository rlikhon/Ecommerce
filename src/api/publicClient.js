import axios from "axios";

/**
 * ✅ PUBLIC CLIENT INSTANCE
 * Engineered strictly for public storefront consumption queries.
 * Bypasses all local storage token injections to guarantee zero 401 leakage crashes.
 */
const publicClient = axios.create({
  // Point this to your active Laravel backend host port URL
  baseURL: "http://localhost:8000/api",
  timeout: 10000, // 10-second request timeout safeguard limit
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    // Allows backend session cookies if you integrate Laravel Sanctum CSRF cookies for tracking later
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: false // Set to true only if handling Sanctum cookie authentication sessions later
});

/**
 * Global Response Performance Logging / Centralized Error Catching Interceptor
 * Captures low-level network failures (like server offline crashes) gracefully.
 */
publicClient.interceptors.response.use(
  (response) => {
    // Return direct processing pipelines seamlessly
    return response;
  },
  (error) => {
    // Graceful fallbacks for server timeouts or offline errors
    if (!error.response) {
      console.error("Network Infrastructure Failure: Please verify your Laravel server engine is actively hosting endpoints.");
    } else {
      console.warn(`Public API Data Sync Issue [Status: ${error.response.status}]:`, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default publicClient;
