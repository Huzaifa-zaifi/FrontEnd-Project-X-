export type UserRole = 'employee' | 'supervisor' | 'admin' | 'client';

export type ReportStatus = 'draft' | 'pending' | 'in_review' | 'action_assigned' | 'closed' | 'approved' | 'rejected';

export type ObservationType = 'unsafe_act' | 'unsafe_condition';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type Category = 
  | 'PPE'
  | 'Tools'
  | 'Housekeeping'
  | 'Chemical'
  | 'Electrical'
  | 'Fire Hazard'
  | 'Working at Height'
  | 'Manual Handling'
  | 'Other';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
}

export interface Report {
  id: string;
  reportId: string;
  title: string;
  description: string;
  type: ObservationType;
  category: Category;
  location: string;
  riskLevel: RiskLevel;
  status: ReportStatus;
  imageUrl?: string;
  submittedBy: string;
  submittedByName: string;
  submittedAt: string;
  updatedAt: string;
  feedback?: string;
  assignedTo?: string;
  assignedToName?: string;
  correctiveAction?: CorrectiveAction;
}

export interface CorrectiveAction {
  id: string;
  reportId: string;
  action: string;
  assignedTo: string;
  assignedToName: string;
  assignedBy: string;
  assignedByName: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  comments?: string;
  completedAt?: string;
}

export interface Notification {
  id: string;
  type: 'report_submitted' | 'action_assigned' | 'report_closed' | 'report_approved' | 'report_rejected';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  reportId?: string;
}
