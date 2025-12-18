import './App.css'
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EMP-dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitReport />} />
        <Route path="/status" element={<ReportStatusPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route path="/new-observation-dashboard" element={<NewObservationDashboard />} />
        <Route path="/approve-reject" element={<ApproveRejectObservations />} />
        <Route path="AssignCorrectiveActions" element={<AssignCorrectiveActions/>} />
        <Route path="TrackProgressActions" element={<TrackProgressOfActions/>} />
      </Routes>
    </Router>
  );
}

export default App;
