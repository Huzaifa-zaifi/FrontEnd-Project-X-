import React, { useState } from "react";
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  Users,
  History,
  LogOut,
  UserCog,
  FileSpreadsheet,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  X,
  Save,
} from "lucide-react";

export default function CategoriesRisksDashboard() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Housekeeping",
      description: "Unsafe conditions related to spills, clutter, and cleanliness",
      riskLevel: "High",
      items: 12,
      color: "red",
    },
    {
      id: 2,
      name: "PPE Compliance",
      description: "Observations regarding personal protective equipment usage",
      riskLevel: "Medium",
      items: 8,
      color: "orange",
    },
    {
      id: 3,
      name: "Electrical",
      description: "Electrical hazards and unsafe wiring or equipment",
      riskLevel: "High",
      items: 5,
      color: "red",
    },
    {
      id: 4,
      name: "Ergonomics",
      description: "Workplace ergonomics and employee posture observations",
      riskLevel: "Low",
      items: 10,
      color: "green",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    riskLevel: "Medium",
    color: "orange",
  });

  const riskColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-orange-100 text-orange-700",
    Low: "bg-green-100 text-green-700",
  };

  const openForm = (category = null) => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        riskLevel: category.riskLevel,
        color: category.color,
      });
      setEditingId(category.id);
    } else {
      setFormData({ name: "", description: "", riskLevel: "Medium", color: "orange" });
      setEditingId(null);
    }
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...cat, ...formData } : cat
      ));
    } else {
      const newCategory = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...formData,
        items: 0,
      };
      setCategories([...categories, newCategory]);
    }

    setShowForm(false);
    setFormData({ name: "", description: "", riskLevel: "Medium", color: "orange" });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(c => c.id !== id));
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
            <SidebarItem icon={<UserCog />} label="Roles & Permissions" />
            <SidebarItem icon={<FileSpreadsheet />} label="Categories & Risks" active />
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Categories & Risks</h2>
            <p className="text-gray-600 mt-1">
              Manage safety categories and their associated risk levels across the organization
            </p>
          </div>

          <button
            onClick={() => openForm()}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-105 hover:shadow-xl animate-pulse-red"
          >
            <Plus size={28} />
            Create New Category
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Categories" value={categories.length} icon={<FileSpreadsheet />} color="red" delay="100" />
          <StatCard title="High Risk" value={categories.filter(c => c.riskLevel === "High").length} icon={<AlertTriangle />} color="red" delay="200" />
          <StatCard title="Medium Risk" value={categories.filter(c => c.riskLevel === "Medium").length} icon={<AlertTriangle />} color="orange" delay="300" />
          <StatCard title="Low Risk" value={categories.filter(c => c.riskLevel === "Low").length} icon={<CheckCircle />} color="green" delay="400" />
        </div>

        {/* CATEGORY LIST */}
        <div className="space-y-10">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden animate-slide-up transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 hover:border-red-200"
              style={{ animationDelay: `${index * 200 + 300}ms` }}
            >
              {/* HEADER SECTION */}
              <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-extrabold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600 text-lg max-w-4xl leading-relaxed mt-2">{category.description}</p>
                    <span className={`mt-4 inline-block px-5 py-2 rounded-full font-bold text-lg ${riskColors[category.riskLevel]}`}>
                      Risk: {category.riskLevel}
                    </span>
                  </div>

                  {/* ACTION BUTTONS - Placed in top-right corner */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => openForm(category)}
                      className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                      title="Edit Category"
                    >
                      <Edit size={24} className="text-gray-600" />
                    </button>

                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                      title="Delete Category"
                    >
                      <Trash2 size={24} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* BOTTOM SECTION - Only Items Card (centered) */}
              <div className="p-10 flex items-center justify-center">
                <div className="w-full max-w-md p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium text-lg">Items in category</span>
                    <span className="text-gray-900 font-bold text-2xl">{category.items}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CREATE / EDIT FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in-backdrop">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-slide-up-modal">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {editingId ? "Edit Category" : "Create New Category"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                <X size={28} className="text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-7">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">Category Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g., Machine Guarding"
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  placeholder="Describe what this safety category covers..."
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">Risk Level</label>
                  <select
                    value={formData.riskLevel}
                    onChange={(e) => {
                      const level = e.target.value;
                      const colorMap = { Low: "green", Medium: "orange", High: "red" };
                      setFormData({ ...formData, riskLevel: level, color: colorMap[level] });
                    }}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">Display Color</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                  >
                    <option value="green">Green</option>
                    <option value="orange">Orange</option>
                    <option value="red">Red</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-4 text-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-2xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-pulse-red"
                >
                  <Save size={24} />
                  {editingId ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 30px 15px rgba(239, 68, 68, 0); }
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-slide-up { animation: slideUp 1s ease-out forwards; }
        .animate-pulse-red { animation: pulseRed 3s infinite; }
        .animate-fade-in-backdrop { animation: fadeInBackdrop 0.4s ease-out; }
        .animate-slide-up-modal { animation: slideUpModal 0.5s ease-out; }
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