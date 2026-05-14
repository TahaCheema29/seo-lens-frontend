'use client';

import { useEffect, useState } from "react";
import { KeywordAnalyzer } from "@/components/dashboard/user/KeywordAnalyzer";
import { getKeywordResearch, getKeywordsStats } from "@/services/dashboard/queries";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Loader2 } from "lucide-react";

export default function KeywordAnalyzerPage() {
  const [data, setData] = useState<{ research: any[]; stats: any } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [researchRes, statsRes] = await Promise.all([
          getKeywordResearch(),
          getKeywordsStats(),
        ]);

        console.log("[KeywordAnalyzer] stats res:", statsRes);
        console.log("[KeywordAnalyzer] research res:", researchRes);

        const research = researchRes.status === "success" ? researchRes.data : [];
        const stats = statsRes.status === "success" ? statsRes.data : null;

        setData({ research, stats });
      } catch (error) {
        console.error("[KeywordAnalyzer] Error fetching data:", error);
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
      <KeywordAnalyzer research={data.research} stats={data.stats} />
    </AuthGuard>
  );
}
