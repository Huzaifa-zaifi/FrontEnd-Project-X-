import React, { useState } from 'react'
import DashboardLayout from '../components/Layout/DashboardLayout'

const Checklist = () => {
  const [checklistTitle, setChecklistTitle] = useState('')
  const [checklistDescription, setChecklistDescription] = useState('')
  const [checklistCategory, setChecklistCategory] = useState('')
  const [checklistPriority, setChecklistPriority] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Checklist created successfully!')
    setChecklistTitle('')
    setChecklistDescription('')
    setChecklistCategory('')
    setChecklistPriority('')
  }

  return (
    <DashboardLayout>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Checklist Management</h1>
        <button
          onClick={() => document.getElementById('createChecklistForm')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm font-medium hover:border-[#9CA3AF] hover:bg-[#F9FAFB] transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Create Checklist
        </button>
      </header>

      {/* Checklist Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {[
          { value: '89', label: 'Total Checklists' },
          { value: '2,456', label: 'Completed Items' },
          { value: '94%', label: 'Completion Rate' },
          { value: '18', label: 'Pending Items' }
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

      {/* Checklist Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Create Checklist Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm" id="createChecklistForm">
          <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Create New Checklist</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Checklist Title</label>
              <input
                type="text"
                value={checklistTitle}
                onChange={(e) => setChecklistTitle(e.target.value)}
                placeholder="Enter checklist title"
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Description</label>
              <textarea
                value={checklistDescription}
                onChange={(e) => setChecklistDescription(e.target.value)}
                rows="3"
                placeholder="Enter checklist description"
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all resize-y min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Category</label>
              <select
                value={checklistCategory}
                onChange={(e) => setChecklistCategory(e.target.value)}
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              >
                <option value="">Select category</option>
                <option value="safety">Safety</option>
                <option value="quality">Quality Control</option>
                <option value="maintenance">Maintenance</option>
                <option value="compliance">Compliance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Priority</label>
              <select
                value={checklistPriority}
                onChange={(e) => setChecklistPriority(e.target.value)}
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              >
                <option value="">Select priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#6B46C1] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:bg-[#5B21B6] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6B46C1]/30 transition-all mt-2"
            >
              Create Checklist
            </button>
          </form>
        </div>

        {/* Active Checklists */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Active Checklists</h3>
          <div className="flex flex-col gap-4">
            {[
              { title: 'Safety Inspection Checklist', description: 'Daily safety inspection checklist', progress: 100, items: '12/12', status: 'completed', updated: '2 hours ago' },
              { title: 'Quality Control Checklist', description: 'Product quality verification checklist', progress: 75, items: '9/12', status: 'in-progress', updated: '1 hour ago' },
              { title: 'Maintenance Checklist', description: 'Equipment maintenance checklist', progress: 25, items: '3/12', status: 'pending', updated: '3 days ago' }
            ].map((checklist, idx) => (
              <div key={idx} className="p-4 border-2 border-[#E5E7EB] rounded-lg hover:border-[#6B46C1] hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-base font-semibold text-[#1F2937] m-0">{checklist.title}</h4>
                  <span className={`px-3 py-1 rounded-xl text-xs font-semibold uppercase ${
                    checklist.status === 'completed' 
                      ? 'bg-green-500/10 text-green-600'
                      : checklist.status === 'in-progress'
                      ? 'bg-blue-500/10 text-blue-600'
                      : 'bg-yellow-500/10 text-yellow-600'
                  }`}>
                    {checklist.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-[#6B7280] mb-3">{checklist.description}</p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-2 bg-[#F3F4F6] rounded overflow-hidden">
                    <div className={`h-full ${
                      checklist.progress >= 75 ? 'bg-[#4B5563]' : 'bg-[#9CA3AF]'
                    }`} style={{ width: `${checklist.progress}%` }} />
                  </div>
                  <span className="text-xs text-[#6B7280] font-medium whitespace-nowrap">{checklist.items} items</span>
                </div>
                <div className="text-xs text-[#9CA3AF]">Completed {checklist.updated}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Checklist

