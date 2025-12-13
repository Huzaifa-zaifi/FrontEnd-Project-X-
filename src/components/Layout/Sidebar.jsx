import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Sidebar = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/dashboard', icon: 'home', label: 'Dashboard' },
    { path: '/reports', icon: 'file', label: 'Reports' },
    { path: '/form', icon: 'form', label: 'Form' },
    { path: '/team', icon: 'team', label: 'Team' },
    { path: '/checklist', icon: 'checklist', label: 'Checklist' },
  ]

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      window.location.href = '/login'
    }
  }

  return (
    <aside className="w-[220px] bg-[#111827] text-white fixed h-screen overflow-y-auto z-50">
      <div className="flex flex-col h-full p-5">
        {/* Logo */}
        <Link to="/dashboard" className="mb-7 px-2 no-underline hover:opacity-80 transition-opacity">
          <h1 className="text-xl font-bold text-[#EF4444] tracking-wide m-0">REDVION</h1>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 mb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                isActive(item.path)
                  ? 'bg-[#E5E7EB] text-[#111827] font-semibold'
                  : 'text-[#D1D5DB] hover:bg-white/5 hover:text-white'
              }`}
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Support Section */}
        <div className="h-px bg-white/10 my-3" />
        <nav className="flex flex-col gap-1 mb-auto">
          <Link to="#" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#D1D5DB] hover:bg-white/5 hover:text-white text-sm font-medium">
            <NavIcon name="help" />
            <span>Get Started</span>
          </Link>
          <Link to="#" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#D1D5DB] hover:bg-white/5 hover:text-white text-sm font-medium">
            <NavIcon name="settings" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 px-2 py-3 mt-auto border-t border-white/10">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6B7280&color=fff&size=128`}
              alt={user?.name || 'User'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white mb-0.5 truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-[#D1D5DB] truncate">{user?.email || ''}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md text-[#D1D5DB] hover:bg-red-500/15 hover:text-[#EF4444] transition-all opacity-70 hover:opacity-100"
            title="Logout"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}

const NavIcon = ({ name }) => {
  const icons = {
    home: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    file: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    form: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    team: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    checklist: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    help: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    settings: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
      </svg>
    ),
  }

  return icons[name] || null
}

export default Sidebar

