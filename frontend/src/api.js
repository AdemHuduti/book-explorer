import axios from "axios";

const API_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("[AXIOS ERROR]", error?.response?.status, error?.config?.url);
    console.log(
      "Refresh token from localStorage:",
      localStorage.getItem("refreshToken")
    );

    // Check if it's a 401 and we're allowed to retry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      console.log("[TOKEN] Attempting refresh...");

      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("[REFRESH TOKEN FOUND]:", refreshToken);

        const res = await axios.post(`${API_URL}/api/accounts/token/refresh/`, {
          refresh: refreshToken,
        });

        console.log("[REFRESH SUCCESS]", res.data);

        const newAccess = res.data.access;
        localStorage.setItem("token", newAccess);

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        console.log("[RETRYING ORIGINAL REQUEST]");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("[REFRESH FAILED]", refreshError.response?.data);

        // Clean tokens
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        // Redirect to login
        console.log("[REDIRECTING TO LOGIN]");
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
