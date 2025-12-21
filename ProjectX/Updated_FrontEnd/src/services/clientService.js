import axios from "axios";

const API_BASE = "http://localhost:5001/api/client";

// Helper to get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// ======================= DASHBOARD =======================

// Get client dashboard summary
export const getClientDashboard = async () => {
  try {
    const res = await axios.get(`${API_BASE}/dashboard`, {
      headers: getAuthHeader(),
      withCredentials: true
    });
    return res.data; // { success: true, data: {...} }
  } catch (err) {
    console.error("Error fetching client dashboard:", err);
    throw err;
  }
};

// ======================= OBSERVATIONS =======================

// Get all observations (with optional filters)
export const getAllObservations = async (filters = {}) => {
  try {
    const res = await axios.get(`${API_BASE}/observations`, {
      headers: getAuthHeader(),
      params: filters,
      withCredentials: true
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching observations:", err);
    throw err;
  }
};

// Get single observation by ID
export const getObservationById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/observations/${id}`, {
      headers: getAuthHeader(),
      withCredentials: true
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching observation by ID:", err);
    throw err;
  }
};

// Create a new observation
export const createObservation = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/observations`, data, {
      headers: getAuthHeader(),
      withCredentials: true
    });
    return res.data;
  } catch (err) {
    console.error("Error creating observation:", err);
    throw err;
  }
};

// ======================= REPORTS =======================

// Get reports
export const getReports = async () => {
  try {
    const res = await axios.get(`${API_BASE}/reports`, { headers: getAuthHeader() });
    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch reports:", err);
    throw err;
  }
};

export const downloadReports = async (format = "pdf") => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`http://localhost:5001/api/client/reports/download`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: { format },
    responseType: "blob", 
  });

  return res.data;
};


// ======================= ANALYTICS / GRAPHS =======================

// Get analytics / graphs data
export const getClientGraphs = async () => {
  try {
    const res = await axios.get(`${API_BASE}/analytics`, {
      headers: getAuthHeader(),
      withCredentials: true
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching analytics:", err);
    throw err;
  }
};



