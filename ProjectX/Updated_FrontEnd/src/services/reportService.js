// src/services/reportService.js
export const submitReport = async (data) => {
    const token = localStorage.getItem("token"); // or wherever your auth token is stored
  
    const res = await fetch("http://localhost:5000/api/observations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: data.type === "unsafe_act" ? "Unsafe Act" : "Unsafe Condition",
        category: data.category,
        description: data.description,
        location: data.location,
        riskLevel: data.riskLevel.charAt(0).toUpperCase() + data.riskLevel.slice(1), // match enum
        draftStatus: false,
        imageUrl: data.imageUrl,
      }),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to submit observation");
    }
  
    return res.json();
  };
  
  export const getMyObservations = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/observations", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  };
  