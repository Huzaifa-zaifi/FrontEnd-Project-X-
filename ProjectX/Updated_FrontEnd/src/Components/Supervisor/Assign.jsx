import React, { useEffect, useState } from "react";
import {
  User,
  Clock,
  Calendar,
  AlertCircle,
  Image as ImageIcon,
  UserPlus,
  CalendarDays,
  Search,
} from "lucide-react";
import SupervisorSidebar from "./SupervisorSidebar";
import axios from "axios";

const API_URL = "http://localhost:5001/api/supervisor";

export default function AssignCorrectiveActions() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assignees, setAssignees] = useState([
    "Mark Johnson - Maintenance Lead",
    "Sarah Williams - Warehouse Supervisor",
    "David Chen - Safety Officer",
    "Emma Davis - Housekeeping Team"
  ]);

  useEffect(() => {
    const fetchApprovedObservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/observations/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data) ? res.data : [];
        const approved = data.filter(obs => obs.status === "Closed" || obs.status === "Approved");
        setObservations(approved);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch approved observations.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedObservations();
  }, []);

  const handleAssign = (obsId) => {
    const obs = observations.find(o => o._id === obsId);
    const assignee = prompt("Enter assignee name:", assignees[0]);
    const dueDate = prompt("Enter due date (YYYY-MM-DD):", new Date().toISOString().split("T")[0]);
    const correctiveAction = prompt("Enter corrective action description:", "");

    if (!assignee || !dueDate || !correctiveAction) return;

    // Here you can call backend API to save the corrective action
    console.log("Submitting corrective action", { obsId, assignee, dueDate, correctiveAction });
    alert(`Corrective action assigned to ${assignee} for observation "${obs.description}"`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SupervisorSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Assign Corrective Actions</h2>
            <p className="text-gray-600 mt-1">
              Assign responsible personnel and due dates for approved safety observations
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search observations..."
              className="pl-12 pr-6 py-3.5 w-80 rounded-xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
            />
          </div>
        </div>

        {loading ? (
          <p>Loading observations...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : observations.length === 0 ? (
          <p className="text-gray-500">No approved observations found.</p>
        ) : (
          <div className="space-y-8">
            {observations.map((obs, index) => (
              <div
                key={obs._id}
                style={{ animationDelay: `${index * 120}ms` }}
                className="bg-white rounded-3xl border border-red-100 shadow-xl overflow-hidden animate-slide-up transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* IMAGE */}
                  {obs.imageUrl && (
                    <div className="lg:w-96 p-6 border-r border-red-100 bg-red-50 flex items-center justify-center">
                      <img
                        src={obs.imageUrl}
                        alt="Observation"
                        className="h-64 w-full object-cover rounded-2xl border-2 border-dashed border-red-200"
                      />
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className={`flex-1 p-8 ${!obs.imageUrl ? "lg:px-16" : ""}`}>
                    <div className="flex justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-2xl font-extrabold text-gray-900">
                          {obs.title || obs.description || "Observation"}
                        </h3>
                        <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={16} /> {obs.employee?.name || "Unknown"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={16} /> {obs.createdAt ? new Date(obs.createdAt).toLocaleDateString() : "-"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={16} /> {obs.category || "-"}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 bg-green-100 text-green-700">
                          <AlertCircle size={16} /> Approved
                        </span>
                        <p className="text-sm text-green-600 font-medium mt-2">
                          Approved: {obs.approvedAt ? new Date(obs.approvedAt).toLocaleDateString() : "Not Recorded"}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-lg mb-8">
                      {obs.description || "No description provided."}
                    </p>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleAssign(obs._id)}
                        className="relative overflow-hidden group rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-10 py-5 text-white text-lg font-bold shadow-xl transition-all hover:scale-[1.03]"
                      >
                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                        <span className="relative flex items-center gap-3">
                          Assign Corrective Action
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.7s ease-out forwards; }
      `}</style>
    </div>
  );
}
