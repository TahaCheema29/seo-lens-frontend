"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AdminOverview, PlatformAnalytics } from "@/services/dashboard/adminQueries";
import {
  TrendingUp,
  Search,
  BarChart3,
  FileText,
  Calendar,
  Users,
  Activity,
} from "lucide-react";

interface AdminAnalyticsProps {
  overview: AdminOverview | null;
  analytics: PlatformAnalytics | null;
}

export function AdminAnalytics({ overview, analytics }: AdminAnalyticsProps) {
  const totalUsers = overview?.totalUsers || 0;
  const activeUsers = overview?.activeUsers || 0;
  
  // Calculate total analyses from overview (sum of all analysis types)
  const totalAnalyses = (overview?.totalAnalyses || 0) + 
                       (overview?.totalKeywords || 0) + 
                       (overview?.totalRankChecks || 0);

  // Get daily active users data from userActivity
  const dailyActiveUsers = analytics?.userActivity?.dailyActiveUsers || [];
  const dailyLabels = analytics?.userActivity?.labels || [];
  const maxDailyUsers = Math.max(...dailyActiveUsers, 1);

  // Build platform usage data from the nested objects
  const platformUsage = [
    { 
      label: "SEO Analyses", 
      value: analytics?.seoAnalyses?.total || 0,
      color: "#8b5cf6" 
    },
    { 
      label: "Keyword Research", 
      value: analytics?.keywordResearch?.total || 0,
      color: "#10b981" 
    },
    { 
      label: "Rank Checks", 
      value: analytics?.rankChecks?.total || 0,
      color: "#f59e0b" 
    },
  ];
  const maxPlatformValue = Math.max(...platformUsage.map(p => p.value), 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Platform analytics and user insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Last 7 Days
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>{activeUsers} active</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-emerald-600">{activeUsers}</p>
              </div>
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>{totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0}% active rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-violet-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Analyses</p>
                <p className="text-2xl font-bold">{totalAnalyses}</p>
              </div>
              <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                <BarChart3 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. per User</p>
                <p className="text-2xl font-bold">{totalUsers > 0 ? Math.round(totalAnalyses / totalUsers) : 0}</p>
              </div>
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500" />
              SEO Analyses
            </CardTitle>
            <CardDescription>Website analysis operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-violet-600">
                {analytics?.seoAnalyses?.total?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-muted-foreground">Total analyses</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="rounded-lg bg-muted p-2">
                <p className="font-bold">{analytics?.seoAnalyses?.completed || 0}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="rounded-lg bg-muted p-2">
                <p className="font-bold">{analytics?.seoAnalyses?.processing || 0}</p>
                <p className="text-xs text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              Keyword Research
            </CardTitle>
            <CardDescription>Keyword suggestion operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-emerald-600">
                {analytics?.keywordResearch?.total?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-muted-foreground">Total operations</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="rounded-lg bg-muted p-2">
                <p className="font-bold">{analytics?.keywordResearch?.completed || 0}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="rounded-lg bg-muted p-2">
                <p className="font-bold">{analytics?.keywordResearch?.processing || 0}</p>
                <p className="text-xs text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              Rank Tracking
            </CardTitle>
            <CardDescription>Keyword rank check operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-600">
                {analytics?.rankChecks?.total?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-muted-foreground">Total checks</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="rounded-lg bg-muted p-2">
                <p className="font-bold">{analytics?.rankChecks?.completed || 0}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="rounded-lg bg-muted p-2">
                <p className="font-bold">{analytics?.rankChecks?.processing || 0}</p>
                <p className="text-xs text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
