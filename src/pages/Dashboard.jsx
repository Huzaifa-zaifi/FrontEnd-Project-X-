import React from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/Layout/DashboardLayout'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Dashboard</h1>
        <Link
          to="/reports"
          className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm font-medium hover:border-[#9CA3AF] hover:bg-[#F9FAFB] transition-all no-underline"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          View Reports
        </Link>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-[#1F2937] mb-2">27/80</div>
          <div className="text-sm text-[#6B7280] mb-3">Active Users</div>
          <div className="h-8 opacity-70">
            <svg width="100" height="30" viewBox="0 0 100 30">
              <polyline points="0,25 10,20 20,22 30,18 40,20 50,15 60,17 70,12 80,14 90,10 100,12" 
                fill="none" stroke="#6B7280" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-[#1F2937] mb-2">142</div>
          <div className="text-sm text-[#6B7280] mb-3">Total Forms</div>
          <div className="h-8 opacity-70">
            <svg width="100" height="30" viewBox="0 0 100 30">
              <polyline points="0,25 10,20 20,22 30,18 40,20 50,15 60,17 70,12 80,14 90,10 100,12" 
                fill="none" stroke="#6B7280" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-[#1F2937] mb-2">48</div>
          <div className="text-sm text-[#6B7280] mb-3">Team Members</div>
          <div className="h-8 opacity-70">
            <svg width="100" height="30" viewBox="0 0 100 30">
              <polyline points="0,25 10,20 20,22 30,18 40,20 50,15 60,17 70,12 80,14 90,10 100,12" 
                fill="none" stroke="#6B7280" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-[#1F2937] mb-2">89</div>
          <div className="text-sm text-[#6B7280] mb-3">Checklists</div>
          <div className="h-8 opacity-70">
            <svg width="100" height="30" viewBox="0 0 100 30">
              <polyline points="0,25 10,20 20,22 30,18 40,20 50,15 60,17 70,12 80,14 90,10 100,12" 
                fill="none" stroke="#6B7280" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link to="/reports" className="bg-white p-8 rounded-xl shadow-sm text-center no-underline text-[#1F2937] transition-all hover:shadow-md hover:-translate-y-1 border-2 border-[#E5E7EB] hover:border-[#D1D5DB]">
          <div className="w-16 h-16 rounded-xl bg-[#F3F4F6] flex items-center justify-center mb-4 mx-auto text-[#4B5563]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">View Reports</h3>
          <p className="text-sm text-[#6B7280] m-0">Access detailed analytics and reports</p>
        </Link>
        <Link to="/form" className="bg-white p-8 rounded-xl shadow-sm text-center no-underline text-[#1F2937] transition-all hover:shadow-md hover:-translate-y-1 border-2 border-[#E5E7EB] hover:border-[#D1D5DB]">
          <div className="w-16 h-16 rounded-xl bg-[#F3F4F6] flex items-center justify-center mb-4 mx-auto text-[#4B5563]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Manage Forms</h3>
          <p className="text-sm text-[#6B7280] m-0">Create and manage forms</p>
        </Link>
        <Link to="/team" className="bg-white p-8 rounded-xl shadow-sm text-center no-underline text-[#1F2937] transition-all hover:shadow-md hover:-translate-y-1 border-2 border-[#E5E7EB] hover:border-[#D1D5DB]">
          <div className="w-16 h-16 rounded-xl bg-[#F3F4F6] flex items-center justify-center mb-4 mx-auto text-[#4B5563]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Team Management</h3>
          <p className="text-sm text-[#6B7280] m-0">Manage team members and groups</p>
        </Link>
        <Link to="/checklist" className="bg-white p-8 rounded-xl shadow-sm text-center no-underline text-[#1F2937] transition-all hover:shadow-md hover:-translate-y-1 border-2 border-[#E5E7EB] hover:border-[#D1D5DB]">
          <div className="w-16 h-16 rounded-xl bg-[#F3F4F6] flex items-center justify-center mb-4 mx-auto text-[#4B5563]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Checklists</h3>
          <p className="text-sm text-[#6B7280] m-0">Create and track checklists</p>
        </Link>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

