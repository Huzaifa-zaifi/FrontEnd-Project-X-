// Generate unique report ID like OBS-MM-YY-XXX
const generateReportId = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  const random = Math.floor(Math.random() * 900) + 100;
  return `OBS-${month}-${year}-${random}`;
};

// Mock users data
const mockUsers = [
  { id: '1', name: 'John Smith', email: 'john.smith@redvion.com', department: 'Operations', role: 'employee', createdAt: '2024-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@redvion.com', department: 'Safety', role: 'supervisor', createdAt: '2024-01-10' },
  { id: '3', name: 'Mike Wilson', email: 'admin@redvion.com', department: 'Management', role: 'admin', createdAt: '2024-01-01' },
  { id: '4', name: 'Client Corp', email: 'client@bhdc.com', department: 'External', role: 'client', createdAt: '2024-02-01' },
  { id: '5', name: 'Emma Davis', email: 'emma.davis@redvion.com', department: 'Maintenance', role: 'employee', createdAt: '2024-03-01' },
  { id: '6', name: 'Robert Brown', email: 'robert.brown@redvion.com', department: 'Engineering', role: 'supervisor', createdAt: '2024-02-15' },
];

// Mock reports data
let mockReports = [
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
    submittedAt: '2024-12-10T08:30:00Z',
    updatedAt: '2024-12-10T08:30:00Z',
  },
  {
    id: '2',
    reportId: 'OBS-12-24-102',
    title: 'Oil spill near walkway',
    description: 'Significant oil spill identified near main walkway in Zone B. Slipping hazard.',
    type: 'unsafe_condition',
    category: 'Housekeeping',
    location: 'Zone B - Main Walkway',
    riskLevel: 'medium',
    status: 'in_review',
    submittedBy: '1',
    submittedByName: 'John Smith',
    submittedAt: '2024-12-09T14:15:00Z',
    updatedAt: '2024-12-10T09:00:00Z',
    assignedTo: '2',
    assignedToName: 'Sarah Johnson',
  },
  {
    id: '3',
    reportId: 'OBS-12-24-103',
    title: 'Exposed electrical wiring',
    description: 'Exposed electrical wiring found near water source in maintenance room.',
    type: 'unsafe_condition',
    category: 'Electrical',
    location: 'Maintenance Room B',
    riskLevel: 'critical',
    status: 'action_assigned',
    submittedBy: '5',
    submittedByName: 'Emma Davis',
    submittedAt: '2024-12-08T10:00:00Z',
    updatedAt: '2024-12-09T11:30:00Z',
    assignedTo: '6',
    assignedToName: 'Robert Brown',
    correctiveAction: {
      id: 'ca-1',
      reportId: '3',
      action: 'Isolate power supply and repair wiring with proper insulation',
      assignedTo: '6',
      assignedToName: 'Robert Brown',
      assignedBy: '2',
      assignedByName: 'Sarah Johnson',
      dueDate: '2024-12-15',
      status: 'in_progress',
    },
  },
  {
    id: '4',
    reportId: 'OBS-12-24-104',
    title: 'Fire extinguisher blocked',
    description: 'Fire extinguisher in Zone C blocked by storage boxes.',
    type: 'unsafe_condition',
    category: 'Fire Hazard',
    location: 'Zone C - Storage',
    riskLevel: 'high',
    status: 'approved',
    submittedBy: '1',
    submittedByName: 'John Smith',
    submittedAt: '2024-12-05T16:00:00Z',
    updatedAt: '2024-12-07T09:00:00Z',
    feedback: 'Good observation. Area has been cleared.',
  },
  {
    id: '5',
    reportId: 'OBS-12-24-105',
    title: 'Improper lifting technique',
    description: 'Worker observed lifting heavy boxes without using proper technique.',
    type: 'unsafe_act',
    category: 'Manual Handling',
    location: 'Warehouse Section D',
    riskLevel: 'medium',
    status: 'closed',
    submittedBy: '5',
    submittedByName: 'Emma Davis',
    submittedAt: '2024-12-01T11:30:00Z',
    updatedAt: '2024-12-03T14:00:00Z',
    feedback: 'Worker has been retrained on proper lifting procedures.',
  },
];

// Get all reports
export const getAllReports = () => {
  return [...mockReports].sort((a, b) => 
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
};

// Get reports by user ID
export const getReportsByUser = (userId) => {
  return mockReports
    .filter(report => report.submittedBy === userId)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
};

// Get reports by status
export const getReportsByStatus = (status) => {
  return mockReports.filter(report => report.status === status);
};

// Get pending reports for supervisor review
export const getPendingReports = () => {
  return mockReports.filter(report => 
    report.status === 'pending' || report.status === 'in_review'
  );
};

// Get report statistics
export const getReportStats = () => {
  const total = mockReports.length;
  const pending = mockReports.filter(r => r.status === 'pending').length;
  const inReview = mockReports.filter(r => r.status === 'in_review').length;
  const approved = mockReports.filter(r => r.status === 'approved' || r.status === 'closed').length;
  const actionAssigned = mockReports.filter(r => r.status === 'action_assigned').length;
  
  return {
    total,
    pending,
    inReview,
    approved,
    actionAssigned,
    unsafeActs: mockReports.filter(r => r.type === 'unsafe_act').length,
    unsafeConditions: mockReports.filter(r => r.type === 'unsafe_condition').length,
  };
};

// Submit a new report
export const submitReport = (reportData, userId, userName) => {
  const newReport = {
    id: String(mockReports.length + 1),
    reportId: generateReportId(),
    ...reportData,
    status: 'pending',
    submittedBy: userId,
    submittedByName: userName,
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockReports = [newReport, ...mockReports];
  return newReport;
};

// Update report status
export const updateReportStatus = (reportId, status, feedback) => {
  const index = mockReports.findIndex(r => r.id === reportId);
  if (index !== -1) {
    mockReports[index] = {
      ...mockReports[index],
      status,
      feedback: feedback || mockReports[index].feedback,
      updatedAt: new Date().toISOString(),
    };
    return mockReports[index];
  }
  return null;
};

// Assign corrective action
export const assignCorrectiveAction = (reportId, actionData, assignedBy, assignedByName) => {
  const index = mockReports.findIndex(r => r.id === reportId);
  if (index !== -1) {
    const correctiveAction = {
      id: `ca-${Date.now()}`,
      reportId,
      ...actionData,
      assignedBy,
      assignedByName,
      status: 'pending',
    };
    
    mockReports[index] = {
      ...mockReports[index],
      status: 'action_assigned',
      correctiveAction,
      assignedTo: actionData.assignedTo,
      assignedToName: actionData.assignedToName,
      updatedAt: new Date().toISOString(),
    };
    return mockReports[index];
  }
  return null;
};

// Get report by ID
export const getReportById = (reportId) => {
  return mockReports.find(r => r.id === reportId || r.reportId === reportId);
};

// Get all users (for assigning actions)
export const getAllUsers = () => {
  return mockUsers;
};

// Get supervisors
export const getSupervisors = () => {
  return mockUsers.filter(u => u.role === 'supervisor');
};

// Get employees
export const getEmployees = () => {
  return mockUsers.filter(u => u.role === 'employee' || u.role === 'supervisor');
};
