import React, { useState } from "react";
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  Users,
  History,
  LogOut,
  UserCog,
  Shield,
  CheckCircle,
  XCircle,
  ChevronRight,
  FileSpreadsheet,
  BarChart3,
  Search,
  Plus,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Eye as EyeIcon,
  EyeOff,
  MoreVertical,
} from "lucide-react";

export default function RolesPermissionsDashboard() {
  const [roles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full system access including user management, settings, and reports",
      userCount: 2,
      color: "red",
      permissions: {
        viewObservations: true,
        approveObservations: true,
        assignActions: true,
        trackProgress: true,
        manageUsers: true,
        manageRoles: true,
        manageCategories: true,
        viewReports: true,
        exportData: true,
      },
    },
    {
      id: 2,
      name: "Supervisor",
      description: "Can approve observations, assign corrective actions, and track progress",
      userCount: 8,
      color: "orange",
      permissions: {
        viewObservations: true,
        approveObservations: true,
        assignActions: true,
        trackProgress: true,
        manageUsers: false,
        manageRoles: false,
        manageCategories: false,
        viewReports: true,
        exportData: false,
      },
    },
    {
      id: 3,
      name: "Safety Officer",
      description: "Can view all observations and generate reports",
      userCount: 4,
      color: "purple",
      permissions: {
        viewObservations: true,
        approveObservations: false,
        assignActions: false,
        trackProgress: true,
        manageUsers: false,
        manageRoles: false,
        manageCategories: true,
        viewReports: true,
        exportData: true,
      },
    },
    {
      id: 4,
      name: "Employee",
      description: "Can submit observations and view personal report status",
      userCount: 34,
      color: "gray",
      permissions: {
        viewObservations: false,
        approveObservations: false,
        assignActions: false,
        trackProgress: false,
        manageUsers: false,
        manageRoles: false,
        manageCategories: false,
        viewReports: false,
        exportData: false,
      },
    },
  ]);

  const permissionLabels = {
    viewObservations: "View All Observations",
    approveObservations: "Approve/Reject Observations",
    assignActions: "Assign Corrective Actions",
    trackProgress: "Track Action Progress",
    manageUsers: "Manage Users",
    manageRoles: "Manage Roles & Permissions",
    manageCategories: "Manage Categories & Risks",
    viewReports: "View Reports & Analytics",
    exportData: "Export Data",
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "red":
        return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200";
      case "orange":
        return "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200";
      case "purple":
        return "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200";
    }
  };

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
            <SidebarItem icon={<UserCheck />} label="Approval Workflow" />
            <SidebarItem icon={<Users />} label="User Management" />
            <SidebarItem icon={<UserCog />} label="Roles & Permissions" active />
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
              Roles & Permissions
            </h2>
            <p className="text-gray-600 mt-1">
              Define and manage access levels for different user roles in the REDVION safety platform
            </p>
          </div>

          <button className="relative overflow-hidden group flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-xl transition-all hover:scale-105 animate-pulse-red">
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition" />
            <Plus size={22} />
            Create New Role
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Roles" value="4" icon={<UserCog />} color="red" delay="100" />
          <StatCard title="Custom Roles" value="1" icon={<Shield />} color="orange" delay="200" />
          <StatCard title="Active Permissions" value="27" icon={<CheckCircle />} color="green" delay="300" />
          <StatCard title="Users Assigned" value="48" icon={<Users />} color="yellow" delay="400" />
        </div>

        {/* ROLES LIST */}
        <div className="space-y-10">
          {roles.map((role, index) => (
            <div
              key={role.id}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden animate-slide-up transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 hover:border-red-200"
              style={{ animationDelay: `${index * 200 + 300}ms` }}
            >
              <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-3xl ${getColorClasses(role.color).split(' ')[0]} flex items-center justify-center shadow-2xl animate-float`}>
                      <UserCog size={40} className={`text-${role.color === 'gray' ? 'gray' : role.color}-700`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-5 mb-3">
                        <h3 className="text-3xl font-extrabold text-gray-900">{role.name}</h3>
                        <span className={`px-6 py-3 rounded-full text-base font-bold border-2 shadow-md transition-all hover:scale-105 ${getColorClasses(role.color)}`}>
                          {role.userCount} Users
                        </span>
                      </div>
                      <p className="text-gray-600 text-lg max-w-4xl leading-relaxed">{role.description}</p>
                    </div>
                  </div>

                  {/* ACTION BUTTONS - Matching your screenshot exactly */}
                  <div className="flex items-center gap-6 opacity-0 animate-fade-in" style={{ animationDelay: `${index * 200 + 600}ms` }}>
                    {/* Edit Button */}
                    <button 
                      className="relative group p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200"
                      title="Edit Role"
                    >
                      <Edit size={28} className="text-gray-600 group-hover:text-gray-900 transition" />
                    </button>

                    {/* Delete Button */}
                    <button 
                      className="relative group p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200"
                      title="Delete Role"
                    >
                      <Trash2 size={28} className="text-red-600 group-hover:text-red-800 transition" />
                    </button>
                  </div>
                </div>
              </div>

              {/* PERMISSIONS GRID */}
              <div className="p-10">
                <h4 className="text-xl font-bold text-gray-900 mb-8 animate-fade-in" style={{ animationDelay: `${index * 200 + 800}ms` }}>
                  Permissions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(role.permissions).map(([key, value], permIndex) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-500 border border-gray-200"
                      style={{ animationDelay: `${index * 200 + 900 + permIndex * 80}ms`, opacity: 0, animation: "fadeInUp 0.8s ease-out forwards" }}
                    >
                      <span className="text-gray-800 font-medium text-lg">{permissionLabels[key]}</span>
                      <div className="transition-all duration-500 hover:scale-125">
                        {value ? (
                          <CheckCircle size={36} className="text-green-600 animate-pulse" />
                        ) : (
                          <XCircle size={36} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ENHANCED ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 30px 15px rgba(239, 68, 68, 0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
        .animate-pulse-red {
          animation: pulseRed 3s infinite;
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