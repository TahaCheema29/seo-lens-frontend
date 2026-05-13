import { createServerAxios } from "@/config/serverAxios";
import { ENDPOINTS } from "@/config/apiConfig";

export interface DashboardOverview {
  seoScore: number;
  seoScoreChange: number;
  keywordsTracked: number;
  keywordsChange: number;
  backlinks: number;
  backlinksChange: number;
  organicTraffic: number;
  trafficChange: number;
}

export interface SEOAnalysis {
  id: string;
  url: string;
  score: number;
  status: "completed" | "processing" | "failed";
  criticalIssues: number;
  warnings: number;
  crawlMode?: string;
  createdAt: string;
}

export interface KeywordResearch {
  id: string;
  primaryKeyword: string;
  status: "completed" | "processing" | "failed";
  relatedKeywordsCount: number;
  longTailKeywordsCount: number;
  searchResultsCount: number;
  createdAt: string;
}

export interface RankCheck {
  id: string;
  domain: string;
  keywords: string[];
  top10Count: number;
  notRankingCount: number;
  avgPosition: number | null;
  status: "completed" | "processing" | "failed";
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  status: "completed" | "processing" | "failed";
  createdAt: string;
}

export interface AnalysesStats {
  totalCount: number;
  completedCount: number;
  processingCount: number;
  failedCount: number;
  avgScore: number;
  totalCriticalIssues: number;
  totalWarnings: number;
}

export interface KeywordsStats {
  totalCount: number;
  completedCount: number;
  processingCount: number;
  failedCount: number;
  avgRelatedKeywords: number;
}

export interface RanksStats {
  totalCount: number;
  completedCount: number;
  processingCount: number;
  failedCount: number;
  totalKeywords: number;
  totalTop10: number;
}

interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

async function handleResponse<T>(promise: Promise<any>): Promise<ApiResponse<T>> {
  try {
    const response = await promise;
    // Backend returns { status, message, data: T }
    // We want to extract the nested data
    return {
      status: "success",
      data: response.data?.data || response.data,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: "error",
        message: error.response.data?.message || "An error occurred",
        data: error.response.data?.data || error.response.data as T,
      };
    }
    return {
      status: "error",
      message: error.message || "Network error",
      data: null as T,
    };
  }
}

export async function getDashboardOverview(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<DashboardOverview>(
    axios.get(ENDPOINTS.dashboard.overview)
  );
}

export async function getSEOAnalyses(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<SEOAnalysis[]>(
    axios.get(ENDPOINTS.dashboard.analyses)
  );
}

export async function getKeywordResearch(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<KeywordResearch[]>(
    axios.get(ENDPOINTS.dashboard.keywords)
  );
}

export async function getRankChecks(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<RankCheck[]>(
    axios.get(ENDPOINTS.dashboard.ranks)
  );
}

export async function getReports(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<Report[]>(
    axios.get(ENDPOINTS.dashboard.reports)
  );
}

export async function getAnalysesStats(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<AnalysesStats>(
    axios.get(ENDPOINTS.dashboard.analysesStats)
  );
}

export async function getKeywordsStats(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<KeywordsStats>(
    axios.get(ENDPOINTS.dashboard.keywordsStats)
  );
}

export async function getRanksStats(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<RanksStats>(
    axios.get(ENDPOINTS.dashboard.ranksStats)
  );
}
