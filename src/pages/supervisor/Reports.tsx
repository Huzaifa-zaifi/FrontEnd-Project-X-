import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getReportStats, getReports, exportReportsData } from '@/services/reportService';
import {
  BarChart3,
  FileText,
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  PieChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();
  const stats = getReportStats();
  const reports = getReports();
  const [timeRange, setTimeRange] = useState('month');

  const categoryData = Object.entries(stats.categoryStats).sort((a, b) => b[1] - a[1]);
  const maxCategoryValue = Math.max(...Object.values(stats.categoryStats));

  const handleExport = (format: 'csv' | 'pdf') => {
    const data = exportReportsData();
    
    if (format === 'csv') {
      const headers = Object.keys(data[0] || {}).join(',');
      const rows = data.map(row => Object.values(row).map(v => `"${v}"`).join(',')).join('\n');
      const csv = `${headers}\n${rows}`;
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `safety-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      
      toast({
        title: 'Export Complete',
        description: 'CSV file has been downloaded.',
      });
    } else {
      toast({
        title: 'PDF Export',
        description: 'PDF export would be implemented with a library like jsPDF.',
      });
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Safety performance overview and insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Observations</p>
              <p className="text-3xl font-bold text-foreground mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-3xl font-bold text-foreground mt-1">{stats.pending + stats.inReview}</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Action Required</p>
              <p className="text-3xl font-bold text-foreground mt-1">{stats.actionAssigned}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Closed</p>
              <p className="text-3xl font-bold text-foreground mt-1">{stats.closed}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Observation Types Chart */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Observation Types</h2>
          </div>
          
          <div className="flex items-center justify-center gap-12">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="20"
                  strokeDasharray={`${(stats.unsafeActs / stats.total) * 251.2} 251.2`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-foreground">{stats.total}</span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Unsafe Acts</p>
                  <p className="text-xs text-muted-foreground">{stats.unsafeActs} ({Math.round((stats.unsafeActs / stats.total) * 100)}%)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-blue-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Unsafe Conditions</p>
                  <p className="text-xs text-muted-foreground">{stats.unsafeConditions} ({Math.round((stats.unsafeConditions / stats.total) * 100)}%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Level Distribution */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Risk Level Distribution</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-600">{stats.riskStats.low || 0}</p>
              <p className="text-sm text-green-700 font-medium">Low Risk</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <p className="text-3xl font-bold text-yellow-600">{stats.riskStats.medium || 0}</p>
              <p className="text-sm text-yellow-700 font-medium">Medium Risk</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <p className="text-3xl font-bold text-orange-600">{stats.riskStats.high || 0}</p>
              <p className="text-sm text-orange-700 font-medium">High Risk</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-600">{stats.riskStats.critical || 0}</p>
              <p className="text-sm text-red-700 font-medium">Critical</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card rounded-xl shadow-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Category Breakdown</h2>
          </div>
          
          <div className="space-y-4">
            {categoryData.map(([category, count]) => (
              <div key={category} className="flex items-center gap-4">
                <div className="w-32 text-sm text-muted-foreground truncate">{category}</div>
                <div className="flex-1">
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${(count / maxCategoryValue) * 100}%` }}
                    >
                      <span className="text-xs font-medium text-primary-foreground">{count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-card rounded-xl shadow-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Key Performance Indicators</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">
                {stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">Closure Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">
                {stats.total > 0 ? Math.round((stats.actionAssigned / stats.total) * 100) : 0}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">Action Assignment Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">
                {stats.total > 0 ? Math.round(((stats.riskStats.high || 0) + (stats.riskStats.critical || 0)) / stats.total * 100) : 0}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">High/Critical Risk</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{reports.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Records</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
