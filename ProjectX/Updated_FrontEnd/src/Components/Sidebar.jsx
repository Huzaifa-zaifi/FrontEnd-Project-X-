import React from "react";
import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  History,
  LogOut
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import HistoryPage from "./History";

export default function Sidebar() {
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
      
      {/* TOP */}
      <div>
        <div className="p-6">
          <h1 className="text-xl font-bold text-red-500 shadow-sm">REDVION</h1>
          <p className="text-sm text-gray-400">Employee Portal</p>
        </div>

        <nav className="px-4 space-y-2">
          <SidebarLink to="/EMP-dashboard" icon={<LayoutDashboard />} label="Dashboard" />
          <SidebarLink to="/submit" icon={<FilePlus />} label="Submit Report" />
          <SidebarLink to="/status" icon={<ClipboardList />} label="Report Status" />
          <SidebarLink to="/history" icon={<History />} label="History" />

        </nav>
      </div>

      {/* BOTTOM */}
      <div className="p-4 border-t border-gray-800">
        <div className="mb-3">
          <p className="text-sm font-medium truncate">
            {user?.email || "User"}
          </p>
          <p className="text-xs text-gray-400 capitalize">
            {user?.role || "employee"}
          </p>
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

/* NAVLINK ITEM */
function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
          isActive
            ? "bg-white text-black font-medium shadow-sm"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
