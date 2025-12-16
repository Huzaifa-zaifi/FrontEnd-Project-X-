import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  History,
  LogOut,
  User,
  ClipboardList,
  Users,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Employee navigation items
  const employeeNavItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/submit-report', icon: PlusCircle, label: 'Submit Report' },
    { path: '/report-status', icon: FileText, label: 'Report Status' },
    { path: '/history', icon: History, label: 'History' },
  ];

  // Supervisor navigation items
  const supervisorNavItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/review-reports', icon: ClipboardList, label: 'Review Reports' },
    { path: '/assign-actions', icon: Users, label: 'Assign Actions' },
    { path: '/reports-overview', icon: BarChart3, label: 'Reports Overview' },
    { path: '/history', icon: History, label: 'History' },
  ];

  // Get navigation items based on role
  const getNavItems = () => {
    if (!user) return employeeNavItems;
    
    switch (user.role) {
      case 'supervisor':
      case 'admin':
        return supervisorNavItems;
      default:
        return employeeNavItems;
    }
  };

  const navItems = getNavItems();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const getRoleLabel = () => {
    if (!user) return 'Employee Portal';
    switch (user.role) {
      case 'supervisor':
        return 'Supervisor Portal';
      case 'admin':
        return 'Admin Portal';
      case 'client':
        return 'Client Portal';
      default:
        return 'Employee Portal';
    }
  };

  return (
    <aside className="w-56 bg-sidebar fixed h-screen flex flex-col z-50">
      <div className="flex flex-col h-full p-5">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="mb-8 px-2 no-underline hover:opacity-80 transition-opacity"
        >
          <h1 className="text-xl font-bold text-primary tracking-wide m-0">
            REDVION
          </h1>
          <span className="text-xs text-sidebar-muted font-medium">
            {getRoleLabel()}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 no-underline',
                  isActive(item.path)
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-sidebar-border pt-4 mt-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <User className="w-4 h-4 text-sidebar-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name || 'Guest'}
              </p>
              <p className="text-xs text-sidebar-muted truncate">
                {user?.department || 'Not logged in'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-destructive transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
