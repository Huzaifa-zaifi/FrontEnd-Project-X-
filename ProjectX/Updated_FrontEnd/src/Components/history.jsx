import React from "react";
import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  History,
  LogOut,
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  ChevronRight,
  Calendar,
} from "lucide-react";

export default function HistoryPage() {
  const reports = [
    {
      title: "Exposed electrical wiring",
      description: "Electrical wiring exposed in storage room B. Risk of electrocution.",
      category: "Electrical",
      type: "unsafe_condition",
      submitted: "about 1 year ago",
      closedDate: "December 10, 2025",
      status: "Closed",
      statusIcon: <CheckCircle className="w-4 h-4" />,
    },
    {
      title: "Blocked fire exit",
      description: "Fire exit in Warehouse A blocked by pallets.",
      category: "Fire Safety",
      type: "unsafe_condition",
      submitted: "about 1 year ago",
      closedDate: "November 28, 2025",
      status: "Closed",
      statusIcon: <CheckCircle className="w-4 h-4" />,
    },
    {
      title: "Missing guard on machine",
      description: "Safety guard removed from cutting machine in Production Line 3.",
      category: "Machinery",
      type: "unsafe_act",
      submitted: "about 1 year ago",
      closedDate: "November 15, 2025",
      status: "Closed",
      statusIcon: <CheckCircle className="w-4 h-4" />,
    },
    {
      title: "Leaking chemical drum",
      description: "Chemical drum leaking in storage area D.",
      category: "Chemical",
      type: "unsafe_condition",
      submitted: "about 1 year ago",
      closedDate: "October 20, 2025",
      status: "Closed",
      statusIcon: <CheckCircle className="w-4 h-4" />,
    },
  ];

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
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<FilePlus />} label="Submit Report" />
            <SidebarItem icon={<ClipboardList />} label="Report Status" />
            <SidebarItem icon={<History />} label="History" active />
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="mb-3">
            <p className="text-sm font-medium">twat</p>
            <p className="text-xs text-gray-400">General</p>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">History</h2>
          <p className="text-gray-500">View all your previously submitted and closed reports</p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search closed reports..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition"
              />
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-500" size={20} />
              <select className="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition">
                <option>All Time</option>
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* HISTORY REPORT LIST */}
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer flex items-start justify-between border-l-4 border-red-500"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3 text-red-600">{report.title}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                    {report.statusIcon}
                    {report.status}
                  </span>
                  <span className="text-sm text-gray-600 font-medium">
                    Closed on {report.closedDate}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{report.description}</p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Category:</span> {report.category}
                  <span className="mx-3">•</span>
                  <span className="font-medium">Type:</span> {report.type.replace("_", " ")}
                  <span className="mx-3">•</span>
                  <span className="font-medium">Submitted</span> {report.submitted}
                </div>
              </div>
              <ChevronRight className="text-red-500 mt-2" size={24} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* REUSABLE COMPONENTS */
function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
        active
          ? "bg-white text-black font-medium"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {React.cloneElement(icon, { size: 20 })}
      {label}
    </div>
  );
}