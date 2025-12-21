import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  Users,
  History,
  LogOut
} from "lucide-react";

const routes = [
  { label: "Dashboard", to: "/supervisor-dashboard", icon: <LayoutDashboard /> },
  { label: "View Approved Observations", to: "/view-observations", icon: <Eye /> },
  { label: "Approve/Reject Observations", to: "/approve-reject", icon: <UserCheck /> },
  { label: "Track Progress of Actions", to: "/track", icon: <History /> },
];

export default function SupervisorSidebar() {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.Location.href="/login";
  };
  return (
    <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
      <div>
        <div className="p-6 animate-fade-in">
          <h1 className="text-xl font-bold text-red-500">REDVION</h1>
          <p className="text-sm text-gray-400">Supervisor Portal</p>
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
          <p className="text-sm font-medium">Supervisor</p>
          <p className="text-xs text-gray-400">Safety Lead</p>
        </div>
        <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition"
                >
                  <LogOut size={18} />
                  Logout
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
