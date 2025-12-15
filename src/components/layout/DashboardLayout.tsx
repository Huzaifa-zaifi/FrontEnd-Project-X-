import { ReactNode } from 'react';
import SupervisorSidebar from '@/components/layout/SupervisorSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SupervisorSidebar />
      <main className="ml-56 min-h-screen p-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
