import { AdminAnalytics } from "@/components/dashboard/admin/AdminAnalytics";
import { getAdminOverview, getAdminAnalytics } from "@/services/dashboard/adminQueries";
import { cookies } from "next/headers";

export default async function AdminAnalyticsPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const [overviewResponse, analyticsResponse] = await Promise.all([
    getAdminOverview(cookieHeader),
    getAdminAnalytics(cookieHeader),
  ]);
  console.log("overview is ", JSON.stringify(overviewResponse, null))
  console.log("analytics resp is ", JSON.stringify(analyticsResponse, null))
  // Backend returns { status, message, data: {...} }
  const overview = overviewResponse.status === "success" ? overviewResponse.data : null;
  const analytics = analyticsResponse.status === "success" ? analyticsResponse.data : null;

  return <AdminAnalytics overview={overview} analytics={analytics} />;
}
