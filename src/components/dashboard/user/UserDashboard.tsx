'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/dashboard/common/StatusBadge";
import type {
  SEOAnalysis,
  KeywordResearch,
  RankCheck,
} from "@/services/dashboard/queries";
import {
  Target,
  Key,
  ArrowRight,
  TrendingUp,
  Globe,
  Lightbulb,
  ExternalLink,
  Search,
} from "lucide-react";
import NextLink from "next/link";

interface UserDashboardProps {
  recentSEOAnalyses: SEOAnalysis[];
  recentKeywordResearch: KeywordResearch[];
  recentRankChecks: RankCheck[];
  avgSEOScore: number;
  totalKeywordsResearched: number;
  totalTop10rankings: number;
  totalCompletedAnalyses: number;
  totalCriticalIssues: number;
  totalWarnings: number;
  totalProcessingAnalyses: number;
  totalCompletedKeywords: number;
  totalProcessingKeywords: number;
  totalAvgRelated: number;
  totalKeywords: number;
  totalCompletedRanks: number;
  totalProcessingRanks: number;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 70) return "text-blue-600 dark:text-blue-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  if (score >= 40) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
};

function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground mt-1 mb-4">{description}</p>
      <Button asChild size="sm">
        <NextLink href={href}>
          {actionLabel}
          <ExternalLink className="ml-2 h-4 w-4" />
        </NextLink>
      </Button>
    </div>
  );
}

export function UserDashboard({
  recentSEOAnalyses,
  recentKeywordResearch,
  recentRankChecks,
  avgSEOScore,
  totalKeywordsResearched,
  totalTop10rankings,
  totalCompletedAnalyses,
  totalCriticalIssues,
  totalWarnings,
  totalProcessingAnalyses,
  totalCompletedKeywords,
  totalProcessingKeywords,
  totalAvgRelated,
  totalKeywords,
  totalCompletedRanks,
  totalProcessingRanks,
}: UserDashboardProps) {
  const hasSEOAnalyses = recentSEOAnalyses.length > 0;
  const hasKeywordResearch = recentKeywordResearch.length > 0;
  const hasRankChecks = recentRankChecks.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your SEO performance.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">SEO Score</p>
                <p className="text-2xl font-bold">{avgSEOScore || 0}</p>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Keywords Tracked</p>
                <p className="text-2xl font-bold">{totalKeywordsResearched.toLocaleString()}</p>
              </div>
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                <Key className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <NextLink href="/dashboard/seo-insights">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  SEO Insights
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Score</span>
                  <span className={`text-2xl font-bold ${getScoreColor(avgSEOScore)}`}>
                    {avgSEOScore}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border p-2">
                    <p className="text-lg font-bold text-emerald-600">{totalCompletedAnalyses}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="rounded-lg border p-2">
                    <p className="text-lg font-bold text-red-600">{totalCriticalIssues}</p>
                    <p className="text-xs text-muted-foreground">Critical</p>
                  </div>
                  <div className="rounded-lg border p-2">
                    <p className="text-lg font-bold text-amber-600">{totalWarnings}</p>
                    <p className="text-xs text-muted-foreground">Warnings</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{totalProcessingAnalyses} analyses in progress</p>
              </div>
            </CardContent>
          </Card>
        </NextLink>

        <NextLink href="/dashboard/keyword-analyzer">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-violet-500" />
                  Keyword Analyzer
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Keywords</span>
                  <span className="text-2xl font-bold">{totalKeywordsResearched.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg border p-2">
                    <p className="text-lg font-bold text-emerald-600">{totalCompletedKeywords}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="rounded-lg border p-2">
                    <p className="text-lg font-bold">{totalAvgRelated}</p>
                    <p className="text-xs text-muted-foreground">Avg Related</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{totalProcessingKeywords} research in progress</p>
              </div>
            </CardContent>
          </Card>
        </NextLink>

        <NextLink href="/dashboard/rank-tracker">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-amber-500" />
                  Rank Tracker
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Top 10 Rankings</span>
                  <span className="text-2xl font-bold text-emerald-600">{totalTop10rankings}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg border p-2">
                    <p className="text-lg font-bold">{totalKeywords}</p>
                    <p className="text-xs text-muted-foreground">Keywords</p>
                  </div>
                  <div className="rounded-lg border p-2">
                    <p className="text-lg font-bold">{totalCompletedRanks}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{totalProcessingRanks} checks in progress</p>
              </div>
            </CardContent>
          </Card>
        </NextLink>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Recent Analyses
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <NextLink href="/dashboard/seo-insights">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </NextLink>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {hasSEOAnalyses ? (
              recentSEOAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className={`rounded-full p-2 ${analysis.status === "completed" ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
                    <Globe className={`h-4 w-4 ${analysis.status === "completed" ? "text-emerald-600" : "text-amber-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {analysis.url?.replace("https://", "").replace("http://", "") || "N/A"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {analysis.status === "completed" ? `Score: ${analysis.score}` : "Processing..."}
                    </p>
                  </div>
                  <StatusBadge status={analysis.status} size="sm" />
                </div>
              ))
            ) : (
              <EmptyState
                icon={Search}
                title="No analyses yet"
                description="Run your first SEO analysis to get started"
                actionLabel="Analyze Site"
                href="/analyze-site-seo"
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-violet-500" />
                Recent Research
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <NextLink href="/dashboard/keyword-analyzer">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </NextLink>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {hasKeywordResearch ? (
              recentKeywordResearch.map((research) => (
                <div key={research.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className={`rounded-full p-2 ${research.status === "completed" ? "bg-violet-100 dark:bg-violet-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
                    <Lightbulb className={`h-4 w-4 ${research.status === "completed" ? "text-violet-600" : "text-amber-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{research.primaryKeyword}</p>
                    <p className="text-xs text-muted-foreground">
                      {research.status === "completed"
                        ? `${research.relatedKeywordsCount + research.longTailKeywordsCount} keywords`
                        : "Processing..."}
                    </p>
                  </div>
                  <StatusBadge status={research.status} size="sm" />
                </div>
              ))
            ) : (
              <EmptyState
                icon={Lightbulb}
                title="No research yet"
                description="Start your first keyword research"
                actionLabel="Research Keywords"
                href="/suggest-keywords"
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-amber-500" />
                Recent Rank Checks
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <NextLink href="/dashboard/rank-tracker">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </NextLink>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {hasRankChecks ? (
              recentRankChecks.map((check) => (
                <div key={check.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className={`rounded-full p-2 ${check.status === "completed" ? "bg-amber-100 dark:bg-amber-900/30" : "bg-gray-100 dark:bg-gray-800"}`}>
                    <Target className={`h-4 w-4 ${check.status === "completed" ? "text-amber-600" : "text-gray-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {check.domain?.replace("https://", "").replace("http://", "") || "N/A"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {check.status === "completed"
                        ? `${check.keywords.length} keywords • ${check.top10Count} top 10`
                        : "Processing..."}
                    </p>
                  </div>
                  <StatusBadge status={check.status} size="sm" />
                </div>
              ))
            ) : (
              <EmptyState
                icon={Target}
                title="No rank checks yet"
                description="Check your first domain rankings"
                actionLabel="Check Rankings"
                href="/analyze-rank"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
