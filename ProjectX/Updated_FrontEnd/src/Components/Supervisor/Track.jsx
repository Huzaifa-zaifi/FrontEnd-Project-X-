import React, { useEffect, useState } from "react";
import SupervisorSidebar from "./SupervisorSidebar";
import { User, Calendar, Clock } from "lucide-react";
import {
  getAllObservationsForTracking,
  getAllEmployees,
  updateObservation,
} from "../../services/supervisorService";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const STATUS_COLORS = {
  Submitted: "#f97316",
  "In Review": "#facc15",
  Approved: "#22c55e",
  Closed: "#14b8a6",
  Rejected: "#ef4444",
};

export default function TrackProgressProfessional() {
  const [observations, setObservations] = useState([]);
  const [summary, setSummary] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedObs, setSelectedObs] = useState(null);
  const [formData, setFormData] = useState({ comment: "", assignedTo: "" });

  // Fetch observations & summary
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllObservationsForTracking();
        setObservations(data.observations || []);
        setSummary(
          (data.summary || []).map((s) => ({
            name: s._id,
            value: s.count,
            color: STATUS_COLORS[s._id] || "#ccc",
          }))
        );

        const emp = await getAllEmployees();
        setEmployees(emp);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredObservations = filterStatus
    ? observations.filter((o) => o.status === filterStatus)
    : observations;

  // Open update modal
  const handleOpenModal = (obs) => {
    setSelectedObs(obs);
    setFormData({ comment: obs.supervisorComment || "", assignedTo: obs.assignedTo?._id || "" });
    setModalOpen(true);
  };

  // Update observation
  const handleUpdate = async () => {
    if (!selectedObs) return;
    try {
      const payload = {
        comment: formData.comment,
        assignedTo: formData.assignedTo,
      };
      const updatedObs = await updateObservation(selectedObs._id, payload);

      // Update state
      setObservations((prev) =>
        prev.map((o) => (o._id === updatedObs._id ? updatedObs : o))
      );
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to update observation:", err);
      alert("Failed to update observation");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SupervisorSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Track Progress of Actions
        </h1>

        {/* STATUS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
          {summary.map((s) => (
            <div
              key={s.name}
              className="bg-white p-5 rounded-2xl shadow-lg flex flex-col items-center cursor-pointer hover:scale-105 transition"
              onClick={() =>
                setFilterStatus(filterStatus === s.name ? null : s.name)
              }
            >
              <div className="text-4xl font-bold" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="mt-2 text-gray-600 font-medium">{s.name}</div>
            </div>
          ))}
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
          <h2 className="text-xl font-bold mb-4">Observation Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={summary}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                label
              >
                {summary.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* OBSERVATION CARDS */}
        {loading ? (
          <p>Loading observations...</p>
        ) : filteredObservations.length === 0 ? (
          <p className="text-gray-500">No observations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredObservations.map((obs) => (
              <div key={obs._id} className="bg-white rounded-3xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{obs.description || "Observation"}</h3>
                    <div className="flex gap-2 mt-2 flex-wrap text-sm text-gray-500">
                      <span className="flex items-center gap-1"><User size={14} /> {obs.employee?.name}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {new Date(obs.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {obs.category}</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: STATUS_COLORS[obs.status] || "#ccc" }}>
                    {obs.status}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="font-medium text-gray-700">Assigned To:</span>
                  <span className="text-gray-900">{obs.assignedTo?.name || "Unassigned"}</span>
                </div>

                <button
                  onClick={() => handleOpenModal(obs)}
                  className="self-end px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg hover:scale-105 transition"
                >
                  Follow Up / Update
                </button>
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96">
              <h2 className="text-xl font-bold mb-4">Update Observation</h2>
              <label className="block mb-2 font-medium">Comment</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block mb-2 font-medium">Assign To</label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>{emp.name}</option>
                ))}
              </select>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
