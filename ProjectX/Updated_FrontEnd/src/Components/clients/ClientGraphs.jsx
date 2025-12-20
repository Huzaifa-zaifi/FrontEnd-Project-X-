import React from "react";
import {
  LayoutDashboard,
  Eye,
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
  Users,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

/* =======================
   Reusable Components
======================= */
function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-2 ${
        active
          ? "bg-white text-black font-medium shadow-sm"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {React.cloneElement(icon, { size: 20 })}
      <span className="transition-all duration-300">{label}</span>
    </div>
  );
}

function StatCard({ title, value, icon, color, delay, trend }) {
  const colors = {
    red: "border-red-500",
    orange: "border-orange-400",
    green: "border-green-500",
    yellow: "border-yellow-400",
    blue: "border-blue-400",
    purple: "border-purple-500",
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-md border-l-4 ${colors[color]} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slide-up relative overflow-hidden`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 font-medium opacity-0 animate-fade-in" style={{ animationDelay: `${parseInt(delay) + 200}ms` }}>
            {title}
          </p>
          <p className="text-4xl font-bold text-gray-900 mt-2 opacity-0 animate-fade-in" style={{ animationDelay: `${parseInt(delay) + 300}ms` }}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2 text-sm font-medium">
              <ArrowUpRight className={`w-4 h-4 ${trend > 0 ? "text-green-500" : "text-red-500"}`} />
              <span className={trend > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(trend)}% from last month
              </span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 opacity-0 animate-fade-in" style={{ animationDelay: `${parseInt(delay) + 400}ms` }}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
      </div>
      {trend > 0 && (
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <Sparkles className="w-full h-full text-green-500" />
        </div>
      )}
    </div>
  );
}

/* Premium Charts (Placeholder - replace with actual chart components if needed) */
const PremiumLineChart = ({ data, title }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
    <div className="h-80 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl flex items-center justify-center border-2 border-dashed border-red-200">
      <div className="text-center">
        <TrendingUp className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Line Chart: Observation Trend</p>
        <p className="text-5xl font-extrabold text-red-600 mt-4">+69%</p>
        <p className="text-sm text-gray-500">Year-over-year increase</p>
      </div>
    </div>
  </div>
);

const PremiumDonutChart = ({ data, title }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
    <div className="h-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center border-2 border-dashed border-green-200">
      <div className="text-center">
        <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Risk Distribution</p>
        <p className="text-5xl font-extrabold text-green-600 mt-4">66 Low</p>
        <p className="text-sm text-gray-500">Dominant safe conditions</p>
      </div>
    </div>
  </div>
);

const PremiumBarChart = ({ data, title }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
    <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-200">
      <div className="text-center">
        <Target className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Top Categories</p>
        <p className="text-4xl font-extrabold text-blue-600 mt-4">Electrical #1</p>
        <p className="text-sm text-gray-500">42 observations</p>
      </div>
    </div>
  </div>
);

export default function ClientGraphsInsights() {
  // Trend Data – weekly
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
    { category: "Fire Safety", value: 15 },
    { category: "Lifting & Material Handling", value: 9 },
  ];

  const riskData = [
    { label: "High Risk", value: 28, color: "#dc2626" },
    { label: "Medium Risk", value: 62, color: "#f97316" },
    { label: "Low Risk", value: 66, color: "#22c55e" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR - Unchanged as requested */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Client Portal (View-Only)</p>
          </div>
          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<Eye />} label="View All Observations" />
            <SidebarItem icon={<BarChart3 />} label="Graphs & Site Insights" active />
            <SidebarItem icon={<FileText />} label="Weekly/Monthly Reports" />
            <SidebarItem icon={<History />} label="Activity History" />
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800 animate-fade-in">
          <div className="mb-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
            <div>
              <p className="text-sm font-medium">Acme Industries</p>
              <p className="text-xs text-gray-400">Client Account • View-Only</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT - Enhanced with more beautiful data */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Graphs & Site Safety Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time visual analytics showcasing your outstanding safety performance and continuous improvement
          </p>
          <p className="text-gray-500 mt-4 text-lg">
            Data current as of <strong>December 20, 2025</strong>
          </p>
        </div>

        {/* Expanded KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          <StatCard title="Total Observations" value="156" icon={<FileText />} color="red" delay="100" trend={+18} />
          <StatCard title="Open Items" value="28" icon={<AlertTriangle />} color="orange" delay="200" trend={-12} />
          <StatCard title="Closed Items" value="128" icon={<CheckCircle />} color="green" delay="300" trend={+25} />
          <StatCard title="Resolution Rate" value="82%" icon={<TrendingUp />} color="yellow" delay="400" trend={+8} />
          <StatCard title="Active Users" value="47" icon={<Users />} color="blue" delay="500" trend={+15} />
          <StatCard title="Safety Score" value="94%" icon={<Award />} color="purple" delay="600" trend={+4} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <PremiumLineChart data={trendData} title="Observation Trend – 2025 (YTD)" />
          <PremiumDonutChart data={riskData} title="Current Risk Level Distribution" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <PremiumBarChart data={categoryData} title="Top Risk Categories (2025)" />

          {/* Enhanced Elite Insights Panel */}
          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black rounded-2xl shadow-2xl p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Zap className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-yellow-400 rounded-2xl">
                  <Award className="text-black" size={40} />
                </div>
                <h2 className="text-3xl font-extrabold">Elite Safety Insights</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xl font-semibold">Overall Safety Score</p>
                    <Sparkles className="text-yellow-400" size={32} />
                  </div>
                  <p className="text-6xl font-extrabold text-green-400">94%</p>
                  <p className="mt-2 text-gray-200 text-lg">+4% improvement this quarter</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                    <p className="text-lg font-semibold mb-2">Resolution Rate</p>
                    <p className="text-4xl font-extrabold">82%</p>
                    <p className="text-sm text-gray-300 mt-1">Above industry avg</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                    <p className="text-lg font-semibold mb-2">High-Risk Reduction</p>
                    <p className="text-4xl font-extrabold text-red-400">-30%</p>
                    <p className="text-sm text-gray-300 mt-1">vs last month</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-6 text-black shadow-xl">
                  <div className="flex items-center gap-3">
                    <Target className="w-10 h-10" />
                    <div>
                      <p className="text-xl font-bold">Year-End Achievement</p>
                      <p className="text-3xl font-extrabold mt-1">Best Record in 3 Years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL MESSAGE */}
        <div className="mt-16 text-center p-12 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 rounded-3xl shadow-2xl text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Shield className="w-full h-full" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4">Top 5% Global Safety Performer</h2>
            <p className="text-2xl opacity-95 mb-6">
              Your commitment to safety sets the industry standard
            </p>
            <p className="text-lg opacity-90 max-w-4xl mx-auto">
              This <strong>view-only client portal</strong> proudly showcases your exceptional safety culture, proactive reporting, and outstanding results. 
              Thank you for partnering with REDVION.
            </p>
          </div>
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