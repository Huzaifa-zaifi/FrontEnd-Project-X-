import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/common/StatCard';
import StatusBadge from '@/components/common/StatusBadge';
import { getReportStats, getReportsByUser } from '@/services/reportService';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  PlusCircle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const stats = getReportStats();
  const myReports = user ? getReportsByUser(user.id).slice(0, 3) : [];

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
              Welcome back, {user?.name?.split(' ')[0] || 'Employee'}
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your safety observations
            </p>
          </div>
          <Link to="/submit-report">
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              New Observation
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
          title="Action Assigned"
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

      {/* Quick Actions & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-card rounded-xl shadow-card p-6 animate-slide-up">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/submit-report"
              className="flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <PlusCircle className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-card-foreground">Submit Observation</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
            <Link
              to="/report-status"
              className="flex items-center justify-between p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-card-foreground">Check Status</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
            <Link
              to="/history"
              className="flex items-center justify-between p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-card-foreground">View History</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">
              My Recent Observations
            </h2>
            <Link
              to="/history"
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          {myReports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No observations yet</p>
              <Link to="/submit-report" className="text-primary hover:underline text-sm mt-2 inline-block">
                Submit your first observation
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myReports.map((report) => (
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
                    </div>
                    <h3 className="font-medium text-card-foreground truncate">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {report.category} • {report.location} • {formatDate(report.submittedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
