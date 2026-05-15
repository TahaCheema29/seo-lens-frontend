'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { OverallScores } from '@/features/dashboard/types/competitorAnalysis';

interface ScoreComparisonCardProps {
  scores: OverallScores;
  userUrl: string;
  competitorUrl: string;
}

export function ScoreComparisonCard({ scores, userUrl, competitorUrl }: ScoreComparisonCardProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50 dark:bg-emerald-950/30';
    if (score >= 60) return 'bg-amber-50 dark:bg-amber-950/30';
    return 'bg-red-50 dark:bg-red-950/30';
  };

  const getTrendIcon = () => {
    if (scores.winner === 'user') return <TrendingUp className="h-5 w-5 text-emerald-600" />;
    if (scores.winner === 'competitor') return <TrendingDown className="h-5 w-5 text-red-600" />;
    return <Minus className="h-5 w-5 text-amber-600" />;
  };

  const getWinnerBadge = () => {
    if (scores.winner === 'user') {
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
          <Trophy className="mr-1 h-3 w-3" />
          You're Winning
        </Badge>
      );
    }
    if (scores.winner === 'competitor') {
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
          <TrendingDown className="mr-1 h-3 w-3" />
          Behind by {scores.gap} points
        </Badge>
      );
    }
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
        <Minus className="mr-1 h-3 w-3" />
        Tied
      </Badge>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Overall SEO Score</h3>
          {getWinnerBadge()}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* User Score */}
          <div className={`relative rounded-xl p-6 ${getScoreBg(scores.user)} border-2 ${scores.winner === 'user' ? 'border-emerald-500' : 'border-transparent'}`}>
            {scores.winner === 'user' && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Trophy className="h-6 w-6 text-emerald-600" />
              </div>
            )}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Your Score</p>
              <p className={`text-5xl font-bold ${getScoreColor(scores.user)}`}>
                {scores.user}
              </p>
              <p className="text-sm text-muted-foreground mt-2 truncate">
                {getDomain(userUrl)}
              </p>
            </div>
          </div>

          {/* Competitor Score */}
          <div className={`relative rounded-xl p-6 ${getScoreBg(scores.competitor)} border-2 ${scores.winner === 'competitor' ? 'border-red-500' : 'border-transparent'}`}>
            {scores.winner === 'competitor' && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Trophy className="h-6 w-6 text-red-600" />
              </div>
            )}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Competitor Score</p>
              <p className={`text-5xl font-bold ${getScoreColor(scores.competitor)}`}>
                {scores.competitor}
              </p>
              <p className="text-sm text-muted-foreground mt-2 truncate">
                {getDomain(competitorUrl)}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Score Gap</span>
            <span className="font-medium">{scores.gap} points</span>
          </div>
          <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(scores.user, 100)}%`,
                background: scores.winner === 'user' 
                  ? 'linear-gradient(90deg, #10b981, #34d399)' 
                  : scores.winner === 'competitor'
                  ? 'linear-gradient(90deg, #ef4444, #f87171)'
                  : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
              }}
            />
          </div>
        </div>

        {/* Interpretation */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          {scores.interpretation}
        </p>
      </CardContent>
    </Card>
  );
}
