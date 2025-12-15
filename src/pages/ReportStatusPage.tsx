import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusBadge from '@/components/common/StatusBadge';
import { getReports } from '@/services/reportService';
import type { Report, ReportStatus as ReportStatusType } from '@/types/report';
import { formatDistanceToNow } from 'date-fns';
import { FileText, Filter, Search, ChevronRight, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ReportStatusPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReportStatusType | 'all'>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const reports = getReports();

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reports, searchQuery, statusFilter]);

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Report Status</h1>
        <p className="text-muted-foreground mt-1">
          Track the status of your submitted reports
        </p>
      </header>

      {/* Filters */}
      <div className="bg-card rounded-xl shadow-card p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as ReportStatusType | 'all')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Needs Revision</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="bg-card rounded-xl shadow-card p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No reports found</h3>
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Submit your first report to get started'}
            </p>
          </div>
        ) : (
          filteredReports.map((report, index) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="bg-card rounded-xl shadow-card p-5 hover:shadow-card-hover transition-all cursor-pointer group animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-card-foreground truncate">
                      {report.title}
                    </h3>
                    <StatusBadge status={report.status} />
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Category:</span> {report.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Type:</span> {report.type}
                    </span>
                    <span>Submitted {formatDate(report.submittedAt)}</span>
                  </div>
                  {report.feedback && (
                    <div className="mt-3 flex items-start gap-2 p-3 bg-muted rounded-lg">
                      <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-card-foreground mb-0.5">Feedback</p>
                        <p className="text-sm text-muted-foreground">{report.feedback}</p>
                      </div>
                    </div>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-card-foreground transition-colors ml-4" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Report Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="pr-8">{selectedReport?.title}</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedReport.status} size="md" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium text-card-foreground">{selectedReport.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium text-card-foreground">{selectedReport.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p className="font-medium text-card-foreground">
                    {formatDate(selectedReport.submittedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-card-foreground">
                    {formatDate(selectedReport.updatedAt)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-sm mb-1">Description</p>
                <p className="text-card-foreground">{selectedReport.description}</p>
              </div>

              {selectedReport.feedback && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-card-foreground mb-1">
                    Reviewer Feedback
                  </p>
                  <p className="text-muted-foreground">{selectedReport.feedback}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ReportStatusPage;
