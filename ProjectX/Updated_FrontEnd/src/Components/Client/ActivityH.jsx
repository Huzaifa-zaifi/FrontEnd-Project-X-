import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Eye,
  BarChart3,
  FileText,
  History,
  Shield,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  FileText as FileIcon,
} from "lucide-react";
import ClientSidebar from "./ClientSidebar";

export default function ActivityHistory() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get the status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="text-orange-600" size={20} />;
      case "closed":
        return <CheckCircle className="text-green-600" size={20} />;
      case "assigned":
        return <Clock className="text-blue-600" size={20} />;
      default:
        return <FileIcon className="text-gray-600" size={20} />;
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Make sure your client login saves JWT
        const res = await axios.get("http://localhost:5001/api/client/observations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Map observations to the activity timeline format
        const mappedActivities = res.data.map((obs) => ({
          date: new Date(obs.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          time: new Date(obs.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "observation",
          title: obs.title || "Observation recorded",
          description: obs.description || obs.details || "-",
          user: obs.employee?.name || "You",
          status: obs.status?.toLowerCase() || "open",
        }));

        setActivities(mappedActivities);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Activity History
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              Complete audit trail of all safety observations and actions
            </p>
            <p className="text-gray-500 mt-1">
              Real-time data as of <strong>{new Date().toLocaleDateString()}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
            <Calendar size={18} />
            Last updated: Today, {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* ACTIVITY TIMELINE */}
        <div className="space-y-8">
          {loading ? (
            <p>Loading activities...</p>
          ) : activities.length === 0 ? (
            <p className="text-gray-500">No activities found.</p>
          ) : (
            activities.map((activity, index) => (
              <div
                key={index}
                className="relative pl-12 pb-12 border-l-4 border-gray-200 hover:border-red-400 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 w-12 h-12 -ml-6 bg-white rounded-full shadow-lg border-4 border-gray-200 flex items-center justify-center group-hover:border-red-600 group-hover:scale-110 transition-all duration-300">
                  {getStatusIcon(activity.status)}
                </div>

                {/* Activity Card */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                      <p className="text-gray-700 mt-2">{activity.description}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p className="font-medium">{activity.date}</p>
                      <p>{activity.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span className="font-medium">{activity.user}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="capitalize">{activity.type}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

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
