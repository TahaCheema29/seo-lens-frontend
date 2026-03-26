'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterBar } from '@/components/dashboard/common/FilterBar';
import { DataTable } from '@/components/dashboard/common/DataTable';
import { StatusBadge } from '@/components/dashboard/common/StatusBadge';
import { ColorfulBarChart } from '@/components/dashboard/common/ColorfulCharts';
import { mockReports } from '@/features/dashboard/mock-data';
import type { ReportData } from '@/features/dashboard/types';
import {
  FileText,
  Download,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Plus,
  TrendingUp,
  Calendar,
  Loader2,
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Chart data
const reportsByStatusData = [
  { label: 'Done', value: 45, color: '#10b981' },
  { label: 'Proc', value: 8, color: '#f59e0b' },
  { label: 'Fail', value: 3, color: '#ef4444' },
];

const reportsByTypeData = [
  { label: 'SEO', value: 15, color: '#3b82f6' },
  { label: 'Key', value: 12, color: '#8b5cf6' },
  { label: 'Rank', value: 10, color: '#10b981' },
  { label: 'Comp', value: 8, color: '#f59e0b' },
  { label: 'Sys', value: 11, color: '#06b6d4' },
];

export default function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = mockReports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = mockReports.filter((r) => r.status === 'completed').length;
  const processingCount = mockReports.filter((r) => r.status === 'processing').length;
  const failedCount = mockReports.filter((r) => r.status === 'failed').length;

  const columns = [
    {
      key: 'name',
      header: 'Report Name',
      render: (item: ReportData) => (
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{item.type.replace('-', ' ')}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      width: '120px',
      render: (item: ReportData) => (
        <span className="text-sm text-muted-foreground">{item.createdAt}</span>
      ),
    },
    {
      key: 'size',
      header: 'Size',
      width: '80px',
      render: (item: ReportData) => <span className="text-sm">{item.size}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      width: '110px',
      render: (item: ReportData) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      key: 'actions',
      header: '',
      width: '60px',
      render: (item: ReportData) => (
        <div className="flex items-center gap-1">
          {item.status === 'completed' && (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {item.status === 'completed' && (
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Manage and generate system reports
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  Generate New Report
                </DialogTitle>
                <DialogDescription>
                  Select the type of report you want to generate
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {[
                  { name: 'User Activity Report', color: 'blue' },
                  { name: 'Revenue Summary', color: 'emerald' },
                  { name: 'System Health Report', color: 'violet' },
                  { name: 'Usage Analytics', color: 'amber' },
                ].map((report) => (
                  <Button key={report.name} variant="outline" className="w-full justify-start">
                    <div className={`rounded-full bg-${report.color}-100 dark:bg-${report.color}-900/30 p-1.5 mr-2`}>
                      <FileText className={`h-4 w-4 text-${report.color}-600 dark:text-${report.color}-400`} />
                    </div>
                    {report.name}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview with Colorful Accents */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">{mockReports.length}</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+18 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
                </div>
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>96% success rate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Processing</p>
                  <p className="text-2xl font-bold text-amber-600">{processingCount}</p>
                </div>
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                  <Loader2 className="h-5 w-5 text-amber-600 dark:text-amber-400 animate-spin" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Est. completion: 3 min</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{failedCount}</p>
                </div>
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-amber-600">
                <TrendingUp className="h-4 w-4" />
                <span>Needs review</span>
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
                Reports by Status
              </CardTitle>
              <CardDescription>Distribution of report statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={reportsByStatusData} height={200} showValues={true} />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-emerald-600 font-bold">45</div>
                  <div className="text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-amber-600 font-bold">8</div>
                  <div className="text-muted-foreground">Processing</div>
                </div>
                <div>
                  <div className="text-red-600 font-bold">3</div>
                  <div className="text-muted-foreground">Failed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                Reports by Type
              </CardTitle>
              <CardDescription>Distribution across report categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={reportsByTypeData} height={200} showValues={true} />
              <div className="mt-4 grid grid-cols-5 gap-1 text-center text-xs">
                <div>
                  <div className="text-blue-600 font-bold">15</div>
                  <div className="text-muted-foreground">SEO</div>
                </div>
                <div>
                  <div className="text-violet-600 font-bold">12</div>
                  <div className="text-muted-foreground">Key</div>
                </div>
                <div>
                  <div className="text-emerald-600 font-bold">10</div>
                  <div className="text-muted-foreground">Rank</div>
                </div>
                <div>
                  <div className="text-amber-600 font-bold">8</div>
                  <div className="text-muted-foreground">Comp</div>
                </div>
                <div>
                  <div className="text-cyan-600 font-bold">11</div>
                  <div className="text-muted-foreground">Sys</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              All Reports
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              User
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Scheduled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      All Reports
                    </CardTitle>
                    <CardDescription>View and manage all reports</CardDescription>
                  </div>
                  <FilterBar
                    searchPlaceholder="Search reports..."
                    searchValue={searchQuery}
                    onSearchChange={setSearchQuery}
                    filters={[
                      {
                        key: 'type',
                        label: 'Type',
                        options: [
                          { value: 'seo-audit', label: 'SEO Audit' },
                          { value: 'keyword-analysis', label: 'Keyword Analysis' },
                          { value: 'rank-report', label: 'Rank Report' },
                          { value: 'competitor-analysis', label: 'Competitor Analysis' },
                        ],
                      },
                      {
                        key: 'status',
                        label: 'Status',
                        options: [
                          { value: 'completed', label: 'Completed' },
                          { value: 'processing', label: 'Processing' },
                          { value: 'failed', label: 'Failed' },
                        ],
                      },
                    ]}
                    onClear={() => setSearchQuery('')}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={filteredReports}
                  columns={columns}
                  keyExtractor={(item) => item.id}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  System Reports
                </CardTitle>
                <CardDescription>Platform health and performance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No system reports found
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  User Reports
                </CardTitle>
                <CardDescription>User activity and engagement reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No user reports found
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  Scheduled Reports
                </CardTitle>
                <CardDescription>Automated report generation schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Weekly System Health Report', schedule: 'Every Monday at 6:00 AM', status: 'active', color: 'emerald' },
                  { name: 'Monthly Revenue Report', schedule: '1st of every month', status: 'active', color: 'blue' },
                  { name: 'Daily User Activity Summary', schedule: 'Every day at 9:00 AM', status: 'paused', color: 'amber' },
                ].map((report) => (
                  <div key={report.name} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full bg-${report.color}-100 dark:bg-${report.color}-900/30 p-2`}>
                          <Calendar className={`h-4 w-4 text-${report.color}-600 dark:text-${report.color}-400`} />
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-muted-foreground">{report.schedule}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={report.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                        }
                      >
                        {report.status === 'active' ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
