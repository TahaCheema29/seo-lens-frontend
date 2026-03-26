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
import { mockKeywordResearchHistory } from '@/features/dashboard/mock-data';
import type { KeywordResearchHistory } from '@/features/dashboard/types';
import {
  Search,
  Lightbulb,
  Plus,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Trash2,
  ExternalLink,
  Download,
  TrendingUp,
  Target,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function KeywordAnalyzerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedResearch, setSelectedResearch] = useState<KeywordResearchHistory | null>(null);
  const [isNewResearchOpen, setIsNewResearchOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  const filteredData = mockKeywordResearchHistory.filter((item) => {
    const matchesSearch = item.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalKeywords = mockKeywordResearchHistory.filter((i) => i.status === 'completed')
    .reduce((sum, item) => sum + item.relatedKeywordsCount + item.longTailKeywordsCount, 0);
  const completedCount = mockKeywordResearchHistory.filter((item) => item.status === 'completed').length;
  const processingCount = mockKeywordResearchHistory.filter((item) => item.status === 'processing').length;

  const columns = [
    {
      key: 'keyword',
      header: 'Primary Keyword',
      render: (item: KeywordResearchHistory) => (
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-2">
            <Lightbulb className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="font-medium">{item.primaryKeyword}</p>
            <p className="text-xs text-muted-foreground">
              {item.relatedKeywordsCount + item.longTailKeywordsCount} keywords found
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'related',
      header: 'Related',
      width: '100px',
      render: (item: KeywordResearchHistory) => (
        item.status === 'completed' ? (
          <div className="text-center">
            <p className="font-medium">{item.relatedKeywordsCount}</p>
            <p className="text-xs text-muted-foreground">terms</p>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: 'longtail',
      header: 'Long-tail',
      width: '100px',
      render: (item: KeywordResearchHistory) => (
        item.status === 'completed' ? (
          <div className="text-center">
            <p className="font-medium">{item.longTailKeywordsCount}</p>
            <p className="text-xs text-muted-foreground">keywords</p>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: 'results',
      header: 'Search Results',
      width: '110px',
      render: (item: KeywordResearchHistory) => (
        item.status === 'completed' ? (
          <Badge variant="outline">{item.searchResultsCount} results</Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: (item: KeywordResearchHistory) => (
        <StatusBadge status={item.status} size="sm" />
      ),
    },
    {
      key: 'date',
      header: 'Date',
      width: '140px',
      render: (item: KeywordResearchHistory) => (
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
      render: (item: KeywordResearchHistory) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedResearch(item)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="mr-2 h-4 w-4" />
              Re-search
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
            <h1 className="text-3xl font-bold tracking-tight">Keyword Analyzer</h1>
            <p className="text-muted-foreground">
              View your keyword research history and discover new opportunities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsNewResearchOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Research
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-violet-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Keywords</p>
                  <p className="text-2xl font-bold">{totalKeywords.toLocaleString()}</p>
                </div>
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                  <Lightbulb className="h-5 w-5 text-violet-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Discovered keywords</p>
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
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Research sessions</p>
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
                  <Sparkles className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">In progress</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Related</p>
                  <p className="text-2xl font-bold">
                    {Math.round(mockKeywordResearchHistory
                      .filter((i) => i.status === 'completed')
                      .reduce((sum, item) => sum + item.relatedKeywordsCount, 0) / completedCount) || 0}
                  </p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Per research</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Research History</CardTitle>
                <CardDescription>Your keyword research sessions</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search keywords..."
                    className="pl-9 w-[200px]"
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

        <Dialog open={isNewResearchOpen} onOpenChange={setIsNewResearchOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New Keyword Research</DialogTitle>
              <DialogDescription>
                Enter a keyword to discover related terms and content opportunities
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Keyword</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="e.g., seo optimization tools"
                    className="pl-9"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsNewResearchOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    if (newKeyword.trim()) {
                      window.open(`/suggest-keywords?keyword=${encodeURIComponent(newKeyword)}`, '_blank');
                      setIsNewResearchOpen(false);
                      setNewKeyword('');
                    }
                  }}
                  disabled={!newKeyword.trim()}
                >
                  Start Research
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Or go to{' '}
                <Link href="/suggest-keywords" className="text-primary hover:underline">
                  full research page
                </Link>
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedResearch} onOpenChange={() => setSelectedResearch(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Research Details</DialogTitle>
              <DialogDescription>
                Keyword: {selectedResearch?.primaryKeyword}
              </DialogDescription>
            </DialogHeader>
            {selectedResearch && selectedResearch.status === 'completed' && (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">Related</p>
                    <p className="text-xl font-bold text-violet-600">{selectedResearch.relatedKeywordsCount}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">Long-tail</p>
                    <p className="text-xl font-bold text-blue-600">{selectedResearch.longTailKeywordsCount}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">Results</p>
                    <p className="text-xl font-bold text-emerald-600">{selectedResearch.searchResultsCount}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={selectedResearch.status} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(selectedResearch.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Re-search
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