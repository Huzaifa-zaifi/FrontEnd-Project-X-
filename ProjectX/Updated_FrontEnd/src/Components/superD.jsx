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
} from "lucide-react";

export default function SupervisorDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Supervisor Portal</p>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
            <SidebarItem icon={<Eye />} label="View New Observations" />
            <SidebarItem icon={<UserCheck />} label="Approve/Reject Observations" />
            <SidebarItem icon={<Users />} label="Assign Corrective Actions" />
            <SidebarItem icon={<History />} label="Track Progress of Actions" />
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="mb-3">
            <p className="text-sm font-medium">Supervisor</p>
            <p className="text-xs text-gray-400">Safety Lead</p>
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
              Welcome back, <span className="font-bold text-red-600">Supervisor</span>
            </h2>
            <p className="text-gray-600 mt-1">
              Review observations, approve/reject reports, and manage corrective actions
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="New Observations" value="8" icon={<FileText />} color="red" delay="100" />
          <StatCard title="Pending Review" value="5" icon={<Clock />} color="yellow" delay="200" />
          <StatCard title="Actions Assigned" value="12" icon={<AlertTriangle />} color="orange" delay="300" />
          <StatCard title="Completed Actions" value="24" icon={<CheckCircle />} color="green" delay="400" />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-slide-up">
            <h3 className="font-semibold text-lg text-gray-900 mb-5">Quick Actions</h3>

            <QuickAction icon={<Eye />} label="View New Observations" active />
            <QuickAction icon={<UserCheck />} label="Approve/Reject Observations" />
            <QuickAction icon={<Users />} label="Assign Corrective Actions" />
            <QuickAction icon={<History />} label="Track Progress of Actions" />
          </div>

          {/* EXAMPLE ACTION PANEL */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <h3 className="font-semibold text-xl text-gray-900 mb-6">Example: Assign Corrective Action</h3>

            <div className="space-y-6">
              {/* Observation Summary with subtle hover animation */}
              <div className="border-l-4 border-red-500 pl-5 bg-red-50/50 rounded-r-lg p-4 transition-all duration-300 hover:bg-red-50 hover:shadow-md hover:-translate-y-1">
                <p className="font-semibold text-lg text-gray-900">Oil spill near entrance</p>
                <p className="text-gray-700 mt-1">
                  Large oil spill detected near the main entrance. Slip hazard for all personnel.
                </p>
                <p className="text-sm text-gray-500 mt-2">Submitted by twat • 2 days ago</p>
              </div>

              <p className="text-gray-600 italic animate-fade-in" style={{ animationDelay: "500ms" }}>
                This panel appears when you select an observation to review and assign action.
                Supervisors can approve, reject, or assign corrective actions from the dedicated sections.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Tailwind Animations */}
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

/* REUSABLE COMPONENTS - With enhanced animations */

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