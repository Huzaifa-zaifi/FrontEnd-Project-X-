import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import SubmitReport from './Components/SubmitReport';
import ReportStatusPage from './Components/Status';
import HistoryPage from './Components/History';
import ObservationDetails from './Components/ObservationDetails';
import SupervisorDashboard from './Components/Supervisor/Supd';
import ApproveRejectObservations from './Components/Supervisor/Approve';
import AssignCorrectiveActions from './Components/Supervisor/Assign';
import TrackProgressOfActions from './Components/Supervisor/Track';
import SupervisorObservations from './Components/Supervisor/ViewNewObservations';
import AdminDashboard from './Components/Admin/AdminD';
import AllObservationsDashboard from './Components/Admin/Allobs';
import ApprovalWorkflowDashboard from './Components/Admin/ApproveWork';
import UserManagementDashboard from './Components/Admin/UserManagement';
import RolesPermissionsDashboard from './Components/Admin/RolePermission';
import CategoriesRisksDashboard from './Components/Admin/CategoriesRisk';
import ReportsAnalyticsDashboard from './Components/Admin/RoleAnalytics';
import ActionHistoryPage from './Components/Admin/HistoryA';
import ApprovedObservations from './Components/Supervisor/ViewNewObservations';
import ClientGraphsInsights from './Components/Client/ClientGraphs';
import ClientDashboard from './Components/Client/ClientD';
import ClientAllObservations from './Components/Client/ClientAllOb';
import ClientReports from "./Components/Client/ClientR"
import ActivityHistory from "./Components/Client/ActivityH"

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Other Pages */}
        <Route path="/EMP-dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitReport />} />
        <Route path="/status" element={<ReportStatusPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/observations/:id" element={<ObservationDetails />} />

        {/* Supervisor */}
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route path="/approve-reject" element={<ApproveRejectObservations />} />
        <Route path="/assign-act" element={<AssignCorrectiveActions />} />
        <Route path="/track" element={<TrackProgressOfActions />} />
        <Route path="/view-observations" element={<ApprovedObservations />} />

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

        {/* Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
