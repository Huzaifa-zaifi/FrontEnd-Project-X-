import React from "react";
import {
  LayoutDashboard,
  Eye,
  CheckCircle,
  AlertTriangle,
  FileText,
  BarChart3,
  History,
  Download,
  TrendingUp,
  ChevronRight,
  Shield,
  Calendar,
  ArrowUpRight,
  Award,
  Target,
  Zap,
  Sparkles,
} from "lucide-react";

/* =======================
   Reusable Components – Compact Luxury Design
======================= */
function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`group flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-all duration-500 hover:translate-x-3 ${
        active
          ? "bg-gradient-to-r from-white to-gray-100 text-gray-900 font-semibold shadow-lg"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <div className={`p-3 rounded-lg transition-all duration-500 ${active ? "bg-red-600 text-white shadow-md" : "bg-white/10 group-hover:bg-white/20"}`}>
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <span className="text-lg font-medium transition-all duration-500">{label}</span>
      {active && <Sparkles className="ml-auto text-yellow-400 animate-pulse" size={22} />}
    </div>
  );
}

/* =======================
   Compact Premium Charts – Smaller Boxes
======================= */
function PremiumLineChart({ data, title }) {
  const width = 800;
  const height = 400;
  const padding = { top: 60, right: 80, bottom: 80, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map(d => d.value)) * 1.2;
  const xScale = i => padding.left + (i / (data.length - 1)) * chartWidth;
  const yScale = v => padding.top + chartHeight - (v / maxValue) * chartHeight;

  const points = data.map((d, i) => `${xScale(i)},${yScale(d.value)}`).join(" ");

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in">
      <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-transparent border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <TrendingUp className="text-red-600" size={28} />
          {title}
        </h3>
      </div>
      <div className="p-6">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[0, 40, 80, 120, 160].map(v => (
            <g key={v}>
              <line x1={padding.left} y1={yScale(v)} x2={width - padding.right} y2={yScale(v)} stroke="#f8fafc" strokeWidth="2" />
              <text x={padding.left - 20} y={yScale(v) + 6} textAnchor="end" className="text-sm fill-gray-600 font-medium">
                {v}
              </text>
            </g>
          ))}

          {/* Area */}
          <path d={`M ${padding.left},${yScale(0)} L ${points} L ${width - padding.right},${yScale(0)} Z`} fill="url(#areaGradient)" className="animate-draw-path" />

          {/* Line */}
          <polyline fill="none" stroke="#dc2626" strokeWidth="5" points={points} strokeLinecap="round" className="animate-draw-path" style={{ animationDelay: "0.4s" }} />

          {/* Points */}
          {data.map((d, i) => (
            <g key={i} className="animate-pop-in" style={{ animationDelay: `${i * 80 + 600}ms` }}>
              <circle cx={xScale(i)} cy={yScale(d.value)} r="8" fill="#dc2626" className="drop-shadow-md" />
              <text x={xScale(i)} y={yScale(d.value) - 20} textAnchor="middle" className="text-base font-bold fill-gray-900">
                {d.value}
              </text>
            </g>
          ))}

          {/* Month Labels */}
          {data.map((d, i) => (
            <text key={i} x={xScale(i)} y={height - 30} textAnchor="middle" className="text-base font-semibold fill-gray-800 animate-fade-in" style={{ animationDelay: `${i * 80 + 800}ms` }}>
              {d.month}
            </text>
          ))}

          {/* Legend */}
          <g transform={`translate(${width - 220}, 40)`} className="animate-fade-in" style={{ animationDelay: "1.2s" }}>
            <rect x="0" y="0" width="14" height="14" fill="#dc2626" rx="4" />
            <text x="24" y="12" className="text-base font-medium fill-gray-800">Total Observations</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function PremiumDonutChart({ data, title }) {
  const size = 380;
  const radius = size / 2 - 60;
  const innerRadius = radius * 0.6;
  const center = size / 2;
  let cumulative = 0;
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-transparent border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <Target className="text-red-600" size={28} />
          {title}
        </h3>
      </div>
      <div className="p-8">
        <svg width={size} height={size}>
          {data.map((entry, i) => {
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

            return (
              <path
                key={i}
                d={`M ${startOuterX},${startOuterY} 
                    A ${radius},${radius} 0 ${largeArc},1 ${endOuterX},${endOuterY} 
                    L ${endInnerX},${endInnerY} 
                    A ${innerRadius},${innerRadius} 0 ${largeArc},0 ${startInnerX},${startInnerY} Z`}
                fill={entry.color}
                stroke="white"
                strokeWidth="4"
                className="animate-draw-ring"
                style={{ animationDelay: `${i * 250 + 500}ms` }}
              />
            );
          })}

          <circle cx={center} cy={center} r={innerRadius + 10} fill="white" className="animate-pop-in" style={{ animationDelay: "1s" }} />

          <text x={center} y={center - 15} textAnchor="middle" className="text-5xl font-extrabold fill-gray-900 animate-count-up">
            {total}
          </text>
          <text x={center} y={center + 20} textAnchor="middle" className="text-lg font-semibold fill-gray-600 animate-fade-in" style={{ animationDelay: "1.5s" }}>
            Total Observations
          </text>

          {/* Compact Legend */}
          <g transform={`translate(${size + 20}, ${size / 2 - 50})`}>
            {data.map((entry, i) => (
              <g key={i} transform={`translate(0, ${i * 40})`} className="animate-slide-in-right" style={{ animationDelay: `${i * 150 + 1200}ms` }}>
                <rect x="0" y="0" width="16" height="16" fill={entry.color} rx="4" />
                <text x="24" y="14" className="text-base font-semibold fill-gray-800">
                  {entry.label} ({entry.value})
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}

function PremiumBarChart({ data, title }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
      
      {/* Header */}
      <div className="px-8 py-5 bg-gradient-to-r from-red-50 to-white border-b">
        <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
          <Zap className="text-red-600" size={30} />
          {title}
        </h3>
      </div>

      {/* Chart */}
      <div className="p-10">
        <div className="flex items-end justify-between gap-10 h-[340px]">

          {data.map((item, i) => {
            const heightPercent = (item.value / maxValue) * 100;

            return (
              <div
                key={i}
                className="flex flex-col items-center w-full animate-bar-grow"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* Value */}
                <span className="mb-3 text-2xl font-extrabold text-gray-900">
                  {item.value}
                </span>

                {/* Bar */}
                <div className="relative w-full flex justify-center">
                  <div
                    className="w-14 rounded-t-2xl bg-gradient-to-t from-red-700 via-red-600 to-red-400 shadow-xl transition-all duration-700 hover:scale-y-105"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Label */}
                <p className="mt-6 text-lg font-semibold text-gray-800 text-center leading-tight">
                  {item.category}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

/* =======================
   COMPACT & BEAUTIFUL CLIENT INSIGHTS PAGE
======================= */
export default function ClientGraphsInsights() {
  const trendData = [
    { month: "Jan", value: 92 },
    { month: "Feb", value: 105 },
    { month: "Mar", value: 98 },
    { month: "Apr", value: 112 },
    { month: "May", value: 120 },
    { month: "Jun", value: 108 },
    { month: "Jul", value: 135 },
    { month: "Aug", value: 142 },
    { month: "Sep", value: 138 },
    { month: "Oct", value: 145 },
    { month: "Nov", value: 152 },
    { month: "Dec", value: 156 },
  ];

  const categoryData = [
    { category: "Electrical", value: 42 },
    { category: "Housekeeping", value: 35 },
    { category: "PPE Compliance", value: 28 },
    { category: "Ergonomics", value: 22 },
    { category: "Machine Guarding", value: 18 },
    { category: "Chemical Handling", value: 11 },
  ];

  const riskData = [
    { label: "High Risk", value: 28, color: "#dc2626" },
    { label: "Medium Risk", value: 62, color: "#f97316" },
    { label: "Low Risk", value: 66, color: "#22c55e" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-[#0a0e17] to-[#0f141b] text-white flex flex-col justify-between shadow-2xl">
        <div>
          <div className="p-8 animate-fade-in">
            <div className="flex items-center gap-5 mb-10">
              <div className="p-4 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-xl">
                <Shield size={48} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-red-500">REDVION</h1>
                <p className="text-lg text-gray-300">Client Portal</p>
              </div>
            </div>
          </div>
          <nav className="px-6 space-y-3">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<Eye />} label="View All Observations" />
            <SidebarItem icon={<BarChart3 />} label="Graphs & Site Insights" active />
            <SidebarItem icon={<FileText />} label="Weekly/Monthly Reports" />
            <SidebarItem icon={<History />} label="Activity History" />
          </nav>
        </div>
        <div className="p-8 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              A
            </div>
            <div>
              <p className="text-xl font-bold">Acme Industries</p>
              <p className="text-gray-400">View-Only Access</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT – Clean & Compact */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Graphs & Site Safety Insights
          </h1>
          <p className="text-xl text-gray-600">
            Visual analytics and trends for your facility safety performance
          </p>
          <p className="text-gray-500 mt-2">
            Data current as of <strong>December 20, 2025</strong>
          </p>
        </div>

        {/* COMPACT CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <PremiumLineChart data={trendData} title="Observation Trend – 2025" />
          <PremiumDonutChart data={riskData} title="Current Risk Level Distribution" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <PremiumBarChart data={categoryData} title="Top Risk Categories (2025)" />

          {/* COMPACT ELITE INSIGHTS */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-10 text-white">
            <div className="flex items-center gap-4 mb-8">
              <Award className="text-yellow-400" size={40} />
              <h2 className="text-3xl font-extrabold">Key Safety Insights</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xl font-semibold">Safety Score</p>
                  <ArrowUpRight className="text-green-400" size={32} />
                </div>
                <p className="text-5xl font-extrabold text-green-400">94%</p>
                <p className="mt-2 text-gray-300">+4% improvement — Outstanding</p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <p className="text-lg font-semibold mb-2">Resolution Rate</p>
                <p className="text-4xl font-extrabold">82%</p>
                <p className="mt-2 text-gray-300">Above industry benchmark</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-6 text-black">
                <p className="text-xl font-bold">Year-End Highlight</p>
                <p className="text-3xl font-extrabold mt-2">Best Record in 3 Years</p>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL MESSAGE */}
        <div className="mt-16 text-center p-10 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl text-white">
          <h2 className="text-3xl font-extrabold mb-4">Top 5% Global Performer</h2>
          <p className="text-xl opacity-90">
            This <strong>view-only portal</strong> showcases your exceptional safety results.
          </p>
        </div>
      </main>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.6); } 70% { transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes drawPath { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
        @keyframes drawRing { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes barGrow { from { height: 0; opacity: 0; } to { height: 100%; opacity: 1; } }
        @keyframes countUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }

        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-slide-up { animation: slideUp 1s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.7s ease-out forwards; }
        .animate-draw-path { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: drawPath 1.8s ease-out forwards; }
        .animate-draw-ring { animation: drawRing 1s ease-out forwards; }
        .animate-bar-grow { animation: barGrow 1.2s ease-out forwards; }
        .animate-count-up { animation: countUp 1.5s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}