import React, { useEffect, useState } from "react";
import { FileText, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import SupervisorSidebar from "./SupervisorSidebar";
import StatCard from "../Startcard";
import {
  getDashboardStats,
  getSubmittedObservations,
} from "../../services/supervisorService";

export default function SupervisorDashboard() {
  const [stats, setStats] = useState({ submitted: 0, inReview: 0, closed: 0 });
  const [observations, setObservations] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingObs, setLoadingObs] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats({
          submitted: data?.submitted || 0,
          inReview: data?.inReview || 0,
          closed: data?.closed || 0,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err?.response || err);
        setError("Failed to fetch dashboard stats.");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  // Fetch ONLY submitted observations
  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const data = await getSubmittedObservations("Submitted");
        setObservations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch observations:", err?.response || err);
        setError("Failed to fetch submitted observations.");
      } finally {
        setLoadingObs(false);
      }
    };

    fetchObservations();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SupervisorSidebar />

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Supervisor Dashboard
        </h2>

        {/* STATS */}
        {loadingStats ? (
          <p>Loading stats...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="New Observations"
              value={stats.submitted}
              icon={<FileText />}
              color="red"
              delay="100"
            />
            <StatCard
              title="Pending Review"
              value={stats.inReview}
              icon={<Clock />}
              color="yellow"
              delay="200"
            />
            <StatCard
              title="Closed Observations"
              value={stats.closed}
              icon={<CheckCircle />}
              color="green"
              delay="300"
            />
            <StatCard
              title="Actions Assigned"
              value={12}
              icon={<AlertTriangle />}
              color="orange"
              delay="400"
            />
          </div>
        )}

        {/* SUBMITTED OBSERVATIONS PREVIEW */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="font-semibold text-xl mb-4">
            Recently Submitted Observations
          </h3>

          {loadingObs ? (
            <p>Loading observations...</p>
          ) : observations.length === 0 ? (
            <p>No submitted observations found.</p>
          ) : (
            <>
              <div className="space-y-4">
                {observations.slice(0, 4).map((obs) => (
                  <div
                    key={obs._id}
                    className="border-l-4 border-red-500 pl-5 bg-red-50/50 rounded-r-lg p-4"
                  >
                    <p className="font-semibold">
                      {obs.description || "No description"}
                    </p>

                    <p className="text-gray-700 mt-1">
                      Type: {obs.type || "-"} | Category: {obs.category || "-"} | Risk:{" "}
                      {obs.riskLevel || "-"} | Priority: {obs.priority || "-"}
                    </p>

                    <p className="text-sm text-gray-800 mt-1">
                      Submitted by: {obs?.employee?.name || "Unknown"} •{" "}
                      {obs.createdAt
                        ? new Date(obs.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>
                ))}
              </div>

              {/* VIEW MORE BTN */}
              {observations.length > 4 && (
                <div className="text-center mt-5">
                  <button
                    onClick={() =>
                      (window.location.href = "/approve-reject")
                    }
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    View More & Manage
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
