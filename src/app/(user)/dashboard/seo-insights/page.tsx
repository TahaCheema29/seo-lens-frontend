import { SEOInsights } from "@/components/dashboard/user/SEOInsights";
import { getSEOAnalyses, getAnalysesStats } from "@/services/dashboard/queries";

export default async function SEOInsightsPage() {
  const [analysesRes, statsRes] = await Promise.all([
    getSEOAnalyses(),
    getAnalysesStats(),
  ]);

  const analyses = analysesRes.status === "success" ? analysesRes.data : [];
  const stats = statsRes.status === "success" ? statsRes.data : null;

  return (
    <SEOInsights
      analyses={analyses}
      stats={stats}
    />
  );
}
