import React, { useEffect, useState } from "react";

export default function StatCard({ title, value, icon, color = "red", delay = 0 }) {
  const colors = {
    red: "border-red-500",
    yellow: "border-yellow-400",
    orange: "border-orange-400",
    green: "border-green-500",
  };

  // Optional count-up effect
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = Number(value);
    if (isNaN(end)) return setDisplayValue(value);

    const duration = 800; // 0.8s
    const increment = Math.ceil(end / (duration / 16)); // approx 60fps
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayValue(start);
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-md border-l-4 ${colors[color]} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{displayValue}</p>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500">
          {React.cloneElement(icon, { size: 24 })}
        </div>
      </div>
    </div>
  );
}
