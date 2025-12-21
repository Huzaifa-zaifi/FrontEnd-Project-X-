import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UserCog,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function RolesPermissionsDashboard() {
  const [roles, setRoles] = useState([]);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");

  const token = localStorage.getItem("token");

  // Fetch roles from backend
  const fetchRoles = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5001/api/admin/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(res.data.roles || []);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  useEffect(() => { fetchRoles(); }, []);

  // Open modal for Add or Edit
  const openModal = (role = null) => {
    if (role) {
      setEditingRole(role);
      setRoleName(role.name);
      setRoleDesc(role.description);
    } else {
      setEditingRole(null);
      setRoleName("");
      setRoleDesc("");
    }
    setIsAddRoleOpen(true);
  };

  // Create or Update role
  const saveRole = async () => {
    if (!roleName) return alert("Role name is required");
    try {
      if (editingRole) {
        // Update role
        const res = await axios.patch(
          `http://localhost:5001/api/admin/roles/${editingRole._id}`,
          { name: roleName, description: roleDesc },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRoles(prev => prev.map(r => r._id === editingRole._id ? res.data.role : r));
      } else {
        // Create new role
        const res = await axios.post(
          "http://localhost:5001/api/admin/roles",
          { name: roleName, description: roleDesc },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRoles(prev => [...prev, res.data.role]);
      }
      setIsAddRoleOpen(false);
      setRoleName("");
      setRoleDesc("");
      setEditingRole(null);
    } catch (err) {
      console.error("Error saving role:", err);
      alert(err.response?.data?.message || "Failed to save role");
    }
  };

  // Delete role
  const deleteRole = async (roleId) => {
    if (!window.confirm("Delete this role?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/admin/roles/${roleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(prev => prev.filter(r => r._id !== roleId));
    } catch (err) {
      console.error("Error deleting role:", err);
      alert(err.response?.data?.message || "Failed to delete role");
    }
  };

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Roles & Permissions</h2>
            <p className="text-gray-600 mt-1">Define and manage access levels for different user roles</p>
          </div>

          <button
            onClick={() => openModal()}
            className="flex items-center gap-3 px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow-xl"
          >
            <Plus size={22} /> Create New Role
          </button>
        </div>

        {/* ROLES LIST */}
        <div className="space-y-10">
          {roles.map((role) => (
            <div key={role._id} className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="p-8 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{role.name}</h3>
                  <p className="text-gray-600 mt-2">{role.description}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => openModal(role)} title="Edit Role" className="p-3 bg-gray-100 rounded-xl"><Edit size={20} /></button>
                  <button onClick={() => deleteRole(role._id)} title="Delete Role" className="p-3 bg-red-100 rounded-xl"><Trash2 size={20} /></button>
                </div>
              </div>

              {/* PERMISSIONS GRID */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(role.permissions || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span>{permissionLabels[key]}</span>
                    {value ? <CheckCircle size={24} className="text-green-600" /> : <XCircle size={24} className="text-gray-400" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ADD / EDIT ROLE MODAL */}
        {isAddRoleOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">{editingRole ? "Edit Role" : "Create New Role"}</h3>
              <input
                type="text"
                placeholder="Role Name"
                value={roleName}
                onChange={e => setRoleName(e.target.value)}
                className="w-full p-3 rounded-xl border mb-4"
              />
              <textarea
                placeholder="Description"
                value={roleDesc}
                onChange={e => setRoleDesc(e.target.value)}
                className="w-full p-3 rounded-xl border mb-4"
              />
              <div className="flex justify-end gap-4">
                <button onClick={() => setIsAddRoleOpen(false)} className="px-4 py-2 rounded-xl bg-gray-100">Cancel</button>
                <button onClick={saveRole} className="px-4 py-2 rounded-xl bg-red-600 text-white">{editingRole ? "Save Changes" : "Create"}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
