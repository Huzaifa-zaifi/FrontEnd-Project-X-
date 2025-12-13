import React, { useState } from 'react'
import DashboardLayout from '../components/Layout/DashboardLayout'

const Team = () => {
  const [memberName, setMemberName] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [memberRole, setMemberRole] = useState('')
  const [memberTeam, setMemberTeam] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Team member added successfully!')
    setMemberName('')
    setMemberEmail('')
    setMemberRole('')
    setMemberTeam('')
  }

  return (
    <DashboardLayout>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Team Management</h1>
        <button
          onClick={() => document.getElementById('addMemberForm')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm font-medium hover:border-[#9CA3AF] hover:bg-[#F9FAFB] transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Member
        </button>
      </header>

      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {[
          { value: '48', label: 'Total Members' },
          { value: '12', label: 'Active Teams' },
          { value: '92%', label: 'Active Rate' },
          { value: '156', label: 'Tasks Completed' }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#1F2937] mb-2">{metric.value}</div>
            <div className="text-sm text-[#6B7280] mb-3">{metric.label}</div>
            <div className="h-8 opacity-70">
              <svg width="100" height="30" viewBox="0 0 100 30">
                <polyline points="0,25 10,20 20,22 30,18 40,20 50,15 60,17 70,12 80,14 90,10 100,12" 
                  fill="none" stroke="#6B7280" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Team Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Add Team Member Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm" id="addMemberForm">
          <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Add Team Member</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Full Name</label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter full name"
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Email</label>
              <input
                type="email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                placeholder="Enter email address"
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Role</label>
              <select
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              >
                <option value="">Select role</option>
                <option value="manager">Manager</option>
                <option value="supervisor">Supervisor</option>
                <option value="member">Team Member</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Team</label>
              <select
                value={memberTeam}
                onChange={(e) => setMemberTeam(e.target.value)}
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              >
                <option value="">Select team</option>
                <option value="qatar-facility">Qatar Facility</option>
                <option value="sales">Sales Leadership</option>
                <option value="northeast">Northeast Region</option>
                <option value="test">Test Group</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#6B46C1] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:bg-[#5B21B6] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6B46C1]/30 transition-all mt-2"
            >
              Add Member
            </button>
          </form>
        </div>

        {/* Team Members List */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Team Members</h3>
          <div className="flex flex-col gap-3">
            {[
              { name: 'Jesse Thomas', role: 'Manager • Qatar Facility', stats: '98% Active • 637 Points' },
              { name: 'Al Akbar Nafasi', role: 'Supervisor • Sales Leadership', stats: '89% Active • 637 Points' },
              { name: 'Helen Chuang', role: 'Team Member • Northeast Region', stats: '88% Active • 637 Points' }
            ].map((member, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 border-2 border-[#E5E7EB] rounded-lg hover:border-[#6B46C1] hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6B7280&color=fff&size=128`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#1F2937] mb-1">{member.name}</div>
                  <div className="text-xs text-[#6B7280] mb-1">{member.role}</div>
                  <div className="text-xs text-[#9CA3AF]">{member.stats}</div>
                </div>
                <button className="px-4 py-1.5 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-md text-xs font-medium text-[#1F2937] hover:bg-[#6B46C1] hover:text-white hover:border-[#6B46C1] transition-all">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Team

