'use client';

import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { KpiCard } from '@/components/dashboard/common/KpiCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ColorfulBarChart, ColorfulLineChart } from '@/components/dashboard/common/ColorfulCharts';
import {
  mockAdminUsers,
  mockAdminSubscriptions,
  mockAnalyticsData,
  mockNotifications,
} from '@/features/dashboard/mock-data';
import { StatusBadge, PlanBadge } from '@/components/dashboard/common/StatusBadge';
import {
  Users,
  CreditCard,
  DollarSign,
  Activity,
  ArrowRight,
  BarChart3,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const totalUsers = mockAdminUsers.length;
  const activeUsers = mockAdminUsers.filter((u) => u.status === 'active').length;
  const totalRevenue = mockAdminSubscriptions.reduce((sum, s) => sum + s.amount, 0);
  const activeSubscriptions = mockAdminSubscriptions.filter((s) => s.status === 'active').length;

  const recentSignups = mockAdminUsers.slice(-3).reverse();
  const recentRevenue = mockAnalyticsData.slice(-7).reduce((sum, d) => sum + d.revenue, 0);

  // Revenue chart data
  const revenueChartData = mockAnalyticsData.map(d => ({
    label: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    value: d.revenue,
    color: '#10b981',
  }));

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of platform performance and key metrics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Total Users"
            value={totalUsers}
            change={12.5}
            changeLabel="vs last month"
            icon={Users}
            trend="up"
          />
          <KpiCard
            title="Active Subscriptions"
            value={activeSubscriptions}
            change={8.3}
            changeLabel="vs last month"
            icon={CreditCard}
            trend="up"
          />
          <KpiCard
            title="Monthly Revenue"
            value={`$${totalRevenue}`}
            change={15.7}
            changeLabel="vs last month"
            icon={DollarSign}
            trend="up"
          />
          <KpiCard
            title="Active Rate"
            value={`${Math.round((activeUsers / totalUsers) * 100)}%`}
            change={2.1}
            changeLabel="vs last month"
            icon={Activity}
            trend="up"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Revenue Chart */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    Revenue Overview
                  </CardTitle>
                  <CardDescription>Daily revenue for the past week</CardDescription>
                </div>
                <Badge variant="outline">Last 7 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ColorfulLineChart 
                data={revenueChartData}
                height={300}
                lineColor="#10b981"
                showArea={true}
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${recentRevenue.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Avg. Daily</p>
                  <p className="text-lg font-semibold">
                    ${Math.round(recentRevenue / 7).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recent Signups */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Signups</CardTitle>
                    <CardDescription>New users this week</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentSignups.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <PlanBadge plan={user.plan.toLowerCase() as 'free' | 'starter' | 'professional' | 'enterprise'} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subscription Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
                <CardDescription>Users by subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Free', 'Starter', 'Professional', 'Enterprise'].map((plan) => {
                  const count = mockAdminUsers.filter(
                    (u) => u.plan.toLowerCase() === plan.toLowerCase()
                  ).length;
                  const percentage = (count / mockAdminUsers.length) * 100;
                  return (
                    <div key={plan} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize">{plan}</span>
                        <span className="font-medium">
                          {count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Status */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Platform health indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="font-medium">API Status</span>
                <StatusBadge status="success" size="sm">
                  Operational
                </StatusBadge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="font-medium">Database</span>
                <StatusBadge status="success" size="sm">
                  Healthy
                </StatusBadge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="font-medium">Queue Workers</span>
                <StatusBadge status="success" size="sm">
                  Running
                </StatusBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>System notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockNotifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <div
                    className={`rounded-full p-1.5 ${
                      notification.type === 'success'
                        ? 'bg-emerald-100 text-emerald-600'
                        : notification.type === 'warning'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                    }`}
                  >
                    <Activity className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                View Subscriptions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                System Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
