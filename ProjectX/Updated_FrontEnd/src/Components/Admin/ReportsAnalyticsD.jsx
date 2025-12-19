import React, { useState } from "react";
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  Users,
  History,
  LogOut,
  UserCog,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  Calendar,
  PieChart as PieIcon,
  BarChart4,
  ChevronDown,
} from "lucide-react";

/* =======================
   Sidebar Item
======================= */
function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
        active
          ? "bg-white text-black font-medium shadow-sm"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {React.cloneElement(icon, { size: 20 })}
      <span>{label}</span>
    </div>
  );
}

/* =======================
   KPI Card
======================= */
function KPIStat({ title, value, change, icon, color }) {
  const isPositive = change.startsWith("+");
  const borderColor = color === "red" ? "border-red-600" : "border-green-600";
  const bgColor = color === "red" ? "bg-red-50" : "bg-green-50";
  const iconBg = color === "red" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg border-l-8 ${borderColor} ${bgColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 font-medium">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-3">{value}</p>
          <p className={`mt-3 text-sm font-semibold ${isPositive ? "text-green-700" : "text-red-700"}`}>
            {change} from last year
          </p>
        </div>
        <div className={`p-4 rounded-xl ${iconBg}`}>
          {React.cloneElement(icon, { size: 32 })}
        </div>
      </div>
    </div>
  );
}

/* =======================
   Period Selector with Dropdown
======================= */
function PeriodSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Last 12 Months");

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
        className="px-6 py-3 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-3 text-gray-700 font-medium"
      >
        <Calendar size={20} />
        {selected}
        <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
                // Here you would normally filter data based on selection
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
   MAIN DASHBOARD
======================= */
export default function ReportsAnalyticsDashboard() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const observationsTrend = months.map((month, i) => ({
    month,
    observations: [118, 131, 138, 142, 160, 155, 169, 171, 192, 201, 195, 216][i],
    resolved: [115, 125, 133, 138, 157, 151, 163, 165, 186, 194, 190, 208][i],
  }));

  const riskDistribution = [
    { name: "High Risk", value: 115, fill: "#dc2626" },
    { name: "Medium Risk", value: 120, fill: "#ea580c" },
    { name: "Low Risk", value: 53, fill: "#16a34a" },
  ];

  const topRiskData = [
    { name: "Electrical", count: 85, percent: 29 },
    { name: "Housekeeping", count: 62, percent: 21 },
    { name: "PPE Compliance", count: 58, percent: 20 },
    { name: "Ergonomics", count: 45, percent: 15 },
    { name: "Machine Guarding", count: 38, percent: 13 },
    { name: "Chemical Handling", count: 18, percent: 6 },
  ];

  const riskBreakdownData = [
    { name: "Electrical", high: 50, medium: 25, low: 10 },
    { name: "Housekeeping", high: 20, medium: 30, low: 12 },
    { name: "PPE Compliance", high: 15, medium: 35, low: 8 },
    { name: "Ergonomics", high: 5, medium: 20, low: 20 },
    { name: "Machine Guarding", high: 25, medium: 10, low: 3 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold text-red-600">REDVION</h1>
            <p className="text-sm text-gray-400">Admin Portal</p>
          </div>
          <nav className="px-4 py-4 space-y-1">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<Eye />} label="All Observations" />
            <SidebarItem icon={<UserCheck />} label="Approval Workflow" />
            <SidebarItem icon={<Users />} label="User Management" />
            <SidebarItem icon={<UserCog />} label="Roles & Permissions" />
            <SidebarItem icon={<FileSpreadsheet />} label="Categories & Risks" />
            <SidebarItem icon={<BarChart3 />} label="Reports & Analytics" active />
            <SidebarItem icon={<History />} label="Action History" />
          </nav>
        </div>
        <div className="p-6 border-t border-gray-800">
          <div className="mb-4">
            <p className="font-medium">Admin</p>
            <p className="text-sm text-gray-400">Safety Director</p>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
            <p className="text-gray-600 mt-1">
              Comprehensive insights into workplace safety performance
            </p>
          </div>
          <PeriodSelector />
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPIStat title="Total Observations" value="2,177" change="+24%" icon={<Eye />} color="red" />
          <KPIStat title="Resolved Actions" value="2,117" change="+28%" icon={<CheckCircle />} color="green" />
          <KPIStat title="High Risk Items" value="115" change="-8%" icon={<AlertTriangle />} color="red" />
          <KPIStat title="Safety Score" value="95%" change="+6%" icon={<Activity />} color="green" />
        </div>

        {/* UPPER CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="text-red-600" size={24} />
              Observations Trend (Last 12 Months)
            </h3>
            <SimpleLineChart data={observationsTrend} />
          </div>

          {/* Donut */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <PieIcon className="text-red-600" size={24} />
              Risk Level Distribution
            </h3>
            <div className="flex justify-center">
              <SimpleDonutChart data={riskDistribution} size={360} />
            </div>
          </div>
        </div>

        {/* LOWER CARDS - PERFECT ONES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Risk Categories – Horizontal Bars */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="px-7 py-5 border-b border-gray-100 flex items-center gap-3">
              <BarChart4 className="text-red-600" size={22} />
              <h3 className="text-lg font-semibold text-gray-900">Top Risk Categories</h3>
            </div>
            <div className="p-7">
              <div className="space-y-6">
                {topRiskData.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-40 text-sm font-medium text-gray-700 truncate">{item.name}</div>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.percent}%`, animationDelay: `${i * 100}ms` }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-semibold text-gray-900">{item.count}</div>
                    <div className="w-12 text-right text-sm text-gray-500">{item.percent}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Breakdown by Category – Stacked Bars */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="px-7 py-5 border-b border-gray-100 flex items-center gap-3">
              <AlertTriangle className="text-red-600" size={22} />
              <h3 className="text-lg font-semibold text-gray-900">Risk Breakdown by Category</h3>
            </div>
            <div className="p-7">
              <div className="grid grid-cols-5 gap-6 items-end min-h-[300px]">
                {riskBreakdownData.map((cat, i) => {
                  const total = cat.high + cat.medium + cat.low;
                  return (
                    <div key={i} className="flex flex-col items-center h-full justify-end">
                      <div className="w-full flex flex-col justify-end gap-1 flex-1">
                        {cat.high > 0 && (
                          <div
                            className="w-full bg-red-600 text-white text-xs font-medium flex items-center justify-center rounded-t-sm"
                            style={{ height: `${(cat.high / total) * 100}%`, minHeight: "20px" }}
                          >
                            {cat.high}
                          </div>
                        )}
                        {cat.medium > 0 && (
                          <div
                            className="w-full bg-orange-500 text-white text-xs font-medium flex items-center justify-center"
                            style={{ height: `${(cat.medium / total) * 100}%`, minHeight: "20px" }}
                          >
                            {cat.medium}
                          </div>
                        )}
                        {cat.low > 0 && (
                          <div
                            className="w-full bg-green-600 text-white text-xs font-medium flex items-center justify-center rounded-b-sm"
                            style={{ height: `${(cat.low / total) * 100}%`, minHeight: "20px" }}
                          >
                            {cat.low}
                          </div>
                        )}
                      </div>
                      <div className="mt-4 text-xs font-medium text-gray-700 text-center leading-tight max-w-20">
                        {cat.name.split(" ").map((word, idx) => (
                          <div key={idx}>{word}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-8 mt-10 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded" />
                  High Risk
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded" />
                  Medium Risk
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-600 rounded" />
                  Low Risk
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =======================
   Line Chart
======================= */
function SimpleLineChart({ data }) {
  const width = 800;
  const height = 400;
  const padding = { top: 40, right: 80, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.flatMap(d => [d.observations, d.resolved])) * 1.1;

  const xScale = i => padding.left + (i / (data.length - 1)) * chartWidth;
  const yScale = v => padding.top + chartHeight - (v / maxValue) * chartHeight;

  const obsPoints = data.map((d, i) => `${xScale(i)},${yScale(d.observations)}`).join(" ");
  const resPoints = data.map((d, i) => `${xScale(i)},${yScale(d.resolved)}`).join(" ");

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="gradObs" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gradRes" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {[0, 50, 100, 150, 200, 250].map(v => (
        <g key={v}>
          <line x1={padding.left} y1={yScale(v)} x2={width - padding.right} y2={yScale(v)} stroke="#e5e7eb" strokeDasharray="4,4" />
          <text x={padding.left - 10} y={yScale(v) + 4} textAnchor="end" className="text-xs fill-gray-500">{v}</text>
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
        <text key={i} x={xScale(i)} y={height - 20} textAnchor="middle" className="text-sm fill-gray-700">
          {d.month}
        </text>
      ))}

      {/* Legend */}
      <g transform={`translate(${width - 200}, 20)`}>
        <rect x="0" y="0" width="12" height="12" fill="#dc2626" rx="2" />
        <text x="20" y="10" className="text-sm fill-gray-700">Observations</text>
        <rect x="0" y="30" width="12" height="12" fill="#16a34a" rx="2" />
        <text x="20" y="40" className="text-sm fill-gray-700">Resolved</text>
      </g>
    </svg>
  );
}

/* =======================
   Donut Chart
======================= */
function SimpleDonutChart({ data, size = 360 }) {
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
            <text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle" className="text-lg font-semibold fill-white">
              {Math.round((entry.value / total) * 100)}%
            </text>
          </g>
        );
      })}

      <circle cx={center} cy={center} r={innerRadius} fill="white" />

      <g transform={`translate(${size - 120}, ${size / 2 - 45})`}>
        {data.map((entry, i) => (
          <g key={i} transform={`translate(0, ${i * 28})`}>
            <rect x="0" y="0" width="14" height="14" fill={entry.fill} rx="3" />
            <text x="22" y="11" className="text-sm fill-gray-700">{entry.name} ({entry.value})</text>
          </g>
        ))}
      </g>
    </svg>
  );
}