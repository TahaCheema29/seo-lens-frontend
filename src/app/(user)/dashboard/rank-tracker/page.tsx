import { RankTracker } from "@/components/dashboard/user/RankTracker";
import { getRankChecks, getRanksStats } from "@/services/dashboard/queries";
import { cookies } from "next/headers";

export default async function RankTrackerPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const [ranksRes, statsRes] = await Promise.all([
    getRankChecks(cookieHeader),
    getRanksStats(cookieHeader),
  ]);
  console.log("stats res is ",statsRes)
  console.log("rank res is ",ranksRes)

  const ranks = ranksRes.status === "success" ? ranksRes.data : [];
  const stats = statsRes.status === "success" ? statsRes.data : null;

  return <RankTracker ranks={ranks} stats={stats} />;
}
