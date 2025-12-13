import React, { useState } from 'react'
import DashboardLayout from '../components/Layout/DashboardLayout'
import { exportToExcel, exportToGoogleSheets } from '../utils/exportUtils'
import { sendNotification } from '../utils/notificationService'
import ReportSubmissionForm from '../components/Forms/ReportSubmissionForm'

const Form = () => {
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formCategory, setFormCategory] = useState('')
  const [formType, setFormType] = useState('')
  const [showReportForm, setShowReportForm] = useState(false)
  const [forms, setForms] = useState([
    { id: 1, title: 'Safety Inspection Form', description: 'Workplace safety inspection checklist', submissions: 234, status: 'active', updated: '2 days ago' },
    { id: 2, title: 'Incident Report Form', description: 'Report workplace incidents and accidents', submissions: 156, status: 'active', updated: '5 days ago' },
    { id: 3, title: 'Compliance Checklist', description: 'Compliance verification checklist', submissions: 0, status: 'draft', updated: '1 week ago' }
  ])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newForm = {
      id: forms.length + 1,
      title: formTitle,
      description: formDescription,
      category: formCategory,
      type: formType,
      submissions: 0,
      status: 'draft',
      updated: 'Just now',
      createdAt: new Date().toISOString()
    }

    setForms([...forms, newForm])
    
    // Send notification to admin and general manager
    await sendNotification({
      title: formTitle,
      description: formDescription,
      category: formCategory,
      type: formType,
      action: 'form_created'
    }, 'form_created')

    // Reset form
    setFormTitle('')
    setFormDescription('')
    setFormCategory('')
    setFormType('')

    alert('Form created successfully!')
  }

  const handleExport = (format) => {
    const exportData = forms.map(form => ({
      'Form Title': form.title,
      'Description': form.description,
      'Submissions': form.submissions,
      'Status': form.status,
      'Last Updated': form.updated
    }))

    if (format === 'excel') {
      exportToExcel(exportData, 'forms-export')
    } else if (format === 'google') {
      exportToGoogleSheets(exportData)
    }
  }

  return (
    <DashboardLayout>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Form Builder</h1>
        <div className="flex gap-3">
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm font-medium hover:border-[#9CA3AF] hover:bg-[#F9FAFB] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Data
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E5E7EB] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                type="button"
                onClick={() => handleExport('excel')}
                className="w-full text-left px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F9FAFB] rounded-t-lg transition-colors"
              >
                Export to Excel
              </button>
              <button
                type="button"
                onClick={() => handleExport('google')}
                className="w-full text-left px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F9FAFB] rounded-b-lg transition-colors"
              >
                Export to Google Sheets
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {[
          { value: '142', label: 'Total Forms' },
          { value: '3,847', label: 'Form Submissions' },
          { value: '87%', label: 'Completion Rate' },
          { value: '24', label: 'Active Forms' }
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

      {/* Form Builder Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Create New Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Create New Form</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Form Title</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter form title"
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Description</label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                rows="3"
                placeholder="Enter form description"
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all resize-y min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              >
                <option value="">Select category</option>
                <option value="safety">Safety</option>
                <option value="compliance">Compliance</option>
                <option value="incident">Incident Report</option>
                <option value="inspection">Inspection</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Form Type</label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              >
                <option value="">Select type</option>
                <option value="survey">Survey</option>
                <option value="report">Report</option>
                <option value="checklist">Checklist</option>
                <option value="application">Application</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#6B46C1] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:bg-[#5B21B6] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6B46C1]/30 transition-all mt-2"
            >
              Create Form
            </button>
          </form>
        </div>

        {/* Recent Forms */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Recent Forms</h3>
          <div className="flex flex-col gap-4">
            {forms.map((form) => (
              <div key={form.id} className="p-4 border-2 border-[#E5E7EB] rounded-lg hover:border-[#6B46C1] hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-base font-semibold text-[#1F2937] m-0">{form.title}</h4>
                  <span className={`px-3 py-1 rounded-xl text-xs font-semibold uppercase ${
                    form.status === 'active' 
                      ? 'bg-green-500/10 text-green-600' 
                      : 'bg-yellow-500/10 text-yellow-600'
                  }`}>
                    {form.status}
                  </span>
                </div>
                <p className="text-sm text-[#6B7280] mb-3">{form.description}</p>
                <div className="flex gap-2 text-xs text-[#9CA3AF]">
                  <span>{form.submissions} submissions</span>
                  <span>•</span>
                  <span>Updated {form.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Analytics */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">Form Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-[#1F2937] mb-5">Top Performing Forms</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Safety Inspection Form', percentage: 95 },
                { name: 'Incident Report Form', percentage: 87 },
                { name: 'Compliance Checklist', percentage: 82 }
              ].map((form, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-base font-bold text-[#6B7280] min-w-[24px] text-center">{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#1F2937] mb-1.5">{form.name}</div>
                    <div className="h-2 bg-[#F3F4F6] rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]" style={{ width: `${form.percentage}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#1F2937] whitespace-nowrap">{form.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#1F2937] mb-5">Submission Trends</h4>
            <div className="h-[200px] relative">
              <canvas id="submissionTrendChart" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Report Submission Form Modal */}
      {showReportForm && (
        <ReportSubmissionForm onClose={() => setShowReportForm(false)} />
      )}

      {/* Submit Report Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setShowReportForm(true)}
          className="w-14 h-14 bg-[#6B46C1] text-white rounded-full shadow-lg hover:bg-[#5B21B6] hover:scale-110 transition-all flex items-center justify-center"
          title="Submit Report"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </DashboardLayout>
  )
}

export default Form

