'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, CheckCircle2 } from 'lucide-react';
import type { QuickWin } from '@/features/dashboard/types/competitorAnalysis';

interface QuickWinsSectionProps {
  quickWins: QuickWin[];
}

export function QuickWinsSection({ quickWins }: QuickWinsSectionProps) {
  const getEffortConfig = (effort: string) => {
    switch (effort.toLowerCase()) {
      case 'easy':
        return {
          badge: 'Easy Fix',
          badgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
        };
      case 'medium':
        return {
          badge: 'Medium Effort',
          badgeClass: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
          icon: <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />,
        };
      case 'hard':
        return {
          badge: 'Requires Work',
          badgeClass: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
          icon: <Zap className="h-4 w-4 text-red-600 dark:text-red-400" />,
        };
      default:
        return {
          badge: effort,
          badgeClass: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
          icon: <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />,
        };
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
      case 'medium':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          Quick Wins
          <Badge variant="outline" className="ml-2">
            {quickWins.length} opportunities
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickWins.map((win, index) => {
            const effortConfig = getEffortConfig(win.effortLevel);

            return (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline" className={effortConfig.badgeClass}>
                    {effortConfig.icon}
                    <span className="ml-1">{effortConfig.badge}</span>
                  </Badge>
                  <Badge variant="outline" className={getImpactBadge(win.impact)}>
                    {win.impact} Impact
                  </Badge>
                </div>

                <h4 className="font-semibold mb-2">{win.issue}</h4>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {win.whyItMatters}
                </p>

                <div className="space-y-2">
                  <div className="p-2 bg-muted rounded text-sm">
                    <span className="font-medium">How to fix: </span>
                    {win.howToFix}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-muted-foreground">Est. time: {win.effort}</span>
                  </div>

                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded text-sm text-emerald-700 dark:text-emerald-400">
                    <span className="font-medium">Result: </span>
                    {win.expectedResult}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {quickWins.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-emerald-500" />
            <p className="font-medium">No quick wins found!</p>
            <p className="text-sm">Your website is already well-optimized.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
