'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/dashboard/common/DataTable';
import { StatusBadge } from '@/components/dashboard/common/StatusBadge';
import { mockRankCheckHistory } from '@/features/dashboard/mock-data';
import type { RankCheckHistory } from '@/features/dashboard/types';
import {
  Search,
  Target,
  Plus,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Trash2,
  ExternalLink,
  Download,
  TrendingUp,
  Globe,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';

const validHttpUrl = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;

export default function RankTrackerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCheck, setSelectedCheck] = useState<RankCheckHistory | null>(null);
  const [isNewCheckOpen, setIsNewCheckOpen] = useState(false);
  const [newDomain, setNewDomain] = useState('');

  const filteredData = mockRankCheckHistory.filter((item) => {
    const matchesSearch = item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalTop10 = mockRankCheckHistory.reduce((sum, item) => sum + item.top10Count, 0);
  const totalKeywords = mockRankCheckHistory.reduce((sum, item) => sum + item.keywords.length, 0);
  const completedChecks = mockRankCheckHistory.filter((item) => item.status === 'completed').length;
  const avgPosition = mockRankCheckHistory
    .filter((item) => item.status === 'completed' && item.avgPosition !== null)
    .reduce((sum, item) => sum + (item.avgPosition || 0), 0) /
    mockRankCheckHistory.filter((item) => item.status === 'completed' && item.avgPosition !== null).length || 0;

  const columns = [
    {
      key: 'domain',
      header: 'Domain',
      render: (item: RankCheckHistory) => (
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
            <Globe className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium truncate max-w-[180px]">
              {item.domain.replace('https://', '').replace('http://', '')}
            </p>
            <p className="text-xs text-muted-foreground">
              {item.keywords.length} keyword{item.keywords.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'keywords',
      header: 'Keywords',
      render: (item: RankCheckHistory) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {item.keywords.slice(0, 2).map((keyword, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {keyword}
            </Badge>
          ))}
          {item.keywords.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{item.keywords.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'top10',
      header: 'Top 10',
      width: '100px',
      render: (item: RankCheckHistory) => (
        item.status === 'completed' ? (
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-emerald-600">{item.top10Count}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: 'avgPosition',
      header: 'Avg Position',
      width: '100px',
      render: (item: RankCheckHistory) => (
        item.status === 'completed' && item.avgPosition !== null ? (
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="font-medium">#{item.avgPosition.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: (item: RankCheckHistory) => (
        <StatusBadge status={item.status} size="sm" />
      ),
    },
    {
      key: 'date',
      header: 'Date',
      width: '140px',
      render: (item: RankCheckHistory) => (
        <span className="text-sm text-muted-foreground">
          {new Date(item.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '60px',
      render: (item: RankCheckHistory) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedCheck(item)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="mr-2 h-4 w-4" />
              Re-check
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DashboardShell role="user">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rank Tracker</h1>
            <p className="text-muted-foreground">
              View your ranking check history and monitor keyword positions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsNewCheckOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Check
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Keywords</p>
                  <p className="text-2xl font-bold">{totalKeywords}</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Across all checks</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top 10 Rankings</p>
                  <p className="text-2xl font-bold text-emerald-600">{totalTop10}</p>
                </div>
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                  <Trophy className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">First page results</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Position</p>
                  <p className="text-2xl font-bold">
                    {avgPosition > 0 ? `#${avgPosition.toFixed(1)}` : '—'}
                  </p>
                </div>
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                  <TrendingUp className="h-5 w-5 text-violet-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Overall average</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedChecks}</p>
                </div>
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                  <Globe className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {mockRankCheckHistory.filter((i) => i.status === 'processing').length} processing
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Rank Check History</CardTitle>
                <CardDescription>Your historical ranking checks</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search domain or keyword..."
                    className="pl-9 w-[220px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredData}
              columns={columns}
              keyExtractor={(item) => item.id}
            />
          </CardContent>
        </Card>

        <Dialog open={isNewCheckOpen} onOpenChange={setIsNewCheckOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New Rank Check</DialogTitle>
              <DialogDescription>
                Enter a domain to check keyword rankings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Domain</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="https://example.com"
                    className="pl-9"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter full URL (must start with http:// or https://)
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsNewCheckOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    if (validHttpUrl.test(newDomain)) {
                      window.open(`/analyze-rank?domain=${encodeURIComponent(newDomain)}`, '_blank');
                      setIsNewCheckOpen(false);
                      setNewDomain('');
                    }
                  }}
                  disabled={!validHttpUrl.test(newDomain)}
                >
                  Start Check
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Or go to{' '}
                <Link href="/analyze-rank" className="text-primary hover:underline">
                  full rank check page
                </Link>
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedCheck} onOpenChange={() => setSelectedCheck(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Rank Check Details</DialogTitle>
              <DialogDescription>
                {selectedCheck?.domain}
              </DialogDescription>
            </DialogHeader>
            {selectedCheck && selectedCheck.status === 'completed' && (
              <div className="space-y-4 pt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Keywords Checked</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCheck.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">Top 10</p>
                    <p className="text-xl font-bold text-emerald-600">{selectedCheck.top10Count}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">Not Ranking</p>
                    <p className="text-xl font-bold text-red-600">{selectedCheck.notRankingCount}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">Avg Position</p>
                    <p className="text-xl font-bold">
                      {selectedCheck.avgPosition !== null ? `#${selectedCheck.avgPosition.toFixed(1)}` : '—'}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={selectedCheck.status} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(selectedCheck.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Re-check
                  </Button>
                  <Button className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    Full Results
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
}