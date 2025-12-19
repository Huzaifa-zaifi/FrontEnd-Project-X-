import React, { useState } from "react";
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  Users,
  History,
  LogOut,
  UserPlus,
  UserCog,
  Shield,
  Mail,
  Phone,
  Calendar,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ChevronRight,
  FileSpreadsheet,
  BarChart3,
  X,
  Key,
  Ban,
  UserCheck2,
  Mail as MailIcon,
  Eye as EyeIcon,
  Download,
  Lock,
  MessageSquare,
} from "lucide-react";

export default function UserManagementDashboard() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Employee",
    department: "",
  });

  const [selectedUserId, setSelectedUserId] = useState(null); // For dropdown menu

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Mark Johnson",
      email: "mark.johnson@redvion.com",
      phone: "+1 555-0101",
      role: "Supervisor",
      department: "Maintenance",
      status: "Active",
      joined: "Jan 2024",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.w@redvion.com",
      phone: "+1 555-0102",
      role: "Supervisor",
      department: "Warehouse",
      status: "Active",
      joined: "Mar 2024",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@redvion.com",
      phone: "+1 555-0103",
      role: "Employee",
      department: "Housekeeping",
      status: "Active",
      joined: "Jun 2024",
    },
    {
      id: 4,
      name: "David Chen",
      email: "david.chen@redvion.com",
      phone: "+1 555-0104",
      role: "Safety Officer",
      department: "Safety",
      status: "Active",
      joined: "Feb 2023",
    },
    {
      id: 5,
      name: "John Doe",
      email: "john.doe@redvion.com",
      phone: "+1 555-0105",
      role: "Employee",
      department: "Production",
      status: "Inactive",
      joined: "Nov 2025",
    },
  ]);

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "Supervisor":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Safety Officer":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusColor = (status) => {
    return status === "Active" 
      ? "bg-green-100 text-green-700 border-green-200" 
      : "bg-gray-100 text-gray-600 border-gray-300";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData,
      status: "Active",
      joined: "Dec 2025",
    };
    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
    setFormData({ name: "", email: "", phone: "", role: "Employee", department: "" });
  };

  const toggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    ));
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const resetPassword = (email) => {
    alert(`Password reset email sent to ${email}`);
  };

  const viewProfile = (name) => {
    alert(`Viewing profile for ${name}`);
  };

  const sendMessage = (name) => {
    alert(`Opening message composer for ${name}`);
  };

  const exportData = (name) => {
    alert(`Exporting data for ${name}...`);
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
            <SidebarItem icon={<Users />} label="User Management" active />
            <SidebarItem icon={<UserCog />} label="Roles & Permissions" />
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
              User Management
            </h2>
            <p className="text-gray-600 mt-1">
              Manage users, assign roles, and control access across the REDVION safety platform
            </p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-12 pr-6 py-3 w-80 rounded-xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
              />
            </div>

            <button 
              onClick={() => setIsAddUserOpen(true)}
              className="relative overflow-hidden group flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-xl transition-all hover:scale-105"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition" />
              <UserPlus size={22} />
              Add New User
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={users.length} icon={<Users />} color="red" delay="100" />
          <StatCard title="Active Users" value={users.filter(u => u.status === "Active").length} icon={<CheckCircle />} color="green" delay="200" />
          <StatCard title="Supervisors" value={users.filter(u => u.role === "Supervisor").length} icon={<Shield />} color="orange" delay="300" />
          <StatCard title="New This Month" value="5" icon={<UserPlus />} color="yellow" delay="400" />
        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 animate-slide-up overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">All Users</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                  <th className="px-8 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-red-50/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 100 + 200}ms`, opacity: 0, animation: "fadeIn 0.8s ease-out forwards" }}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MailIcon size={16} />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-gray-700 font-medium">
                      {user.department}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-gray-600">
                      {user.joined}
                    </td>
                    <td className="px-8 py-6 text-right relative">
                      <div className="flex items-center justify-end gap-4">
                        {/* Edit */}
                        <button className="p-3 hover:bg-gray-100 rounded-xl transition group" title="Edit User">
                          <Edit size={20} className="text-gray-600 group-hover:text-gray-900" />
                        </button>

                        {/* Toggle Status */}
                        <button 
                          onClick={() => toggleStatus(user.id)}
                          className="p-3 hover:bg-gray-100 rounded-xl transition group"
                          title={user.status === "Active" ? "Deactivate User" : "Activate User"}
                        >
                          {user.status === "Active" ? (
                            <Ban size={20} className="text-orange-600 group-hover:text-orange-800" />
                          ) : (
                            <UserCheck2 size={20} className="text-green-600 group-hover:text-green-800" />
                          )}
                        </button>

                        {/* Reset Password */}
                        <button 
                          onClick={() => resetPassword(user.email)}
                          className="p-3 hover:bg-gray-100 rounded-xl transition group"
                          title="Reset Password"
                        >
                          <Key size={20} className="text-blue-600 group-hover:text-blue-800" />
                        </button>

                        {/* Delete */}
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="p-3 hover:bg-red-100 rounded-xl transition group"
                          title="Delete User"
                        >
                          <Trash2 size={20} className="text-red-600 group-hover:text-red-800" />
                        </button>

                        {/* More Options Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => setSelectedUserId(selectedUserId === user.id ? null : user.id)}
                            className="p-3 hover:bg-gray-100 rounded-xl transition group"
                            title="More Options"
                          >
                            <MoreVertical size={20} className="text-gray-600 group-hover:text-gray-900" />
                          </button>

                          {selectedUserId === user.id && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 z-10 animate-slide-up">
                              <div className="py-2">
                                <button
                                  onClick={() => {
                                    viewProfile(user.name);
                                    setSelectedUserId(null);
                                  }}
                                  className="w-full px-5 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition"
                                >
                                  <EyeIcon size={18} className="text-gray-600" />
                                  <span className="text-gray-800">View Profile</span>
                                </button>
                                <button
                                  onClick={() => {
                                    sendMessage(user.name);
                                    setSelectedUserId(null);
                                  }}
                                  className="w-full px-5 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition"
                                >
                                  <MessageSquare size={18} className="text-gray-600" />
                                  <span className="text-gray-800">Send Message</span>
                                </button>
                                <button
                                  onClick={() => {
                                    exportData(user.name);
                                    setSelectedUserId(null);
                                  }}
                                  className="w-full px-5 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition"
                                >
                                  <Download size={18} className="text-gray-600" />
                                  <span className="text-gray-800">Export User Data</span>
                                </button>
                                <hr className="my-2 border-gray-200" />
                                <button
                                  onClick={() => {
                                    resetPassword(user.email);
                                    setSelectedUserId(null);
                                  }}
                                  className="w-full px-5 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition"
                                >
                                  <Lock size={18} className="text-blue-600" />
                                  <span className="text-gray-800">Force Password Change</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADD NEW USER MODAL */}
        {isAddUserOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 animate-slide-up">
              <div className="flex justify-between items-center p-8 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">Add New User</h3>
                <button
                  onClick={() => setIsAddUserOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
                      placeholder="john@redvion.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
                      placeholder="+1 555-0123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
                    >
                      <option>Employee</option>
                      <option>Supervisor</option>
                      <option>Safety Officer</option>
                      <option>Admin</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
                      placeholder="Maintenance, Production, etc."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddUserOpen(false)}
                    className="px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="relative overflow-hidden group px-10 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-xl transition-all hover:scale-105"
                  >
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition" />
                    <span className="relative flex items-center gap-2">
                      <UserPlus size={20} />
                      Create User
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 20px 10px rgba(239, 68, 68, 0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.9s ease-out forwards;
        }
        .animate-pulse-red {
          animation: pulseRed 2s infinite;
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