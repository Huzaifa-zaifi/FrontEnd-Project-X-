import React, { useEffect, useState } from "react";
import { Eye, Clock, CheckCircle, AlertTriangle, FileText, User, Building, Calendar } from "lucide-react";
import ClientSidebar from "./ClientSidebar";
import { getAllObservations } from "../../services/clientService";

// Status / Risk Badge Component
function StatusBadge({ label, type }) {
  const statusStyles = {
    Submitted: "bg-yellow-100 text-yellow-700 border-yellow-200",
    "In Review": "bg-orange-100 text-orange-700 border-orange-200",
    Closed: "bg-green-100 text-green-700 border-green-200",
  };

  const riskStyles = {
    Low: "bg-green-100 text-green-700 border-green-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    High: "bg-red-100 text-red-700 border-red-200",
  };

  const icons = {
    Submitted: <Clock size={14} />,
    "In Review": <Clock size={14} />,
    Closed: <CheckCircle size={14} />,
    Low: <CheckCircle size={14} />,
    Medium: <AlertTriangle size={14} />,
    High: <AlertTriangle size={14} />,
  };

  const styles = type === "status" ? statusStyles[label] : riskStyles[label];

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles}`}>
      {icons[label]}
      {label}
    </span>
  );
}

export default function ClientAllObservations() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchObservations = async () => {
    try {
      setLoading(true);
      const data = await getAllObservations();
      setObservations(data);
    } catch (err) {
      console.error("Failed to fetch observations:", err);
      setError(err.response?.data?.message || "Failed to fetch observations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObservations();
  }, []);

  if (loading) return <div className="p-8">Loading observations...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Eye className="text-red-600" size={36} />
            All Safety Observations
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Complete view-only list of all reported safety observations for your sites
          </p>
        </div>

        <div className="space-y-5">
          {observations.map((obs) => (
            <div key={obs._id} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{obs.title || obs.type}</h3>
                    <StatusBadge label={obs.riskLevel} type="risk" />
                    <StatusBadge label={obs.status} type="status" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Observation ID: <strong>{obs._id}</strong>
                  </p>
                  <p className="text-gray-700 mb-4">{obs.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText size={16} />
                      <span>Category: <strong>{obs.category}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building size={16} />
                      <span>Location: <strong>{obs.location}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={16} />
                      <span>Reported by: <strong>{obs.employee?.name || "N/A"}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span>Date: <strong>{new Date(obs.createdAt).toLocaleDateString()}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Photo Evidence */}
                <div className="md:w-48 h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                  {obs.imageUrl ? (
                    <img
                      src={obs.imageUrl}
                      alt="Observation Evidence"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <Eye size={32} />
                      <p className="text-xs mt-2 text-center">Photo evidence (View-only)</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
