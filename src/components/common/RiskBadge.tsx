import { RiskLevel } from '@/types/report';
import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md';
}

const riskConfig: Record<RiskLevel, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-green-100 text-green-800',
  },
  medium: {
    label: 'Medium',
    className: 'bg-yellow-100 text-yellow-800',
  },
  high: {
    label: 'High',
    className: 'bg-orange-100 text-orange-800',
  },
  critical: {
    label: 'Critical',
    className: 'bg-red-100 text-red-800',
  },
};

const RiskBadge = ({ level, size = 'md' }: RiskBadgeProps) => {
  const config = riskConfig[level];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        config.className,
        size === 'sm' && 'text-[10px] px-2 py-0.5',
        size === 'md' && 'text-xs px-2.5 py-1'
      )}
    >
      {config.label}
    </span>
  );
};

export default RiskBadge;
