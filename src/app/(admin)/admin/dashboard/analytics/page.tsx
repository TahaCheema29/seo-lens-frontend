'use client';

import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAnalyticsData } from '@/features/dashboard/mock-data';
import { ColorfulBarChart, ColorfulLineChart } from '@/components/dashboard/common/ColorfulCharts';
import {
  TrendingUp,
  Activity,
  BarChart3,
  Download,
  Calendar,
  Users,
  FileText,
  DollarSign,
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const totalScans = mockAnalyticsData.reduce((sum, d) => sum + d.totalScans, 0);
  const totalReports = mockAnalyticsData.reduce((sum, d) => sum + d.totalReports, 0);
  const totalRevenue = mockAnalyticsData.reduce((sum, d) => sum + d.revenue, 0);
  const avgDailyActive = Math.round(
    mockAnalyticsData.reduce((sum, d) => sum + d.activeUsers, 0) / mockAnalyticsData.length
  );

  // Prepare chart data
  const userActivityData = mockAnalyticsData.map(d => ({
    label: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    value: d.activeUsers,
    color: '#3b82f6',
  }));

  const revenueData = mockAnalyticsData.map(d => ({
    label: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    value: d.revenue,
    color: '#10b981',
  }));

  const newUsersData = mockAnalyticsData.map(d => ({
    label: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    value: d.newUsers,
    color: '#f59e0b',
  }));

  const scansData = mockAnalyticsData.map(d => ({
    label: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    value: d.totalScans,
    color: '#8b5cf6',
  }));

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Detailed platform analytics and insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Last 7 Days
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-neutral-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Daily Active</p>
                  <p className="text-2xl font-bold">{avgDailyActive}</p>
                </div>
                <div className="rounded-full bg-neutral-100 dark:bg-neutral-800 p-3">
                  <Activity className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+12.5%</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Scans</p>
                  <p className="text-2xl font-bold">{(totalScans / 1000).toFixed(1)}K</p>
                </div>
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                  <BarChart3 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+8.3%</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-pink-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reports Generated</p>
                  <p className="text-2xl font-bold">{totalReports}</p>
                </div>
                <div className="rounded-full bg-pink-100 dark:bg-pink-900/30 p-3">
                  <FileText className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+15.7%</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(1)}K</p>
                </div>
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                  <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+22.1%</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 - Main Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* User Activity - Line Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-neutral-500" />
                    User Activity
                  </CardTitle>
                  <CardDescription>Daily active users over time</CardDescription>
                </div>
                <Badge variant="outline">Last 7 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ColorfulLineChart 
                data={userActivityData} 
                height={250} 
                lineColor="#3b82f6"
                showArea={true}
              />
            </CardContent>
          </Card>

          {/* Revenue - Bar Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Daily revenue over time</CardDescription>
                </div>
                <Badge variant="outline">Last 7 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart 
                data={revenueData} 
                height={250}
                showValues={true}
              />
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 - Secondary Charts */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                New User Signups
              </CardTitle>
              <CardDescription>Daily new user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={newUsersData} height={200} />
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-muted-foreground">Total: </span>
                <span className="font-medium">
                  {mockAnalyticsData.reduce((sum, d) => sum + d.newUsers, 0)} new users
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                Scans Per Day
              </CardTitle>
              <CardDescription>Total scans performed daily</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulLineChart 
                data={scansData} 
                height={200}
                lineColor="#8b5cf6"
                showArea={true}
              />
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-muted-foreground">Avg: </span>
                <span className="font-medium">
                  {Math.round(totalScans / mockAnalyticsData.length)} scans/day
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                User Retention
              </CardTitle>
              <CardDescription>Return user percentage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-neutral-200 dark:text-neutral-700"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-cyan-500"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="75, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">75%</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">7-day retention rate</p>
                <p className="text-sm text-green-600">+5.2% vs last week</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
