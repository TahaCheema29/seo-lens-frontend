'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Zap, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { useState } from 'react';
import type { ActionPriorityItem } from '@/features/dashboard/types/competitorAnalysis';

interface ActionPriorityMatrixProps {
  actions: ActionPriorityItem[];
}

function getImpactColor(impact: string) {
  switch (impact) {
    case 'high':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
    case 'low':
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  }
}

function getEffortColor(effort: string) {
  switch (effort) {
    case 'easy':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
    case 'hard':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'SEO':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Performance':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'Technical':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    case 'Content':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
}

function ActionCard({ action, index }: { action: ActionPriorityItem; index: number }) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-950">
      <div className="flex items-start gap-4">
        {/* Priority Number */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
          {action.priority}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold text-lg">{action.action}</h4>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
            <Badge className={getCategoryColor(action.category)}>
              {action.category}
            </Badge>
          </div>

          {/* Impact & Effort Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className={getImpactColor(action.impact)}>
              <Zap className="h-3 w-3 mr-1" />
              {action.impact} Impact
            </Badge>
            <Badge variant="outline" className={getEffortColor(action.effort)}>
              <Clock className="h-3 w-3 mr-1" />
              {action.effort} Effort
            </Badge>
          </div>

          {/* Steps */}
          {showSteps && action.steps && action.steps.length > 0 && (
            <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Implementation Steps
              </h5>
              <ol className="space-y-1">
                {action.steps.map((step, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Steps Button */}
      {action.steps && action.steps.length > 0 && (
        <div className="mt-3 pt-3 border-t dark:border-gray-800">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowSteps(!showSteps)}
            className="w-full"
          >
            {showSteps ? 'Hide Steps' : 'View Implementation Steps'}
            <ArrowRight className={`h-4 w-4 ml-2 transition-transform ${showSteps ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      )}
    </div>
  );
}

function ImpactEffortMatrix({ actions }: { actions: ActionPriorityItem[] }) {
  // Categorize actions by impact and effort
  const highImpactEasy = actions.filter(a => a.impact === 'high' && a.effort === 'easy');
  const highImpactMedium = actions.filter(a => a.impact === 'high' && a.effort === 'medium');
  const highImpactHard = actions.filter(a => a.impact === 'high' && a.effort === 'hard');
  const mediumImpactEasy = actions.filter(a => a.impact === 'medium' && a.effort === 'easy');

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Target className="h-4 w-4" />
        Impact vs Effort Matrix
      </h4>
      
      {/* Matrix Grid */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {/* Header */}
        <div className="col-span-1"></div>
        <div className="text-center font-medium text-muted-foreground p-2">High Impact</div>
        <div className="text-center font-medium text-muted-foreground p-2">Medium Impact</div>
        
        {/* Easy Effort Row */}
        <div className="flex items-center font-medium text-muted-foreground p-2">Easy Effort</div>
        <div className={`p-2 rounded text-center ${highImpactEasy.length > 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 dark:bg-gray-800'}`}>
          <span className="font-bold text-lg">{highImpactEasy.length}</span>
          <div className="text-xs mt-1">Quick Wins</div>
        </div>
        <div className={`p-2 rounded text-center ${mediumImpactEasy.length > 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800'}`}>
          <span className="font-bold text-lg">{mediumImpactEasy.length}</span>
          <div className="text-xs mt-1">Worth Doing</div>
        </div>
        
        {/* Medium Effort Row */}
        <div className="flex items-center font-medium text-muted-foreground p-2">Medium Effort</div>
        <div className={`p-2 rounded text-center ${highImpactMedium.length > 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-gray-100 dark:bg-gray-800'}`}>
          <span className="font-bold text-lg">{highImpactMedium.length}</span>
          <div className="text-xs mt-1">Major Projects</div>
        </div>
        <div className="p-2 rounded text-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600">
          <span className="font-bold text-lg">-</span>
          <div className="text-xs mt-1">Evaluate</div>
        </div>
        
        {/* Hard Effort Row */}
        <div className="flex items-center font-medium text-muted-foreground p-2">Hard Effort</div>
        <div className={`p-2 rounded text-center ${highImpactHard.length > 0 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 dark:bg-gray-800'}`}>
          <span className="font-bold text-lg">{highImpactHard.length}</span>
          <div className="text-xs mt-1">Strategic</div>
        </div>
        <div className="p-2 rounded text-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600">
          <span className="font-bold text-lg">-</span>
          <div className="text-xs mt-1">Avoid</div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800" />
          <span className="text-muted-foreground">Do First</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-amber-100 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800" />
          <span className="text-muted-foreground">Plan Carefully</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-100 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800" />
          <span className="text-muted-foreground">Fill In Gaps</span>
        </div>
      </div>
    </div>
  );
}

export function ActionPriorityMatrix({ actions }: ActionPriorityMatrixProps) {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Action Priority Matrix
          </CardTitle>
          <Badge variant="outline" className="font-mono">
            {actions.length} Actions
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Impact/Effort Matrix Visualization */}
        <ImpactEffortMatrix actions={actions} />

        {/* Priority List */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Prioritized Action List</h4>
          <div className="space-y-3">
            {actions.map((action, index) => (
              <ActionCard key={index} action={action} index={index} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
