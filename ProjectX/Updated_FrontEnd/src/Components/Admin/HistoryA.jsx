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
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Filter,
  Search,
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
   Action History Entry
======================= */
function HistoryEntry({ entry }) {
  const statusColors = {
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    resolved: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const statusIcon = {
    approved: <CheckCircle size={16} />,
    rejected: <AlertTriangle size={16} />,
    pending: <Clock size={16} />,
    resolved: <CheckCircle size={16} />,
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="font-semibold text-gray-900">{entry.action}</div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[entry.status]}`}>
              <div className="flex items-center gap-1">
                {statusIcon[entry.status]}
                {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
              </div>
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{entry.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User size={14} />
              {entry.user}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {entry.time}
            </div>
            <div>Observation #{entry.id}</div>
          </div>
        </div>
        <div className="text-right text-sm text-gray-500">
          {entry.date}
        </div>
      </div>
    </div>
  );
}

/* =======================
   MAIN ACTION HISTORY PAGE
======================= */
export default function ActionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const historyData = [
    {
      id: "OBS-2147",
      action: "Approved Corrective Action",
      description: "Approved replacement of damaged electrical panel in Warehouse B",
      status: "approved",
      user: "John Martinez",
      date: "Dec 19, 2025",
      time: "2:45 PM",
    },
    {
      id: "OBS-2139",
      action: "Resolved Observation",
      description: "Housekeeping issue in Loading Dock cleared and verified",
      status: "resolved",
      user: "Sarah Chen",
      date: "Dec 19, 2025",
      time: "11:20 AM",
    },
    {
      id: "OBS-2128",
      action: "Rejected Proposed Action",
      description: "Rejected temporary fix; requires permanent engineering solution",
      status: "rejected",
      user: "Mike Johnson",
      date: "Dec 18, 2025",
      time: "4:15 PM",
    },
    {
      id: "OBS-2115",
      action: "Submitted for Approval",
      description: "New PPE compliance training schedule proposed",
      status: "pending",
      user: "Emma Wilson",
      date: "Dec 18, 2025",
      time: "9:30 AM",
    },
    {
      id: "OBS-2102",
      action: "Approved Risk Assessment",
      description: "High-risk electrical observation mitigation plan approved",
      status: "approved",
      user: "John Martinez",
      date: "Dec 17, 2025",
      time: "3:10 PM",
    },
    {
      id: "OBS-2098",
      action: "Resolved Observation",
      description: "Ergonomic workstation adjustments completed and verified",
      status: "resolved",
      user: "David Lee",
      date: "Dec 17, 2025",
      time: "1:45 PM",
    },
  ];

  const filteredData = historyData.filter((entry) => {
    const matchesSearch =
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === "all" || entry.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

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
            <SidebarItem icon={<BarChart3 />} label="Reports & Analytics" />
            <SidebarItem icon={<History />} label="Action History" active />
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
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <History className="text-red-600" size={36} />
            Action History
          </h2>
          <p className="text-gray-600 mt-2">
            Complete audit trail of all approval, resolution, and workflow actions
          </p>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by action, user, ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none px-6 py-3 pr-12 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        {/* HISTORY LIST */}
        <div className="space-y-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No actions found matching your filters.
            </div>
          ) : (
            filteredData.map((entry, index) => (
              <HistoryEntry key={index} entry={entry} />
            ))
          )}
        </div>

        {/* PAGINATION (Optional future enhancement) */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Previous</button>
            <span className="px-4 py-2 bg-red-600 text-white rounded-lg">1</span>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}