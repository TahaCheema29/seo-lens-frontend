'use client';

import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Search,
  Key,
  Target,
  BarChart3,
  FileText,
  Calendar,
} from 'lucide-react';

const userActivityData = [
  { label: 'Mon', value: 45, color: '#3b82f6' },
  { label: 'Tue', value: 52, color: '#3b82f6' },
  { label: 'Wed', value: 38, color: '#3b82f6' },
  { label: 'Thu', value: 65, color: '#3b82f6' },
  { label: 'Fri', value: 48, color: '#3b82f6' },
  { label: 'Sat', value: 22, color: '#3b82f6' },
  { label: 'Sun', value: 18, color: '#3b82f6' },
];

const platformUsageData = [
  { label: 'SEO Analyses', value: 1250, color: '#8b5cf6' },
  { label: 'Keyword Research', value: 3420, color: '#10b981' },
  { label: 'Rank Checks', value: 890, color: '#f59e0b' },
];

export default function AdminAnalyticsPage() {
  const totalUsers = 162;
  const activeUsers = 145;
  const totalAnalyses = 5560;

  return (
    <DashboardShell role="admin">
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+12.5%</span>
                <span className="text-muted-foreground">vs last week</span>
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
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>89.5% active rate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Analyses</p>
                  <p className="text-2xl font-bold">{(totalAnalyses / 1000).toFixed(1)}K</p>
                </div>
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                  <Search className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+8.3%</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. per User</p>
                  <p className="text-2xl font-bold">{Math.round(totalAnalyses / totalUsers)}</p>
                </div>
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                  <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+5.2%</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    Daily Active Users
                  </CardTitle>
                  <CardDescription>User activity over the past week</CardDescription>
                </div>
                <Badge variant="outline">Last 7 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {userActivityData.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 w-full">
                    <div
                      className="w-full rounded-t-md transition-all hover:opacity-80"
                      style={{
                        height: `${(item.value / 70) * 100}%`,
                        backgroundColor: item.color,
                        minHeight: '10px',
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-muted-foreground">Avg. daily: </span>
                <span className="font-medium">41 users</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500" />
                    Platform Usage
                  </CardTitle>
                  <CardDescription>Total operations across platform</CardDescription>
                </div>
                <Badge variant="outline">All time</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {platformUsageData.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="font-bold" style={{ color: item.color }}>
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(item.value / 4000) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Operations</span>
                  <span className="font-bold text-lg">
                    {platformUsageData.reduce((sum, i) => sum + i.value, 0).toLocaleString()}
                  </span>
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
                <p className="text-4xl font-bold text-violet-600">1,250</p>
                <p className="text-sm text-muted-foreground">Total analyses</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-bold">892</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-bold">358</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
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
                <p className="text-4xl font-bold text-emerald-600">3,420</p>
                <p className="text-sm text-muted-foreground">Total keywords</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-bold">2,156</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-bold">1,264</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
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
                <p className="text-4xl font-bold text-amber-600">890</p>
                <p className="text-sm text-muted-foreground">Total checks</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-bold">645</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-bold">245</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}