import React, { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  History,
  X,
  Trash2,
  Pencil
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [observations, setObservations] = useState([]);
  const [user, setUser] = useState(null);

  const categories = ["PPE", "Tools", "Housekeeping", "Chemical", "Electrical"];
  const [viewObs, setViewObs] = useState(null);
  const [editObs, setEditObs] = useState(null);
  const [deleteObs, setDeleteObs] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    fetchObservations();
  }, []);

  const fetchObservations = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/observations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setObservations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATS ================= */
  const total = observations.length;
  const submitted = observations.filter(o => o.status === "Submitted").length;
  const reviewed = observations.filter(o => o.status === "Reviewed").length;
  const closed = observations.filter(o => o.status === "Closed").length;

  /* ================= ACTIONS ================= */
  const handleSubmitObservation = async (obs) => {
    await fetch(`http://localhost:5001/api/observations/${obs._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ submit: true }),
    });
  
    fetchObservations();
  };
  

  const handleEditSave = async () => {
    await fetch(`http://localhost:5001/api/observations/${editObs._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: editObs.type,
        category: editObs.category,
        description: editObs.description,
        location: editObs.location,
        riskLevel: editObs.riskLevel,
      }),
    });
  
    setEditObs(null);
    fetchObservations();
  };
  

  const confirmDelete = async () => {
    await fetch(`http://localhost:5001/api/observations/${deleteObs._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleteObs(null);
    fetchObservations();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold">
              Welcome back,{" "}
              <span className="font-bold">{user?.name || "User"}</span>
            </h2>
            <p className="text-gray-500">Here's an overview of your safety observations</p>
          </div>

          <button
            onClick={() => navigate("/submit")}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
          >
            <Plus size={18} />
            New Observation
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total" value={total} icon={<FileText />} />
          <StatCard title="Submitted" value={submitted} icon={<Clock />} />
          <StatCard title="Reviewed" value={reviewed} icon={<AlertTriangle />} />
          <StatCard title="Closed" value={closed} icon={<CheckCircle />} />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <QuickAction icon={<Plus />} label="Submit Observation" onClick={() => navigate("/submit")} active />
            <QuickAction icon={<Clock />} label="Check Status" onClick={() => navigate("/status")}/>
            <QuickAction icon={<History />} label="View History" onClick={() => navigate("/history")}/>
          </div>

          {/* OBSERVATIONS */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Recent Observations</h3>

            {observations.map(obs => (
              <div
                key={obs._id}
                className="border p-4 rounded-lg mb-3 flex justify-between items-center"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setViewObs(obs)}
                >
                  <p className="font-medium">
                    {obs.type} — {obs.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    {obs.location} • {new Date(obs.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  {/* EDIT */}
                  <button
                    onClick={() => setEditObs(obs)}
                    className="p-2 bg-blue-100 text-blue-600 rounded"
                    title="Edit Description"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => setDeleteObs(obs)}
                    className="p-2 bg-red-100 text-red-600 rounded"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* SUBMIT */}
                  {obs.draftStatus && (
                    <button
                      onClick={() => handleSubmitObservation(obs)}
                      className="p-2 bg-green-100 text-green-600 rounded"
                      title="Submit"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}

                  <StatusBadge status={obs.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* VIEW MODAL */}
      {viewObs && (
        <Modal title="Observation Details" onClose={() => setViewObs(null)}>
          <Detail label="Type" value={viewObs.type} />
          <Detail label="Category" value={viewObs.category} />
          <Detail label="Description" value={viewObs.description} />
          <Detail label="Location" value={viewObs.location} />
          <Detail label="Risk Level" value={viewObs.riskLevel} />
          <Detail label="Status" value={viewObs.status} />
        </Modal>
      )}

      {/* EDIT MODAL */}
      {editObs && (
  <Modal title="Edit Observation" onClose={() => setEditObs(null)}>
    <div className="space-y-3">
      <input
        className="w-full border rounded p-2"
        value={editObs.type}
        placeholder="Type"
        onChange={e => setEditObs({ ...editObs, type: e.target.value })}
      />
     <select
  value={editObs.category}
  onChange={(e) => setEditObs({ ...editObs, category: e.target.value })}
  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
>
  <option value="">Select category</option>
  {categories.map((cat) => (
    <option key={cat} value={cat}>{cat}</option>
  ))}
</select>

             

      <textarea
        className="w-full border rounded p-2"
        rows={4}
        value={editObs.description}
        placeholder="Description"
        onChange={e => setEditObs({ ...editObs, description: e.target.value })}
      />
      <input
        className="w-full border rounded p-2"
        value={editObs.location}
        placeholder="Location"
        onChange={e => setEditObs({ ...editObs, location: e.target.value })}
      />
      <select
        className="w-full border rounded p-2"
        value={editObs.riskLevel}
        onChange={e => setEditObs({ ...editObs, riskLevel: e.target.value })}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

    <button
      onClick={handleEditSave}
      className="w-full bg-green-500 text-white py-2 rounded mt-4"
    >
      Save Changes
    </button>
  </Modal>
)}


      {/* DELETE CONFIRM MODAL */}
      {deleteObs && (
        <Modal title="Delete Observation" onClose={() => setDeleteObs(null)}>
          <p className="text-gray-600 mb-4">
            This action cannot be undone. Are you sure?
          </p>
          <div className="flex gap-3">
            <button
              onClick={confirmDelete}
              className="flex-1 bg-red-500 text-white py-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteObs(null)}
              className="flex-1 bg-gray-200 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          <X />
        </button>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
  );
}

function QuickAction({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-lg mb-3 cursor-pointer ${
        active
          ? "bg-red-50 text-red-500"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>
      →
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Submitted: "bg-yellow-100 text-yellow-700",
    Reviewed: "bg-orange-100 text-orange-700",
    Closed: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
      {status}
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <p className="mb-2">
      <strong>{label}:</strong> {value}
    </p>
  );
}
