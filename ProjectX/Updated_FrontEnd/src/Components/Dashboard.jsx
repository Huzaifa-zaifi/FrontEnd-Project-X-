

import React from "react";
import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  History,
  LogOut,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Employee Portal</p>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
            <SidebarItem icon={<FilePlus />} label="Submit Report" />
            <SidebarItem icon={<ClipboardList />} label="Report Status" />
            <SidebarItem icon={<History />} label="History" />
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="mb-3">
            <p className="text-sm font-medium">twat</p>
            <p className="text-xs text-gray-400">General</p>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold">
              Welcome back, <span className="font-bold">twat</span>
            </h2>
            <p className="text-gray-500">
              Here's an overview of your safety observations
            </p>
          </div>

          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-lg">
            <Plus size={18} />
            New Observation
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Observations" value="5" icon={<FileText />} color="red" />
          <StatCard title="Pending Review" value="2" icon={<Clock />} color="yellow" />
          <StatCard title="Action Assigned" value="1" icon={<AlertTriangle />} color="orange" />
          <StatCard title="Closed" value="2" icon={<CheckCircle />} color="green" />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Quick Actions</h3>

            <QuickAction icon={<Plus />} label="Submit Observation" active />
            <QuickAction icon={<Clock />} label="Check Status" />
            <QuickAction icon={<History />} label="View History" />
          </div>

          {/* RECENT OBSERVATIONS */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <FileText className="text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">No observations yet</p>
            <button className="text-red-500 font-medium mt-2 hover:underline">
              Submit your first observation
            </button>

            <div className="ml-auto mt-auto text-sm text-red-500 cursor-pointer flex items-center gap-1">
              View all →
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
        active
          ? "bg-white text-black font-medium"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    red: "border-red-500",
    yellow: "border-yellow-400",
    orange: "border-orange-400",
    green: "border-green-500",
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${colors[color]}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, active }) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg mb-3 cursor-pointer ${
        active
          ? "bg-red-50 text-red-500"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>
      →
    </div>
  );
}
