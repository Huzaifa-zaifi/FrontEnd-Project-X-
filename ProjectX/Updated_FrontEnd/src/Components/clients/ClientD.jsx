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
} from "lucide-react";

/* =======================
   Reusable Components – Exact same style as Admin Dashboard
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

function StatCard({ title, value, icon, color, delay }) {
  const colors = {
    red: "border-red-500",
    orange: "border-orange-400",
    green: "border-green-500",
    yellow: "border-yellow-400",
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-md border-l-4 ${colors[color]} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slide-up ${color === 'red' ? 'animate-pulse-red' : ''}`}
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
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 opacity-0 animate-fade-in" style={{ animationDelay: `${parseInt(delay) + 400}ms` }}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, active = false }) {
  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-xl mb-3 cursor-pointer transition-all duration-400 hover:shadow-lg ${
        active
          ? "bg-red-50 text-red-600 border border-red-200 shadow-md"
          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent"
      } hover:-translate-y-1`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${active ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"}`}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <span className="font-medium transition-all duration-300">{label}</span>
      </div>
      <ChevronRight className={`w-5 h-5 transition-all duration-400 group-hover:translate-x-2 ${active ? "text-red-600" : "text-gray-400"}`} />
    </div>
  );
}

/* =======================
   CLIENT DASHBOARD – Fully View-Only Portal
======================= */
export default function ClientDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR – Client View-Only */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Client Portal (View-Only)</p>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
            <SidebarItem icon={<Eye />} label="View All Observations" />
            <SidebarItem icon={<BarChart3 />} label="Graphs & Site Insights" />
            <SidebarItem icon={<FileText />} label="Weekly/Monthly Reports" />
            <SidebarItem icon={<History />} label="Activity History" />
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="mb-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Acme Industries</p>
              <p className="text-xs text-gray-400">Client Account • View-Only</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Welcome back, <span className="font-bold text-red-600">Acme Industries</span>
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              Secure, view-only access to your site safety performance
            </p>
            <p className="text-gray-500 mt-1">
              Real-time data as of <strong>December 20, 2025</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
            <Calendar size={18} />
            Last updated: Today, 2:30 PM
          </div>
        </div>

        {/* KEY STATS – Clear Open/Closed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Observations" value="156" icon={<FileText />} color="red" delay="100" />
          <StatCard title="Open Items" value="28" icon={<AlertTriangle />} color="orange" delay="200" />
          <StatCard title="Closed Items" value="128" icon={<CheckCircle />} color="green" delay="300" />
          <StatCard title="Resolution Rate" value="82%" icon={<TrendingUp />} color="yellow" delay="400" />
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QUICK ACCESS – Client View-Only Links */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-slide-up">
            <h3 className="font-semibold text-lg text-gray-900 mb-5 flex items-center gap-2">
              <Shield className="text-red-600" size={22} />
              Quick Access (View-Only)
            </h3>

            <QuickAction icon={<Eye />} label="View All Observations" active />
            <QuickAction icon={<BarChart3 />} label="Graphs & Site Insights" />
            <QuickAction icon={<FileText />} label="Weekly/Monthly Reports" />
            <QuickAction icon={<History />} label="Full Activity History" />
            <QuickAction icon={<Download />} label="Download Reports (PDF/Excel)" />
          </div>

          {/* LARGE PANEL – Weekly & Monthly Summary Reports */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <h3 className="font-semibold text-xl text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="text-red-600" size={26} />
              Your Latest Safety Summary Reports
            </h3>

            <div className="space-y-6">
              {/* Monthly Report */}
              <div className="border-l-4 border-red-500 pl-6 bg-red-50/50 rounded-r-xl p-6 transition-all duration-300 hover:bg-red-50 hover:shadow-md hover:-translate-y-1">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold text-xl text-gray-900">Monthly Safety Report</p>
                    <p className="text-lg text-gray-600 mt-1">December 2025</p>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-700">
                        <strong>156</strong> Total Observations
                      </p>
                      <p className="text-gray-700">
                        <strong className="text-green-600">128</strong> Closed • <strong className="text-orange-600">28</strong> Open
                      </p>
                      <p className="text-gray-700">
                        Resolution Rate: <strong className="text-green-600">82%</strong>
                      </p>
                      <p className="text-gray-700">
                        Safety Score: <strong className="text-green-600">94%</strong> ↑ 4% vs last month
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-5">Generated on December 20, 2025</p>
                  </div>
                  <span className="ml-6 px-5 py-3 rounded-full text-sm font-bold bg-red-100 text-red-600">
                    Current Month
                  </span>
                </div>
              </div>

              {/* Weekly Report */}
              <div className="border-l-4 border-orange-400 pl-6 bg-orange-50/50 rounded-r-xl p-6 transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:-translate-y-1">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold text-xl text-gray-900">Weekly Safety Summary</p>
                    <p className="text-lg text-gray-600 mt-1">Week 51 (Dec 14 – Dec 20, 2025)</p>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-700">
                        <strong>18</strong> New Observations This Week
                      </p>
                      <p className="text-gray-700">
                        <strong className="text-green-600">15</strong> Resolved This Week
                      </p>
                      <p className="text-gray-700">
                        High-Risk Items: <strong className="text-green-600">Reduced by 30%</strong>
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-5">Updated December 20, 2025</p>
                  </div>
                  <span className="ml-6 px-5 py-3 rounded-full text-sm font-bold bg-orange-100 text-orange-600">
                    This Week
                  </span>
                </div>
              </div>

              {/* Export Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <button className="relative overflow-hidden group rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6 text-white text-xl font-bold shadow-2xl transition-all hover:scale-[1.03]">
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                  <div className="flex items-center justify-center gap-4">
                    <Download size={28} />
                    Export Full Data to Excel
                  </div>
                  <p className="text-green-100 mt-2 text-sm">All observations, breakdowns, trends</p>
                </button>

                <button className="relative overflow-hidden group rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-white text-xl font-bold shadow-2xl transition-all hover:scale-[1.03]">
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                  <div className="flex items-center justify-center gap-4">
                    <FileText size={28} />
                    Download PDF Report
                  </div>
                  <p className="text-red-100 mt-2 text-sm">Executive summary with graphs & insights</p>
                </button>
              </div>

              <div className="text-center mt-8 p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-700 font-medium">
                  All reports include interactive graphs, risk category breakdowns, trend analysis, and actionable site safety insights.
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  You have <strong>view-only access</strong> — no edits or changes can be made from this portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ANIMATIONS – Identical to Admin Dashboard */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 20px 10px rgba(239, 68, 68, 0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
        }
        .animate-pulse-red {
          animation: pulseRed 2s infinite;
        }
      `}</style>
    </div>
  );
}