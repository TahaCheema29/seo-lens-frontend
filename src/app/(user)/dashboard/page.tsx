import { UserDashboard } from "../../../components/dashboard/user/UserDashboard";
import { getSEOAnalyses, getKeywordResearch, getRankChecks } from "@/services/dashboard/queries";
import { cookies } from "next/headers";

export default async function UserDashboardPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const [analysesRes, keywordsRes, ranksRes] = await Promise.all([
    getSEOAnalyses(cookieHeader),
    getKeywordResearch(cookieHeader),
    getRankChecks(cookieHeader),
  ]);

  const analyses = analysesRes.status === "success" ? analysesRes.data : [];
  const keywords = keywordsRes.status === "success" ? keywordsRes.data : [];
  const ranks = ranksRes.status === "success" ? ranksRes.data : [];

  const recentSEOAnalyses = analyses.slice(0, 3);
  const recentKeywordResearch = keywords.slice(0, 3);
  const recentRankChecks = ranks.slice(0, 3);

  const avgSEOScore = analyses.filter((i: any) => i.status === "completed").length > 0
    ? Math.round(
        analyses
          .filter((i: any) => i.status === "completed")
          .reduce((sum: number, item: any) => sum + item.score, 0) /
        analyses.filter((i: any) => i.status === "completed").length
      )
    : 0;

  const totalKeywordsResearched = keywords
    .filter((i: any) => i.status === "completed")
    .reduce(
      (sum: number, item: any) =>
        sum + item.relatedKeywordsCount + item.longTailKeywordsCount,
      0,
    );

  const totalTop10rankings = ranks.reduce(
    (sum: number, item: any) => sum + item.top10Count,
    0,
  );

  const totalCompletedAnalyses = analyses.filter((i: any) => i.status === "completed").length;
  const totalCriticalIssues = analyses.reduce((sum: number, i: any) => sum + (i.criticalIssues || 0), 0);
  const totalWarnings = analyses.reduce((sum: number, i: any) => sum + (i.warnings || 0), 0);
  const totalProcessingAnalyses = analyses.filter((i: any) => i.status === "processing").length;

  const totalCompletedKeywords = keywords.filter((i: any) => i.status === "completed").length;
  const totalProcessingKeywords = keywords.filter((i: any) => i.status === "processing").length;
  const totalAvgRelated = keywords.filter((i: any) => i.status === "completed").length > 0
    ? Math.round(
        keywords
          .filter((i: any) => i.status === "completed")
          .reduce((sum: number, i: any) => sum + i.relatedKeywordsCount, 0) /
        keywords.filter((i: any) => i.status === "completed").length
      )
    : 0;

  const totalKeywords = ranks.reduce((sum: number, i: any) => sum + i.keywords.length, 0);
  const totalCompletedRanks = ranks.filter((i: any) => i.status === "completed").length;
  const totalProcessingRanks = ranks.filter((i: any) => i.status === "processing").length;

  return (
    <UserDashboard
      recentSEOAnalyses={recentSEOAnalyses}
      recentKeywordResearch={recentKeywordResearch}
      recentRankChecks={recentRankChecks}
      avgSEOScore={avgSEOScore}
      totalKeywordsResearched={totalKeywordsResearched}
      totalTop10rankings={totalTop10rankings}
      totalCompletedAnalyses={totalCompletedAnalyses}
      totalCriticalIssues={totalCriticalIssues}
      totalWarnings={totalWarnings}
      totalProcessingAnalyses={totalProcessingAnalyses}
      totalCompletedKeywords={totalCompletedKeywords}
      totalProcessingKeywords={totalProcessingKeywords}
      totalAvgRelated={totalAvgRelated}
      totalKeywords={totalKeywords}
      totalCompletedRanks={totalCompletedRanks}
      totalProcessingRanks={totalProcessingRanks}
    />
  );
}
