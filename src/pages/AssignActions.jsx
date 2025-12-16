import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusBadge from '@/components/common/StatusBadge';
import { 
  getAllReports, 
  getEmployees, 
  assignCorrectiveAction,
  getReportsByStatus 
} from '@/services/reportService';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow, format, addDays } from 'date-fns';
import { 
  Users, 
  Search, 
  AlertTriangle,
  Calendar,
  User,
  Send,
  CheckCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AssignActions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [actionForm, setActionForm] = useState({
    assignedTo: '',
    action: '',
    dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    comments: '',
  });

  // Get reports that need corrective action (approved or pending)
  const allReports = getAllReports();
  const actionableReports = allReports.filter(r => 
    r.status === 'approved' || r.status === 'pending' || r.status === 'in_review'
  );
  const employees = getEmployees();

  const filteredReports = actionableReports.filter(report => {
    return report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           report.reportId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAssignAction = async () => {
    if (!selectedReport) return;
    
    if (!actionForm.assignedTo || !actionForm.action) {
      toast({
        title: 'Missing Information',
        description: 'Please select a responsible person and describe the action required.',
        variant: 'destructive',
      });
      return;
    }

    setIsAssigning(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const assignedEmployee = employees.find(e => e.id === actionForm.assignedTo);
    
    assignCorrectiveAction(
      selectedReport.id,
      {
        ...actionForm,
        assignedToName: assignedEmployee?.name || 'Unknown',
      },
      user?.id || '2',
      user?.name || 'Supervisor'
    );

    toast({
      title: 'Action Assigned',
      description: `Corrective action assigned to ${assignedEmployee?.name} for report ${selectedReport.reportId}.`,
    });

    setSelectedReport(null);
    setActionForm({
      assignedTo: '',
      action: '',
      dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
      comments: '',
    });
    setIsAssigning(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Assign Actions</h1>
        <p className="text-muted-foreground mt-1">
          Assign corrective actions to reports and track progress
        </p>
      </header>

      {/* Search */}
      <div className="bg-card rounded-xl p-4 shadow-card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reports to assign actions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Reports for Action ({filteredReports.length})
          </h2>
          
          {filteredReports.length === 0 ? (
            <div className="bg-card rounded-xl p-8 shadow-card text-center">
              <CheckCircle className="w-10 h-10 text-status-approved mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-1">No Actions Needed</h3>
              <p className="text-sm text-muted-foreground">All reports have been addressed</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`bg-card rounded-xl p-4 shadow-card cursor-pointer transition-all duration-200 ${
                  selectedReport?.id === report.id 
                    ? 'ring-2 ring-primary shadow-card-hover' 
                    : 'hover:shadow-card-hover'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {report.reportId}
                      </span>
                      <StatusBadge status={report.status} size="sm" />
                      {report.correctiveAction && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                          Action Assigned
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-card-foreground text-sm truncate">{report.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{report.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{report.category}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(report.submittedAt), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded flex-shrink-0 ${getRiskLevelColor(report.riskLevel)}`}>
                    {report.riskLevel.charAt(0).toUpperCase() + report.riskLevel.slice(1)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Assignment Panel */}
        <div className="lg:sticky lg:top-8">
          {selectedReport ? (
            <div className="bg-card rounded-xl shadow-card overflow-hidden animate-scale-in">
              <div className="p-6 border-b border-border bg-primary/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-card-foreground">Assign Corrective Action</h2>
                    <p className="text-xs text-muted-foreground">{selectedReport.reportId}</p>
                  </div>
                </div>
                <p className="text-sm text-card-foreground">{selectedReport.title}</p>
              </div>

              <div className="p-6 space-y-5">
                {/* Assign To */}
                <div className="space-y-2">
                  <Label>Assign To *</Label>
                  <Select
                    value={actionForm.assignedTo}
                    onValueChange={(value) => setActionForm({ ...actionForm, assignedTo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select responsible person" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{emp.name}</span>
                            <span className="text-muted-foreground">({emp.department})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Required */}
                <div className="space-y-2">
                  <Label>Action Required *</Label>
                  <Textarea
                    placeholder="Describe the corrective action to be taken..."
                    value={actionForm.action}
                    onChange={(e) => setActionForm({ ...actionForm, action: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={actionForm.dueDate}
                      onChange={(e) => setActionForm({ ...actionForm, dueDate: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <Label>Additional Comments (Optional)</Label>
                  <Textarea
                    placeholder="Any additional instructions or notes..."
                    value={actionForm.comments}
                    onChange={(e) => setActionForm({ ...actionForm, comments: e.target.value })}
                    className="min-h-[60px]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedReport(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAssignAction}
                    disabled={isAssigning}
                    className="flex-1 gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isAssigning ? 'Assigning...' : 'Assign Action'}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl p-12 shadow-card text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-card-foreground mb-2">Select a Report</h3>
              <p className="text-sm text-muted-foreground">
                Click on a report from the list to assign a corrective action
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssignActions;
