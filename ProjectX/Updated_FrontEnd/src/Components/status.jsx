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
} from "lucide-react";

export default function ReportStatusPage() {
  const reports = [
    {
      title: "Worker without safety helmet",
      description: "Observed worker in Zone A not wearing required safety helmet while operating machinery.",
      category: "PPE",
      type: "unsafe_act",
      submitted: "about 1 year ago",
      status: "Pending",
      statusIcon: <Clock className="w-4 h-4" />,
      statusColor: "yellow",
    },
    {
      title: "Improper chemical storage",
      description: "Chemicals stored without proper labeling in Warehouse C.",
      category: "Chemical",
      type: "unsafe_condition",
      submitted: "about 1 year ago",
      status: "In Review",
      statusIcon: <Eye className="w-4 h-4" />,
      statusColor: "blue",
    },
    {
      title: "Oil spill near entrance",
      description: "Large oil spill detected near the main entrance. Slip hazard for all personnel.",
      category: "Housekeeping",
      type: "unsafe_condition",
      submitted: "about 1 year ago",
      status: "Action Assigned",
      statusIcon: <AlertTriangle className="w-4 h-4" />,
      statusColor: "orange",
    },
    {
      title: "Exposed electrical wiring",
      description: "Electrical wiring exposed in storage room B. Risk of electrocution.",
      category: "Electrical",
      type: "unsafe_condition",
      submitted: "about 1 year ago",
      status: "Closed",
      statusIcon: <CheckCircle className="w-4 h-4" />,
      statusColor: "green",
    },
  ];

  const getStatusColor = (color) => {
    const colors = {
      yellow: "bg-yellow-100 text-yellow-700",
      blue: "bg-blue-100 text-blue-700",
      orange: "bg-orange-100 text-orange-700",
      green: "bg-green-100 text-green-700",
    };
    return colors[color] || "bg-gray-100 text-gray-700";
  };

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
            <SidebarItem icon={<ClipboardList />} label="Report Status" active />
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Report Status</h2>
          <p className="text-gray-500">Track the status of your submitted reports</p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="text-gray-500" size={20} />
              <select className="px-6 py-3 border border-red-300 rounded-lg focus:outline-none">
                <option>All Status</option>
                <option>Pending</option>
                <option>In Review</option>
                <option>Action Assigned</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* REPORT LIST */}
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          report.statusColor
                        )}`}
                      >
                        {report.statusIcon}
                        {report.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{report.description}</p>
                    <div className="text-sm text-gray-500">
                      <span>Category: {report.category}</span>
                      <span className="mx-2">•</span>
                      <span>Type: {report.type.replace("_", " ")}</span>
                      <span className="mx-2">•</span>
                      <span>Submitted {report.submitted}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-gray-400 mt-2" size={24} />
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