import { KeywordAnalyzer } from "@/components/dashboard/user/KeywordAnalyzer";
import { getKeywordResearch, getKeywordsStats } from "@/services/dashboard/queries";

export default async function KeywordAnalyzerPage() {
  const [researchRes, statsRes] = await Promise.all([
    getKeywordResearch(),
    getKeywordsStats(),
  ]);

  const research = researchRes.status === "success" ? researchRes.data : [];
  const stats = statsRes.status === "success" ? statsRes.data : null;

  return <KeywordAnalyzer research={research} stats={stats} />;
}
