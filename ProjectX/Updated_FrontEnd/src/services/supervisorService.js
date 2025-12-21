import axios from "axios";

const API_URL = "http://localhost:5001/api/supervisor";

// Always get latest token
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: token ? `Bearer ${token}` : "" } };
};


/**
 * 1️⃣ Dashboard Stats
 */
export const getDashboardStats = async () => {
  const res = await axios.get(`${API_URL}/dashboard`, getAuthConfig());
  return res.data;
};

/**
 * 2️⃣ Get Submitted / All Observations (Supervisor List)
 * Supports ?status=Submitted etc
 */
export const getSubmittedObservations = async (status) => {
  const url = status
    ? `${API_URL}/observations/submitted?status=${status}`
    : `${API_URL}/observations/submitted`;

  const res = await axios.get(url, getAuthConfig());
  return res.data;
};

/**
 * 3️⃣ Review Observation (Supervisor Actions)
 * action = "IN_REVIEW" | "APPROVE" | "REJECT" | "CLOSE"
 */
export const reviewObservation = async (id, action, comment) => {
  const res = await axios.patch(
    `${API_URL}/observations/${id}/review`,
    { action, comment },
    getAuthConfig()
  );
  return res.data;
};

/**
 * 4️⃣ Analytics
 */
export const getAnalytics = async () => {
  const res = await axios.get(`${API_URL}/analytics`, getAuthConfig());
  return res.data;
};

/**
 * 5️⃣ All Observations Tracking
 */
export const getAllObservationsForTracking = async () => {
  const res = await axios.get(`${API_URL}/observations/all`, getAuthConfig());
  return res.data; // { observations, summary }
};

/**
 * 6️⃣ Get All Employees
 */
export const getAllEmployees = async () => {
  const res = await axios.get(`${API_URL}/employees/all`, getAuthConfig());
  return res.data;
};

/**
 * 7️⃣ Supervisor Update (Assign / Comment / Due Date)
 * payload = { comment?, assignedTo?, dueDate? }
 */
export const updateObservation = async (id, payload) => {
  const res = await axios.patch(
    `${API_URL}/observations/${id}/update`,
    payload,
    getAuthConfig()
  );
  return res.data;
};
