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
  CheckCircle,
  Clock as ClockIcon,
  UserCheck2,
} from "lucide-react";

export default function TrackProgressOfActions() {
  const correctiveActions = [
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
      assignedTo: "Emma Davis - Housekeeping Team",
      dueDate: "Dec 20, 2025",
      status: "In Progress",
      progress: 60,
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
      assignedTo: "Mark Johnson - Maintenance Lead",
      dueDate: "Dec 19, 2025",
      status: "Completed",
      progress: 100,
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
      assignedTo: "Sarah Williams - Warehouse Supervisor",
      dueDate: "Dec 22, 2025",
      status: "Pending",
      progress: 20,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "Pending":
        return "bg-gray-100 text-gray-700 border border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

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
            <SidebarItem icon={<Users />} label="Assign Corrective Actions" />
            <SidebarItem icon={<History />} label="Track Progress of Actions" active />
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
            <h2 className="text-3xl font-bold text-gray-900">Track Progress of Actions</h2>
            <p className="text-gray-600 mt-1">
              Monitor the status and progress of assigned corrective actions
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search actions..."
              className="pl-12 pr-6 py-3.5 w-80 rounded-xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
            />
          </div>
        </div>

        {/* ACTIONS LIST */}
        <div className="space-y-8">
          {correctiveActions.map((action, index) => (
            <div
              key={action.id}
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
                      <h3 className="text-2xl font-extrabold text-gray-900">{action.title}</h3>
                      <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={16} /> {action.submitter}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} /> {action.submitted}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={16} /> {action.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 bg-red-100 text-red-600">
                        <AlertCircle size={16} /> {action.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg mb-8">{action.description}</p>

                  {/* PROGRESS INFO - Now in a cleaner horizontal layout like the mockup */}
                  <div className="space-y-6 mb-8">
                    <div className="flex flex-wrap items-center gap-8 text-sm">
                      <div>
                        <p className="text-gray-600 font-medium">Assigned To</p>
                        <div className="flex items-center gap-2 mt-1">
                          <UserCheck2 size={18} className="text-gray-500" />
                          <span className="font-semibold text-gray-900">{action.assignedTo}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Due Date</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar size={18} className="text-gray-500" />
                          <span className="font-semibold text-gray-900">{action.dueDate}</span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <p className="text-gray-600 font-medium mb-1">Status</p>
                        <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold ${getStatusColor(action.status)}`}>
                          {action.status === "Completed" && <CheckCircle size={18} />}
                          {action.status === "In Progress" && <ClockIcon size={18} />}
                          {action.status === "Pending" && <ClockIcon size={18} />}
                          {action.status}
                        </span>
                      </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Progress</span>
                        <span className="font-bold text-gray-900">{action.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
                        <div
                          className={`h-full transition-all duration-1000 ease-out rounded-full ${getProgressColor(action.progress)}`}
                          style={{ width: `${action.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* FOLLOW-UP BUTTON - Now shown for all (including Completed, as in mockup example) */}
                  <div className="flex justify-end">
                    <button className="relative overflow-hidden group rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-10 py-4 text-white text-lg font-bold shadow-xl transition-all hover:scale-[1.03]">
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                      <span className="relative flex items-center gap-3">
                        Follow Up / Update Status
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