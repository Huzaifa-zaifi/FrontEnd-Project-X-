import { Report, ReportStatus, CorrectiveAction, Category, ObservationType, RiskLevel, Notification, Employee, UserRole } from '@/types/report';

// Generate unique report ID like OBS-MM-YY-XXX
const generateReportId = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  const random = Math.floor(Math.random() * 900) + 100;
  return `OBS-${month}-${year}-${random}`;
};

// Mock users data
const mockUsers: Employee[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@redvion.com', department: 'Operations', role: 'employee', createdAt: '2024-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@redvion.com', department: 'Safety', role: 'supervisor', createdAt: '2024-01-10' },
  { id: '3', name: 'Mike Wilson', email: 'admin@redvion.com', department: 'Management', role: 'admin', createdAt: '2024-01-01' },
  { id: '4', name: 'Client Corp', email: 'client@bhdc.com', department: 'External', role: 'client', createdAt: '2024-02-01' },
  { id: '5', name: 'Emma Davis', email: 'emma.davis@redvion.com', department: 'Maintenance', role: 'employee', createdAt: '2024-03-01' },
  { id: '6', name: 'Robert Brown', email: 'robert.brown@redvion.com', department: 'Engineering', role: 'supervisor', createdAt: '2024-02-15' },
];

// Mock reports data
const mockReports: Report[] = [
  {
    id: '1',
    reportId: 'OBS-12-24-101',
    title: 'Worker without safety helmet',
    description: 'Observed worker in Zone A not wearing required safety helmet while operating machinery.',
    type: 'unsafe_act',
    category: 'PPE',
    location: 'Zone A - Machinery Area',
    riskLevel: 'high',
    status: 'pending',
    submittedBy: '1',
    submittedByName: 'John Smith',
    submittedAt: '2024-12-14T09:30:00Z',
    updatedAt: '2024-12-14T09:30:00Z',
  },
  {
    id: '2',
    reportId: 'OBS-12-24-102',
    title: 'Oil spill near entrance',
    description: 'Large oil spill detected near the main entrance. Slip hazard for all personnel.',
    type: 'unsafe_condition',
    category: 'Housekeeping',
    location: 'Main Entrance',
    riskLevel: 'medium',
    status: 'action_assigned',
    submittedBy: '5',
    submittedByName: 'Emma Davis',
    submittedAt: '2024-12-13T14:00:00Z',
    updatedAt: '2024-12-14T10:00:00Z',
    assignedTo: '5',
    assignedToName: 'Emma Davis',
    correctiveAction: {
      id: 'ca1',
      reportId: '2',
      action: 'Clean up oil spill and place warning signs. Investigate source of leak.',
      assignedTo: '5',
      assignedToName: 'Emma Davis',
      assignedBy: '2',
      assignedByName: 'Sarah Johnson',
      dueDate: '2024-12-15',
      status: 'in_progress',
      comments: 'Cleanup in progress, source identified as forklift leak',
    },
  },
  {
    id: '3',
    reportId: 'OBS-12-24-103',
    title: 'Exposed electrical wiring',
    description: 'Electrical wiring exposed in storage room B. Risk of electrocution.',
    type: 'unsafe_condition',
    category: 'Electrical',
    location: 'Storage Room B',
    riskLevel: 'critical',
    status: 'closed',
    submittedBy: '1',
    submittedByName: 'John Smith',
    submittedAt: '2024-12-10T11:00:00Z',
    updatedAt: '2024-12-12T16:00:00Z',
    feedback: 'Issue resolved. Wiring has been properly insulated and secured.',
    correctiveAction: {
      id: 'ca2',
      reportId: '3',
      action: 'Isolate power, repair and insulate all exposed wiring. Conduct electrical safety check.',
      assignedTo: '5',
      assignedToName: 'Emma Davis',
      assignedBy: '2',
      assignedByName: 'Sarah Johnson',
      dueDate: '2024-12-12',
      status: 'completed',
      completedAt: '2024-12-12T15:30:00Z',
    },
  },
  {
    id: '4',
    reportId: 'OBS-12-24-104',
    title: 'Improper chemical storage',
    description: 'Chemicals stored without proper labeling in Warehouse C.',
    type: 'unsafe_condition',
    category: 'Chemical',
    location: 'Warehouse C',
    riskLevel: 'high',
    status: 'in_review',
    submittedBy: '5',
    submittedByName: 'Emma Davis',
    submittedAt: '2024-12-14T08:00:00Z',
    updatedAt: '2024-12-14T08:00:00Z',
  },
  {
    id: '5',
    reportId: 'OBS-11-24-098',
    title: 'Fire extinguisher expired',
    description: 'Fire extinguisher near cafeteria has expired certification.',
    type: 'unsafe_condition',
    category: 'Fire Hazard',
    location: 'Cafeteria',
    riskLevel: 'medium',
    status: 'closed',
    submittedBy: '1',
    submittedByName: 'John Smith',
    submittedAt: '2024-11-28T10:00:00Z',
    updatedAt: '2024-12-01T14:00:00Z',
    feedback: 'Fire extinguisher replaced with newly certified unit.',
  },
];

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'report_submitted',
    title: 'New Observation Submitted',
    message: 'John Smith submitted a new safety observation: Worker without safety helmet',
    read: false,
    createdAt: '2024-12-14T09:30:00Z',
    reportId: '1',
  },
  {
    id: '2',
    type: 'report_closed',
    title: 'Report Closed',
    message: 'Report OBS-12-24-103 has been successfully closed by Sarah Johnson',
    read: false,
    createdAt: '2024-12-12T16:00:00Z',
    reportId: '3',
  },
  {
    id: '3',
    type: 'action_assigned',
    title: 'Corrective Action Assigned',
    message: 'You have been assigned a corrective action for oil spill cleanup',
    read: true,
    createdAt: '2024-12-14T10:00:00Z',
    reportId: '2',
  },
];

let reports = [...mockReports];
let users = [...mockUsers];
let notifications = [...mockNotifications];

// Report functions
export const getReports = (): Report[] => {
  return [...reports].sort((a, b) => 
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
};

export const getReportsByUser = (userId: string): Report[] => {
  return reports.filter(r => r.submittedBy === userId).sort((a, b) => 
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
};

export const getReportById = (id: string): Report | undefined => {
  return reports.find(r => r.id === id);
};

export const getReportsByStatus = (status: ReportStatus): Report[] => {
  return reports.filter(r => r.status === status);
};

export const getPendingReports = (): Report[] => {
  return reports.filter(r => r.status === 'pending' || r.status === 'in_review');
};

export const getReportStats = () => {
  const total = reports.length;
  const pending = reports.filter(r => r.status === 'pending').length;
  const inReview = reports.filter(r => r.status === 'in_review').length;
  const actionAssigned = reports.filter(r => r.status === 'action_assigned').length;
  const closed = reports.filter(r => r.status === 'closed').length;
  const unsafeActs = reports.filter(r => r.type === 'unsafe_act').length;
  const unsafeConditions = reports.filter(r => r.type === 'unsafe_condition').length;
  
  // Category breakdown
  const categoryStats = reports.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Risk level breakdown
  const riskStats = reports.reduce((acc, r) => {
    acc[r.riskLevel] = (acc[r.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return { 
    total, 
    pending, 
    inReview, 
    actionAssigned, 
    closed, 
    unsafeActs, 
    unsafeConditions,
    categoryStats,
    riskStats,
  };
};

export const submitReport = (report: Omit<Report, 'id' | 'reportId' | 'status' | 'submittedAt' | 'updatedAt'>): Report => {
  const newReport: Report = {
    ...report,
    id: Date.now().toString(),
    reportId: generateReportId(),
    status: 'pending',
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  reports = [newReport, ...reports];
  
  // Add notification for supervisors/admin
  addNotification({
    type: 'report_submitted',
    title: 'New Observation Submitted',
    message: `${report.submittedByName} submitted: ${report.title}`,
    reportId: newReport.id,
  });
  
  return newReport;
};

export const updateReportStatus = (id: string, status: ReportStatus, feedback?: string): Report | undefined => {
  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return undefined;

  reports[index] = {
    ...reports[index],
    status,
    feedback,
    updatedAt: new Date().toISOString(),
  };

  // Add notification when report is closed
  if (status === 'closed') {
    addNotification({
      type: 'report_closed',
      title: 'Report Closed',
      message: `Report ${reports[index].reportId} has been closed successfully`,
      reportId: id,
    });
  }

  return reports[index];
};

export const assignCorrectiveAction = (
  reportId: string, 
  action: Omit<CorrectiveAction, 'id' | 'reportId' | 'status'>
): Report | undefined => {
  const index = reports.findIndex(r => r.id === reportId);
  if (index === -1) return undefined;

  const correctiveAction: CorrectiveAction = {
    ...action,
    id: Date.now().toString(),
    reportId,
    status: 'pending',
  };

  reports[index] = {
    ...reports[index],
    status: 'action_assigned',
    assignedTo: action.assignedTo,
    assignedToName: action.assignedToName,
    correctiveAction,
    updatedAt: new Date().toISOString(),
  };

  // Add notification
  addNotification({
    type: 'action_assigned',
    title: 'Corrective Action Assigned',
    message: `Action assigned to ${action.assignedToName}: ${action.action.slice(0, 50)}...`,
    reportId,
  });

  return reports[index];
};

export const deleteReport = (id: string): boolean => {
  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return false;
  reports.splice(index, 1);
  return true;
};

// User functions
export const getUsers = (): Employee[] => [...users];

export const getUsersByRole = (role: UserRole): Employee[] => {
  return users.filter(u => u.role === role);
};

export const getUserById = (id: string): Employee | undefined => {
  return users.find(u => u.id === id);
};

export const addUser = (user: Omit<Employee, 'id' | 'createdAt'>): Employee => {
  const newUser: Employee = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  users = [...users, newUser];
  return newUser;
};

export const updateUser = (id: string, updates: Partial<Employee>): Employee | undefined => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return undefined;
  users[index] = { ...users[index], ...updates };
  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};

// Notification functions
export const getNotifications = (): Notification[] => {
  return [...notifications].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const getUnreadNotifications = (): Notification[] => {
  return notifications.filter(n => !n.read);
};

export const markNotificationRead = (id: string): void => {
  const index = notifications.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications[index].read = true;
  }
};

export const markAllNotificationsRead = (): void => {
  notifications = notifications.map(n => ({ ...n, read: true }));
};

const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>): void => {
  const newNotification: Notification = {
    ...notification,
    id: Date.now().toString(),
    read: false,
    createdAt: new Date().toISOString(),
  };
  notifications = [newNotification, ...notifications];
};

// Export functions for Excel/PDF (returns data structure)
export const exportReportsData = () => {
  return reports.map(r => ({
    'Report ID': r.reportId,
    'Title': r.title,
    'Type': r.type === 'unsafe_act' ? 'Unsafe Act' : 'Unsafe Condition',
    'Category': r.category,
    'Location': r.location,
    'Risk Level': r.riskLevel.toUpperCase(),
    'Status': r.status.replace('_', ' ').toUpperCase(),
    'Submitted By': r.submittedByName,
    'Submitted At': new Date(r.submittedAt).toLocaleDateString(),
    'Description': r.description,
  }));
};
