import React, { useState } from 'react'
import { sendNotification } from '../../utils/notificationService'
import { exportToExcel, exportToGoogleSheets } from '../../utils/exportUtils'

const ReportSubmissionForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    attachments: []
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Send notification to admin and general manager
    await sendNotification({
      ...formData,
      submittedAt: new Date().toISOString(),
      action: 'report_submitted'
    }, 'report_submitted')

    alert('Report submitted successfully! Notifications sent to Admin and General Manager.')
    onClose()
  }

  const handleExport = (format) => {
    const exportData = [{
      'Report Title': formData.title,
      'Description': formData.description,
      'Category': formData.category,
      'Priority': formData.priority,
      'Submitted At': new Date().toLocaleString()
    }]

    if (format === 'excel') {
      exportToExcel(exportData, 'report-submission')
    } else if (format === 'google') {
      exportToGoogleSheets(exportData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#1F2937]">Submit Report</h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#1F2937] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Report Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter report title"
              required
              className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              placeholder="Enter report description"
              required
              className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all resize-y"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              >
                <option value="">Select category</option>
                <option value="safety">Safety</option>
                <option value="compliance">Compliance</option>
                <option value="incident">Incident</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full py-2.5 px-3.5 border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Export Options</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleExport('excel')}
                className="flex items-center gap-2 px-4 py-2 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-lg text-sm font-medium text-[#1F2937] hover:border-[#6B46C1] hover:bg-[#EDE9FE] transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                Export to Excel
              </button>
              <button
                type="button"
                onClick={() => handleExport('google')}
                className="flex items-center gap-2 px-4 py-2 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-lg text-sm font-medium text-[#1F2937] hover:border-[#6B46C1] hover:bg-[#EDE9FE] transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                  <line x1="15" y1="3" x2="15" y2="21"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="3" y1="15" x2="21" y2="15"/>
                </svg>
                Export to Google Sheets
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#6B46C1] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:bg-[#5B21B6] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6B46C1]/30 transition-all"
            >
              Submit Report
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-lg text-base font-medium text-[#1F2937] hover:border-[#9CA3AF] hover:bg-[#F3F4F6] transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportSubmissionForm

