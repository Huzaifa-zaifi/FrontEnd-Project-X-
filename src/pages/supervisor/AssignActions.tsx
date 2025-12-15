import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusBadge from '@/components/common/StatusBadge';
import RiskBadge from '@/components/common/RiskBadge';
import { 
  getReports, 
  assignCorrectiveAction, 
  getUsers 
} from '@/services/reportService';
import { Report } from '@/types/report';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertTriangle,
  User,
  Calendar,
  ClipboardList,
  Send,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { useToast } from '@/hooks/use-toast';

const AssignActions = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const preSelectedId = searchParams.get('reportId');
  
  const [reports, setReports] = useState<Report[]>(() => 
    getReports().filter(r => r.status === 'pending' || r.status === 'in_review')
  );
  const [selectedReport, setSelectedReport] = useState<Report | null>(
    preSelectedId ? reports.find(r => r.id === preSelectedId) || null : null
  );
  const [showAssignDialog, setShowAssignDialog] = useState(!!preSelectedId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employees = getUsers().filter(u => u.role === 'employee' || u.role === 'supervisor');

  const [actionData, setActionData] = useState({
    action: '',
    assignedTo: '',
    dueDate: '',
    comments: '',
  });

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const handleAssignAction = async () => {
    if (!selectedReport || !actionData.action || !actionData.assignedTo || !actionData.dueDate) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const assignedEmployee = employees.find(e => e.id === actionData.assignedTo);

    const result = assignCorrectiveAction(selectedReport.id, {
      action: actionData.action,
      assignedTo: actionData.assignedTo,
      assignedToName: assignedEmployee?.name || 'Unknown',
      assignedBy: user?.id || '',
      assignedByName: user?.name || 'Supervisor',
      dueDate: actionData.dueDate,
      comments: actionData.comments,
    });

    if (result) {
      toast({
        title: 'Action Assigned',
        description: `Corrective action assigned to ${assignedEmployee?.name}.`,
      });
      setReports(getReports().filter(r => r.status === 'pending' || r.status === 'in_review'));
      setShowAssignDialog(false);
      setSelectedReport(null);
      setActionData({ action: '', assignedTo: '', dueDate: '', comments: '' });
    }

    setIsSubmitting(false);
  };

  const openAssignDialog = (report: Report) => {
    setSelectedReport(report);
    setShowAssignDialog(true);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Assign Corrective Actions</h1>
        <p className="text-muted-foreground mt-1">
          Assign actions to approved observations
        </p>
      </header>

      {/* Pending Assignments */}
      <div className="grid gap-6">
        {reports.length === 0 ? (
          <div className="bg-card rounded-xl shadow-card p-12 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              All Caught Up!
            </h3>
            <p className="text-muted-foreground">
              There are no pending observations requiring action assignment.
            </p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="bg-card rounded-xl shadow-card p-6 hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-muted-foreground">
                      {report.reportId}
                    </span>
                    <StatusBadge status={report.status} size="sm" />
                    <RiskBadge level={report.riskLevel} size="sm" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {report.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {report.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {report.category}
                    </span>
                    <span>📍 {report.location}</span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {report.submittedByName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(report.submittedAt)}
                    </span>
                  </div>
                </div>
                <Button onClick={() => openAssignDialog(report)}>
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Assign Action
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Assign Action Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Assign Corrective Action</DialogTitle>
            <DialogDescription>
              {selectedReport && (
                <span className="font-mono">{selectedReport.reportId}</span>
              )} - {selectedReport?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="action">Corrective Action Required *</Label>
              <Textarea
                id="action"
                placeholder="Describe the corrective action to be taken..."
                value={actionData.action}
                onChange={(e) => setActionData({ ...actionData, action: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignTo">Assign To *</Label>
              <Select
                value={actionData.assignedTo}
                onValueChange={(value) => setActionData({ ...actionData, assignedTo: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select responsible person" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={actionData.dueDate}
                onChange={(e) => setActionData({ ...actionData, dueDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Additional Comments</Label>
              <Textarea
                id="comments"
                placeholder="Any additional instructions or notes..."
                value={actionData.comments}
                onChange={(e) => setActionData({ ...actionData, comments: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssignAction} 
              disabled={isSubmitting || !actionData.action || !actionData.assignedTo || !actionData.dueDate}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Assigning...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Assign Action
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AssignActions;
