"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import type { RankCheck, RanksStats } from "@/services/dashboard/queries";
import {
  Target,
  Plus,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Trash2,
  TrendingUp,
  Globe,
  Trophy,
} from "lucide-react";

interface RankTrackerProps {
  ranks: RankCheck[];
  stats: RanksStats | null;
}

export function RankTracker({ ranks, stats }: RankTrackerProps) {
  const router = useRouter();
  const [selectedCheck, setSelectedCheck] = useState<RankCheck | null>(null);

  const totalTop10 = stats?.totalTop10 ?? 0;
  const totalKeywords = stats?.totalKeywords ?? 0;
  const completedCount = stats?.completedCount ?? 0;
  const processingCount = stats?.processingCount ?? 0;

  const columns = [
    {
      key: "domain",
      header: "Domain",
      render: (item: RankCheck) => (
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
            <Globe className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium truncate max-w-[180px]">
              {item.domain?.replace("https://", "").replace("http://", "") || "N/A"}
            </p>
            <p className="text-xs text-muted-foreground">
              {item.keywords?.length ?? 0} keyword{(item.keywords?.length ?? 0) !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "keywords",
      header: "Keywords",
      render: (item: RankCheck) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {item.keywords?.slice(0, 2).map((keyword, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {keyword}
            </Badge>
          ))}
          {item.keywords && item.keywords.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{item.keywords.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "top10",
      header: "Top 10",
      width: "100px",
      render: (item: RankCheck) =>
        item.status === "completed" ? (
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-emerald-600">{item.top10Count ?? 0}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "avgPosition",
      header: "Avg Position",
      width: "100px",
      render: (item: RankCheck) =>
        item.status === "completed" && item.avgPosition !== null ? (
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="font-medium">#{item.avgPosition.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      width: "100px",
      render: (item: RankCheck) => <StatusBadge status={item.status} />,
    },
    {
      key: "date",
      header: "Date",
      width: "140px",
      render: (item: RankCheck) => (
        <span className="text-sm text-muted-foreground">
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (item: RankCheck) => (
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
            <DropdownMenuItem onClick={() => {
              const domain = item.domain;
              if (domain) {
                router.push(`/analyze-rank?domain=${encodeURIComponent(domain)}`);
              } else {
                router.push("/analyze-rank");
              }
            }}>
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rank Tracker</h1>
          <p className="text-muted-foreground">View your ranking check history and monitor keyword positions</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/analyze-rank")}>
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
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-violet-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-violet-600">{completedCount}</p>
              </div>
              <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
                <TrendingUp className="h-5 w-5 text-violet-600" />
              </div>
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
                <Globe className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Rank Check History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable data={ranks} columns={columns} keyExtractor={(item) => item.id} />
        </CardContent>
      </Card>

      <Dialog open={!!selectedCheck} onOpenChange={() => setSelectedCheck(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Rank Check Details</DialogTitle>
            <DialogDescription>{selectedCheck?.domain}</DialogDescription>
          </DialogHeader>
          {selectedCheck && selectedCheck.status === "completed" && (
            <div className="space-y-4 pt-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Keywords Checked</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCheck.keywords?.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm text-muted-foreground">Top 10</p>
                  <p className="text-xl font-bold text-emerald-600">{selectedCheck.top10Count ?? 0}</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm text-muted-foreground">Not Ranking</p>
                  <p className="text-xl font-bold text-red-600">{selectedCheck.notRankingCount ?? 0}</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm text-muted-foreground">Avg Position</p>
                  <p className="text-xl font-bold">
                    {selectedCheck.avgPosition !== null ? `#${selectedCheck.avgPosition.toFixed(1)}` : "—"}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <StatusBadge status={selectedCheck.status} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => {
                  if (selectedCheck?.domain) {
                    router.push(`/analyze-rank?domain=${encodeURIComponent(selectedCheck.domain)}`);
                  }
                }}>
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
    </div >
  );
}
