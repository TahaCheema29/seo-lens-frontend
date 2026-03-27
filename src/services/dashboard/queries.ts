import { serverAxios } from "@/config/serverAxios";
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
    return {
      status: "success",
      data: response.data,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: "error",
        message: error.response.data?.message || "An error occurred",
        data: error.response.data as T,
      };
    }
    return {
      status: "error",
      message: error.message || "Network error",
      data: null as T,
    };
  }
}

export async function getDashboardOverview() {
  return handleResponse<DashboardOverview>(
    serverAxios.get(ENDPOINTS.dashboard.overview)
  );
}

export async function getSEOAnalyses() {
  return handleResponse<SEOAnalysis[]>(
    serverAxios.get(ENDPOINTS.dashboard.analyses)
  );
}

export async function getKeywordResearch() {
  return handleResponse<KeywordResearch[]>(
    serverAxios.get(ENDPOINTS.dashboard.keywords)
  );
}

export async function getRankChecks() {
  return handleResponse<RankCheck[]>(
    serverAxios.get(ENDPOINTS.dashboard.ranks)
  );
}

export async function getReports() {
  return handleResponse<Report[]>(
    serverAxios.get(ENDPOINTS.dashboard.reports)
  );
}

export async function getAnalysesStats() {
  return handleResponse<AnalysesStats>(
    serverAxios.get(ENDPOINTS.dashboard.analysesStats)
  );
}

export async function getKeywordsStats() {
  return handleResponse<KeywordsStats>(
    serverAxios.get(ENDPOINTS.dashboard.keywordsStats)
  );
}

export async function getRanksStats() {
  return handleResponse<RanksStats>(
    serverAxios.get(ENDPOINTS.dashboard.ranksStats)
  );
}
