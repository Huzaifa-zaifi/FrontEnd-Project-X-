import React from "react";
import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  History,
  LogOut,
  Send
} from "lucide-react";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";

export default function SubmitReport() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">Submit Observation</h2>
          <p className="text-gray-500">
            Report unsafe acts or conditions
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl">
          
          {/* TITLE */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observation Title
            </label>
            <input
              type="text"
              placeholder="Brief title of the observation"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* TYPE */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observation Type
            </label>
            <select className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none">
              <option>Unsafe Act</option>
              <option>Unsafe Condition</option>
              <option>Near Miss</option>
            </select>
          </div>

          {/* LOCATION */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. Warehouse Area A"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Describe the observation in detail"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none resize-none"
            />
          </div>

          {/* ACTION BUTTON */}
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-lg font-medium">
            <Send size={18} />
            Submit Report
          </button>
        </div>
      </main>
    </div>
  );
}

/* REUSABLE SIDEBAR ITEM */
function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
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
