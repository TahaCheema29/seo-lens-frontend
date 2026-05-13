import { KeywordAnalyzer } from "@/components/dashboard/user/KeywordAnalyzer";
import { getKeywordResearch, getKeywordsStats } from "@/services/dashboard/queries";
import { cookies } from "next/headers";

export default async function KeywordAnalyzerPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const [researchRes, statsRes] = await Promise.all([
    getKeywordResearch(cookieHeader),
    getKeywordsStats(cookieHeader),
  ]);
  console.log("stats res is ", statsRes)
  console.log("research res is ", researchRes)

  const research = researchRes.status === "success" ? researchRes.data : [];
  const stats = statsRes.status === "success" ? statsRes.data : null;

  return <KeywordAnalyzer research={research} stats={stats} />;
}
