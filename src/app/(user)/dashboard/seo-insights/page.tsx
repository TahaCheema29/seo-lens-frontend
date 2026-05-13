import { SEOInsights } from "@/components/dashboard/user/SEOInsights";
import { getSEOAnalyses, getAnalysesStats } from "@/services/dashboard/queries";
import { cookies } from "next/headers";

export default async function SEOInsightsPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const [analysesRes, statsRes] = await Promise.all([
    getSEOAnalyses(cookieHeader),
    getAnalysesStats(cookieHeader),
  ]); 
  console.log("analysis is ",analysesRes)
  console.log("stats res is ",statsRes)

  const analyses = analysesRes.status === "success" ? analysesRes.data : [];
  const stats = statsRes.status === "success" ? statsRes.data : null;

  return (
    <SEOInsights
      analyses={analyses}
      stats={stats}
    />
  );
}
