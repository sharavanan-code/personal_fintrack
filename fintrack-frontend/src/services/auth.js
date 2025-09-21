// src/services/auth.js
import api from "./api";

export async function register(data) {
  return api.post("/auth/register", data);
}

export async function login(data) {
  return api.post("/auth/login", data);
}

export async function deleteUser() {
  const token = getToken();
  return api.delete("/auth/delete", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}
