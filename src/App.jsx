import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitReport from "./pages/SubmitReport";
import ReportStatusPage from "./pages/ReportStatusPage";
import History from "./pages/History";
import ReviewReports from "./pages/ReviewReports";
import AssignActions from "./pages/supervisor/AssignActions";
import ReportsOverview from "./pages/ReportsOverview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Employee Routes */}
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
                <ProtectedRoute allowedRoles={['employee', 'supervisor', 'admin']}>
                  <SubmitReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report-status"
              element={
                <ProtectedRoute allowedRoles={['employee', 'supervisor', 'admin']}>
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
              path="/review-reports"
              element={
                <ProtectedRoute allowedRoles={['supervisor', 'admin']}>
                  <ReviewReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assign-actions"
              element={
                <ProtectedRoute allowedRoles={['supervisor', 'admin']}>
                  <AssignActions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports-overview"
              element={
                <ProtectedRoute allowedRoles={['supervisor', 'admin']}>
                  <ReportsOverview />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
