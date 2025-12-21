import React, { useEffect, useState } from "react";
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import ClientSidebar from "./ClientSidebar";
import { getClientDashboard, downloadReports } from "../../services/clientService";

function StatCard({ title, value, icon, color }) {
  const colors = {
    red: "border-red-500",
    green: "border-green-500",
    orange: "border-orange-400",
    yellow: "border-yellow-400",
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-md border-l-4 ${colors[color]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500">
          {React.cloneElement(icon, { size: 24 })}
        </div>
      </div>
    </div>
  );
}

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    totalObservations: 0,
    pendingObservations: 0,
    approvedObservations: 0,
    rejectedObservations: 0,
    recentObservations: [],
    graphData: { monthly: [] },
    reports: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getClientDashboard(); // <-- new API call
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err.response || err);
      }
    };

    fetchDashboard();
  }, []);

  const handleDownload = async (format) => {
    try {
      const blob = await downloadReports(format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = format === "excel" ? "observations.xlsx" : "observations.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(`Failed to download ${format} report:`, err.response || err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Client Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Observations"
            value={stats.totalObservations}
            icon={<FileText />}
            color="red"
          />
          <StatCard
            title="Pending"
            value={stats.pendingObservations}
            icon={<AlertTriangle />}
            color="orange"
          />
          <StatCard
            title="Approved"
            value={stats.approvedObservations}
            icon={<TrendingUp />}
            color="yellow"
          />
          <StatCard
            title="Rejected"
            value={stats.rejectedObservations}
            icon={<CheckCircle />}
            color="green"
          />
        </div>

        {/* Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <BarChart3 /> Weekly Report
            </h3>
            <p>{stats.reports.weekly || 0} Observations this week</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <BarChart3 /> Monthly Report
            </h3>
            <p>{stats.reports.monthly || 0} Observations this month</p>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="mt-10 flex gap-4">
          <button
            onClick={() => handleDownload("excel")}
            className="px-6 py-3 bg-green-500 text-white rounded-xl"
          >
            Download Excel
          </button>
          <button
            onClick={() => handleDownload("pdf")}
            className="px-6 py-3 bg-red-500 text-white rounded-xl"
          >
            Download PDF
          </button>
        </div>
      </main>
    </div>
  );
}
