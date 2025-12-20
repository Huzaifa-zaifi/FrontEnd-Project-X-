import React from "react";
import {
  LayoutDashboard,
  Eye,
  BarChart3,
  FileText,
  History,
  Shield,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  FileText as FileIcon,
} from "lucide-react";

/* =======================
   Activity History – With Exact Client Dashboard Sidebar & Animations
======================= */
export default function ActivityHistory() {
  const activities = [
    {
      date: "Dec 20, 2025",
      time: "2:15 PM",
      type: "observation",
      title: "New observation created",
      description: "Damaged electrical panel in Warehouse B",
      user: "John Martinez",
      status: "open",
    },
    {
      date: "Dec 20, 2025",
      time: "1:45 PM",
      type: "action",
      title: "Action assigned",
      description: "Isolate panel and schedule repair",
      user: "Sarah Chen (Supervisor)",
      status: "assigned",
    },
    {
      date: "Dec 19, 2025",
      time: "11:30 AM",
      type: "closed",
      title: "Observation resolved",
      description: "Housekeeping issue – Loading Dock cleared",
      user: "Mike Johnson",
      status: "closed",
    },
    {
      date: "Dec 18, 2025",
      time: "9:20 AM",
      type: "observation",
      title: "New high-risk observation",
      description: "Missing machine guard on conveyor",
      user: "David Lee",
      status: "open",
    },
    {
      date: "Dec 17, 2025",
      time: "4:00 PM",
      type: "closed",
      title: "Action completed",
      description: "Ergonomic adjustments made at Workstation 14",
      user: "Emma Wilson",
      status: "closed",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="text-orange-600" size={20} />;
      case "closed":
        return <CheckCircle className="text-green-600" size={20} />;
      case "assigned":
        return <Clock className="text-blue-600" size={20} />;
      default:
        return <FileIcon className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR – Exact same as Client Dashboard (gradient dark) */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Client Portal (View-Only)</p>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<Eye />} label="View All Observations" />
            <SidebarItem icon={<BarChart3 />} label="Graphs & Site Insights" />
            <SidebarItem icon={<FileText />} label="Weekly/Monthly Reports" />
            <SidebarItem icon={<History />} label="Activity History" active />
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
              Activity History
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              Complete audit trail of all safety observations and actions
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

        {/* ACTIVITY TIMELINE */}
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="relative pl-12 pb-12 border-l-4 border-gray-200 hover:border-red-400 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 top-0 w-12 h-12 -ml-6 bg-white rounded-full shadow-lg border-4 border-gray-200 flex items-center justify-center group-hover:border-red-600 group-hover:scale-110 transition-all duration-300">
                {getStatusIcon(activity.status)}
              </div>

              {/* Activity Card */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                    <p className="text-gray-700 mt-2">{activity.description}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p className="font-medium">{activity.date}</p>
                    <p>{activity.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span className="font-medium">{activity.user}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="capitalize">{activity.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW-ONLY NOTE */}
        <div className="mt-16 text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 animate-slide-up" style={{ animationDelay: "600ms" }}>
          <p className="text-xl text-gray-700 font-medium">
            This timeline shows all safety-related activities in chronological order.
          </p>
          <p className="text-gray-600 mt-4">
            Full transparency with <strong>view-only access</strong> — no changes can be made from this portal.
          </p>
        </div>
      </main>

      {/* ANIMATIONS – Same as Client Dashboard */}
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

/* =======================
   Sidebar Item – Exact same as Client Dashboard
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