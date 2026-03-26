'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColors = {
  up: 'text-emerald-600 dark:text-emerald-400',
  down: 'text-red-600 dark:text-red-400',
  neutral: 'text-neutral-500 dark:text-neutral-400',
};

export function KpiCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend = 'neutral',
  className,
}: KpiCardProps) {
  const TrendIcon = trendIcons[trend];
  const isPositive = trend === 'up';

  return (
    <Card 
      className={cn(
        'group relative overflow-hidden transition-all duration-300 ease-out',
        'hover:shadow-xl hover:-translate-y-1',
        'bg-[var(--dashboard-card)] border-[var(--dashboard-border)]',
        className
      )}
    >
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold text-[var(--dashboard-text-muted)]">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(
            'rounded-xl p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
            'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
            'border border-neutral-200 dark:border-neutral-700'
          )}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold text-[var(--dashboard-text)] tracking-tight">
          {value}
        </div>
        {(change !== undefined || changeLabel) && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className={cn(
              'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold',
              trend === 'up' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
              trend === 'down' && 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
              trend === 'neutral' && 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-400'
            )}>
              <TrendIcon className="h-3 w-3" />
              <span>
                {change !== undefined && (
                  <>
                    {isPositive ? '+' : ''}
                    {change}%
                  </>
                )}
              </span>
            </div>
            {changeLabel && (
              <span className="text-xs text-[var(--dashboard-text-muted)]">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
