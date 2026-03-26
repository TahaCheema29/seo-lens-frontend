'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FilterBar } from '@/components/dashboard/common/FilterBar';
import { DataTable } from '@/components/dashboard/common/DataTable';
import { ColorfulBarChart } from '@/components/dashboard/common/ColorfulCharts';
import { mockCompetitors } from '@/features/dashboard/mock-data';
import type { CompetitorData } from '@/features/dashboard/types';
import {
  Plus,
  Download,
  Users,
  TrendingUp,
  ExternalLink,
  BarChart3,
  Target,
  Crown,
  Link2,
  Search,
} from 'lucide-react';

// Chart data
const daDistributionData = [
  { label: '40-50', value: 3, color: '#10b981' },
  { label: '50-60', value: 5, color: '#3b82f6' },
  { label: '60-70', value: 4, color: '#f59e0b' },
  { label: '70+', value: 2, color: '#8b5cf6' },
];

const overlapData = [
  { label: 'High', value: 3, color: '#ef4444' },
  { label: 'Med', value: 6, color: '#f59e0b' },
  { label: 'Low', value: 5, color: '#10b981' },
];

export default function CompetitorsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompetitors = mockCompetitors.filter((item) =>
    item.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const avgDA = Math.round(
    mockCompetitors.reduce((sum, c) => sum + c.domainAuthority, 0) / mockCompetitors.length
  );
  const totalBacklinks = mockCompetitors.reduce((sum, c) => sum + c.backlinks, 0);

  const columns = [
    {
      key: 'domain',
      header: 'Domain',
      render: (item: CompetitorData) => (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {item.domain.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium">{item.domain}</p>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
              <a href={`https://${item.domain}`} target="_blank" rel="noopener noreferrer">
                Visit site
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: 'domainAuthority',
      header: 'Domain Authority',
      width: '130px',
      render: (item: CompetitorData) => (
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-12 rounded-full ${
              item.domainAuthority >= 70
                ? 'bg-violet-200'
                : item.domainAuthority >= 50
                ? 'bg-emerald-200'
                : 'bg-amber-200'
            }`}
          >
            <div
              className={`h-2 rounded-full ${
                item.domainAuthority >= 70
                  ? 'bg-violet-500'
                  : item.domainAuthority >= 50
                  ? 'bg-emerald-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${item.domainAuthority}%` }}
            />
          </div>
          <span className="font-medium">{item.domainAuthority}</span>
        </div>
      ),
    },
    {
      key: 'backlinks',
      header: 'Backlinks',
      width: '110px',
      render: (item: CompetitorData) => (
        <span>{(item.backlinks / 1000).toFixed(1)}K</span>
      ),
    },
    {
      key: 'organicKeywords',
      header: 'Keywords',
      width: '100px',
      render: (item: CompetitorData) => (
        <span>{(item.organicKeywords / 1000).toFixed(1)}K</span>
      ),
    },
    {
      key: 'organicTraffic',
      header: 'Traffic',
      width: '100px',
      render: (item: CompetitorData) => (
        <span>{(item.organicTraffic / 1000).toFixed(0)}K</span>
      ),
    },
    {
      key: 'overlapScore',
      header: 'Overlap',
      width: '100px',
      render: (item: CompetitorData) => (
        <Badge
          variant="outline"
          className={`${
            item.overlapScore >= 75
              ? 'bg-red-50 text-red-700 border-red-200'
              : item.overlapScore >= 50
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
        >
          {item.overlapScore}%
        </Badge>
      ),
    },
  ];

  return (
    <DashboardShell role="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Competitors</h1>
            <p className="text-muted-foreground">
              Analyze your competitors and discover opportunities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Analysis
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Competitor
            </Button>
          </div>
        </div>

        {/* Stats Overview with Colorful Accents */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Competitors</p>
                  <p className="text-2xl font-bold">{mockCompetitors.length}</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+2 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. DA</p>
                  <p className="text-2xl font-bold">{avgDA}</p>
                </div>
                <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                  <BarChart3 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+3 vs yours</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Backlinks</p>
                  <p className="text-2xl font-bold">{(totalBacklinks / 1000).toFixed(0)}K</p>
                </div>
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                  <Link2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Overlap</p>
                  <p className="text-2xl font-bold">
                    {mockCompetitors.filter((c) => c.overlapScore >= 75).length}
                  </p>
                </div>
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
                  <Target className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-amber-600">
                <TrendingUp className="h-4 w-4" />
                <span>Direct competitors</span>
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
                Domain Authority Distribution
              </CardTitle>
              <CardDescription>Competitors by DA score range</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={daDistributionData} height={200} showValues={true} />
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <div className="text-emerald-600 font-bold">3</div>
                  <div className="text-muted-foreground">DA 40-50</div>
                </div>
                <div>
                  <div className="text-blue-600 font-bold">5</div>
                  <div className="text-muted-foreground">DA 50-60</div>
                </div>
                <div>
                  <div className="text-amber-600 font-bold">4</div>
                  <div className="text-muted-foreground">DA 60-70</div>
                </div>
                <div>
                  <div className="text-violet-600 font-bold">2</div>
                  <div className="text-muted-foreground">DA 70+</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                Keyword Overlap
              </CardTitle>
              <CardDescription>Competitors by keyword overlap</CardDescription>
            </CardHeader>
            <CardContent>
              <ColorfulBarChart data={overlapData} height={200} showValues={true} />
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    High Overlap (75%+)
                  </span>
                  <span className="font-medium">3 competitors</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    Medium Overlap (50-75%)
                  </span>
                  <span className="font-medium">6 competitors</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Low Overlap (&lt;50%)
                  </span>
                  <span className="font-medium">5 competitors</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competitors Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  Competitor Analysis
                </CardTitle>
                <CardDescription>Compare metrics with your competitors</CardDescription>
              </div>
              <FilterBar
                searchPlaceholder="Search competitors..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredCompetitors}
              columns={columns}
              keyExtractor={(item) => item.id}
            />
          </CardContent>
        </Card>

        {/* Comparison Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                Top by Authority
              </CardTitle>
              <CardDescription>Competitors with highest DA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...mockCompetitors]
                .sort((a, b) => b.domainAuthority - a.domainAuthority)
                .slice(0, 3)
                .map((competitor, index) => {
                  const colors = [
                    { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700', border: 'border-yellow-300' },
                    { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700', border: 'border-gray-300' },
                    { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700', border: 'border-amber-300' },
                  ];
                  const color = colors[index];
                  return (
                    <div
                      key={competitor.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full ${color.bg} ${color.text} text-xs font-bold border ${color.border}`}>
                          {index + 1}
                        </span>
                        <span className="font-medium">{competitor.domain}</span>
                      </div>
                      <span className="font-bold text-violet-600">{competitor.domainAuthority}</span>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                Most Backlinks
              </CardTitle>
              <CardDescription>Competitors with strongest link profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...mockCompetitors]
                .sort((a, b) => b.backlinks - a.backlinks)
                .slice(0, 3)
                .map((competitor, index) => {
                  const colors = [
                    { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600' },
                    { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600' },
                    { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-600' },
                  ];
                  const color = colors[index];
                  return (
                    <div
                      key={competitor.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full ${color.bg} p-1.5`}>
                          <Link2 className={`h-3 w-3 ${color.text}`} />
                        </div>
                        <span className="font-medium">{competitor.domain}</span>
                      </div>
                      <span className="font-bold">{(competitor.backlinks / 1000).toFixed(1)}K</span>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                Keyword Overlap
              </CardTitle>
              <CardDescription>Competitors targeting same keywords</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...mockCompetitors]
                .sort((a, b) => b.overlapScore - a.overlapScore)
                .slice(0, 3)
                .map((competitor, index) => (
                  <div
                    key={competitor.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full p-1.5 ${
                        index === 0 
                          ? 'bg-red-100 dark:bg-red-900/30' 
                          : index === 1 
                          ? 'bg-amber-100 dark:bg-amber-900/30' 
                          : 'bg-yellow-100 dark:bg-yellow-900/30'
                      }`}>
                        <Target className={`h-3 w-3 ${
                          index === 0 
                            ? 'text-red-600' 
                            : index === 1 
                            ? 'text-amber-600' 
                            : 'text-yellow-600'
                        }`} />
                      </div>
                      <span className="font-medium">{competitor.domain}</span>
                    </div>
                    <Badge
                      variant={competitor.overlapScore >= 75 ? 'destructive' : 'secondary'}
                    >
                      {competitor.overlapScore}%
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
