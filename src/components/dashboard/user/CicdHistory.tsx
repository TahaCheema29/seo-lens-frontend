"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Github, GitBranch, GitCommit, Calendar, Clock, Globe, BarChart3 } from "lucide-react";
import { DeploymentAnalysis } from "@/services/cicd/queries";
import { useGetDeploymentAnalyses } from "@/services/cicd/useCicdQueries";

export function CicdHistory() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<DeploymentAnalysis | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: analysesData, isLoading } = useGetDeploymentAnalyses(page, pageSize);
  const { items: analyses = [], total = 0 } = analysesData || { items: [], total: 0, page: 1, pageSize };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "processing":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Processing
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Pending
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreBadge = (score: number | null) => {
    if (score === null) return <span className="text-muted-foreground">-</span>;
    
    if (score >= 80) {
      return (
        <Badge className="bg-green-500 text-white">
          {score}/100
        </Badge>
      );
    } else if (score >= 60) {
      return (
        <Badge className="bg-yellow-500 text-white">
          {score}/100
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive">
          {score}/100
        </Badge>
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateUrl = (url: string, maxLength = 30) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  const handleRowClick = (analysis: DeploymentAnalysis) => {
    setSelectedAnalysis(analysis);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">CI/CD Analysis History</h2>
          <p className="text-muted-foreground">
            View all SEO analyses triggered by your deployments
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Total: <strong>{total}</strong> analyses
        </div>
      </div>

      {/* Analyses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Analyses</CardTitle>
          <CardDescription>
            Recent SEO analyses triggered by your CI/CD pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analyses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Analyses Yet</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                Set up CI/CD integration to start tracking SEO analyses automatically
              </p>
              <Button className="mt-4" asChild>
                <a href="/dashboard/cicd-setup">Set Up Integration</a>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Repository</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyses.map((analysis) => (
                  <TableRow
                    key={analysis.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(analysis)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span title={analysis.targetUrl}>
                          {truncateUrl(analysis.targetUrl)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {analysis.repositoryName ? (
                        <div className="flex items-center gap-2">
                          <Github className="h-4 w-4 text-muted-foreground" />
                          <span>{analysis.repositoryName}</span>
                          {analysis.branchName && (
                            <span className="text-muted-foreground text-xs">
                              ({analysis.branchName})
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(analysis.status)}</TableCell>
                    <TableCell>{getScoreBadge(analysis.score)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(analysis.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Analysis Details</DialogTitle>
            <DialogDescription>
              Complete information about this SEO analysis
            </DialogDescription>
          </DialogHeader>
          
          {selectedAnalysis && (
            <div className="space-y-6">
              {/* Score Display */}
              <div className="flex items-center justify-center py-6">
                <div className="text-center">
                  {selectedAnalysis.score !== null ? (
                    <>
                      <div className={`text-6xl font-bold ${
                        selectedAnalysis.score >= 80 ? "text-green-500" :
                        selectedAnalysis.score >= 60 ? "text-yellow-500" :
                        "text-red-500"
                      }`}>
                        {selectedAnalysis.score}
                      </div>
                      <p className="text-muted-foreground mt-2">SEO Score</p>
                    </>
                  ) : (
                    <div className="text-6xl font-bold text-muted-foreground">-</div>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedAnalysis.status)}
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Crawl Mode</p>
                  <p className="font-medium capitalize">{selectedAnalysis.crawlMode}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">URL Analyzed</p>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={selectedAnalysis.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-500 hover:underline truncate max-w-[200px]"
                    >
                      {selectedAnalysis.targetUrl}
                    </a>
                  </div>
                </div>

                {selectedAnalysis.repositoryName && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Repository</p>
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{selectedAnalysis.repositoryName}</span>
                    </div>
                  </div>
                )}

                {selectedAnalysis.branchName && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Branch</p>
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{selectedAnalysis.branchName}</span>
                    </div>
                  </div>
                )}

                {selectedAnalysis.commitSha && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Commit</p>
                    <div className="flex items-center gap-2">
                      <GitCommit className="h-4 w-4 text-muted-foreground" />
                      <code className="font-mono text-sm">
                        {selectedAnalysis.commitSha.substring(0, 7)}
                      </code>
                    </div>
                  </div>
                )}

                {selectedAnalysis.prNumber && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Pull Request</p>
                    <p className="font-medium">#{selectedAnalysis.prNumber}</p>
                    {selectedAnalysis.prTitle && (
                      <p className="text-sm text-muted-foreground truncate">
                        {selectedAnalysis.prTitle}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Created</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(selectedAnalysis.createdAt)}</span>
                  </div>
                </div>

                {selectedAnalysis.completedAt && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(selectedAnalysis.completedAt)}</span>
                    </div>
                  </div>
                )}

                {selectedAnalysis.jobId && (
                  <div className="space-y-1 col-span-2">
                    <p className="text-sm text-muted-foreground">Job ID</p>
                    <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {selectedAnalysis.jobId}
                    </code>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" asChild>
                  <a 
                    href={selectedAnalysis.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Site
                  </a>
                </Button>
                {selectedAnalysis.score !== null && (
                  <Button className="flex-1">
                    View Full Report
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
