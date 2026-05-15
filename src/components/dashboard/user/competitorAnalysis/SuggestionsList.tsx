'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, AlertTriangle, Info, Lightbulb, Clock, Target } from 'lucide-react';
import type { Suggestion } from '@/features/dashboard/types/competitorAnalysis';

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'critical':
        return {
          icon: AlertCircle,
          badge: 'Critical',
          badgeClass: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
          iconClass: 'text-red-600 dark:text-red-400',
        };
      case 'high':
        return {
          icon: AlertTriangle,
          badge: 'High Priority',
          badgeClass: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
          iconClass: 'text-orange-600 dark:text-orange-400',
        };
      case 'medium':
        return {
          icon: Info,
          badge: 'Medium Priority',
          badgeClass: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
          iconClass: 'text-yellow-600 dark:text-yellow-400',
        };
      default:
        return {
          icon: Lightbulb,
          badge: 'Low Priority',
          badgeClass: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
          iconClass: 'text-blue-600 dark:text-blue-400',
        };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'performance':
        return '⚡';
      case 'seo':
        return '🔍';
      case 'technical':
        return '🔧';
      default:
        return '📊';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          Improvement Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {suggestions.map((suggestion, index) => {
            const config = getPriorityConfig(suggestion.priority);
            const Icon = config.icon;

            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left w-full pr-4">
                    <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconClass}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getCategoryIcon(suggestion.category)}</span>
                        <span className="font-medium truncate">{suggestion.issue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={config.badgeClass}>
                          {config.badge}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Score: {suggestion.priorityScore}/100
                        </Badge>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {/* Metric Comparison */}
                    <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Your Metric</p>
                        <p className="font-medium">{suggestion.yourMetric}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Competitor Metric</p>
                        <p className="font-medium">{suggestion.competitorMetric}</p>
                      </div>
                    </div>

                    {/* What This Means */}
                    <div>
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        What This Means
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.whatThisMeans}
                      </p>
                    </div>

                    {/* What You Should Do */}
                    <div>
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-emerald-600" />
                        What You Should Do
                      </h4>
                      <ul className="space-y-2">
                        {suggestion.whatYouShouldDo.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-emerald-600 mt-0.5">•</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expected Benefit & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <h4 className="font-medium text-emerald-800 dark:text-emerald-300 flex items-center gap-2 mb-1">
                          <Lightbulb className="h-4 w-4" />
                          Expected Benefit
                        </h4>
                        <p className="text-sm text-emerald-700 dark:text-emerald-400">
                          {suggestion.expectedBenefit}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4" />
                          Timeline
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          {suggestion.timeline}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
