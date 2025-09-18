// src/services/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || ""; // empty uses proxy

const api = axios.create({ baseURL });

// attach token if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
