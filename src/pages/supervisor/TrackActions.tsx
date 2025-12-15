import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusBadge from '@/components/common/StatusBadge';
import RiskBadge from '@/components/common/RiskBadge';
import { 
  getReports, 
  updateReportStatus,
  updateCorrectiveActionStatus 
} from '@/services/reportService';
import { Report } from '@/types/report';
import { format, formatDistanceToNow, isPast, parseISO } from 'date-fns';
import {
  Clock,
  User,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Filter,
  PlayCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';

const TrackActions = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>(() => 
    getReports().filter(r => r.status === 'action_assigned' && r.correctiveAction)
  );
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateComments, setUpdateComments] = useState('');

  const filteredReports = reports.filter((report) => {
    if (statusFilter === 'all') return true;
    return report.correctiveAction?.status === statusFilter;
  });

  const getActionStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800' },
      in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-800' },
    };
    const c = config[status] || config.pending;
    return (
      <span className={cn('text-xs px-2 py-1 rounded-full font-medium', c.className)}>
        {c.label}
      </span>
    );
  };

  const handleUpdateStatus = async (newStatus: 'in_progress' | 'completed') => {
    if (!selectedReport) return;

    const result = updateCorrectiveActionStatus(selectedReport.id, newStatus, updateComments);
    
    if (result) {
      if (newStatus === 'completed') {
        // Also close the report when action is completed
        updateReportStatus(selectedReport.id, 'closed', 'Corrective action completed successfully.');
      }

      toast({
        title: 'Status Updated',
        description: `Action status updated to ${newStatus.replace('_', ' ')}.`,
      });
      
      setReports(getReports().filter(r => r.status === 'action_assigned' && r.correctiveAction));
    }

    setShowUpdateDialog(false);
    setSelectedReport(null);
    setUpdateComments('');
  };

  const isOverdue = (dueDate: string) => {
    return isPast(parseISO(dueDate));
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Track Actions</h1>
        <p className="text-muted-foreground mt-1">
          Monitor progress of assigned corrective actions
        </p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-xl shadow-card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {reports.filter(r => r.correctiveAction?.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PlayCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {reports.filter(r => r.correctiveAction?.status === 'in_progress').length}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {reports.filter(r => r.correctiveAction && isOverdue(r.correctiveAction.dueDate) && r.correctiveAction.status !== 'completed').length}
              </p>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-end mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="bg-card rounded-xl shadow-card p-12 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Actions to Track
            </h3>
            <p className="text-muted-foreground">
              There are no corrective actions matching your filter.
            </p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className={cn(
                'bg-card rounded-xl shadow-card p-6 border-l-4 transition-all hover:shadow-card-hover',
                report.correctiveAction?.status === 'pending' && 'border-l-amber-500',
                report.correctiveAction?.status === 'in_progress' && 'border-l-blue-500',
                report.correctiveAction?.status === 'completed' && 'border-l-emerald-500',
                report.correctiveAction && isOverdue(report.correctiveAction.dueDate) && report.correctiveAction.status !== 'completed' && 'border-l-red-500'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-muted-foreground">
                      {report.reportId}
                    </span>
                    {report.correctiveAction && getActionStatusBadge(report.correctiveAction.status)}
                    <RiskBadge level={report.riskLevel} size="sm" />
                    {report.correctiveAction && isOverdue(report.correctiveAction.dueDate) && report.correctiveAction.status !== 'completed' && (
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-800">
                        Overdue
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {report.title}
                  </h3>
                  
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-foreground mb-1">Corrective Action:</p>
                    <p className="text-sm text-muted-foreground">{report.correctiveAction?.action}</p>
                    {report.correctiveAction?.comments && (
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        Note: {report.correctiveAction.comments}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Assigned to: <strong>{report.correctiveAction?.assignedToName}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: <strong className={cn(
                        report.correctiveAction && isOverdue(report.correctiveAction.dueDate) && report.correctiveAction.status !== 'completed' && 'text-red-600'
                      )}>
                        {report.correctiveAction && format(parseISO(report.correctiveAction.dueDate), 'PPP')}
                      </strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Assigned by: {report.correctiveAction?.assignedByName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {report.correctiveAction?.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedReport(report);
                        setShowUpdateDialog(true);
                      }}
                    >
                      <PlayCircle className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {report.correctiveAction?.status === 'in_progress' && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedReport(report);
                        setShowUpdateDialog(true);
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Update Status Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Action Status</DialogTitle>
            <DialogDescription>
              {selectedReport?.reportId} - {selectedReport?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Current Status:</p>
              {selectedReport?.correctiveAction && getActionStatusBadge(selectedReport.correctiveAction.status)}
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Add Comments (Optional):</p>
              <Textarea
                placeholder="Any updates or notes about the progress..."
                value={updateComments}
                onChange={(e) => setUpdateComments(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
              Cancel
            </Button>
            {selectedReport?.correctiveAction?.status === 'pending' && (
              <Button onClick={() => handleUpdateStatus('in_progress')}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Mark In Progress
              </Button>
            )}
            {selectedReport?.correctiveAction?.status === 'in_progress' && (
              <Button onClick={() => handleUpdateStatus('completed')}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TrackActions;
