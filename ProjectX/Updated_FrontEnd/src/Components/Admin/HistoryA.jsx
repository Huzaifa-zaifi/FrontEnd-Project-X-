import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  History,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Search,
  ChevronDown,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

/* =======================
   History Entry Component
======================= */
function HistoryEntry({ entry }) {
  const statusColors = {
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    resolved: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const statusIcon = {
    approved: <CheckCircle size={16} />,
    rejected: <AlertTriangle size={16} />,
    pending: <Clock size={16} />,
    resolved: <CheckCircle size={16} />,
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="font-semibold text-gray-900">{entry.action}</div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${statusColors[entry.status]}`}
            >
              {statusIcon[entry.status]}
              {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{entry.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User size={14} />
              {entry.user}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {entry.time}
            </div>
            <div>Observation #{entry.id}</div>
          </div>
        </div>
        <div className="text-right text-sm text-gray-500">{entry.date}</div>
      </div>
    </div>
  );
}

/* =======================
   Action History Page
======================= */
export default function ActionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchHistoryData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5001/api/admin/action-history",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            search: searchTerm,
            status: filterStatus === "all" ? undefined : filterStatus,
          },
        }
      );
      setHistoryData(res.data);
    } catch (err) {
      console.error("Error fetching action history:", err);
      alert("Failed to load action history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, [searchTerm, filterStatus]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <History className="text-red-600" size={36} />
            Action History
          </h2>
          <p className="text-gray-600 mt-2">
            Complete audit trail of all approval, resolution, and workflow actions
          </p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by action, user, ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        {/* HISTORY LIST */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : historyData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No actions found matching your filters.
            </div>
          ) : (
            historyData.map((entry, index) => <HistoryEntry key={index} entry={entry} />)
          )}
        </div>
      </main>
    </div>
  );
}
