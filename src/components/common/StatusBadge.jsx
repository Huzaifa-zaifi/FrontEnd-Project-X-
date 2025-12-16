import { cn } from '@/lib/utils';
import { Clock, CheckCircle, XCircle, FileEdit, AlertTriangle, Eye, ClipboardCheck } from 'lucide-react';

const statusConfig = {
  draft: {
    label: 'Draft',
    className: 'bg-gray-100 text-gray-600',
    icon: FileEdit,
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800',
    icon: Clock,
  },
  in_review: {
    label: 'In Review',
    className: 'bg-blue-100 text-blue-800',
    icon: Eye,
  },
  action_assigned: {
    label: 'Action Assigned',
    className: 'bg-orange-100 text-orange-800',
    icon: AlertTriangle,
  },
  closed: {
    label: 'Closed',
    className: 'bg-emerald-100 text-emerald-800',
    icon: CheckCircle,
  },
  approved: {
    label: 'Approved',
    className: 'bg-emerald-100 text-emerald-800',
    icon: ClipboardCheck,
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800',
    icon: XCircle,
  },
};

const StatusBadge = ({ status, showIcon = true, size = 'md' }) => {
  const config = statusConfig[status] || statusConfig.draft;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        config.className,
        size === 'sm' && 'text-[10px] px-2 py-0.5',
        size === 'md' && 'text-xs px-2.5 py-1'
      )}
    >
      {showIcon && <Icon className={cn('mr-1', size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5')} />}
      {config.label}
    </span>
  );
};

export default StatusBadge;
