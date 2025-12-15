import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusBadge from '@/components/common/StatusBadge';
import RiskBadge from '@/components/common/RiskBadge';
import { getReports, updateReportStatus } from '@/services/reportService';
import { Report, ReportStatus } from '@/types/report';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  User,
  Calendar,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Observations = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>(getReports());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.submittedByName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleApprove = (report: Report) => {
    const updated = updateReportStatus(report.id, 'in_review');
    if (updated) {
      setReports(getReports());
      toast({
        title: 'Observation Approved',
        description: `${report.reportId} has been approved for further action.`,
      });
    }
    setSelectedReport(null);
  };

  const handleReject = () => {
    if (!selectedReport) return;
    
    const updated = updateReportStatus(selectedReport.id, 'rejected', rejectReason);
    if (updated) {
      setReports(getReports());
      toast({
        title: 'Observation Rejected',
        description: `${selectedReport.reportId} has been rejected.`,
        variant: 'destructive',
      });
    }
    setShowRejectDialog(false);
    setRejectReason('');
    setSelectedReport(null);
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Observations</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage all safety observations
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, title, or submitter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="action_assigned">Action Assigned</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Observations List */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Report ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Risk
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Submitted
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-sm font-mono text-muted-foreground">
                      {report.reportId}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {report.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {report.category} • {report.location}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      report.type === 'unsafe_act' 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {report.type === 'unsafe_act' ? 'Unsafe Act' : 'Unsafe Condition'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <RiskBadge level={report.riskLevel} size="sm" />
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={report.status} size="sm" />
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-card-foreground">{formatDate(report.submittedAt)}</p>
                      <p className="text-xs text-muted-foreground">by {report.submittedByName}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No observations found</p>
          </div>
        )}
      </div>

      {/* View Report Dialog */}
      <Dialog open={!!selectedReport && !showRejectDialog} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="font-mono text-muted-foreground">{selectedReport?.reportId}</span>
              {selectedReport && <StatusBadge status={selectedReport.status} size="sm" />}
            </DialogTitle>
            <DialogDescription>
              Submitted {selectedReport && formatDate(selectedReport.submittedAt)}
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedReport.title}</h3>
                <p className="text-muted-foreground mt-2">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">
                    {selectedReport.type === 'unsafe_act' ? 'Unsafe Act' : 'Unsafe Condition'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{selectedReport.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{selectedReport.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Risk Level:</span>
                  <RiskBadge level={selectedReport.riskLevel} />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Submitted by:</span>
                  <span className="font-medium">{selectedReport.submittedByName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {format(new Date(selectedReport.submittedAt), 'PPP')}
                  </span>
                </div>
              </div>

              {selectedReport.feedback && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-1">Feedback:</p>
                  <p className="text-sm text-muted-foreground">{selectedReport.feedback}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            {selectedReport?.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowRejectDialog(true)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button onClick={() => handleApprove(selectedReport)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
            {selectedReport?.status === 'in_review' && (
              <Button asChild>
                <a href={`/supervisor/assign-actions?reportId=${selectedReport.id}`}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Assign Action
                </a>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Observation</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this observation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Observations;
