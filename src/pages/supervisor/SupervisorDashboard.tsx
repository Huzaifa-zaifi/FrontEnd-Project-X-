import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/common/StatCard';
import StatusBadge from '@/components/common/StatusBadge';
import RiskBadge from '@/components/common/RiskBadge';
import { getReportStats, getReports, getPendingReports } from '@/services/reportService';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Eye,
  ClipboardCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SupervisorDashboard = () => {
  const { user } = useAuth();
  const stats = getReportStats();
  const pendingReports = getPendingReports().slice(0, 5);
  const recentReports = getReports().slice(0, 3);

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Supervisor Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name?.split(' ')[0] || 'Supervisor'}. Manage safety observations and actions.
            </p>
          </div>
          <Link to="/supervisor/observations">
            <Button className="gap-2">
              <Eye className="w-4 h-4" />
              Review Observations
            </Button>
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Observations"
          value={stats.total}
          icon={FileText}
          variant="primary"
        />
        <StatCard
          title="Pending Review"
          value={stats.pending + stats.inReview}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Actions Assigned"
          value={stats.actionAssigned}
          icon={AlertTriangle}
          variant="danger"
        />
        <StatCard
          title="Closed"
          value={stats.closed}
          icon={CheckCircle}
          variant="success"
        />
      </div>

      {/* Quick Actions & Pending Observations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-card rounded-xl shadow-card p-6 animate-slide-up">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/supervisor/observations"
              className="flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-card-foreground">Review Observations</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
            <Link
              to="/supervisor/assign-actions"
              className="flex items-center justify-between p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-card-foreground">Assign Actions</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
            <Link
              to="/supervisor/track-actions"
              className="flex items-center justify-between p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <ClipboardCheck className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-card-foreground">Track Actions</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
            <Link
              to="/supervisor/reports"
              className="flex items-center justify-between p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-card-foreground">View Reports</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>

        {/* Pending Observations */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">
              Pending Review
            </h2>
            <Link
              to="/supervisor/observations"
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {pendingReports.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <p className="text-muted-foreground">All observations have been reviewed!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground font-mono">
                        {report.reportId}
                      </span>
                      <StatusBadge status={report.status} size="sm" showIcon={false} />
                      <RiskBadge level={report.riskLevel} size="sm" />
                    </div>
                    <h3 className="font-medium text-card-foreground truncate">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {report.category} • {report.location} • {formatDate(report.submittedAt)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Submitted by: {report.submittedByName}
                    </p>
                  </div>
                  <Link to={`/supervisor/observations?id=${report.id}`}>
                    <Button size="sm" variant="outline" className="ml-4">
                      Review
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Observation Types */}
        <div className="bg-card rounded-xl shadow-card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-lg font-semibold text-card-foreground mb-4">
            Observation Types
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Unsafe Acts</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${(stats.unsafeActs / stats.total) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{stats.unsafeActs}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Unsafe Conditions</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(stats.unsafeConditions / stats.total) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{stats.unsafeConditions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Level Breakdown */}
        <div className="bg-card rounded-xl shadow-card p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h2 className="text-lg font-semibold text-card-foreground mb-4">
            Risk Level Breakdown
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats.riskStats.low || 0}</p>
              <p className="text-xs text-green-600 font-medium">Low</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{stats.riskStats.medium || 0}</p>
              <p className="text-xs text-yellow-600 font-medium">Medium</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{stats.riskStats.high || 0}</p>
              <p className="text-xs text-orange-600 font-medium">High</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{stats.riskStats.critical || 0}</p>
              <p className="text-xs text-red-600 font-medium">Critical</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupervisorDashboard;
