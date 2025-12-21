import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Eye,
  CheckCircle,
  AlertTriangle,
  Activity,
  Calendar,
  ChevronDown,
  TrendingUp,
  PieChart as PieIcon,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

/* =======================
   Period Selector
======================= */
function PeriodSelector({ selectedPeriod, setSelectedPeriod }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    "Last 12 Months",
    "Last 6 Months",
    "Last Quarter",
    "Year to Date",
    "Custom Range",
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-3 text-gray-700 font-semibold"
      >
        <Calendar size={20} className="text-gray-500" />
        {selectedPeriod}
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedPeriod(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition text-gray-700 font-medium"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =======================
   KPI Stat Card
======================= */
function KPIStat({ title, value, change, icon, color }) {
  const isPositive = change.startsWith("+");
  const borderColor = color === "red" ? "border-red-600" : "border-green-600";
  const bgColor = color === "red" ? "bg-red-50" : "bg-green-50";
  const iconBg =
    color === "red" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600";

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-md border-l-8 ${borderColor} ${bgColor} hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 font-medium uppercase text-sm tracking-wide">{title}</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">{value}</p>
          <p
            className={`mt-2 text-sm font-semibold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change} from last period
          </p>
        </div>
        <div className={`p-4 rounded-xl ${iconBg} shadow`}>
          {React.cloneElement(icon, { size: 28 })}
        </div>
      </div>
    </div>
  );
}

/* =======================
   Line Chart
======================= */
function LineChart({ data }) {
  if (!data.length) return null;
  const width = 800;
  const height = 400;
  const padding = { top: 40, right: 80, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.flatMap((d) => [d.observations, d.resolved])) * 1.1;

  const xScale = (i) => padding.left + (i / (data.length - 1)) * chartWidth;
  const yScale = (v) => padding.top + chartHeight - (v / maxValue) * chartHeight;

  const obsPoints = data.map((d, i) => `${xScale(i)},${yScale(d.observations)}`).join(" ");
  const resPoints = data.map((d, i) => `${xScale(i)},${yScale(d.resolved)}`).join(" ");

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="gradObs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gradRes" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86efac" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid Lines */}
      {[0, 50, 100, 150, 200, 250].map((v) => (
        <g key={v}>
          <line
            x1={padding.left}
            y1={yScale(v)}
            x2={width - padding.right}
            y2={yScale(v)}
            stroke="#e5e7eb"
            strokeDasharray="4,4"
          />
          <text
            x={padding.left - 10}
            y={yScale(v) + 4}
            textAnchor="end"
            className="text-xs fill-gray-400"
          >
            {v}
          </text>
        </g>
      ))}

      {/* Areas */}
      <path d={`M ${padding.left},${yScale(0)} L ${obsPoints} L ${width - padding.right},${yScale(0)} Z`} fill="url(#gradObs)" />
      <path d={`M ${padding.left},${yScale(0)} L ${resPoints} L ${width - padding.right},${yScale(0)} Z`} fill="url(#gradRes)" />

      {/* Lines */}
      <polyline fill="none" stroke="#dc2626" strokeWidth="3" points={obsPoints} />
      <polyline fill="none" stroke="#16a34a" strokeWidth="3" points={resPoints} />

      {/* X Labels */}
      {data.map((d, i) => (
        <text key={i} x={xScale(i)} y={height - 20} textAnchor="middle" className="text-sm fill-gray-600">
          {d.month}
        </text>
      ))}
    </svg>
  );
}

/* =======================
   Donut Chart
======================= */
function DonutChart({ data, size = 360 }) {
  if (!data.length) return null;
  const radius = size / 2 - 50;
  const innerRadius = radius * 0.65;
  const center = size / 2;
  let cumulative = 0;
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <svg width={size} height={size}>
      {data.map((entry, index) => {
        const startAngle = (cumulative / total) * 360;
        cumulative += entry.value;
        const endAngle = (cumulative / total) * 360;
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        const startOuterX = center + radius * Math.cos((startAngle * Math.PI) / 180);
        const startOuterY = center + radius * Math.sin((startAngle * Math.PI) / 180);
        const endOuterX = center + radius * Math.cos((endAngle * Math.PI) / 180);
        const endOuterY = center + radius * Math.sin((endAngle * Math.PI) / 180);
        const startInnerX = center + innerRadius * Math.cos((startAngle * Math.PI) / 180);
        const startInnerY = center + innerRadius * Math.sin((startAngle * Math.PI) / 180);
        const endInnerX = center + innerRadius * Math.cos((endAngle * Math.PI) / 180);
        const endInnerY = center + innerRadius * Math.sin((endAngle * Math.PI) / 180);
        const midAngle = (startAngle + endAngle) / 2;
        const labelRadius = (radius + innerRadius) / 2;
        const labelX = center + labelRadius * Math.cos((midAngle * Math.PI) / 180);
        const labelY = center + labelRadius * Math.sin((midAngle * Math.PI) / 180);

        return (
          <g key={index}>
            <path
              d={`M ${startOuterX},${startOuterY} 
                  A ${radius},${radius} 0 ${largeArc},1 ${endOuterX},${endOuterY} 
                  L ${endInnerX},${endInnerY} 
                  A ${innerRadius},${innerRadius} 0 ${largeArc},0 ${startInnerX},${startInnerY} Z`}
              fill={entry.fill}
            />
            <text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-white">
              {Math.round((entry.value / total) * 100)}%
            </text>
          </g>
        );
      })}
      <circle cx={center} cy={center} r={innerRadius} fill="white" />
    </svg>
  );
}

/* =======================
   Main Dashboard
======================= */
export default function ReportsAnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 12 Months");
  const [kpiStats, setKpiStats] = useState({});
  const [observationsTrend, setObservationsTrend] = useState([]);
  const [riskDistribution, setRiskDistribution] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
          params: { period: selectedPeriod },
        });
        const data = res.data;
        setKpiStats(data.kpiStats);
        setObservationsTrend(data.observationsTrend);
        setRiskDistribution(data.riskDistribution);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        alert("Failed to load dashboard data");
      }
    };
    fetchDashboardData();
  }, [selectedPeriod]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Reports & Analytics</h2>
            <p className="text-gray-500 mt-1">Comprehensive insights into workplace safety performance</p>
          </div>
          <PeriodSelector selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPIStat title="Total Observations" value={kpiStats.totalObservations || 0} change={`+${kpiStats.obsChange || 0}%`} icon={<Eye />} color="red" />
          <KPIStat title="Resolved Actions" value={kpiStats.resolvedActions || 0} change={`+${kpiStats.resolvedChange || 0}%`} icon={<CheckCircle />} color="green" />
          <KPIStat title="High Risk Items" value={kpiStats.highRisk || 0} change={`-${kpiStats.highRiskChange || 0}%`} icon={<AlertTriangle />} color="red" />
          <KPIStat title="Safety Score" value={`${kpiStats.safetyScore || 0}%`} change={`+${kpiStats.safetyScoreChange || 0}%`} icon={<Activity />} color="green" />
        </div>

        {/* Observations Trend Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="text-red-600" size={24} /> Observations Trend
          </h3>
          <LineChart data={observationsTrend} />
        </div>

        {/* Risk Distribution Donut */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <PieIcon className="text-red-600" size={24} /> Risk Level Distribution
          </h3>
          <DonutChart data={riskDistribution} />
        </div>
      </main>
    </div>
  );
}
