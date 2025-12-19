import React from "react";
import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  History,
  LogOut
} from "lucide-react";

export default function Sidebar({ active = "dashboard" }) {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
      
      {/* TOP */}
      <div>
        <div className="p-6">
          <h1 className="text-xl font-bold text-red-500">REDVION</h1>
          <p className="text-sm text-gray-400">Employee Portal</p>
        </div>

        <nav className="px-4 space-y-2">
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            active={active === "dashboard"}
          />
          <SidebarItem
            icon={<FilePlus />}
            label="Submit Report"
            active={active === "submit"}
          />
          <SidebarItem
            icon={<ClipboardList />}
            label="Report Status"
            active={active === "status"}
          />
          <SidebarItem
            icon={<History />}
            label="History"
            active={active === "history"}
          />
        </nav>
      </div>

      {/* BOTTOM */}
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
  );
}

/* SIDEBAR ITEM */
function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
        active
          ? "bg-white text-black font-medium"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}
