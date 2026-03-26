'use client';

import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ColorfulBarChart } from '@/components/dashboard/common/ColorfulCharts';
import { StatusBadge } from '@/components/dashboard/common/StatusBadge';
import {
  mockKPIData,
  mockSEOInsights,
  mockKeywords,
  mockRankData,
  mockReports,
  mockSEOAnalysisHistory,
  mockKeywordResearchHistory,
  mockRankCheckHistory,
} from '@/features/dashboard/mock-data';
import {
  Users,
  Target,
  Key,
  Link,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  FileText,
  BarChart3,
  Search,
  Globe,
  Lightbulb,
  Plus,
  CheckCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import NextLink from 'next/link';

const chartData = [
  { label: 'Mon', value: 65, color: '#3b82f6' },
  { label: 'Tue', value: 78, color: '#10b981' },
  { label: 'Wed', value: 82, color: '#f59e0b' },
  { label: 'Thu', value: 75, color: '#8b5cf6' },
  { label: 'Fri', value: 88, color: '#ec4899' },
  { label: 'Sat', value: 92, color: '#06b6d4' },
  { label: 'Sun', value: 85, color: '#84cc16' },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

export default function UserDashboardPage() {
  const recentSEOAnalyses = mockSEOAnalysisHistory.slice(0, 3);
  const recentKeywordResearch = mockKeywordResearchHistory.slice(0, 3);
  const recentRankChecks = mockRankCheckHistory.slice(0, 3);

  const avgSEOScore = Math.round(
    mockSEOAnalysisHistory.filter((i) => i.status === 'completed').reduce((sum, item) => sum + item.score, 0) /
    mockSEOAnalysisHistory.filter((i) => i.status === 'completed').length || 0
  );

  const totalKeywordsResearched = mockKeywordResearchHistory
    .filter((i) => i.status === 'completed')
    .reduce((sum, item) => sum + item.relatedKeywordsCount + item.longTailKeywordsCount, 0);

  const totalTop10rankings = mockRankCheckHistory.reduce((sum, item) => sum + item.top10Count, 0);

  return (
    <DashboardShell role="user">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s an overview of your SEO performance.
            </p>
          </div>
          <Button>
            Run New Audit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SEO Score</p>
                  <p className="text-2xl font-bold">84</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+5.2%</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Keywords Tracked</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                  <Key className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+12.3%</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Backlinks</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                  <Link className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+8.7%</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Organic Traffic</p>
                  <p className="text-2xl font-bold">45.2K</p>
                </div>
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                  <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+15.1%</span>
                <span className="text-muted-foreground">vs last week</span>
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
                      <p className="text-lg font-bold text-emerald-600">
                        {mockSEOAnalysisHistory.filter((i) => i.status === 'completed').length}
                      </p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="rounded-lg border p-2">
                      <p className="text-lg font-bold text-red-600">
                        {mockSEOAnalysisHistory.reduce((sum, i) => sum + i.criticalIssues, 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Critical</p>
                    </div>
                    <div className="rounded-lg border p-2">
                      <p className="text-lg font-bold text-amber-600">
                        {mockSEOAnalysisHistory.reduce((sum, i) => sum + i.warnings, 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Warnings</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {mockSEOAnalysisHistory.filter((i) => i.status === 'processing').length} analyses in progress
                  </p>
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
                      <p className="text-lg font-bold text-emerald-600">
                        {mockKeywordResearchHistory.filter((i) => i.status === 'completed').length}
                      </p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="rounded-lg border p-2">
                      <p className="text-lg font-bold">
                        {Math.round(mockKeywordResearchHistory
                          .filter((i) => i.status === 'completed')
                          .reduce((sum, i) => sum + i.relatedKeywordsCount, 0) /
                          mockKeywordResearchHistory.filter((i) => i.status === 'completed').length) || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Avg Related</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {mockKeywordResearchHistory.filter((i) => i.status === 'processing').length} research in progress
                  </p>
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
                      <p className="text-lg font-bold">
                        {mockRankCheckHistory.reduce((sum, i) => sum + i.keywords.length, 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Keywords</p>
                    </div>
                    <div className="rounded-lg border p-2">
                      <p className="text-lg font-bold">
                        {mockRankCheckHistory.filter((i) => i.status === 'completed').length}
                      </p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {mockRankCheckHistory.filter((i) => i.status === 'processing').length} checks in progress
                  </p>
                </div>
              </CardContent>
            </Card>
          </NextLink>
        </div>

        <div className="grid gap-6 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    Performance Overview
                  </CardTitle>
                  <CardDescription>Your SEO performance over the last 7 days</CardDescription>
                </div>
                <Badge variant="outline">Last 7 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={chartData} height={250} showValues={true} />
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  Recent Reports
                </CardTitle>
                <CardDescription>Last generated reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockReports.slice(0, 4).map((report, index) => {
                  const colors = [
                    { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
                    { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
                    { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-600 dark:text-violet-400' },
                  ];
                  const color = colors[index % colors.length];
                  return (
                    <div
                      key={report.id}
                      className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className={`rounded-md ${color.bg} p-2`}>
                        <FileText className={`h-4 w-4 ${color.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.createdAt}</p>
                      </div>
                      <Badge
                        variant={report.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {report.status}
                      </Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  SEO Insights
                </CardTitle>
                <CardDescription>Recent issues and opportunities</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <NextLink href="/dashboard/seo-insights">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </NextLink>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSEOInsights.slice(0, 3).map((insight, index) => {
              const colors = [
                { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', border: 'border-red-200' },
                { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-200' },
                { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', border: 'border-green-200' },
              ];
              const color = colors[index % colors.length];
              return (
                <div
                  key={insight.id}
                  className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className={`rounded-full p-2 ${color.bg} ${color.text}`}>
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium truncate">{insight.title}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${color.bg} ${color.text} ${color.border}`}
                      >
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                    {insight.metric && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">{insight.metric}:</span>
                        <span className="text-sm font-medium">{insight.metricValue}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

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
              {recentSEOAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className={`rounded-full p-2 ${analysis.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                    <Globe className={`h-4 w-4 ${analysis.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{analysis.url.replace('https://', '').replace('http://', '')}</p>
                    <p className="text-xs text-muted-foreground">
                      {analysis.status === 'completed' ? `Score: ${analysis.score}` : 'Processing...'}
                    </p>
                  </div>
                  <StatusBadge status={analysis.status} size="sm" />
                </div>
              ))}
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
              {recentKeywordResearch.map((research) => (
                <div key={research.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className={`rounded-full p-2 ${research.status === 'completed' ? 'bg-violet-100 dark:bg-violet-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                    <Lightbulb className={`h-4 w-4 ${research.status === 'completed' ? 'text-violet-600' : 'text-amber-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{research.primaryKeyword}</p>
                    <p className="text-xs text-muted-foreground">
                      {research.status === 'completed' ? `${research.relatedKeywordsCount + research.longTailKeywordsCount} keywords` : 'Processing...'}
                    </p>
                  </div>
                  <StatusBadge status={research.status} size="sm" />
                </div>
              ))}
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
              {recentRankChecks.map((check) => (
                <div key={check.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className={`rounded-full p-2 ${check.status === 'completed' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <Target className={`h-4 w-4 ${check.status === 'completed' ? 'text-amber-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{check.domain.replace('https://', '').replace('http://', '')}</p>
                    <p className="text-xs text-muted-foreground">
                      {check.status === 'completed' ? `${check.keywords.length} keywords • ${check.top10Count} top 10` : 'Processing...'}
                    </p>
                  </div>
                  <StatusBadge status={check.status} size="sm" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}