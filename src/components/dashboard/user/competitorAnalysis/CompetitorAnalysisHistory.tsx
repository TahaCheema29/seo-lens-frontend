'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dashboard/common/DataTable';
import { FilterBar } from '@/components/dashboard/common/FilterBar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Clock
} from 'lucide-react';
import type { CompetitorAnalysisSummary } from '@/features/dashboard/types/competitorAnalysis';

interface CompetitorAnalysisHistoryProps {
  analyses: CompetitorAnalysisSummary[];
  isLoading: boolean;
  onView?: (analysis: CompetitorAnalysisSummary) => void;
  onDelete: (analysis: CompetitorAnalysisSummary) => void;
  onExport?: (analysis: CompetitorAnalysisSummary) => void;
}

export function CompetitorAnalysisHistory({ 
  analyses, 
  isLoading,
  onView,
  onDelete,
  onExport
}: CompetitorAnalysisHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnalyses = analyses.filter((item) =>
    item.userUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.competitorUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">
          <Clock className="mr-1 h-3 w-3 animate-spin" />
          Processing
        </Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getModeBadge = (mode: string) => {
    switch (mode) {
      case 'QUICK':
        return <Badge variant="outline" className="text-xs">Quick</Badge>;
      case 'SITEMAP_ONLY':
        return <Badge variant="outline" className="text-xs">Sitemap</Badge>;
      case 'FULL_CRAWL':
        return <Badge variant="outline" className="text-xs">Full</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{mode}</Badge>;
    }
  };

  const getWinnerIndicator = (winner?: string) => {
    switch (winner) {
      case 'user':
        return (
          <div className="flex items-center gap-1 text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">You Won</span>
          </div>
        );
      case 'competitor':
        return (
          <div className="flex items-center gap-1 text-red-600">
            <TrendingDown className="h-4 w-4" />
            <span className="font-medium">Behind</span>
          </div>
        );
      case 'tie':
        return (
          <div className="flex items-center gap-1 text-amber-600">
            <Minus className="h-4 w-4" />
            <span className="font-medium">Tied</span>
          </div>
        );
      default:
        return <span className="text-muted-foreground">-</span>;
    }
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  };

  const columns = [
    {
      key: 'urls',
      header: 'Comparison',
      render: (item: CompetitorAnalysisSummary) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate max-w-[150px]">
              {getDomain(item.userUrl)}
            </span>
            <span className="text-muted-foreground">vs</span>
            <span className="font-medium truncate max-w-[150px]">
              {getDomain(item.competitorUrl)}
            </span>
          </div>
          <div className="mt-1">{getModeBadge(item.mode)}</div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '120px',
      render: (item: CompetitorAnalysisSummary) => getStatusBadge(item.status),
    },
    {
      key: 'score',
      header: 'Score Comparison',
      width: '180px',
      render: (item: CompetitorAnalysisSummary) => (
        item.status === 'completed' && item.userScore !== undefined ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className={`font-bold ${
                item.userScore > (item.competitorScore || 0) ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {item.userScore}
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="font-bold">{item.competitorScore}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              ({Math.abs(item.userScore - (item.competitorScore || 0))} pts)
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      ),
    },
    {
      key: 'winner',
      header: 'Result',
      width: '120px',
      render: (item: CompetitorAnalysisSummary) => getWinnerIndicator(item.winner),
    },
    {
      key: 'createdAt',
      header: 'Date',
      width: '150px',
      render: (item: CompetitorAnalysisSummary) => (
        <span className="text-sm text-muted-foreground">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '60px',
      render: (item: CompetitorAnalysisSummary) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => onDelete(item)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              Analysis History
            </CardTitle>
          </div>
          <FilterBar
            searchPlaceholder="Search by URL..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={filteredAnalyses}
          columns={columns}
          keyExtractor={(item) => item.analysisId}
          isLoading={isLoading}
          emptyMessage={
            searchQuery 
              ? "No analyses found matching your search." 
              : "No competitor analyses yet. Start your first analysis!"
          }
        />
      </CardContent>
    </Card>
  );
}
