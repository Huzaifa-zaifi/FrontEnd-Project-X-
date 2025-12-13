import React from 'react'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[220px] p-8 min-h-screen bg-[#F3F4F6]">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout

