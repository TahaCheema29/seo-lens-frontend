'use client';

import { useEffect, useState } from "react";
import { SEOInsights } from "@/components/dashboard/user/SEOInsights";
import { getSEOAnalyses, getAnalysesStats } from "@/services/dashboard/queries";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Loader2 } from "lucide-react";

export default function SEOInsightsPage() {
  const [data, setData] = useState<{ analyses: any[]; stats: any } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [analysesRes, statsRes] = await Promise.all([
          getSEOAnalyses(),
          getAnalysesStats(),
        ]);

        console.log("[SEOInsights] analysis:", analysesRes);
        console.log("[SEOInsights] stats:", statsRes);

        const analyses = analysesRes.status === "success" ? analysesRes.data : [];
        const stats = statsRes.status === "success" ? statsRes.data : null;

        setData({ analyses, stats });
      } catch (error) {
        console.error("[SEOInsights] Error fetching data:", error);
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
          <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <SEOInsights analyses={data.analyses} stats={data.stats} />
    </AuthGuard>
  );
}
