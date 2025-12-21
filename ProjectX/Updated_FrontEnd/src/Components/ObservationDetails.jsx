import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ObservationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [observation, setObservation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchObservation = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/observations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setObservation(data);
      } catch (err) {
        localStorage.clear();
        navigate("/login");
      }
    };

    fetchObservation();
  }, [id, navigate]);

  if (!observation) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        {observation.type} — {observation.category}
      </h2>

      <p><strong>Description:</strong> {observation.description}</p>
      <p><strong>Location:</strong> {observation.location}</p>
      <p><strong>Risk Level:</strong> {observation.riskLevel}</p>
      <p><strong>Status:</strong> {observation.status}</p>
    </div>
  );
}
