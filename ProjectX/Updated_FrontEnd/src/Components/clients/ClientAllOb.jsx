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
  Search,
  Filter,
  Clock,
  User,
  Building,
} from "lucide-react";

/* =======================
   Reusable Components – Same as Client Dashboard
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

function StatusBadge({ status }) {
  const styles = {
    open: "bg-orange-100 text-orange-700 border-orange-200",
    closed: "bg-green-100 text-green-700 border-green-200",
    "high-risk": "bg-red-100 text-red-700 border-red-200",
  };

  const icons = {
    open: <Clock size={14} />,
    closed: <CheckCircle size={14} />,
    "high-risk": <AlertTriangle size={14} />,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </span>
  );
}

/* =======================
   CLIENT – VIEW ALL OBSERVATIONS PAGE (View-Only)
======================= */
export default function ClientAllObservations() {
  const observations = [
    {
      id: "OBS-156",
      title: "Damaged electrical panel in Warehouse B",
      category: "Electrical",
      risk: "high-risk",
      status: "open",
      reportedBy: "John Martinez",
      location: "Warehouse B – Zone 3",
      date: "Dec 18, 2025",
      description: "Exposed wiring observed on main distribution panel. Immediate isolation recommended.",
    },
    {
      id: "OBS-155",
      title: "Housekeeping issue – Loading Dock",
      category: "Housekeeping",
      risk: "open",
      status: "closed",
      reportedBy: "Sarah Chen",
      location: "Loading Dock",
      date: "Dec 17, 2025",
      description: "Spilled materials cleared and area verified safe.",
    },
    {
      id: "OBS-154",
      title: "Missing machine guard on conveyor",
      category: "Machine Guarding",
      risk: "high-risk",
      status: "open",
      reportedBy: "Mike Johnson",
      location: "Production Line 2",
      date: "Dec 16, 2025",
      description: "Guard removed for maintenance and not replaced. Lockout required until fixed.",
    },
    {
      id: "OBS-153",
      title: "Ergonomic concern – Workstation 14",
      category: "Ergonomics",
      risk: "open",
      status: "closed",
      reportedBy: "Emma Wilson",
      location: "Assembly Area",
      date: "Dec 15, 2025",
      description: "Adjustable chair and monitor arm installed.",
    },
    {
      id: "OBS-152",
      title: "PPE non-compliance observed",
      category: "PPE Compliance",
      risk: "open",
      status: "open",
      reportedBy: "David Lee",
      location: "Chemical Storage",
      date: "Dec 14, 2025",
      description: "Employee observed without required chemical-resistant gloves.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR – Same as Client Dashboard */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Client Portal (View-Only)</p>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<Eye />} label="View All Observations" active />
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
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Eye className="text-red-600" size={36} />
                All Safety Observations
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Complete view-only list of all reported safety observations for your sites
              </p>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar size={18} />
              Data current as of December 20, 2025
            </div>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by ID, title, category, location..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* OBSERVATIONS LIST */}
        <div className="space-y-5">
          {observations.map((obs, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{obs.title}</h3>
                        <StatusBadge status={obs.risk} />
                        <StatusBadge status={obs.status} />
                      </div>
                      <p className="text-sm text-gray-500">Observation ID: <strong>{obs.id}</strong></p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{obs.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText size={16} />
                      <span>Category: <strong>{obs.category}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building size={16} />
                      <span>Location: <strong>{obs.location}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={16} />
                      <span>Reported by: <strong>{obs.reportedBy}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span>Date: <strong>{obs.date}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Optional: Future image preview placeholder */}
                <div className="md:w-48 h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                  <Eye size={32} />
                  <p className="text-xs mt-2 text-center">Photo evidence<br />(View-only)</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-10 flex justify-center items-center gap-3">
          <button className="px-5 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition font-medium">
            Previous
          </button>
          <span className="px-5 py-3 bg-red-600 text-white rounded-xl font-bold">1</span>
          <button className="px-5 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition font-medium">
            Next
          </button>
        </div>

        {/* VIEW-ONLY NOTICE */}
        <div className="mt-12 text-center p-6 bg-gray-100 rounded-2xl">
          <p className="text-gray-700 font-medium">
            This is a <strong>view-only portal</strong>. All observations are managed by your dedicated safety team.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Questions? Contact your REDVION account manager.
          </p>
        </div>
      </main>

      {/* ANIMATIONS – Same as before */}
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