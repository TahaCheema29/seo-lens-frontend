'use client';

import { AuthGuard } from "@/components/auth/AuthGuard";
import { UserDashboard } from "@/components/dashboard/user/UserDashboard";
import { getSEOAnalyses, getKeywordResearch, getRankChecks } from "@/services/dashboard/queries";
import { useEffect, useState } from "react";

export default function UserDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [analysesRes, keywordsRes, ranksRes] = await Promise.all([
          getSEOAnalyses(),
          getKeywordResearch(),
          getRankChecks(),
        ]);

        const analyses = analysesRes.status === "success" ? analysesRes.data : [];
        const keywords = keywordsRes.status === "success" ? keywordsRes.data : [];
        const ranks = ranksRes.status === "success" ? ranksRes.data : [];

        setData({
          recentSEOAnalyses: analyses.slice(0, 3),
          recentKeywordResearch: keywords.slice(0, 3),
          recentRankChecks: ranks.slice(0, 3),
          avgSEOScore: analyses.filter((i: any) => i.status === "completed").length > 0
            ? Math.round(
                analyses
                  .filter((i: any) => i.status === "completed")
                  .reduce((sum: number, item: any) => sum + item.score, 0) /
                analyses.filter((i: any) => i.status === "completed").length
              )
            : 0,
          totalKeywordsResearched: keywords
            .filter((i: any) => i.status === "completed")
            .reduce((sum: number, item: any) => sum + item.relatedKeywordsCount + item.longTailKeywordsCount, 0),
          totalTop10rankings: ranks.reduce((sum: number, item: any) => sum + item.top10Count, 0),
          totalCompletedAnalyses: analyses.filter((i: any) => i.status === "completed").length,
          totalCriticalIssues: analyses.reduce((sum: number, i: any) => sum + (i.criticalIssues || 0), 0),
          totalWarnings: analyses.reduce((sum: number, i: any) => sum + (i.warnings || 0), 0),
          totalProcessingAnalyses: analyses.filter((i: any) => i.status === "processing").length,
          totalCompletedKeywords: keywords.filter((i: any) => i.status === "completed").length,
          totalProcessingKeywords: keywords.filter((i: any) => i.status === "processing").length,
          totalAvgRelated: keywords.filter((i: any) => i.status === "completed").length > 0
            ? Math.round(
                keywords
                  .filter((i: any) => i.status === "completed")
                  .reduce((sum: number, i: any) => sum + i.relatedKeywordsCount, 0) /
                keywords.filter((i: any) => i.status === "completed").length
              )
            : 0,
          totalKeywords: ranks.reduce((sum: number, i: any) => sum + i.keywords.length, 0),
          totalCompletedRanks: ranks.filter((i: any) => i.status === "completed").length,
          totalProcessingRanks: ranks.filter((i: any) => i.status === "processing").length,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading || !data) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600"></div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <UserDashboard {...data} />
    </AuthGuard>
  );
}
