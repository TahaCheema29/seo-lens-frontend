'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterBar } from '@/components/dashboard/common/FilterBar';
import { DataTable } from '@/components/dashboard/common/DataTable';
import { StatusBadge, PlanBadge } from '@/components/dashboard/common/StatusBadge';
import { ColorfulBarChart } from '@/components/dashboard/common/ColorfulCharts';
import { mockAdminUsers } from '@/features/dashboard/mock-data';
import type { AdminUser } from '@/features/dashboard/types';
import {
  Plus,
  Search,
  MoreHorizontal,
  Mail,
  Ban,
  CheckCircle,
  Users,
  Activity,
  Key,
  TrendingUp,
  Globe,
  Crown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Chart data
const usersByPlanData = [
  { label: 'Free', value: 25, color: '#6b7280' },
  { label: 'Starter', value: 45, color: '#3b82f6' },
  { label: 'Pro', value: 80, color: '#8b5cf6' },
  { label: 'Ent', value: 12, color: '#f59e0b' },
];

const userGrowthData = [
  { label: 'Jan', value: 120, color: '#3b82f6' },
  { label: 'Feb', value: 145, color: '#8b5cf6' },
  { label: 'Mar', value: 180, color: '#ec4899' },
  { label: 'Apr', value: 210, color: '#10b981' },
  { label: 'May', value: 248, color: '#f59e0b' },
  { label: 'Jun', value: 290, color: '#06b6d4' },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filteredUsers = mockAdminUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = mockAdminUsers.filter((u) => u.status === 'active').length;
  const totalSites = mockAdminUsers.reduce((sum, u) => sum + u.sitesCount, 0);
  const totalKeywords = mockAdminUsers.reduce((sum, u) => sum + u.keywordsCount, 0);

  const columns = [
    {
      key: 'user',
      header: 'User',
      render: (item: AdminUser) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-bold">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'company',
      header: 'Company',
      render: (item: AdminUser) => (
        <span className="text-sm">{item.company || '—'}</span>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      width: '100px',
      render: (item: AdminUser) => (
        <PlanBadge plan={item.plan.toLowerCase() as 'free' | 'starter' | 'professional' | 'enterprise'} />
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: (item: AdminUser) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      key: 'joined',
      header: 'Joined',
      width: '100px',
      render: (item: AdminUser) => (
        <span className="text-sm text-muted-foreground">{item.joinedAt}</span>
      ),
    },
    {
      key: 'activity',
      header: 'Activity',
      width: '150px',
      render: (item: AdminUser) => (
        <div className="text-sm">
          <p className="flex items-center gap-1">
            <Globe className="h-3 w-3 text-blue-500" />
            {item.sitesCount} sites
          </p>
          <p className="text-muted-foreground flex items-center gap-1">
            <Key className="h-3 w-3 text-violet-500" />
            {item.keywordsCount.toLocaleString()} keywords
          </p>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '60px',
      render: (item: AdminUser) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedUser(item)}>
              <Search className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            {item.status === 'active' ? (
              <DropdownMenuItem className="text-destructive">
                <Ban className="mr-2 h-4 w-4" />
                Suspend User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                Activate User
              </DropdownMenuItem>
            )}
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
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">
              Manage user accounts and permissions
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Stats Overview with Colorful Accents */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{mockAdminUsers.length}</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+24 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
                </div>
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                  <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>98% active rate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sites</p>
                  <p className="text-2xl font-bold">{totalSites}</p>
                </div>
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                  <Globe className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+12 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Keywords</p>
                  <p className="text-2xl font-bold">{(totalKeywords / 1000).toFixed(1)}K</p>
                </div>
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                  <Key className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+5.2K tracked</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                Users by Plan
              </CardTitle>
              <CardDescription>Distribution across subscription tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={usersByPlanData} height={200} showValues={true} />
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <div className="text-gray-600 font-bold">25</div>
                  <div className="text-muted-foreground">Free</div>
                </div>
                <div>
                  <div className="text-blue-600 font-bold">45</div>
                  <div className="text-muted-foreground">Starter</div>
                </div>
                <div>
                  <div className="text-violet-600 font-bold">80</div>
                  <div className="text-muted-foreground">Pro</div>
                </div>
                <div>
                  <div className="text-amber-600 font-bold">12</div>
                  <div className="text-muted-foreground">Ent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                User Growth
              </CardTitle>
              <CardDescription>New user signups over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={userGrowthData} height={200} showValues={true} />
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-muted-foreground">Growth rate: </span>
                <span className="font-bold text-green-600">+24% this quarter</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  All Users
                </CardTitle>
                <CardDescription>Manage user accounts</CardDescription>
              </div>
              <FilterBar
                searchPlaceholder="Search users..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                filters={[
                  {
                    key: 'status',
                    label: 'Status',
                    options: [
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'suspended', label: 'Suspended' },
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
              data={filteredUsers}
              columns={columns}
              keyExtractor={(item) => item.id}
            />
          </CardContent>
        </Card>

        {/* User Detail Dialog */}
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                User Details
              </DialogTitle>
              <DialogDescription>
                Detailed information about {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xl font-bold">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{selectedUser.company || '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <PlanBadge plan={selectedUser.plan.toLowerCase() as 'free' | 'starter' | 'professional' | 'enterprise'} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <StatusBadge status={selectedUser.status} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium capitalize">{selectedUser.role}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">{selectedUser.joinedAt}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Last Active</p>
                    <p className="font-medium">{selectedUser.lastActive}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
}
