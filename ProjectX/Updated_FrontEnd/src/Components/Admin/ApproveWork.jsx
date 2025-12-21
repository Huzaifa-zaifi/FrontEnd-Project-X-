import React, { useEffect, useState } from "react";
import {
  Clock,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Image as ImageIcon,
  AlertCircle,
  Search,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

export default function ApprovalWorkflowDashboard() {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch pending approvals
  const fetchPendingApprovals = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5001/api/admin/observations/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingApprovals(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error fetching approvals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  // Approve observation
  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:5001/api/admin/observations/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPendingApprovals(); // refresh list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to approve");
    }
  };

  // Reject observation
  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5001/api/admin/observations/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPendingApprovals(); // refresh list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to reject");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Approval Workflow
            </h2>
            <p className="text-gray-600 mt-1">
              Review and approve or reject submitted safety observations
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search pending approvals..."
              className="pl-12 pr-6 py-3 w-80 rounded-xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
            />
          </div>
        </div>

        {loading && <p>Loading pending approvals...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-8">
          {pendingApprovals.map((obs, index) => (
            <div
              key={obs._id}
              className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden animate-slide-up transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="flex flex-col lg:flex-row">
                {/* IMAGE SECTION */}
                <div className="lg:w-96 bg-gradient-to-br from-red-50/30 to-white p-8 border-r border-gray-200">
                  <div className="h-80 rounded-3xl bg-white border-4 border-dashed border-red-200 flex flex-col items-center justify-center text-red-400 shadow-inner">
                    <ImageIcon size={60} className="mb-4" />
                    <span className="text-xl font-bold">Photo Attached</span>
                    <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center gap-2 shadow-lg">
                      View Full Image
                    </button>
                  </div>
                </div>

                {/* CONTENT SECTION */}
                <div className="flex-1 p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-extrabold text-gray-900 mb-3">{obs.title}</h3>
                      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <Clock size={18} /> {new Date(obs.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar size={18} /> {obs.category}
                        </span>
                      </div>
                    </div>
                    <span className="px-6 py-3 rounded-full text-base font-bold flex items-center gap-3 bg-orange-100 text-orange-800 shadow-md">
                      <AlertCircle size={20} />
                      Pending Review
                    </span>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-10">{obs.description}</p>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <button
                      onClick={() => handleApprove(obs._id)}
                      className="relative overflow-hidden flex-1 group rounded-2xl bg-gradient-to-r from-green-600 to-green-700 px-10 py-6 text-white text-xl font-bold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl"
                    >
                      <span className="relative flex items-center justify-center gap-4">
                        <ThumbsUp size={32} />
                        Approve & Proceed to Action
                      </span>
                    </button>

                    <button
                      onClick={() => handleReject(obs._id)}
                      className="relative overflow-hidden flex-1 group rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-10 py-6 text-white text-xl font-bold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl"
                    >
                      <span className="relative flex items-center justify-center gap-4">
                        <ThumbsDown size={32} />
                        Reject Observation
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
