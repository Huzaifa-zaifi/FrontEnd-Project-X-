import React, { useEffect, useState } from "react";
import {
  User,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Search,
} from "lucide-react";
import SupervisorSidebar from "./SupervisorSidebar";
import { getSubmittedObservations, reviewObservation } from "../../services/supervisorService";

export default function ApproveRejectObservations() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedObs, setSelectedObs] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [comment, setComment] = useState("");

  // Fetch all submitted observations
  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const data = await getSubmittedObservations();
        setObservations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch observations:", err.response || err);
        setError("Failed to fetch observations.");
      } finally {
        setLoading(false);
      }
    };
    fetchObservations();
  }, []);

  // Open modal for comment
  const openCommentModal = (obs, action) => {
    setSelectedObs(obs);
    setSelectedAction(action);
    setComment("");
    setModalOpen(true);
  };

  // Handle action submission
  const submitAction = async () => {
    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    try {
      const updatedObs = await reviewObservation(selectedObs._id, selectedAction, comment);
      setObservations(prev =>
        prev.map(obs => (obs._id === selectedObs._id ? { ...obs, ...updatedObs } : obs))
      );
      setModalOpen(false);
      alert(`Observation ${selectedAction} successfully!`);
    } catch (err) {
      console.error("Failed to perform action:", err.response || err);
      alert("Failed to perform this action.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SupervisorSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Approve / Reject Observations</h2>
            <p className="text-gray-600 mt-1">
              Review submitted observations and approve or reject them
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

        {/* OBSERVATIONS LIST */}
        {loading ? (
          <p>Loading observations...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : observations.length === 0 ? (
          <p>No submitted observations found.</p>
        ) : (
          <div className="space-y-8">
            {observations.map((obs, index) => (
              <div
                key={obs._id}
                style={{ animationDelay: `${index * 120}ms` }}
                className="bg-white rounded-3xl border border-red-100 shadow-xl overflow-hidden animate-slide-up transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* IMAGE SECTION */}
                  {obs.imageUrl && (
                    <div className="lg:w-96 p-6 border-r border-red-100 flex items-center justify-center bg-red-50">
                      <img
                        src={obs.imageUrl}
                        alt="Observation"
                        className="h-64 w-full object-cover rounded-2xl border-2 border-dashed border-red-200"
                      />
                    </div>
                  )}

                  {/* CONTENT SECTION */}
                  <div className={`flex-1 p-8 ${!obs.imageUrl ? "lg:px-16" : ""}`}>
                    <div className="flex justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-2xl font-extrabold text-gray-900">{obs.description || "No description"}</h3>
                        <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={16} /> {obs.employee?.name || "Unknown"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={16} /> {obs.createdAt ? new Date(obs.createdAt).toLocaleString() : "-"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={16} /> {obs.category || "-"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 bg-red-100 text-red-600">
                          <AlertCircle size={16} /> {obs.type || "-"}
                        </span>
                        <p className="text-sm text-gray-500 mt-2">
                          {obs.status}
                          {obs.reviewedAt ? ` on ${new Date(obs.reviewedAt).toLocaleString()}` : ""}
                        </p>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    {obs.status === "Submitted" && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        <button
                          onClick={() => openCommentModal(obs, "APPROVE")}
                          className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => openCommentModal(obs, "CLOSE")}
                          className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                        >
                          Close
                        </button>

                        <button
                          onClick={() => openCommentModal(obs, "REJECT")}
                          className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 font-semibold hover:bg-gray-100 transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {/* STATUS DISPLAY */}
                    {obs.status !== "Submitted" && (
                      <div className="mt-4">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold 
                            ${obs.status === "In Review" && "bg-yellow-100 text-yellow-700"}
                            ${obs.status === "Closed" && "bg-green-100 text-green-700"}
                            ${obs.status === "Rejected" && "bg-red-100 text-red-700"}
                          `}
                        >
                          {obs.status}
                        </span>

                        {obs.reviewedAt && (
                          <p className="text-sm text-gray-500 mt-2">
                            Reviewed on {new Date(obs.reviewedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMMENT MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">
                {selectedAction} Observation
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Enter your comment for this action:
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows={4}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={submitAction}
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
