'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  TrendingDown,
  Target,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';
import type { PageComparison } from '@/features/dashboard/types/competitorAnalysis';

interface PageBreakdownProps {
  pageBreakdown: PageComparison[];
}

function PageRow({ page, isExpanded, onToggle }: { 
  page: PageComparison; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const getWinnerBadge = () => {
    switch (page.winner) {
      case 'user':
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">You Win</Badge>;
      case 'competitor':
        return <Badge variant="destructive">They Win</Badge>;
      default:
        return <Badge variant="secondary">Tied</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="border-b last:border-0">
      <div 
        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium truncate text-sm" title={page.url}>
                {page.url}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              {getWinnerBadge()}
              {page.keyDifferences.length > 0 && (
                <span className="text-muted-foreground text-xs">
                  {page.keyDifferences.length} difference{page.keyDifferences.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* User Score */}
            <div className="text-center w-20">
              <div className={`text-lg font-bold ${getScoreColor(page.userScore || 0)}`}>
                {page.userScore}
              </div>
              <div className="text-xs text-muted-foreground">You</div>
            </div>

            {/* Progress Bars */}
            <div className="w-32 hidden sm:block">
              <div className="flex gap-1 h-2 mb-1">
                <div 
                  className={`flex-1 rounded-full ${getProgressColor(page.userScore || 0)}`}
                  style={{ width: `${page.userScore || 0}%` }}
                />
                <div 
                  className="flex-1 rounded-full bg-gray-300"
                  style={{ width: `${page.competitorScore || 0}%` }}
                />
              </div>
            </div>

            {/* Competitor Score */}
            <div className="text-center w-20">
              <div className="text-lg font-bold text-gray-500 dark:text-gray-400">
                {page.competitorScore}
              </div>
              <div className="text-xs text-muted-foreground">Them</div>
            </div>

            {/* Expand Button */}
            <Button variant="ghost" size="sm" className="shrink-0">
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="grid gap-4 md:grid-cols-2 pt-4">
            {/* Key Differences */}
            {page.keyDifferences.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  Key Differences
                </h4>
                <ul className="space-y-1">
                  {page.keyDifferences.map((diff, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {diff}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {page.recommendations.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-amber-500" />
                  Recommendations
                </h4>
                <ul className="space-y-1">
                  {page.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* If no data */}
            {page.keyDifferences.length === 0 && page.recommendations.length === 0 && (
              <div className="md:col-span-2 text-center py-4 text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                <p className="text-sm">No detailed breakdown available for this page</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function PageBreakdown({ pageBreakdown }: PageBreakdownProps) {
  const [expandedPages, setExpandedPages] = useState<Set<number>>(new Set());

  const togglePage = (index: number) => {
    const newExpanded = new Set(expandedPages);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPages(newExpanded);
  };

  if (!pageBreakdown || pageBreakdown.length === 0) {
    return null;
  }

  // Calculate summary stats
  const userWins = pageBreakdown.filter(p => p.winner === 'user').length;
  const compWins = pageBreakdown.filter(p => p.winner === 'competitor').length;
  const ties = pageBreakdown.filter(p => p.winner === 'tie').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Page-by-Page Breakdown
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>You: {userWins}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span>Them: {compWins}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
              <span>Ties: {ties}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-2 border-b dark:border-gray-800 text-xs text-muted-foreground grid grid-cols-[1fr,80px,32px,80px,40px] gap-4 items-center">
          <span>Page URL</span>
          <span className="text-center">Your Score</span>
          <span></span>
          <span className="text-center">Their Score</span>
          <span></span>
        </div>
        {pageBreakdown.map((page, index) => (
          <PageRow
            key={index}
            page={page}
            isExpanded={expandedPages.has(index)}
            onToggle={() => togglePage(index)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
