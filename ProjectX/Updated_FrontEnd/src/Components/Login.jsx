import React from "react";
import { Mail, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-b from-[#0f141b] to-[#0b0f14] p-12 text-white">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-red-500">
            REDVION
          </h1>
          <p className="text-sm text-gray-400">Employee Portal</p>
        </div>

        <div className="max-w-md">
          <h2 className="text-4xl font-bold leading-tight">
            Streamline your reporting workflow
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Submit reports, track status, and view history all in one place.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          © 2024 Redvion. All rights reserved.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-center bg-gray-100 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          
          {/* ICON */}
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100 text-red-500 mb-6">
            →
          </div>

          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-gray-500 mb-6">
            Sign in to your account
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
            </div>
          </div>

          {/* BUTTON */}
          <Link to="/EMP-dashboard">
          <button className="w-full bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-lg font-medium">
            Sign in
          </button>
          </Link>

          <p className="text-center text-sm text-gray-400 mt-4">
            Made with ❤️ by <span className="text-red-900">RED</span>Vion
          </p>
        </div>
      </div>
    </div>
  );
}
