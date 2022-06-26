import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// api endpoints
export const sendPhone = (data) => api.post("/api/send-phone-otp", data);
export const sendEmail = (data) => api.post("/api/send-email-otp", data);
export const sendOTP = (data) => api.post("/api/verify-otp", data);
export const activateUser = (data) => api.post("/api/activate-user", data);
export const logout = () => api.post("/api/logout");
export const createRoom = (data) => api.post("/api/rooms", data);
export const fetchRoom = () => api.get("/api/rooms");
export const fetchCurrentRoom = (id) => api.get(`/api/rooms/${id}`);

// interceptor
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true,
        });
        return api.request(originalRequest);
      } catch (error) {
        console.log(error.message);
      }
    }
    throw error;
  }
);

export default api;
