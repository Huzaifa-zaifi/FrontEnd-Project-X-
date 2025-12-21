import React, { useEffect, useState } from "react";
import ClientSidebar from "./ClientSidebar";
import { FileText, AlertTriangle, CheckCircle, TrendingUp, Users, Award } from "lucide-react";
import { getClientGraphs } from "../../services/clientService.js";
import StatCard from "../Startcard.jsx"; // assuming you have a reusable StatCard
import PremiumLineChart from "../../charts/PremiumLineChart.jsx";
import PremiumDonutChart from "../../charts/PremiumDonutChart.jsx";
import PremiumBarChart from "../../charts/PremiumBarChart.jsx";

export default function ClientGraphsInsights() {
  const [graphsData, setGraphsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGraphs = async () => {
      try {
        setLoading(true);
        const data = await getClientGraphs();
        setGraphsData(data);
      } catch (err) {
        console.error("Error fetching client graphs:", err);
        setError("Failed to fetch graph data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGraphs();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading client graphs...</p>;
  if (error) return <p className="text-center mt-10 text-xl text-red-500">{error}</p>;

  const {
    trendData,
    riskData,
    categoryData,
    totalObservations,
    openItems,
    closedItems,
    resolutionRate,
    activeUsers,
    safetyScore,
    totalTrend,
    openTrend,
    closedTrend,
    resolutionTrend,
    userTrend,
    safetyTrend,
  } = graphsData;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Graphs & Site Safety Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time visual analytics showcasing your outstanding safety performance and continuous improvement
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          <StatCard title="Total Observations" value={totalObservations} icon={<FileText />} color="red" trend={totalTrend} />
          <StatCard title="Open Items" value={openItems} icon={<AlertTriangle />} color="orange" trend={openTrend} />
          <StatCard title="Closed Items" value={closedItems} icon={<CheckCircle />} color="green" trend={closedTrend} />
          <StatCard title="Resolution Rate" value={resolutionRate} icon={<TrendingUp />} color="yellow" trend={resolutionTrend} />
          <StatCard title="Active Users" value={activeUsers} icon={<Users />} color="blue" trend={userTrend} />
          <StatCard title="Safety Score" value={safetyScore} icon={<Award />} color="purple" trend={safetyTrend} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <PremiumLineChart data={trendData} title="Observation Trend – 2025 (YTD)" />
          <PremiumDonutChart data={riskData} title="Current Risk Level Distribution" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <PremiumBarChart data={categoryData} title="Top Risk Categories (2025)" />
        </div>
      </main>
    </div>
  );
}
