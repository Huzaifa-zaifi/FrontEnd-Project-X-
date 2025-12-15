import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  BarChart3,
  LogOut,
  User,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

const SupervisorSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/supervisor', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/supervisor/observations', icon: FileText, label: 'Observations' },
    { path: '/supervisor/assign-actions', icon: AlertTriangle, label: 'Assign Actions' },
    { path: '/supervisor/track-actions', icon: ClipboardCheck, label: 'Track Actions' },
    { path: '/supervisor/reports', icon: BarChart3, label: 'Reports' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <aside className="w-56 bg-sidebar fixed h-screen flex flex-col z-50">
      <div className="flex flex-col h-full p-5">
        {/* Logo */}
        <Link
          to="/supervisor"
          className="mb-8 px-2 no-underline hover:opacity-80 transition-opacity"
        >
          <h1 className="text-xl font-bold text-primary tracking-wide m-0">
            REDVION
          </h1>
          <span className="text-xs text-sidebar-muted font-medium">
            Supervisor Portal
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium no-underline ${
                  isActive(item.path)
                    ? 'bg-sidebar-foreground text-sidebar font-semibold'
                    : 'text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-sidebar-border pt-4 mt-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <User className="w-4 h-4 text-sidebar-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name || 'Supervisor'}
              </p>
              <p className="text-xs text-sidebar-muted truncate">
                {user?.department || 'Safety'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium w-full text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SupervisorSidebar;
