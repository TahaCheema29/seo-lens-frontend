'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import { mockSEOAnalysisHistory } from '@/features/dashboard/mock-data';
import type { SEOAnalysisHistory } from '@/features/dashboard/types';
import {
  Search,
  Globe,
  Zap,
  Plus,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Trash2,
  ExternalLink,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

const validHttpUrl = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;

export default function SEOInsightsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAnalysis, setSelectedAnalysis] = useState<SEOAnalysisHistory | null>(null);
  const [isNewAnalysisOpen, setIsNewAnalysisOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [crawlMode, setCrawlMode] = useState<'SITEMAP_ONLY' | 'FULL_CRAWL'>('SITEMAP_ONLY');

  const filteredData = mockSEOAnalysisHistory.filter((item) => {
    const matchesSearch = item.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const avgScore = Math.round(
    mockSEOAnalysisHistory
      .filter((item) => item.status === 'completed')
      .reduce((sum, item) => sum + item.score, 0) /
      mockSEOAnalysisHistory.filter((item) => item.status === 'completed').length || 0
  );

  const totalCritical = mockSEOAnalysisHistory.reduce((sum, item) => sum + item.criticalIssues, 0);
  const totalWarnings = mockSEOAnalysisHistory.reduce((sum, item) => sum + item.warnings, 0);
  const completedCount = mockSEOAnalysisHistory.filter((item) => item.status === 'completed').length;

  const columns = [
    {
      key: 'url',
      header: 'URL',
      render: (item: SEOAnalysisHistory) => (
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium truncate max-w-[200px]">{item.url.replace('https://', '').replace('http://', '')}</p>
            <p className="text-xs text-muted-foreground">
              {item.crawlMode === 'FULL_CRAWL' ? 'Full Crawl' : 'Sitemap Only'}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'score',
      header: 'Score',
      width: '120px',
      render: (item: SEOAnalysisHistory) => (
        item.status === 'completed' ? (
          <div className="flex items-center gap-2">
            <div className={`text-lg font-bold ${
              item.score >= 80 ? 'text-emerald-600' :
              item.score >= 60 ? 'text-amber-600' : 'text-red-600'
            }`}>
              {item.score}
            </div>
            <Progress value={item.score} className="w-16 h-2" />
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: 'issues',
      header: 'Issues',
      width: '140px',
      render: (item: SEOAnalysisHistory) => (
        item.status === 'completed' ? (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-red-600 border-red-200">
              {item.criticalIssues} critical
            </Badge>
            <Badge variant="outline" className="text-amber-600 border-amber-200">
              {item.warnings} warnings
            </Badge>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )
      ),
    },
    {
      key: 'pages',
      header: 'Pages',
      width: '80px',
      render: (item: SEOAnalysisHistory) => (
        <span className="font-medium">{item.pageCount}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: (item: SEOAnalysisHistory) => (
        <StatusBadge status={item.status} size="sm" />
      ),
    },
    {
      key: 'date',
      header: 'Date',
      width: '140px',
      render: (item: SEOAnalysisHistory) => (
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
      render: (item: SEOAnalysisHistory) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedAnalysis(item)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="mr-2 h-4 w-4" />
              Re-analyze
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Work';
  };

  return (
    <DashboardShell role="user">
    <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SEO Insights</h1>
            <p className="text-muted-foreground">
              View your website analysis history and start new audits
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsNewAnalysisOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(avgScore)}`}>{avgScore}</p>
                </div>
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{getScoreLabel(avgScore)} overall</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                  <p className="text-2xl font-bold text-red-600">{totalCritical}</p>
                </div>
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Across all sites</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold text-amber-600">{totalWarnings}</p>
                </div>
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Needs attention</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {mockSEOAnalysisHistory.filter((i) => i.status === 'processing').length} processing
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Analysis History</CardTitle>
                <CardDescription>Your recent website analyses</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by URL..."
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

        <Dialog open={isNewAnalysisOpen} onOpenChange={setIsNewAnalysisOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New SEO Analysis</DialogTitle>
              <DialogDescription>
                Enter a website URL to analyze its SEO performance
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="https://example.com"
                    className="pl-9"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Crawl Mode</label>
                <Select value={crawlMode} onValueChange={(v) => setCrawlMode(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SITEMAP_ONLY">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>Sitemap Only (Fast)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="FULL_CRAWL">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Full Crawl (Comprehensive)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsNewAnalysisOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    if (validHttpUrl.test(newUrl)) {
                      window.open(`/analyze-site-seo?url=${encodeURIComponent(newUrl)}&mode=${crawlMode}`, '_blank');
                      setIsNewAnalysisOpen(false);
                      setNewUrl('');
                    }
                  }}
                  disabled={!validHttpUrl.test(newUrl)}
                >
                  Start Analysis
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Or go to{' '}
                <Link href="/analyze-site-seo" className="text-primary hover:underline">
                  full analysis page
                </Link>
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedAnalysis} onOpenChange={() => setSelectedAnalysis(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Analysis Details</DialogTitle>
              <DialogDescription>
                {selectedAnalysis?.url}
              </DialogDescription>
            </DialogHeader>
            {selectedAnalysis && selectedAnalysis.status === 'completed' && (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">SEO Score</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${getScoreColor(selectedAnalysis.score)}`}>
                        {selectedAnalysis.score}
                      </span>
                      <Progress value={selectedAnalysis.score} className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Pages Analyzed</p>
                    <p className="text-2xl font-bold">{selectedAnalysis.pageCount}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">Critical</p>
                    <p className="text-xl font-bold text-red-600">{selectedAnalysis.criticalIssues}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">Warnings</p>
                    <p className="text-xl font-bold text-amber-600">{selectedAnalysis.warnings}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-sm text-muted-foreground">Passed</p>
                    <p className="text-xl font-bold text-emerald-600">{selectedAnalysis.passedChecks}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Crawl Mode</p>
                  <p className="font-medium">
                    {selectedAnalysis.crawlMode === 'FULL_CRAWL' ? 'Full Crawl' : 'Sitemap Only'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(selectedAnalysis.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Re-analyze
                  </Button>
                  <Button className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    Full Report
                  </Button>
                </div>
              </div>
            )}
            {selectedAnalysis && selectedAnalysis.status === 'processing' && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg font-medium">Analysis in Progress</p>
                <p className="text-sm text-muted-foreground">This may take a few minutes</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
}