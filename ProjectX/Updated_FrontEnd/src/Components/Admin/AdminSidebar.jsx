import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  Users,
  History,
  LogOut,
  BarChart3,
  FileSpreadsheet,
  UserCog2
} from "lucide-react";

const routes = [
  { label: "Dashboard", to: "/admin-dashboard", icon: <LayoutDashboard /> },
  { label: "All Observations", to: "/all-observations", icon: <Eye /> },
  { label: "Approval Workflow", to: "/admin/approval", icon: <UserCheck /> },
  { label: "User Management", to: "/admin/user-management", icon: <Users /> },
  { label: "Roles & Permissions", to: "/admin/role-management", icon: <UserCog2 /> },
  { label: "Categories & Risks", to: "/admin/category-management", icon: <FileSpreadsheet /> },
  { label: "Reports & Analytics", to: "/admin/report-analytics", icon: <BarChart3 /> },
  { label: "Action History", to: "/admin/action-history", icon: <History /> },
];

export default function AdminSidebar() {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
      <div>
        <div className="p-6 animate-fade-in">
          <h1 className="text-xl font-bold text-red-500">REDVION</h1>
          <p className="text-sm text-gray-400">Admin Portal</p>
        </div>
        <nav className="px-4 space-y-2">
          {routes.map((route) => (
            <SidebarItem
              key={route.to}
              icon={route.icon}
              label={route.label}
              to={route.to}
              active={location.pathname === route.to}
            />
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-800 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="mb-3">
          <p className="text-sm font-medium">Admin</p>
          <p className="text-xs text-gray-400">Safety Lead</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, to, active }) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-2 ${
        active ? "bg-white text-black font-medium shadow-sm" : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {React.cloneElement(icon, { size: 20 })}
      <span className="transition-all duration-300">{label}</span>
    </Link>
  );
}
