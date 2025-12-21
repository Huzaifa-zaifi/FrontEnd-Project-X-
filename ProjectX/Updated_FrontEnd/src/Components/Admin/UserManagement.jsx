import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UserPlus,
  Users,
  CheckCircle,
  Shield,
  Trash2,
  Ban,
  Key,
  Search,
  X
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function UserManagementDashboard() {
  const [users, setUsers] = useState([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Employee",
    department: "",
    password: ""
  });

  const token = localStorage.getItem("token");

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = Array.isArray(res.data) ? res.data : res.data.users || [];
      setUsers(usersData.filter(u => !u.isDeleted));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin": return "bg-red-100 text-red-700 border-red-200";
      case "Supervisor": return "bg-orange-100 text-orange-700 border-orange-200";
      case "client": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusColor = (status) =>
    status === "Active" ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-600 border-gray-300";

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const roleEnum = ["Employee", "Supervisor", "Safety Officer", "Admin", "Client"];

      const statusEnum = ["Active", "Inactive"];
      const role = roleEnum.includes(formData.role) ? formData.role : "Employee";
  
      const res = await axios.post(
        "http://localhost:5001/api/admin/users",
        { ...formData, role, status: "Active" }, // <-- explicitly set status
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setUsers(prev => [...prev, res.data.user]);
      setIsAddUserOpen(false);
      setFormData({ name: "", email: "", phone: "", role: "Employee", department: "", password: "" });
      alert("User created successfully");
    } catch (err) {
      console.error("Error creating user:", err);
      alert(err.response?.data?.message || "Failed to create user");
    }
  };
  

  const toggleStatus = async (user) => {
    try {
      const newStatus = user.status === "Active" ? "Inactive" : "Active";
      await axios.patch(
        `http://localhost:5001/api/admin/users/${user._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(prev => prev.map(u => u._id === user._id ? { ...u, status: newStatus } : u));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) return;
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please login first.");
      return;
    }
  
    try {
      const res = await axios.delete(`http://localhost:5001/api/admin/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.status === 200) {
        setUsers(prev => prev.filter(u => u._id !== user._id));
        alert("User deleted successfully.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      if (err.response?.status === 401) {
        alert("Session expired or unauthorized. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login page
      } else {
        alert(err.response?.data?.message || "Failed to delete user.");
      }
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">User Management</h2>
            <p className="text-gray-600 mt-1">Manage users, assign roles, and control access</p>
          </div>
          <button
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-3 px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow-xl"
          >
            <UserPlus size={22} /> Add New User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-8 py-4 text-left">User</th>
                <th className="px-8 py-4 text-left">Contact</th>
                <th className="px-8 py-4 text-left">Role</th>
                <th className="px-8 py-4 text-left">Department</th>
                <th className="px-8 py-4 text-left">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-red-50/30 transition-all">
                  <td className="px-8 py-6">{user.name}</td>
                  <td className="px-8 py-6">{user.email}<br/>{user.phone}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getRoleColor(user.role)}`}>{user.role}</span>
                  </td>
                  <td className="px-8 py-6">{user.department}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(user.status)}`}>{user.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right flex gap-2 justify-end">
                    <button onClick={() => toggleStatus(user)} title="Toggle Status"><Ban size={20} /></button>
                    <button onClick={() => deleteUser(user)} title="Delete"><Trash2 size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add User Modal */}
        {isAddUserOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Add New User</h3>
                <button onClick={() => setIsAddUserOpen(false)}><X size={24} /></button>
              </div>
              <form className="space-y-4" onSubmit={handleAddUser}>
                <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border" />
                <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border" />
                <input type="text" placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border" />
                <input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 rounded-xl border" />
                <select
  value={formData.role}
  onChange={e => setFormData({ ...formData, role: e.target.value })}
  className="w-full px-4 py-3 rounded-xl border"
>
  <option>Employee</option>
  <option>Supervisor</option>
  <option>Safety Officer</option>
  <option>Admin</option>
  <option>Client</option>   {/* <-- ADD THIS */}
</select>

                <input type="text" placeholder="Department" required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full px-4 py-3 rounded-xl border" />
                <div className="flex justify-end gap-4 pt-6">
                  <button type="button" onClick={() => setIsAddUserOpen(false)} className="px-8 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-red-600 text-white rounded-xl">Create User</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
