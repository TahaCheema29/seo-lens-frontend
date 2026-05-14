'use client';

import { useEffect, useState } from "react";
import { RankTracker } from "@/components/dashboard/user/RankTracker";
import { getRankChecks, getRanksStats } from "@/services/dashboard/queries";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Loader2 } from "lucide-react";

export default function RankTrackerPage() {
  const [data, setData] = useState<{ ranks: any[]; stats: any } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ranksRes, statsRes] = await Promise.all([
          getRankChecks(),
          getRanksStats(),
        ]);

        console.log("[RankTracker] stats res:", statsRes);
        console.log("[RankTracker] rank res:", ranksRes);

        const ranks = ranksRes.status === "success" ? ranksRes.data : [];
        const stats = statsRes.status === "success" ? statsRes.data : null;

        setData({ ranks, stats });
      } catch (error) {
        console.error("[RankTracker] Error fetching data:", error);
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
      <RankTracker ranks={data.ranks} stats={data.stats} />
    </AuthGuard>
  );
}
