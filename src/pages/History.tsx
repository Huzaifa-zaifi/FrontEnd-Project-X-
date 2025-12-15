import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusBadge from '@/components/common/StatusBadge';
import { getReports } from '@/services/reportService';
import { ReportStatus } from '@/types/report';
import { format } from 'date-fns';
import { History as HistoryIcon, Calendar, Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const History = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const reports = getReports();

  const filteredReports = useMemo(() => {
    return reports.filter(
      (report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [reports, searchQuery]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'HH:mm');
  };

  return (
    <DashboardLayout>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">History</h1>
          <p className="text-muted-foreground mt-1">
            View all your past report submissions
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-card-foreground hover:bg-muted transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </header>

      {/* Search */}
      <div className="bg-card rounded-xl shadow-card p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* History Table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden animate-slide-up">
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center">
            <HistoryIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No history found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try a different search term' : 'Your report history will appear here'}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Report Title</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div>
                      <p className="font-medium text-card-foreground">{report.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                        {report.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">
                      {report.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{report.type}</TableCell>
                  <TableCell>
                    <StatusBadge status={report.status} size="sm" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-sm">{formatDate(report.submittedAt)}</span>
                      <span className="text-xs text-muted-foreground/60">
                        at {formatTime(report.submittedAt)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Summary */}
      {filteredReports.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Showing {filteredReports.length} of {reports.length} reports
        </div>
      )}
    </DashboardLayout>
  );
};

export default History;
