'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, TrendingUp, AlertTriangle, Scale, Lightbulb } from 'lucide-react';
import type { CompetitorAnalysisResponse } from '@/features/dashboard/types/competitorAnalysis';

interface EnhancedSummaryProps {
  analysis: CompetitorAnalysisResponse;
}

export function EnhancedSummary({ analysis }: EnhancedSummaryProps) {
  const { comparisonSummary, overallScores } = analysis;
  
  // Handle missing data gracefully
  if (!comparisonSummary || !overallScores) {
    return (
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Summary data not available</p>
        </CardContent>
      </Card>
    );
  }
   
  // Determine position color and icon
  const getPositionStyles = (position: string) => {
    switch (position) {
      case 'Market Leader':
        return { 
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800', 
          icon: Trophy,
          description: 'You are significantly ahead of your competitor'
        };
      case 'Strong Performer':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800', 
          icon: TrendingUp,
          description: 'You have a solid competitive advantage'
        };
      case 'Competitive Edge':
        return { 
          color: 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800', 
          icon: Target,
          description: 'You have a slight edge - maintain it'
        };
      case 'Close Competition':
        return { 
          color: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800', 
          icon: Scale,
          description: 'Very close race - small improvements matter'
        };
      case 'Needs Improvement':
        return { 
          color: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800', 
          icon: AlertTriangle,
          description: 'You are behind but can catch up'
        };
      case 'Significant Gap':
        return { 
          color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800', 
          icon: AlertTriangle,
          description: 'Significant work needed to catch up'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700', 
          icon: Scale,
          description: 'Competitive position analysis'
        };
    }
  };

  const position = comparisonSummary.competitivePosition || 'Tied';
  const positionStyles = getPositionStyles(position);
  const PositionIcon = positionStyles.icon;

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="pt-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{comparisonSummary.headline || 'Analysis Complete'}</h2>
              <p className="text-muted-foreground">{comparisonSummary.keyInsight || 'Comparison data available below'}</p>
            </div>
            
            {comparisonSummary.encouragement && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-lg">
                {comparisonSummary.encouragement}
              </p>
            )}

            {/* Key Takeaways */}
            {comparisonSummary.keyTakeaways && comparisonSummary.keyTakeaways.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <h3 className="font-semibold text-sm">Key Takeaways</h3>
                </div>
                <ul className="space-y-2">
                  {comparisonSummary.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Competitive Position & Benchmark */}
          <div className="space-y-4">
            {/* Position Badge */}
            <div className={`p-4 rounded-lg border-2 ${positionStyles.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <PositionIcon className="h-5 w-5" />
                <span className="font-semibold">{position}</span>
              </div>
              <p className="text-sm opacity-90">{positionStyles.description}</p>
            </div>

            {/* Industry Benchmark */}
            {analysis.industryBenchmark && (
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border dark:border-slate-800">
                <h3 className="font-semibold text-sm mb-3">Industry Benchmark</h3>
                
                <div className="space-y-3">
                  {/* Your Percentile */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Your Percentile</span>
                      <span className="font-medium">{analysis.industryBenchmark.yourPercentile}th</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${analysis.industryBenchmark.yourPercentile}%` }}
                      />
                    </div>
                  </div>

                  {/* Scores Comparison */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white dark:bg-slate-800 p-2 rounded border dark:border-slate-700">
                      <span className="text-muted-foreground text-xs">Average</span>
                      <p className="font-semibold">{analysis.industryBenchmark.averageScore}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2 rounded border dark:border-slate-700">
                      <span className="text-muted-foreground text-xs">Top Performer</span>
                      <p className="font-semibold">{analysis.industryBenchmark.topPerformerScore}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Score Gap */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Score Gap</span>
              <Badge 
                variant={overallScores.user > overallScores.competitor ? "default" : "destructive"}
                className="font-mono"
              >
                {overallScores.gap} points
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
