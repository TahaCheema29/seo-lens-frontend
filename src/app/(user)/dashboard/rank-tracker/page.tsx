import { RankTracker } from "@/components/dashboard/user/RankTracker";
import { getRankChecks, getRanksStats } from "@/services/dashboard/queries";

export default async function RankTrackerPage() {
  const [ranksRes, statsRes] = await Promise.all([
    getRankChecks(),
    getRanksStats(),
  ]);

  const ranks = ranksRes.status === "success" ? ranksRes.data : [];
  const stats = statsRes.status === "success" ? statsRes.data : null;

  return <RankTracker ranks={ranks} stats={stats} />;
}
