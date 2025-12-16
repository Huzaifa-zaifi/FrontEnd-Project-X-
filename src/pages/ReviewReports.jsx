import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusBadge from '@/components/common/StatusBadge';
import { getPendingReports, updateReportStatus } from '@/services/reportService';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { 
  ClipboardList, 
  Search, 
  CheckCircle, 
  XCircle, 
  Eye,
  AlertTriangle,
  MapPin,
  User
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ReviewReports = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const pendingReports = getPendingReports();

  const filteredReports = pendingReports.filter(report => {
    return report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           report.reportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           report.submittedByName.toLowerCase().includes(searchQuery.toLowerCase());
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

  const handleApprove = async () => {
    if (!selectedReport) return;
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    updateReportStatus(selectedReport.id, 'approved', feedback);
    
    toast({
      title: 'Report Approved',
      description: `Report ${selectedReport.reportId} has been approved.`,
    });
    
    setSelectedReport(null);
    setFeedback('');
    setIsProcessing(false);
    setRefreshKey(prev => prev + 1);
  };

  const handleReject = async () => {
    if (!selectedReport) return;
    if (!feedback) {
      toast({
        title: 'Feedback Required',
        description: 'Please provide feedback when rejecting a report.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    updateReportStatus(selectedReport.id, 'rejected', feedback);
    
    toast({
      title: 'Report Rejected',
      description: `Report ${selectedReport.reportId} has been rejected.`,
    });
    
    setSelectedReport(null);
    setFeedback('');
    setIsProcessing(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Review Reports</h1>
        <p className="text-muted-foreground mt-1">
          Review and approve pending safety observations
        </p>
      </header>

      {/* Search */}
      <div className="bg-card rounded-xl p-4 shadow-card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search pending reports..."
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
            <ClipboardList className="w-5 h-5" />
            Pending Reviews ({filteredReports.length})
          </h2>
          
          {filteredReports.length === 0 ? (
            <div className="bg-card rounded-xl p-8 shadow-card text-center">
              <CheckCircle className="w-10 h-10 text-status-approved mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-1">All Caught Up!</h3>
              <p className="text-sm text-muted-foreground">No pending reports to review</p>
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
                    </div>
                    <h3 className="font-medium text-card-foreground text-sm truncate">{report.title}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {report.submittedByName}
                      </span>
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

        {/* Report Detail Panel */}
        <div className="lg:sticky lg:top-8">
          {selectedReport ? (
            <div className="bg-card rounded-xl shadow-card overflow-hidden animate-scale-in">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                    {selectedReport.reportId}
                  </span>
                  <StatusBadge status={selectedReport.status} />
                </div>
                <h2 className="text-xl font-semibold text-card-foreground mb-2">{selectedReport.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedReport.location}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${getRiskLevelColor(selectedReport.riskLevel)}`}>
                    {selectedReport.riskLevel.charAt(0).toUpperCase() + selectedReport.riskLevel.slice(1)} Risk
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-card-foreground">{selectedReport.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Type</p>
                    <p className="text-sm text-card-foreground capitalize">{selectedReport.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Category</p>
                    <p className="text-sm text-card-foreground">{selectedReport.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Submitted By</p>
                    <p className="text-sm text-card-foreground">{selectedReport.submittedByName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Submitted</p>
                    <p className="text-sm text-card-foreground">
                      {formatDistanceToNow(new Date(selectedReport.submittedAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Feedback (optional for approval)</p>
                  <Textarea
                    placeholder="Add your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="flex-1 gap-2 bg-status-approved hover:bg-status-approved/90"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button 
                    onClick={handleReject}
                    disabled={isProcessing}
                    variant="destructive"
                    className="flex-1 gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl p-12 shadow-card text-center">
              <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-card-foreground mb-2">Select a Report</h3>
              <p className="text-sm text-muted-foreground">
                Click on a report from the list to view details and take action
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReviewReports;
