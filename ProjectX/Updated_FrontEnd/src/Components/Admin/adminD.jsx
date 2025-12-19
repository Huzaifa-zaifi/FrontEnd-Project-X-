import React from "react";
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  Users,
  History,
  LogOut,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  UserCog,
  Shield,
  FileSpreadsheet,
  Download,
  BarChart3,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* SIDEBAR - Same as Supervisor but with Admin menu */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Admin Portal</p>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
            <SidebarItem icon={<Eye />} label="All Observations" />
            <SidebarItem icon={<UserCheck />} label="Approval Workflow" />
            <SidebarItem icon={<Users />} label="User Management" />
            <SidebarItem icon={<UserCog />} label="Roles & Permissions" />
            <SidebarItem icon={<FileSpreadsheet />} label="Categories & Risks" />
            <SidebarItem icon={<BarChart3 />} label="Reports & Analytics" />
            <SidebarItem icon={<History />} label="Action History" />
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="mb-3">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-gray-400">Safety Director</p>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Welcome back, <span className="font-bold text-red-600">Admin</span>
            </h2>
            <p className="text-gray-600 mt-1">
              Full system oversight: manage users, categories, reports, and safety performance
            </p>
          </div>
        </div>

        {/* STATS - Same style as Supervisor Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Observations" value="156" icon={<FileText />} color="red" delay="100" />
          <StatCard title="Active Users" value="48" icon={<Users />} color="yellow" delay="200" />
          <StatCard title="Actions Assigned" value="142" icon={<AlertTriangle />} color="orange" delay="300" />
          <StatCard title="Completed Actions" value="128" icon={<CheckCircle />} color="green" delay="400" />
        </div>

        {/* CONTENT GRID - Same layout: Quick Actions + Large Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* QUICK ACTIONS - Admin version */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-slide-up">
            <h3 className="font-semibold text-lg text-gray-900 mb-5">Admin Quick Actions</h3>

            <QuickAction icon={<Users />} label="User Management" />
            <QuickAction icon={<UserCog />} label="Roles & Permissions" />
            <QuickAction icon={<FileSpreadsheet />} label="Categories & Risks" active />
            <QuickAction icon={<BarChart3 />} label="Reports & Analytics" />
            <QuickAction icon={<Download />} label="Export Data" />
            <QuickAction icon={<TrendingUp />} label="Safety Performance" />
          </div>

          {/* LARGE PANEL - Admin Reports & Export Preview */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <h3 className="font-semibold text-xl text-gray-900 mb-6">Reports & Data Export</h3>

            <div className="space-y-6">
              {/* Weekly/Monthly Report Summary */}
              <div className="border-l-4 border-red-500 pl-5 bg-red-50/50 rounded-r-lg p-5 transition-all duration-300 hover:bg-red-50 hover:shadow-md hover:-translate-y-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-lg text-gray-900">Monthly Safety Report - December 2025</p>
                    <p className="text-gray-700 mt-1">
                      156 observations • 128 actions completed • Safety score: 94%
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Generated on Dec 19, 2025</p>
                  </div>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-600">
                    Ready
                  </span>
                </div>
              </div>

              {/* Export Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                <button className="relative overflow-hidden group rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-5 text-white text-lg font-bold shadow-xl transition-all hover:scale-[1.03]">
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                  <span className="relative flex items-center justify-center gap-3">
                    <Download size={24} /> Export to Excel
                  </span>
                </button>

                <button className="relative overflow-hidden group rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-8 py-5 text-white text-lg font-bold shadow-xl transition-all hover:scale-[1.03]">
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                  <span className="relative flex items-center justify-center gap-3">
                    <FileText size={24} /> Generate PDF Report
                  </span>
                </button>
              </div>

              <p className="text-gray-600 italic animate-fade-in" style={{ animationDelay: "500ms" }}>
                Full access to all data. Export observations, actions, user activity, and performance metrics anytime.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* SAME ANIMATIONS as Supervisor Dashboard */}
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

/* REUSABLE COMPONENTS - EXACTLY THE SAME AS SUPERVISOR DASHBOARD */

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
    yellow: "border-yellow-400",
    orange: "border-orange-400",
    green: "border-green-500",
  };

  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-md border-l-4 ${colors[color]} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slide-up ${color === 'red' ? 'animate-pulse-red' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 font-medium opacity-0 animate-fade-in" style={{ animationDelay: `${parseInt(delay) + 200}ms` }}>{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2 opacity-0 animate-fade-in" style={{ animationDelay: `${parseInt(delay) + 300}ms` }}>{value}</p>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 opacity-0 animate-fade-in" style={{ animationDelay: `${parseInt(delay) + 400}ms` }}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, active }) {
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