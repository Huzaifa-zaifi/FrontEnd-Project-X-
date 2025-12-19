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
  FileSpreadsheet,
  Download,
  BarChart3,
  Search,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";

export default function ApprovalWorkflowDashboard() {
  const pendingApprovals = [
    {
      id: 1,
      title: "Oil spill near entrance",
      description: "Large oil spill detected near the main entrance. Slip hazard for all personnel.",
      submitter: "twat",
      submitted: "2 days ago",
      category: "Housekeeping",
      type: "Unsafe Condition",
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
      image: true,
    },
    {
      id: 5,
      title: "Loose electrical wiring in panel",
      description: "Exposed wiring observed in electrical panel B-12. Risk of electrical shock.",
      submitter: "mike_brown",
      submitted: "1 day ago",
      category: "Electrical",
      type: "Unsafe Condition",
      image: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Admin Portal</p>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<Eye />} label="All Observations" />
            <SidebarItem icon={<UserCheck />} label="Approval Workflow" active />
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
              Approval Workflow
            </h2>
            <p className="text-gray-600 mt-1">
              Review and approve or reject submitted safety observations before they enter corrective action phase
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search pending approvals..."
              className="pl-12 pr-6 py-3 w-80 rounded-xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Pending Approval" value="8" icon={<Clock />} color="yellow" delay="100" />
          <StatCard title="Approved Today" value="12" icon={<ThumbsUp />} color="green" delay="200" />
          <StatCard title="Rejected Today" value="3" icon={<ThumbsDown />} color="red" delay="300" />
          <StatCard title="Avg. Approval Time" value="18h" icon={<Calendar />} color="orange" delay="400" />
        </div>

        {/* PENDING APPROVALS LIST */}
        <div className="space-y-8">
          {pendingApprovals.map((obs, index) => (
            <div
              key={obs.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden animate-slide-up transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col lg:flex-row">
                {/* IMAGE SECTION */}
                <div className="lg:w-96 bg-gradient-to-br from-red-50/30 to-white p-8 border-r border-gray-200">
                  <div className="h-80 rounded-3xl bg-white border-4 border-dashed border-red-200 flex flex-col items-center justify-center text-red-400 shadow-inner">
                    <ImageIcon size={60} className="mb-4" />
                    <span className="text-xl font-bold">Photo Attached</span>
                    <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center gap-2 shadow-lg">
                      <Eye size={20} />
                      View Full Image
                    </button>
                  </div>
                </div>

                {/* CONTENT SECTION */}
                <div className="flex-1 p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-extrabold text-gray-900 mb-3">{obs.title}</h3>
                      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <User size={18} /> {obs.submitter}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={18} /> {obs.submitted}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar size={18} /> {obs.category}
                        </span>
                      </div>
                    </div>
                    <span className="px-6 py-3 rounded-full text-base font-bold flex items-center gap-3 bg-orange-100 text-orange-800 shadow-md">
                      <AlertCircle size={20} />
                      Pending Review
                    </span>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-10">{obs.description}</p>

                  {/* ACTION BUTTONS - Green & Red */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* APPROVE BUTTON */}
                    <button className="relative overflow-hidden flex-1 group rounded-2xl bg-gradient-to-r from-green-600 to-green-700 px-10 py-6 text-white text-xl font-bold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative flex items-center justify-center gap-4">
                        <ThumbsUp size={32} className="group-hover:scale-110 transition-transform duration-300" />
                        Approve & Proceed to Action
                      </span>
                    </button>

                    {/* REJECT BUTTON */}
                    <button className="relative overflow-hidden flex-1 group rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-10 py-6 text-white text-xl font-bold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative flex items-center justify-center gap-4">
                        <ThumbsDown size={32} className="group-hover:scale-110 transition-transform duration-300" />
                        Reject Observation
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 20px 10px rgba(239, 68, 68, 0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.9s ease-out forwards;
        }
        .animate-pulse-red {
          animation: pulseRed 2s infinite;
        }
      `}</style>
    </div>
  );
}

/* REUSABLE COMPONENTS */
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
