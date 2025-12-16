import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/common/StatCard';
import StatusBadge from '@/components/common/StatusBadge';
import { getReportStats, getReportsByUser, getAllReports, getPendingReports } from '@/services/reportService';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  ClipboardList,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const stats = getReportStats();
  const isEmployee = user?.role === 'employee';
  const isSupervisor = user?.role === 'supervisor' || user?.role === 'admin';
  
  // Get relevant reports based on role
  const myReports = user ? getReportsByUser(user.id).slice(0, 3) : [];
  const pendingReviews = getPendingReports().slice(0, 3);

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEmployee 
                ? "Here's an overview of your safety observations"
                : "Here's an overview of pending reviews and actions"
              }
            </p>
          </div>
          {isEmployee && (
            <Link to="/submit-report">
              <Button className="gap-2">
                <PlusCircle className="w-4 h-4" />
                New Observation
              </Button>
            </Link>
          )}
          {isSupervisor && (
            <Link to="/review-reports">
              <Button className="gap-2">
                <ClipboardList className="w-4 h-4" />
                Review Reports
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Stats Grid - Employee View */}
      {isEmployee && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            title="Total Submitted"
            value={myReports.length || stats.total}
            icon={FileText}
            variant="primary"
          />
          <StatCard
            title="Pending Review"
            value={stats.pending}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Approved"
            value={stats.approved}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Action Required"
            value={stats.actionAssigned}
            icon={AlertTriangle}
            variant="danger"
          />
        </div>
      )}

      {/* Stats Grid - Supervisor View */}
      {isSupervisor && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            title="Pending Review"
            value={stats.pending + stats.inReview}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            title="Action Assigned"
            value={stats.actionAssigned}
            icon={AlertTriangle}
            variant="danger"
          />
          <StatCard
            title="Approved/Closed"
            value={stats.approved}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Total Reports"
            value={stats.total}
            icon={FileText}
            variant="primary"
          />
        </div>
      )}

      {/* Quick Stats - Employee */}
      {isEmployee && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">Observation Types</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Unsafe Acts</span>
                <span className="font-semibold text-card-foreground">{stats.unsafeActs}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(stats.unsafeActs / stats.total) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Unsafe Conditions</span>
                <span className="font-semibold text-card-foreground">{stats.unsafeConditions}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-status-pending rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(stats.unsafeConditions / stats.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recent Reports - Employee */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-card-foreground">My Recent Reports</h3>
              <Link to="/report-status" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {myReports.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">
                  No reports submitted yet. 
                  <Link to="/submit-report" className="text-primary hover:underline ml-1">
                    Create your first report
                  </Link>
                </p>
              ) : (
                myReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-card-foreground truncate">{report.title}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(report.submittedAt)}</p>
                    </div>
                    <StatusBadge status={report.status} size="sm" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Supervisor Dashboard Content */}
      {isSupervisor && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Reviews */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-status-pending/10 rounded-lg">
                  <ClipboardList className="w-5 h-5 text-status-pending" />
                </div>
                <h3 className="font-semibold text-card-foreground">Pending Reviews</h3>
              </div>
              <Link to="/review-reports" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {pendingReviews.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">
                  No pending reports to review
                </p>
              ) : (
                pendingReviews.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-card-foreground truncate">{report.title}</p>
                      <p className="text-xs text-muted-foreground">
                        By {report.submittedByName} • {formatDate(report.submittedAt)}
                      </p>
                    </div>
                    <StatusBadge status={report.status} size="sm" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <Link to="/review-reports">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-card-foreground">Review Pending Reports</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
              <Link to="/assign-actions">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-card-foreground">Assign Corrective Actions</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
              <Link to="/reports-overview">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-card-foreground">View Reports Overview</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
