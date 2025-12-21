import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  Users,
  History,
  LogOut,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  BarChart3,
  TrendingUp,
  Calendar,
  User,
  Search,
  Filter,
  UserCog,
  FileSpreadsheet,
  Image as ImageIcon,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { getAllObservations } from "../../services/adminService";

export default function AllObservationsDashboard() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        console.log("Token:", localStorage.getItem("token"));
        const res = await getAllObservations();
        console.log("Observations response:", res.data);

        const data = res.data;

        const mapped = data.map((obs) => ({
          id: obs._id,
          title: obs.description.substring(0, 30) + "...",
          description: obs.description,
          submitter: obs.employee?.name || "Unknown",
          submitted: new Date(obs.createdAt).toLocaleDateString(),
          category: obs.category,
          type: obs.type,
          status: obs.status,
          image: !!obs.imageUrl,
        }));

        setObservations(mapped);
        setErrorMsg("");
      } catch (err) {
        console.error("Error fetching observations:", err);

        if (err.response && err.response.status === 403) {
          setErrorMsg("Forbidden: You must be an admin to view this data.");
        } else {
          setErrorMsg("Failed to fetch observations.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchObservations();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Action Assigned":
        return "bg-orange-100 text-orange-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "In Review":
        return "bg-blue-100 text-blue-700";
      case "Closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      {/* MAIN */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">All Observations</h2>
            <p className="text-gray-600 mt-1">
              Complete overview of every safety observation submitted across the organization
            </p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search observations..."
                className="pl-12 pr-6 py-3 w-80 rounded-xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-red-100 focus:border-red-500 transition"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
              <Filter size={20} />
              Filter
            </button>
          </div>
        </div>

        {/* OBSERVATIONS LIST */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-slide-up">
          <h3 className="font-semibold text-xl text-gray-900 mb-6">Recent Observations</h3>

          {loading ? (
            <p className="text-gray-700">Loading observations...</p>
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : observations.length === 0 ? (
            <p className="text-gray-500">No observations found.</p>
          ) : (
            <div className="space-y-6">
              {observations.map((obs) => (
                <div
                  key={obs.id}
                  className="border-l-4 border-red-500 pl-5 bg-red-50/50 rounded-r-lg p-5 transition-all duration-300 hover:bg-red-50 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h4 className="font-semibold text-lg text-gray-900">{obs.title}</h4>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                            obs.status
                          )}`}
                        >
                          {obs.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-5 text-sm text-gray-500 mb-3">
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
                      <p className="text-gray-700">{obs.description}</p>
                    </div>
                    {obs.image && (
                      <div className="ml-8">
                        <div className="w-36 h-36 rounded-xl border-2 border-dashed border-red-200 flex items-center justify-center text-red-400 bg-red-50">
                          <ImageIcon size={40} />
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-2">Photo Attached</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Inline Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
          .animate-slide-up { animation: slideUp 0.7s ease-out forwards; }
        `}
      </style>
    </div>
  );
}
