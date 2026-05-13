import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const authHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return { Authorization: token };
  } else {
    return {};
  }
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

export const login = (email, password) => {
  return api.post("/login", { email, password });
};

export const getUserProfile = (userId) => {
  return api.get(`/user/${userId}`, { headers: authHeader() });
};

export const updateUserProfile = (userId, data) => {
  return api.put(`/user/${userId}`, data, { headers: authHeader() });
};

export const getUsers = (userId) => {
  return api.get(`/users/${userId}`, { headers: authHeader() });
};

export const createUser = (data) => {
  return api.post("/signup", data, { headers: authHeader() });
};

export const deleteUserById = (userId) => {
  return api.delete(`/user/${userId}`, { headers: authHeader() });
};
