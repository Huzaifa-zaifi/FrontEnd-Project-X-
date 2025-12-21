import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  ChevronRight,
  X,
} from "lucide-react";
import Sidebar from "./Sidebar";

export default function ReportStatusPage() {
  const token = localStorage.getItem("token");

  const [observations, setObservations] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [previewImg, setPreviewImg] = useState(null); // <-- for modal

  useEffect(() => {
    fetchObservations();
  }, []);

  const fetchObservations = async () => {
    const res = await fetch("http://localhost:5001/api/observations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setObservations(data);
    setLoading(false);
  };

  const getStatusUI = (status) => {
    switch (status) {
      case "Submitted":
        return { label: "Pending", color: "bg-yellow-100 text-yellow-700" };
      case "Reviewed":
        return { label: "In Review", color: "bg-blue-100 text-blue-700" };
      case "Assigned":
        return { label: "Action Assigned", color: "bg-orange-100 text-orange-700" };
      case "Closed":
        return { label: "Closed", color: "bg-green-100 text-green-700" };
      default:
        return { label: status, color: "bg-gray-100 text-gray-700" };
    }
  };

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    const days = Math.floor(diff / 86400);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    const hours = Math.floor(diff / 3600);
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const mins = Math.floor(diff / 60);
    return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  };

  const filtered = observations.filter((o) => {
    const matchesSearch =
      o.description?.toLowerCase().includes(search.toLowerCase()) ||
      o.category?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading reports…</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Report Status</h2>
          <p className="text-gray-500">Track the status of your submitted observations</p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-lg"
              />
            </div>

            <div className="flex items-center gap-3">
              <Filter className="text-gray-500" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-6 py-3 border rounded-lg"
              >
                <option value="All">All Status</option>
                <option value="Submitted">Pending</option>
                <option value="Reviewed">In Review</option>
                <option value="Assigned">Action Assigned</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* REPORT LIST */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No reports found</p>
          ) : (
            filtered.map((obs) => {
              const statusUI = getStatusUI(obs.status);

              return (
                <div
                  key={obs._id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition flex justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      {obs.category} — {obs.type.replace("_", " ")}
                    </h3>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-3 ${statusUI.color}`}
                    >
                      {statusUI.label}
                    </span>

                    <p className="text-gray-600 mb-3">{obs.description}</p>

                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span>Category: {obs.category}</span>
                      <span>•</span>
                      <span>Type: {obs.type.replace("_", " ")}</span>
                      <span>•</span>
                      <span>Submitted {timeAgo(obs.createdAt)}</span>
                    </div>

                    {/* IMAGE THUMBNAIL */}
                    {obs.imageUrl && (
                      <div className="w-28 h-28 mt-3 cursor-pointer">
                        <img
                          src={`${obs.imageUrl}`}
                          alt="Observation"
                          onClick={() => setPreviewImg(`${obs.imageUrl}`)}
                          className="w-full h-full object-cover rounded-lg border hover:scale-105 transition"
                        />
                      </div>
                    )}
                  </div>

                  <ChevronRight className="text-gray-400 mt-2" size={24} />
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* IMAGE MODAL */}
      {previewImg && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setPreviewImg(null)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              <X size={30} />
            </button>
            <img
              src={previewImg}
              alt="Full View"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
