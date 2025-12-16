import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/common/StatCard';
import { getReportStats, getAllReports } from '@/services/reportService';
import { 
  BarChart3, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const ReportsOverview = () => {
  const stats = getReportStats();
  const allReports = getAllReports();

  // Calculate category breakdown
  const categoryBreakdown = allReports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Calculate risk level breakdown
  const riskBreakdown = allReports.reduce((acc, report) => {
    acc[report.riskLevel] = (acc[report.riskLevel] || 0) + 1;
    return acc;
  }, {});

  const riskColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500',
  };

  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Reports Overview</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive analytics and insights on safety observations
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Reports"
          value={stats.total}
          icon={FileText}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
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
          title="Resolved"
          value={stats.approved}
          icon={CheckCircle}
          variant="success"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Observation Types */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PieChart className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">Observation Types</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Unsafe Acts</span>
                <span className="font-semibold text-card-foreground">{stats.unsafeActs}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary rounded-full h-3 transition-all duration-500"
                  style={{ width: `${(stats.unsafeActs / stats.total) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Unsafe Conditions</span>
                <span className="font-semibold text-card-foreground">{stats.unsafeConditions}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-status-pending rounded-full h-3 transition-all duration-500"
                  style={{ width: `${(stats.unsafeConditions / stats.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Unsafe Acts Ratio</span>
              <span className="font-medium text-card-foreground">
                {((stats.unsafeActs / stats.total) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Risk Level Distribution */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">Risk Level Distribution</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(riskBreakdown).map(([level, count]) => (
              <div key={level} className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${riskColors[level]}`} />
                <span className="text-sm text-muted-foreground flex-1 capitalize">{level}</span>
                <span className="font-semibold text-card-foreground">{count}</span>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {((count / stats.total) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-status-rejected" />
              <span className="text-muted-foreground">High/Critical:</span>
              <span className="font-medium text-status-rejected">
                {((riskBreakdown.high || 0) + (riskBreakdown.critical || 0))} reports
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown & Status Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">Top Categories</h3>
          </div>
          <div className="space-y-4">
            {categories.map(([category, count], index) => (
              <div key={category} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-card-foreground">{category}</span>
                    <span className="font-semibold text-card-foreground">{count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary/70 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Summary */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">Status Summary</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-status-pending" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground">{stats.pending}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">In Review</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground">{stats.inReview}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Action Assigned</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground">{stats.actionAssigned}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-status-approved" />
                <span className="text-sm text-muted-foreground">Approved</span>
              </div>
              <p className="text-2xl font-bold text-card-foreground">{stats.approved}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Resolution Rate</span>
              <div className="flex items-center gap-1 text-status-approved font-medium">
                <ArrowUp className="w-3 h-3" />
                {((stats.approved / stats.total) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsOverview;
