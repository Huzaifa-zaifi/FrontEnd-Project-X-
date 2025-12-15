import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-card border-l-4 border-l-primary',
  success: 'bg-card border-l-4 border-l-emerald-500',
  warning: 'bg-card border-l-4 border-l-amber-500',
  danger: 'bg-card border-l-4 border-l-red-500',
};

const StatCard = ({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) => {
  return (
    <div
      className={cn(
        'p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-card-foreground mt-1">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-xs mt-2 font-medium',
                trend.isPositive ? 'text-emerald-600' : 'text-red-600'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <Icon className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
