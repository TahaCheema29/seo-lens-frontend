"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/dashboard/common/DataTable";
import { StatusBadge } from "@/components/dashboard/common/StatusBadge";
import type { SEOAnalysis, AnalysesStats } from "@/services/dashboard/queries";
import {
  Globe,
  Plus,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Trash2,
} from "lucide-react";

interface SEOInsightsProps {
  analyses: SEOAnalysis[];
  stats: AnalysesStats | null;
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
}

function getScoreBg(score: number) {
  if (score >= 80) return "bg-emerald-600";
  if (score >= 60) return "bg-amber-600";
  return "bg-red-600";
}

export function SEOInsights({ analyses, stats }: SEOInsightsProps) {
  const router = useRouter();
  const [selectedAnalysis, setSelectedAnalysis] = useState<SEOAnalysis | null>(null);

  const columns = [
    {
      key: "url",
      header: "URL",
      render: (item: SEOAnalysis) => (
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium truncate max-w-[200px]">
              {item.url?.replace("https://", "").replace("http://", "") || "N/A"}
            </p>
            <p className="text-xs text-muted-foreground">
              {(item as any).crawlMode === "FULL_CRAWL" ? "Full Crawl" : "Sitemap Only"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "score",
      header: "Score",
      width: "120px",
      render: (item: SEOAnalysis) =>
        item.status === "completed" ? (
          <div className="flex items-center gap-2">
            <div className={`text-lg font-bold ${getScoreColor(item.score)}`}>
              {item.score}
            </div>
            <Progress value={item.score} className="w-16 h-2" />
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "issues",
      header: "Issues",
      width: "140px",
      render: (item: SEOAnalysis) =>
        item.status === "completed" ? (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-red-600 border-red-200">
              {item.criticalIssues || 0} critical
            </Badge>
            <Badge variant="outline" className="text-amber-600 border-amber-200">
              {item.warnings || 0} warnings
            </Badge>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: SEOAnalysis) => <StatusBadge status={item.status} />,
    },
    {
      key: "date",
      header: "Date",
      width: "140px",
      render: (item: SEOAnalysis) => (
        <span className="text-sm text-muted-foreground">
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (item: SEOAnalysis) => (
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
            <DropdownMenuItem onClick={() => {
              const url = item.url;
              if (url) {
                router.push(`/analyze-site-seo?url=${encodeURIComponent(url)}`);
              } else {
                router.push("/analyze-site-seo");
              }
            }}>
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

  const avgScore = stats?.avgScore ?? 0;
  const totalCritical = stats?.totalCriticalIssues ?? 0;
  const totalWarnings = stats?.totalWarnings ?? 0;
  const completedCount = stats?.completedCount ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Insights</h1>
          <p className="text-muted-foreground">
            Monitor and analyze your website SEO performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/analyze-site-seo")}>
            <Plus className="mr-2 h-4 w-4" />
            New Analysis
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(avgScore)}`}>
                  {avgScore || "—"}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {completedCount || 0}
                </p>
              </div>
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                <Globe className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                <p className="text-2xl font-bold text-red-600">{totalCritical || 0}</p>
              </div>
              <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
                <Globe className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-amber-600">{totalWarnings || 0}</p>
              </div>
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                <Globe className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Analysis History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable data={analyses} columns={columns} keyExtractor={(item) => item.id} />
        </CardContent>
      </Card>

      <Dialog open={!!selectedAnalysis} onOpenChange={() => setSelectedAnalysis(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Analysis Details</DialogTitle>
            <DialogDescription>
              {selectedAnalysis?.url}
            </DialogDescription>
          </DialogHeader>
          {selectedAnalysis && selectedAnalysis.status === "completed" && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">SEO Score</span>
                  <span className={`text-2xl font-bold ${getScoreColor(selectedAnalysis.score)}`}>
                    {selectedAnalysis.score}
                  </span>
                </div>
                <Progress value={selectedAnalysis.score} className="h-3" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm text-muted-foreground">Critical Issues</p>
                  <p className="text-xl font-bold text-red-600">{selectedAnalysis.criticalIssues || 0}</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm text-muted-foreground">Warnings</p>
                  <p className="text-xl font-bold text-amber-600">{selectedAnalysis.warnings || 0}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <StatusBadge status={selectedAnalysis.status} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => {
                  if (selectedAnalysis?.url) {
                    router.push(`/analyze-site-seo?url=${encodeURIComponent(selectedAnalysis.url)}`);
                  }
                }}>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
