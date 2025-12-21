import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Eye,
  History,
  LogOut,
  BarChart4,
  FileText,
  Download,
  BookDashed
} from "lucide-react";
import { downloadReports } from "../../services/clientService";

const routes = [
  { label: "Dashboard", to: "/client-dashboard", icon: <BookDashed /> },
  { label: "View All Observations", to: "/clients/ClientsAllobs", icon: <Eye /> },
  // { label: "Graphs & Site Insights", to: "/clients/Clientgraphs", icon: <BarChart4 /> },
  { label: "Graphs & Site Insights", to: "#", icon: <BarChart4 /> },
  // { label: "Weekly/Monthly Reports", to: "/clients/ClientReports", icon: <FileText /> },
  { label: "Weekly/Monthly Reports", to: "#", icon: <FileText /> },
  { label: "Full Activity History", to: "/clients/ActivityHistory", icon: <History /> },
  { label: "Download Reports (PDF)", to: "/download-reports-pdf", icon: <Download />, download: "pdf" },
  { label: "Download Reports (Excel)", to: "/download-reports-excel", icon: <Download />, download: "excel" },
];

export default function ClientSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleDownload = async (format) => {
    try {
      const fileData = await downloadReports(format); // call API
      const url = window.URL.createObjectURL(new Blob([fileData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `reports.${format === "excel" ? "xlsx" : "pdf"}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Make sure the server is running and the token is valid.");
    }
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
      <div>
        <div className="p-6 animate-fade-in">
          <h1 className="text-xl font-bold text-red-500">REDVION</h1>
          <p className="text-sm text-gray-400">Client Portal</p>
        </div>

        <nav className="px-4 space-y-2">
          {routes.map((route) =>
            route.download ? (
              <SidebarItem
                key={route.label}
                icon={route.icon}
                label={route.label}
                onClick={() => handleDownload(route.download)}
              />
            ) : (
              <SidebarItem
                key={route.to}
                icon={route.icon}
                label={route.label}
                to={route.to}
                active={location.pathname === route.to}
              />
            )
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="mb-3">
          <p className="text-sm font-medium">Admin</p>
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

function SidebarItem({ icon, label, to, active, onClick, disabled }) {
  if (to) {
    return (
      <Link
        to={disabled ? "#" : to} // don't navigate if disabled
        className={`group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-2 ${
          disabled
            ? "text-gray-600 cursor-not-allowed" // gray out disabled item
            : active
            ? "bg-white text-black font-medium shadow-sm"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`}
      >
        {React.cloneElement(icon, { size: 20 })}
        <span className="transition-all duration-300">{label}</span>
      </Link>
    );
  }

  // Clickable action (download)
  return (
    <div
      onClick={disabled ? null : onClick} // disable click
      className={`group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-2 ${
        disabled ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {React.cloneElement(icon, { size: 20 })}
      <span className="transition-all duration-300">{label}</span>
    </div>
  );
}
