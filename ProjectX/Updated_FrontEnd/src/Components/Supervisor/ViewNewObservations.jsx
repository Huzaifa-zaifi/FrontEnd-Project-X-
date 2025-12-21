import React, { useEffect, useState } from "react";
import {
  User,
  Clock,
  Calendar,
  AlertCircle,
  Search,
} from "lucide-react";
import SupervisorSidebar from "./SupervisorSidebar";
import { getSubmittedObservations } from "../../services/supervisorService";

export default function ApprovedObservations() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch ONLY Approved observations
  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const data = await getSubmittedObservations("Approved"); 
        // If backend uses "In Review", change to:
        // const data = await getSubmittedObservations("In Review");

        setObservations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch observations:", err.response || err);
        setError("Failed to fetch approved observations.");
      } finally {
        setLoading(false);
      }
    };

    fetchObservations();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SupervisorSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Approved Observations
            </h2>
            <p className="text-gray-600 mt-1">
              These observations have been approved successfully
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search approved observations..."
              className="pl-12 pr-6 py-3.5 w-80 rounded-xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-green-100 focus:border-green-500 transition"
            />
          </div>
        </div>

        {/* LIST */}
        {loading ? (
          <p>Loading observations...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : observations.length === 0 ? (
          <p>No approved observations found.</p>
        ) : (
          <div className="space-y-8">
            {observations.map((obs, index) => (
              <div
                key={obs._id}
                style={{ animationDelay: `${index * 120}ms` }}
                className="bg-white rounded-3xl border border-green-200 shadow-xl overflow-hidden animate-slide-up hover:shadow-2xl transition"
              >
                <div className="flex flex-col lg:flex-row">

                  {/* IMAGE */}
                  {obs.imageUrl && (
                    <div className="lg:w-96 p-6 border-r border-green-200 flex items-center justify-center bg-green-50">
                      <img
                        src={obs.imageUrl}
                        alt="Observation"
                        className="h-64 w-full object-cover rounded-2xl border-2 border-dashed border-green-300"
                      />
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className={`flex-1 p-8 ${!obs.imageUrl ? "lg:px-16" : ""}`}>
                    <div className="flex justify-between gap-6 mb-6">

                      <div>
                        <h3 className="text-2xl font-extrabold text-gray-900">
                          {obs.description || "No description"}
                        </h3>

                        <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={16} /> {obs.employee?.name || "Unknown"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {obs.createdAt
                              ? new Date(obs.createdAt).toLocaleString()
                              : "-"}
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

                        {obs.reviewedAt && (
                          <p className="text-sm text-gray-500 mt-2">
                            Approved on{" "}
                            {new Date(obs.reviewedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
