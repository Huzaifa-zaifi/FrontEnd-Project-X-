import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusBadge from '@/components/common/StatusBadge';
import { getAllReports } from '@/services/reportService';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { History as HistoryIcon, Search, Calendar, Filter, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const History = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const allReports = getAllReports();
  
  // For employees, show only their reports; for supervisors, show all
  const reports = user?.role === 'employee' 
    ? allReports.filter(r => r.submittedBy === user.id)
    : allReports;

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.submittedByName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(reports.map(r => r.category))];

  return (
    <DashboardLayout>
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">History</h1>
            <p className="text-muted-foreground mt-1">
              View historical records of all safety observations
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-card rounded-xl p-4 shadow-card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-semibold text-card-foreground">Report ID</th>
                <th className="text-left p-4 text-sm font-semibold text-card-foreground">Title</th>
                <th className="text-left p-4 text-sm font-semibold text-card-foreground">Category</th>
                <th className="text-left p-4 text-sm font-semibold text-card-foreground">Submitted By</th>
                <th className="text-left p-4 text-sm font-semibold text-card-foreground">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-card-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <HistoryIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No historical records found</p>
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr 
                    key={report.id} 
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {report.reportId}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-card-foreground text-sm">{report.title}</p>
                      <p className="text-xs text-muted-foreground capitalize mt-0.5">
                        {report.type.replace('_', ' ')}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-card-foreground">{report.category}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-card-foreground">{report.submittedByName}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(report.submittedAt), 'PP')}
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={report.status} size="sm" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-card rounded-lg p-4 shadow-card">
          <p className="text-2xl font-bold text-card-foreground">{filteredReports.length}</p>
          <p className="text-sm text-muted-foreground">Total Records</p>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-card">
          <p className="text-2xl font-bold text-status-approved">{filteredReports.filter(r => r.status === 'approved' || r.status === 'closed').length}</p>
          <p className="text-sm text-muted-foreground">Resolved</p>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-card">
          <p className="text-2xl font-bold text-status-pending">{filteredReports.filter(r => r.status === 'pending' || r.status === 'in_review').length}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="bg-card rounded-lg p-4 shadow-card">
          <p className="text-2xl font-bold text-status-rejected">{filteredReports.filter(r => r.riskLevel === 'critical' || r.riskLevel === 'high').length}</p>
          <p className="text-sm text-muted-foreground">High Risk</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default History;
