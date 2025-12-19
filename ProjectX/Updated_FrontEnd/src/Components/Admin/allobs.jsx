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
  BarChart3,
  TrendingUp,
  Calendar,
  User,
  Search,
  Filter,
  UserCog,   
  FileSpreadsheet,
  Image as ImageIcon,
} from "lucide-react";

export default function AllObservationsDashboard() {
  // Sample data for graphs
  const monthlyData = [
    { month: "Jan", observations: 45 },
    { month: "Feb", observations: 52 },
    { month: "Mar", observations: 48 },
    { month: "Apr", observations: 61 },
    { month: "May", observations: 55 },
    { month: "Jun", observations: 67 },
    { month: "Jul", observations: 72 },
    { month: "Aug", observations: 68 },
    { month: "Sep", observations: 75 },
    { month: "Oct", observations: 82 },
    { month: "Nov", observations: 78 },
    { month: "Dec", observations: 90 },
  ];

  const categoryData = [
    { category: "PPE", count: 42, color: "bg-red-500" },
    { category: "Housekeeping", count: 38, color: "bg-orange-500" },
    { category: "Chemical", count: 28, color: "bg-yellow-500" },
    { category: "Machinery", count: 25, color: "bg-green-500" },
    { category: "Electrical", count: 18, color: "bg-blue-500" },
    { category: "Other", count: 12, color: "bg-gray-500" },
  ];

  const observations = [
    {
      id: 1,
      title: "Oil spill near entrance",
      description: "Large oil spill detected near the main entrance. Slip hazard for all personnel.",
      submitter: "twat",
      submitted: "2 days ago",
      category: "Housekeeping",
      type: "Unsafe Condition",
      status: "Action Assigned",
      image: true,
    },
    {
      id: 2,
      title: "Worker without safety helmet",
      description: "Observed worker in Zone A not wearing required safety helmet while operating machinery.",
      submitter: "john_doe",
      submitted: "3 days ago",
      category: "PPE",
      type: "Unsafe Act",
      status: "Completed",
      image: true,
    },
    {
      id: 3,
      title: "Improper chemical storage",
      description: "Chemicals stored without proper labeling in Warehouse C.",
      submitter: "jane_smith",
      submitted: "5 days ago",
      category: "Chemical",
      type: "Unsafe Condition",
      status: "In Progress",
      image: true,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Action Assigned":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* SIDEBAR - Exact same as Supervisor/Admin */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Admin Portal</p>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<Eye />} label="All Observations" active />
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
              All Observations
            </h2>
            <p className="text-gray-600 mt-1">
              Complete overview of every safety observation submitted across the organization
            </p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search observations..."
                className="pl-12 pr-6 py-3 w-80 rounded-xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
              <Filter size={20} />
              Filter
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Observations" value="723" icon={<FileText />} color="red" delay="100" />
          <StatCard title="This Month" value="90" icon={<Calendar />} color="yellow" delay="200" />
          <StatCard title="Open Actions" value="142" icon={<AlertTriangle />} color="orange" delay="300" />
          <StatCard title="Completion Rate" value="88%" icon={<CheckCircle />} color="green" delay="400" />
        </div>

        {/* GRAPHS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-up">
            <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-3">
              <TrendingUp className="text-red-600" /> Observations Trend (2025)
            </h3>
            <div className="h-64 flex items-end justify-between gap-3">
              {monthlyData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-700 hover:from-red-600 hover:to-red-500"
                    style={{ height: `${(data.observations / 90) * 100}%` }}
                  />
                  <p className="text-xs text-gray-500 mt-2">{data.month}</p>
                  <p className="text-sm font-semibold text-gray-700">{data.observations}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-3">
              <BarChart3 className="text-red-600" /> Top Categories
            </h3>
            <div className="space-y-4">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32">
                    <p className="text-sm font-medium text-gray-700">{cat.category}</p>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 overflow-hidden">
                    <div
                      className={`${cat.color} h-full rounded-full transition-all duration-1000`}
                      style={{ width: `${(cat.count / 42) * 100}%` }}
                    />
                  </div>
                  <p className="w-16 text-right font-bold text-gray-900">{cat.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OBSERVATIONS LIST */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-slide-up" style={{ animationDelay: "400ms" }}>
          <h3 className="font-semibold text-xl text-gray-900 mb-6">Recent Observations</h3>
          <div className="space-y-6">
            {observations.map((obs, index) => (
              <div
                key={obs.id}
                className="border-l-4 border-red-500 pl-5 bg-red-50/50 rounded-r-lg p-5 transition-all duration-300 hover:bg-red-50 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h4 className="font-semibold text-lg text-gray-900">{obs.title}</h4>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(obs.status)}`}>
                        {obs.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-5 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><User size={16} /> {obs.submitter}</span>
                      <span className="flex items-center gap-1"><Clock size={16} /> {obs.submitted}</span>
                      <span className="flex items-center gap-1"><Calendar size={16} /> {obs.category}</span>
                    </div>
                    <p className="text-gray-700">{obs.description}</p>
                  </div>
                  {obs.image && (
                    <div className="ml-8">
                      <div className="w-36 h-36 rounded-xl border-2 border-dashed border-red-200 flex items-center justify-center text-red-400 bg-red-50">
                        <ImageIcon size={40} />
                      </div>
                      <p className="text-xs text-center text-gray-500 mt-2">Photo Attached</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* SAME ANIMATIONS */}
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

/* EXACT SAME REUSABLE COMPONENTS */
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