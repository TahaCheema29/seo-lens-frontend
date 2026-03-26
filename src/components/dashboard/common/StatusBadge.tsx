'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Minus,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

type StatusType =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'active'
  | 'inactive'
  | 'pending'
  | 'completed'
  | 'processing'
  | 'failed'
  | 'past_due'
  | 'cancelled'
  | 'suspended'
  | 'issue'
  | 'opportunity'
  | 'critical';

interface StatusBadgeProps {
  status: StatusType;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'default';
}

const statusConfig: Record<
  StatusType,
  {
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  success: {
    variant: 'default',
    icon: CheckCircle,
    className: 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white',
  },
  completed: {
    variant: 'default',
    icon: CheckCircle,
    className: 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white',
  },
  active: {
    variant: 'default',
    icon: CheckCircle,
    className: 'bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500',
  },
  warning: {
    variant: 'secondary',
    icon: AlertTriangle,
    className: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400',
  },
  pending: {
    variant: 'secondary',
    icon: AlertTriangle,
    className: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400',
  },
  error: {
    variant: 'destructive',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-400',
  },
  failed: {
    variant: 'destructive',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-400',
  },
  inactive: {
    variant: 'secondary',
    icon: Minus,
    className: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400',
  },
  info: {
    variant: 'secondary',
    icon: Info,
    className: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400',
  },
  processing: {
    variant: 'secondary',
    icon: Info,
    className: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400',
  },
  neutral: {
    variant: 'outline',
    icon: Minus,
    className: 'bg-transparent text-neutral-600 border-neutral-200 dark:border-neutral-700 dark:text-neutral-400',
  },
  past_due: {
    variant: 'destructive',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-400',
  },
  cancelled: {
    variant: 'secondary',
    icon: Minus,
    className: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400',
  },
  suspended: {
    variant: 'destructive',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-400',
  },
  issue: {
    variant: 'destructive',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-400',
  },
  opportunity: {
    variant: 'default',
    icon: CheckCircle,
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400',
  },
  critical: {
    variant: 'destructive',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-400',
  },
};

export function StatusBadge({
  status,
  children,
  className,
  showIcon = true,
  size = 'default',
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const label = children || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge
      variant={config.variant}
      className={cn(
        'font-medium transition-all duration-200 hover:scale-105',
        config.className,
        size === 'sm' && 'text-xs px-2 py-0.5',
        className
      )}
    >
      {showIcon && <Icon className={cn('mr-1', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />}
      {label}
    </Badge>
  );
}

interface TrendBadgeProps {
  trend: 'up' | 'down' | 'stable';
  value?: string | number;
  className?: string;
  size?: 'sm' | 'default';
}

export function TrendBadge({ trend, value, className, size = 'default' }: TrendBadgeProps) {
  const config = {
    up: {
      icon: TrendingUp,
      className: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400',
    },
    down: {
      icon: TrendingDown,
      className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-400',
    },
    stable: {
      icon: Minus,
      className: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400',
    },
  }[trend];

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn('font-medium transition-all duration-200 hover:scale-105', config.className, size === 'sm' && 'text-xs', className)}
    >
      <Icon className={cn('mr-1', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
      {value || (trend === 'up' ? 'Up' : trend === 'down' ? 'Down' : 'Stable')}
    </Badge>
  );
}

interface PlanBadgeProps {
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  className?: string;
}

export function PlanBadge({ plan, className }: PlanBadgeProps) {
  const config = {
    free: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400',
    starter: 'bg-neutral-200 text-neutral-800 border-neutral-300 dark:bg-neutral-700 dark:text-neutral-300',
    professional: 'bg-neutral-800 text-white border-neutral-900 dark:bg-neutral-200 dark:text-neutral-900',
    enterprise: 'bg-neutral-900 text-white border-neutral-950 dark:bg-white dark:text-neutral-900',
  }[plan];

  return (
    <Badge
      variant="outline"
      className={cn('font-medium capitalize transition-all duration-200 hover:scale-105', config, className)}
    >
      {plan}
    </Badge>
  );
}
