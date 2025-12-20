import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import SubmitReport from './Components/SubmitReport';
import ReportStatusPage from './Components/status';
import HistoryPage from './Components/history';
import SupervisorDashboard from './Components/superD';
import NewObservationDashboard from './Components/newobs';
import ApproveRejectObservations from './Components/approve';
import AssignCorrectiveActions from './Components/assignC';
import TrackProgressOfActions from './Components/trackpro';

// Admin Components
import AdminDashboard from './Components/Admin/adminD';
import AllObservationsDashboard from './Components/Admin/Allobs';
import ApprovalWorkflowDashboard from './Components/Admin/ApprovalWorkf';
import UserManagementDashboard from './Components/Admin/UserManagementD';
import RolesPermissionsDashboard from './Components/Admin/RolesPermissionsD';
import CategoriesRisksDashboard from './Components/Admin/CategoriesRisksD';
import ReportsAnalyticsDashboard from './Components/Admin/ReportsAnalyticsD';
import ActionHistoryPage from './Components/Admin/HistoryA';
// Client Components
import ClientDashboard from './Components/clients/ClientD';
import ClientAllObservations from './Components/clients/ClientAllOb';
import ClientGraphsInsights from './Components/clients/ClientGraphs';
import ClientReports from './Components/clients/ClientR';
import ActivityHistory from './Components/clients/ActivityH';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Employee */}
        <Route path="/emp-dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitReport />} />
        <Route path="/status" element={<ReportStatusPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route path="/new-observation-dashboard" element={<NewObservationDashboard />} />
        <Route path="/approve-reject" element={<ApproveRejectObservations />} />

        {/* Action */}
        <Route path="/assign-corrective-actions" element={<AssignCorrectiveActions />} />
        <Route path="/track-progress-actions" element={<TrackProgressOfActions />} />

        {/* Admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/all-observations" element={<AllObservationsDashboard />} />
        <Route path="/admin/approval" element={<ApprovalWorkflowDashboard />} />
        <Route path="/admin/user-management" element={<UserManagementDashboard />} />
        <Route path="/admin/role-management" element={<RolesPermissionsDashboard />} />
        <Route path="/admin/category-management" element={<CategoriesRisksDashboard />} />       
        <Route path="/admin/report-analytics"   element={<ReportsAnalyticsDashboard />} />
        <Route path="/admin/action-history" element={<ActionHistoryPage />} />

        {/* clients dashbord */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/clients/ClientsAllobs" element={<ClientAllObservations />} />
        <Route path="/clients/Clientgraphs" element={<ClientGraphsInsights />} />
        <Route path="/clients/ClientReports" element={<ClientReports />} />
        <Route path="/clients/ActivityHistory" element={<ActivityHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
