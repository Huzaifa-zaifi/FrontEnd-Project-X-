import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Send, AlertTriangle, Upload, MapPin, X, CheckCircle } from "lucide-react";
import { useToast } from "../hooks/usetoast";
import axios from "axios";

const categories = ["PPE", "Tools", "Housekeeping", "Chemical", "Electrical"];
const riskLevels = ["Low", "Medium", "High"];
const types = ["Unsafe Act", "Unsafe Condition"];

export default function SubmitReport() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const [successDialog, setSuccessDialog] = useState(false);
  const [submittedReportId, setSubmittedReportId] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    description: "",
    location: "",
    riskLevel: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { type, category, description, location, riskLevel } = formData;

    // Simple validation
    if (!type || !category || !description || !location || !riskLevel) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "You must be logged in to submit a report.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        imageUrl: imagePreview || undefined,
        draftStatus: false,
      };

      const res = await axios.post(
        "http://localhost:5001/api/observations",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Show success dialog instead of navigating
      setSubmittedReportId(res.data._id);
      setSuccessDialog(true);

    } catch (err) {
      toast({
        title: "Submission Error",
        description: err.response?.data?.message || err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">Submit Observation</h2>
          <p className="text-gray-500">Report unsafe acts or conditions</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold">New Safety Observation</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Observation Type *</label>
              <div className="grid grid-cols-2 gap-4">
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.type === t ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Category & Risk Level */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Risk Level *</label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">Select risk level</option>
                  {riskLevels.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Where was this observed?"
                  className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Description *</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the observation in detail"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Photo Evidence (Optional)</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload an image</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/EMP-dashboard")}
                className="flex-1 border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-3 font-medium transition"
              >
                {isSubmitting ? "Submitting..." : <><Send size={18} /> Submit Observation</>}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* SUCCESS DIALOG */}
      {successDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-center relative">
            <button
              onClick={() => setSuccessDialog(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Observation Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Your report has been successfully submitted.
            </p>
            <button
              onClick={() => {
                setSuccessDialog(false);
                navigate("/status"); // navigate on button click
              }}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition"
            >
              View Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
