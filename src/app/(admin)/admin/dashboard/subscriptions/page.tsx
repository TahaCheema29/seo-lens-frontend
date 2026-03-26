'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterBar } from '@/components/dashboard/common/FilterBar';
import { DataTable } from '@/components/dashboard/common/DataTable';
import { StatusBadge, PlanBadge } from '@/components/dashboard/common/StatusBadge';
import { ColorfulBarChart } from '@/components/dashboard/common/ColorfulCharts';
import { mockAdminSubscriptions } from '@/features/dashboard/mock-data';
import type { AdminSubscription } from '@/features/dashboard/types';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  RefreshCw,
  MoreHorizontal,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Crown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Chart data
const revenueByPlanData = [
  { label: 'Free', value: 0, color: '#6b7280' },
  { label: 'Starter', value: 2250, color: '#3b82f6' },
  { label: 'Pro', value: 8000, color: '#8b5cf6' },
  { label: 'Ent', value: 3600, color: '#f59e0b' },
];

const mrrTrendData = [
  { label: 'Jan', value: 8500, color: '#3b82f6' },
  { label: 'Feb', value: 9200, color: '#8b5cf6' },
  { label: 'Mar', value: 10100, color: '#ec4899' },
  { label: 'Apr', value: 11200, color: '#10b981' },
  { label: 'May', value: 12400, color: '#f59e0b' },
  { label: 'Jun', value: 13850, color: '#06b6d4' },
];

export default function AdminSubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubscriptions = mockAdminSubscriptions.filter(
    (sub) =>
      sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMRR = mockAdminSubscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);
  const activeCount = mockAdminSubscriptions.filter((s) => s.status === 'active').length;
  const pastDueCount = mockAdminSubscriptions.filter((s) => s.status === 'past_due').length;

  const columns = [
    {
      key: 'user',
      header: 'User',
      render: (item: AdminSubscription) => (
        <div>
          <p className="font-medium">{item.userName}</p>
          <p className="text-xs text-muted-foreground">{item.userEmail}</p>
        </div>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      width: '120px',
      render: (item: AdminSubscription) => (
        <PlanBadge plan={item.plan.toLowerCase() as 'free' | 'starter' | 'professional' | 'enterprise'} />
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      width: '100px',
      render: (item: AdminSubscription) => (
        <div>
          <p className="font-medium">${item.amount}</p>
          <p className="text-xs text-muted-foreground">/{item.billingCycle}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '110px',
      render: (item: AdminSubscription) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      key: 'billing',
      header: 'Billing',
      width: '140px',
      render: (item: AdminSubscription) => (
        <div className="text-sm">
          <p>Next: {item.nextBillingDate}</p>
          <p className="text-muted-foreground">Since {item.startDate}</p>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '60px',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="mr-2 h-4 w-4" />
              Renew Subscription
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Cancel Subscription
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
            <p className="text-muted-foreground">
              Manage user subscriptions and billing
            </p>
          </div>
          <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Stats Overview with Colorful Accents */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-emerald-600">${totalMRR.toLocaleString()}</p>
                </div>
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                  <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+11.7% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Subs</p>
                  <p className="text-2xl font-bold text-blue-600">{activeCount}</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+8 new this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Past Due</p>
                  <p className="text-2xl font-bold text-red-600">{pastDueCount}</p>
                </div>
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-amber-600">
                <TrendingUp className="h-4 w-4" />
                <span>Needs attention</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Revenue/User</p>
                  <p className="text-2xl font-bold text-violet-600">
                    ${Math.round(totalMRR / (activeCount || 1))}
                  </p>
                </div>
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                  <Crown className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+5% vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                Revenue by Plan
              </CardTitle>
              <CardDescription>Monthly revenue distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={revenueByPlanData} height={200} showValues={true} />
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <div className="text-gray-600 font-bold">$0</div>
                  <div className="text-muted-foreground">Free</div>
                </div>
                <div>
                  <div className="text-blue-600 font-bold">$2.25K</div>
                  <div className="text-muted-foreground">Starter</div>
                </div>
                <div>
                  <div className="text-violet-600 font-bold">$8K</div>
                  <div className="text-muted-foreground">Pro</div>
                </div>
                <div>
                  <div className="text-amber-600 font-bold">$3.6K</div>
                  <div className="text-muted-foreground">Ent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                MRR Trend
              </CardTitle>
              <CardDescription>Monthly recurring revenue growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={mrrTrendData} height={200} showValues={true} />
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-muted-foreground">Growth: </span>
                <span className="font-bold text-green-600">+$5,350 (63%)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500" />
                  All Subscriptions
                </CardTitle>
                <CardDescription>Manage subscription details</CardDescription>
              </div>
              <FilterBar
                searchPlaceholder="Search subscriptions..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                filters={[
                  {
                    key: 'status',
                    label: 'Status',
                    options: [
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'past_due', label: 'Past Due' },
                      { value: 'cancelled', label: 'Cancelled' },
                    ],
                  },
                  {
                    key: 'plan',
                    label: 'Plan',
                    options: [
                      { value: 'free', label: 'Free' },
                      { value: 'starter', label: 'Starter' },
                      { value: 'professional', label: 'Professional' },
                      { value: 'enterprise', label: 'Enterprise' },
                    ],
                  },
                ]}
                onClear={() => setSearchQuery('')}
              />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredSubscriptions}
              columns={columns}
              keyExtractor={(item) => item.id}
            />
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                Plan Distribution
              </CardTitle>
              <CardDescription>Revenue breakdown by subscription tier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { plan: 'Enterprise', revenue: 3600, color: 'bg-amber-500', percent: 26 },
                { plan: 'Professional', revenue: 8000, color: 'bg-violet-500', percent: 58 },
                { plan: 'Starter', revenue: 2250, color: 'bg-blue-500', percent: 16 },
                { plan: 'Free', revenue: 0, color: 'bg-gray-500', percent: 0 },
              ].map((item) => (
                <div key={item.plan} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      {item.plan}
                    </span>
                    <span className="font-medium">
                      ${item.revenue.toLocaleString()} ({item.percent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                Upcoming Renewals
              </CardTitle>
              <CardDescription>Subscriptions renewing this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAdminSubscriptions
                .filter((s) => s.status === 'active')
                .slice(0, 3)
                .map((sub, index) => {
                  const colors = [
                    { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600' },
                    { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600' },
                    { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-600' },
                  ];
                  const color = colors[index % colors.length];
                  return (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full ${color.bg} p-2`}>
                          <CheckCircle className={`h-4 w-4 ${color.text}`} />
                        </div>
                        <div>
                          <p className="font-medium">{sub.userName}</p>
                          <p className="text-sm text-muted-foreground">{sub.plan} Plan</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${sub.amount}</p>
                        <p className="text-xs text-muted-foreground">{sub.nextBillingDate}</p>
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
