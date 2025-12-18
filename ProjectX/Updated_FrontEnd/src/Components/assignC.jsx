import React from "react";
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  Users,
  History,
  LogOut,
  AlertCircle,
  Calendar,
  User,
  Clock,
  Search,
  Image as ImageIcon,
  UserPlus,
  CalendarDays,
} from "lucide-react";

export default function AssignCorrectiveActions() {
  const approvedObservations = [
    {
      id: 1,
      title: "Oil spill near entrance",
      description:
        "Large oil spill detected near the main entrance. Slip hazard for all personnel.",
      submitter: "twat",
      submitted: "2 days ago",
      category: "Housekeeping",
      type: "Unsafe Condition",
      image: true,
      approvedDate: "Dec 17, 2025",
    },
    {
      id: 2,
      title: "Worker without safety helmet",
      description:
        "Observed worker in Zone A not wearing required safety helmet while operating machinery.",
      submitter: "john_doe",
      submitted: "3 days ago",
      category: "PPE",
      type: "Unsafe Act",
      image: true,
      approvedDate: "Dec 16, 2025",
    },
    {
      id: 3,
      title: "Improper chemical storage",
      description:
        "Chemicals stored without proper labeling in Warehouse C.",
      submitter: "jane_smith",
      submitted: "5 days ago",
      category: "Chemical",
      type: "Unsafe Condition",
      image: true,
      approvedDate: "Dec 14, 2025",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-[#0f141b] to-[#0b0f14] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 animate-fade-in">
            <h1 className="text-xl font-bold text-red-500">REDVION</h1>
            <p className="text-sm text-gray-400">Supervisor Portal</p>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarItem icon={<Eye />} label="View New Observations" />
            <SidebarItem icon={<UserCheck />} label="Approve/Reject Observations" />
            <SidebarItem icon={<Users />} label="Assign Corrective Actions" active />
            <SidebarItem icon={<History />} label="Track Progress of Actions" />
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="mb-3">
            <p className="text-sm font-medium">Supervisor</p>
            <p className="text-xs text-gray-400">Safety Lead</p>
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
        <div className="flex justify-between items-center mb-10 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Assign Corrective Actions</h2>
            <p className="text-gray-600 mt-1">
              Assign responsible personnel and due dates for approved safety observations
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search observations..."
              className="pl-12 pr-6 py-3.5 w-80 rounded-xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
            />
          </div>
        </div>

        {/* OBSERVATIONS LIST */}
        <div className="space-y-8">
          {approvedObservations.map((obs, index) => (
            <div
              key={obs.id}
              style={{ animationDelay: `${index * 120}ms` }}
              className="bg-white rounded-3xl border border-red-100 shadow-xl overflow-hidden animate-slide-up transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row">
                {/* IMAGE SECTION */}
                <div className="lg:w-96 bg-gradient-to-br from-red-50 to-white p-6 border-r border-red-100">
                  <div className="h-64 rounded-2xl border-2 border-dashed border-red-200 flex flex-col items-center justify-center text-red-400">
                    <ImageIcon size={32} />
                    <span className="mt-2 font-semibold">Photo Attached</span>
                  </div>
                </div>

                {/* CONTENT SECTION */}
                <div className="flex-1 p-8">
                  <div className="flex justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-2xl font-extrabold text-gray-900">{obs.title}</h3>
                      <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={16} /> {obs.submitter}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} /> {obs.submitted}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={16} /> {obs.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 bg-red-100 text-red-600">
                        <AlertCircle size={16} /> {obs.type}
                      </span>
                      <p className="text-sm text-green-600 font-medium mt-2">Approved: {obs.approvedDate}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg mb-8">{obs.description}</p>

                  {/* ASSIGN ACTION FORM */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assign To
                      </label>
                      <div className="relative">
                        <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition">
                          <option>Select responsible person</option>
                          <option>Mark Johnson - Maintenance Lead</option>
                          <option>Sarah Williams - Warehouse Supervisor</option>
                          <option>David Chen - Safety Officer</option>
                          <option>Emma Davis - Housekeeping Team</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Due Date
                      </label>
                      <div className="relative">
                        <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Corrective Action Description
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Describe the required corrective action..."
                      className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition resize-none"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="flex justify-end">
                    <button className="relative overflow-hidden group rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-10 py-5 text-white text-lg font-bold shadow-xl transition-all hover:scale-[1.03]">
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                      <span className="relative flex items-center gap-3">
                        Assign Corrective Action
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

/* REUSABLE SIDEBAR ITEM */
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