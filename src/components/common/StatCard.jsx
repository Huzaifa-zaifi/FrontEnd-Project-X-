import { cn } from '@/lib/utils';

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-card border-l-4 border-l-primary',
  success: 'bg-card border-l-4 border-l-status-approved',
  warning: 'bg-card border-l-4 border-l-status-pending',
  danger: 'bg-card border-l-4 border-l-status-rejected',
};

const StatCard = ({ title, value, icon: Icon, trend, variant = 'default' }) => {
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
                trend.isPositive ? 'text-status-approved' : 'text-status-rejected'
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
