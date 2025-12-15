import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import SubmitReport from "@/pages/SubmitReport";
import ReportStatusPage from "@/pages/ReportStatusPage";
import History from "@/pages/History";
import NotFound from "@/pages/NotFound";

// Supervisor Pages
import SupervisorDashboard from "@/pages/supervisor/SupervisorDashboard";
import Observations from "@/pages/supervisor/Observations";
import AssignActions from "@/pages/supervisor/AssignActions";
import TrackActions from "@/pages/supervisor/TrackActions";
import Reports from "@/pages/supervisor/Reports";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* General Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/submit-report"
        element={
          <ProtectedRoute>
            <SubmitReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report-status"
        element={
          <ProtectedRoute>
            <ReportStatusPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      {/* Supervisor Routes */}
      <Route
        path="/supervisor"
        element={
          <ProtectedRoute role="supervisor">
            <SupervisorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/observations"
        element={
          <ProtectedRoute role="supervisor">
            <Observations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/assign-actions"
        element={
          <ProtectedRoute role="supervisor">
            <AssignActions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/track-actions"
        element={
          <ProtectedRoute role="supervisor">
            <TrackActions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/reports"
        element={
          <ProtectedRoute role="supervisor">
            <Reports />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
