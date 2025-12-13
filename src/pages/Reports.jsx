import React, { useState, useRef } from 'react'
import DashboardLayout from '../components/Layout/DashboardLayout'
import ActivityChart from '../components/Charts/ActivityChart'

const Reports = () => {
  const [timeframe, setTimeframe] = useState('All-time')
  const [people, setPeople] = useState('All')
  const [topic, setTopic] = useState('All')
  const reportRef = useRef(null)

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const activityData = [120, 150, 180, 200, 250, 280, 300, 320, 350, 380, 400, 380]

  const handleDownload = () => {
    alert('Download functionality would be implemented here!')
  }

  const handleExportAsImage = async () => {
    if (!reportRef.current) return

    try {
      // Dynamic import for html2canvas
      const html2canvas = (await import('html2canvas')).default
      
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#F3F4F6',
        scale: 2
      })
      
      const link = document.createElement('a')
      link.download = `report-${new Date().toISOString().split('T')[0]}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error exporting image:', error)
      alert('Failed to export image. Please try again.')
    }
  }

  return (
    <DashboardLayout>
      <div ref={reportRef}>
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F2937]">Reports</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExportAsImage}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm font-medium hover:border-[#9CA3AF] hover:bg-[#F9FAFB] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export as Image
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm font-medium hover:border-[#9CA3AF] hover:bg-[#F9FAFB] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#6B7280] font-medium">Timeframe:</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] cursor-pointer hover:border-[#6B46C1] focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all min-w-[150px]"
            >
              <option>All-time</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>This Year</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#6B7280] font-medium">People:</label>
            <select
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="px-4 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] cursor-pointer hover:border-[#6B46C1] focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all min-w-[150px]"
            >
              <option>All</option>
              <option>Managers</option>
              <option>Xia un Lu</option>
              <option>Lewis Hamilton</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#6B7280] font-medium">Topic:</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-4 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] cursor-pointer hover:border-[#6B46C1] focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all min-w-[150px]"
            >
              <option>All</option>
              <option>Helmet Safety</option>
              <option>Compliance Basics</option>
              <option>Electrical Wiring</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            { value: '27/80', label: 'Active Users' },
            { value: '3,298', label: 'Questions Answered' },
            { value: '2m 34s', label: 'Av. Session Length' }
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

        {/* Activity Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#1F2937]">Activity</h3>
            <select className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs text-[#1F2937] cursor-pointer">
              <option>Month</option>
              <option>Week</option>
              <option>Year</option>
            </select>
          </div>
          <ActivityChart data={activityData} months={months} />
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {[
            { value: '64%', label: 'Reports Submitted' },
            { value: '86%', label: 'Reports Closed' },
            { value: '+34%', label: 'Safety Measures' }
          ].map((metric, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-[#1F2937] mb-2">{metric.value}</div>
              <div className="text-sm text-[#6B7280] mb-3">{metric.label}</div>
              <div className="h-10 opacity-70">
                <svg width="120" height="40" viewBox="0 0 120 40">
                  <polyline points="0,35 15,30 30,28 45,25 60,22 75,20 90,18 105,15 120,12" 
                    fill="none" stroke="#6B7280" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Topics and Leaderboards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Weakest Topics */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Weakest Topics</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Helmet Safety', percentage: 74 },
                { name: 'Compliance Basics Procedures', percentage: 52 },
                { name: 'Electrical Wiring', percentage: 36 }
              ].map((topic, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#E5E7EB] flex items-center justify-center text-2xl flex-shrink-0">
                    {idx === 0 ? '🪖' : idx === 1 ? '🧪' : '⚡'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#1F2937] mb-1.5">{topic.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#F3F4F6] rounded overflow-hidden">
                        <div className="h-full bg-[#9CA3AF]" style={{ width: `${topic.percentage}%` }} />
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium whitespace-nowrap">{topic.percentage}% Correct</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strongest Topics */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Strongest Topics</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: 'SandBlasting Protocols', percentage: 95 },
                { name: 'Information Submitted', percentage: 92 },
                { name: 'Audits Completed', percentage: 89 }
              ].map((topic, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#E5E7EB] flex items-center justify-center text-2xl flex-shrink-0">
                    {idx === 0 ? '🔧' : idx === 1 ? '💻' : '📋'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#1F2937] mb-1.5">{topic.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#F3F4F6] rounded overflow-hidden">
                        <div className="h-full bg-[#4B5563]" style={{ width: `${topic.percentage}%` }} />
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium whitespace-nowrap">{topic.percentage}% Correct</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reports Leaderboard */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Reports Leaderboard</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Jesse Thomas', stats: '637 Points - 98% Correct', rank: 1, trend: 'up' },
                { name: 'Al Akbar Nafasi', stats: '637 Points - 89% Correct', rank: 2, trend: 'down' },
                { name: 'Helen Chuang', stats: '637 Points - 88% Correct', rank: 3, trend: 'up' },
                { name: 'Iqra Abbasi', stats: '637 Points', rank: 4, trend: 'up' }
              ].map((user, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors">
                  <div className="text-base font-semibold text-[#6B7280] min-w-[24px] text-center">{user.rank}</div>
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6B7280&color=fff&size=128`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1F2937] mb-0.5">{user.name}</div>
                    <div className="text-xs text-[#6B7280]">{user.stats}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    user.trend === 'up' ? 'text-[#4B5563] bg-[#F3F4F6]' : 'text-[#6B7280] bg-[#F3F4F6]'
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {user.trend === 'up' ? (
                        <polyline points="18 15 12 9 6 15"/>
                      ) : (
                        <polyline points="6 9 12 15 18 9"/>
                      )}
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Groups Leaderboard */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#1F2937] mb-5">Groups Leaderboard</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Qatar Facility', stats: '52 Points / User - 97% Correct', rank: 1, trend: 'up' },
                { name: 'Test Group', stats: '52 Points / User - 95% Correct', rank: 2, trend: 'down' },
                { name: 'Sales Leadership', stats: '52 Points / User - 87% Correct', rank: 3, trend: 'up' },
                { name: 'Northeast Region', stats: '52 Points / User', rank: 4, trend: 'up' }
              ].map((group, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors">
                  <div className="text-base font-semibold text-[#6B7280] min-w-[24px] text-center">{group.rank}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1F2937] mb-0.5">{group.name}</div>
                    <div className="text-xs text-[#6B7280]">{group.stats}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    group.trend === 'up' ? 'text-[#4B5563] bg-[#F3F4F6]' : 'text-[#6B7280] bg-[#F3F4F6]'
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {group.trend === 'up' ? (
                        <polyline points="18 15 12 9 6 15"/>
                      ) : (
                        <polyline points="6 9 12 15 18 9"/>
                      )}
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Reports

