"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import type { KeywordResearch, KeywordsStats } from "@/services/dashboard/queries";
import {
  Lightbulb,
  Plus,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface KeywordAnalyzerProps {
  research: KeywordResearch[];
  stats: KeywordsStats | null;
}

export function KeywordAnalyzer({ research, stats }: KeywordAnalyzerProps) {
  const [selectedResearch, setSelectedResearch] = useState<KeywordResearch | null>(null);
  const router = useRouter()

  const totalCount = stats?.totalCount ?? 0;
  const completedCount = stats?.completedCount ?? 0;
  const processingCount = stats?.processingCount ?? 0;
  const avgRelated = stats?.avgRelatedKeywords ?? 0;

  const columns = [
    {
      key: "keyword",
      header: "Primary Keyword",
      render: (item: KeywordResearch) => (
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-2">
            <Lightbulb className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="font-medium">{item.primaryKeyword || "N/A"}</p>
            <p className="text-xs text-muted-foreground">
              {(item.relatedKeywordsCount || 0) + (item.longTailKeywordsCount || 0)} keywords found
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "related",
      header: "Related",
      width: "100px",
      render: (item: KeywordResearch) =>
        item.status === "completed" ? (
          <div className="text-center">
            <p className="font-medium">{item.relatedKeywordsCount || 0}</p>
            <p className="text-xs text-muted-foreground">terms</p>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "longtail",
      header: "Long-tail",
      width: "100px",
      render: (item: KeywordResearch) =>
        item.status === "completed" ? (
          <div className="text-center">
            <p className="font-medium">{item.longTailKeywordsCount || 0}</p>
            <p className="text-xs text-muted-foreground">terms</p>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: KeywordResearch) => <StatusBadge status={item.status} />,
    },
    {
      key: "date",
      header: "Date",
      width: "140px",
      render: (item: KeywordResearch) => (
        <span className="text-sm text-muted-foreground">
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (item: KeywordResearch) => (
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
            <DropdownMenuItem onClick={() => {
                const keyword = item.primaryKeyword;
                if (keyword) {
                    router.push(`/suggest-keywords?keyword=${encodeURIComponent(keyword)}`);
                } else {
                    router.push("/suggest-keywords");
                }
            }}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Re-search
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keyword Analyzer</h1>
          <p className="text-muted-foreground">Research and track keywords for better SEO</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/suggest-keywords")}>
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
                <p className="text-sm font-medium text-muted-foreground">Total Research</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
              <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                <Lightbulb className="h-5 w-5 text-violet-600" />
              </div>
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
                <Lightbulb className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-amber-600">{processingCount}</p>
              </div>
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Related</p>
                <p className="text-2xl font-bold text-blue-600">{avgRelated}</p>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <Lightbulb className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Keyword Research History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable data={research} columns={columns} keyExtractor={(item) => item.id} />
        </CardContent>
      </Card>

      <Dialog open={!!selectedResearch} onOpenChange={() => setSelectedResearch(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Research Details</DialogTitle>
            <DialogDescription>{selectedResearch?.primaryKeyword}</DialogDescription>
          </DialogHeader>
          {selectedResearch && selectedResearch.status === "completed" && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm text-muted-foreground">Related Keywords</p>
                  <p className="text-xl font-bold text-violet-600">
                    {selectedResearch.relatedKeywordsCount || 0}
                  </p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm text-muted-foreground">Long-tail Keywords</p>
                  <p className="text-xl font-bold text-blue-600">
                    {selectedResearch.longTailKeywordsCount || 0}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <StatusBadge status={selectedResearch.status} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Re-research
                </Button>
                <Button className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
