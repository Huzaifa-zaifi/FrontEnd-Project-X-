import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/admin", // Adjust if your backend runs on a different URL
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ========= USERS =========
export const getAllUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.patch(`/users/${id}`, data);
export const changeUserStatus = (id, status) =>
  API.patch(`/users/${id}/status`, { status });
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const getAllEmployees = () => API.get("/employees");

// ========= OBSERVATIONS =========
export const getAllObservations = () => API.get("/observations");
export const updateObservationStatus = (id, status) =>
  API.patch(`/observations/${id}/status`, { status });
export const assignObservation = (id, userId) =>
  API.patch(`/observations/${id}/assign`, { userId });
export const deleteObservation = (id) => API.delete(`/observations/${id}`);

// ========= REPORTS =========
export const getAllReports = () => API.get("/reports");
export const updateReportStatus = (id, status, remarks) =>
  API.patch(`/reports/${id}/status`, { status, remarks });
export const deleteReport = (id) => API.delete(`/reports/${id}`);

// ========= STATS =========
export const getAdminStats = () => API.get("/stats");


