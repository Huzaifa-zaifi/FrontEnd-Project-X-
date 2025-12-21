import React, { useState } from "react";
import { Mail, Lock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Add this at the top of your Login component
const [showPassword, setShowPassword] = useState(false);


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5001/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Login failed");

//       // Save token and user
//       // localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//     // Convert role to lowercase for switch
// const role = data.user.role.toLowerCase();

// switch (role) {
//   case "employee":
//     navigate("/EMP-dashboard");
//     break;
//   case "supervisor":
//     navigate("/supervisor-dashboard");
//     break;
//   case "admin":
//     navigate("/admin-dashboard");
//     break;
//   case "safety officer":
//     navigate("/client-dashboard");
//     break;
//   default:
//     navigate("/EMP-dashboard");
// }


//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    // Save JWT
    localStorage.setItem("token", data.token);

    // Save user
    localStorage.setItem("user", JSON.stringify(data.user));

    // Navigate based on role
    const role = data.user.role.toLowerCase();

    switch (role) {
      case "employee":
        navigate("/EMP-dashboard");
        break;
      case "supervisor":
        navigate("/supervisor-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "client":
        navigate("/client-dashboard");
        break;
      default:
        navigate("/EMP-dashboard");
    }

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-b from-[#0f141b] to-[#0b0f14] p-12 text-white">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-red-500">REDVION</h1>
          <p className="text-sm text-gray-400">Portal</p>
        </div>
        <div className="max-w-md">
          <h2 className="text-4xl font-bold leading-tight">
            Streamline your reporting workflow
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Submit reports, track status, and view history all in one place.
          </p>
        </div>
        <p className="text-sm text-gray-500">© 2024 Redvion. All rights reserved.</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-gray-100 px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100 text-red-500 mb-6">
            →
          </div>
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-gray-500 mb-6">Sign in to your account</p>

          {/* ERROR */}
          {error && (
            <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  placeholder="Enter your password"
  className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
/>
<Eye
  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
  onClick={() => setShowPassword(!showPassword)}
/>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Made with ❤️ by <span className="text-red-900">RED</span>Vion
          </p>
        </form>
      </div>
    </div>
  );
}
