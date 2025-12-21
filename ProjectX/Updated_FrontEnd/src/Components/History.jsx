import React, { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import Sidebar from "./Sidebar";

export default function HistoryPage() {
  const token = localStorage.getItem("token");

  const [observations, setObservations] = useState([]);
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await fetch("http://localhost:5001/api/observations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    // only CLOSED
    setObservations(data.filter(o => o.status === "Closed"));
  };

  /* ================= HELPERS ================= */

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 1) return "today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  const isWithinRange = (date) => {
    if (timeFilter === "All") return true;

    const now = new Date();
    const created = new Date(date);

    const diffDays =
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

    if (timeFilter === "30") return diffDays <= 30;
    if (timeFilter === "180") return diffDays <= 180;
    if (timeFilter === "365") return diffDays <= 365;

    return true;
  };

  /* ================= FILTER ================= */

  const filtered = observations.filter((o) => {
    const matchesSearch =
      o.description.toLowerCase().includes(search.toLowerCase()) ||
      o.category.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && isWithinRange(o.createdAt);
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">History</h2>
          <p className="text-gray-500">
            View all your previously closed reports
          </p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">

            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search closed reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-lg"
              />
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-gray-500" size={20} />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-6 py-3 border rounded-lg"
              >
                <option value="All">All Time</option>
                <option value="30">Last 30 Days</option>
                <option value="180">Last 6 Months</option>
                <option value="365">Last Year</option>
              </select>
            </div>

          </div>
        </div>

        {/* HISTORY LIST */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">
              No closed reports found
            </p>
          ) : (
            filtered.map((obs) => (
              <div
                key={obs._id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition flex justify-between border-l-4 border-red-500"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3 text-red-600">
                    {obs.category} — {obs.type.replace("_", " ")}
                  </h3>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                      <CheckCircle className="w-4 h-4" />
                      Closed
                    </span>
                    <span className="text-sm text-gray-600 font-medium">
                      Closed {timeAgo(obs.updatedAt)}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">
                    {obs.description}
                  </p>

                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Category:</span>{" "}
                    {obs.category}
                    <span className="mx-3">•</span>
                    <span className="font-medium">Type:</span>{" "}
                    {obs.type.replace("_", " ")}
                    <span className="mx-3">•</span>
                    <span className="font-medium">Submitted</span>{" "}
                    {timeAgo(obs.createdAt)}
                  </div>
                </div>

                <ChevronRight className="text-red-500 mt-2" size={24} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
