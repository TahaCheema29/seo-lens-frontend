import { createServerAxios } from "@/config/serverAxios";
import { ENDPOINTS } from "@/config/apiConfig";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminOverview {
  totalUsers: number;
  activeUsers: number;
  totalAnalyses: number;
  totalKeywords: number;
  totalRankChecks: number;
}

export interface PlatformAnalytics {
  seoAnalyses: {
    total: number;
    completed: number;
    processing: number;
  };
  keywordResearch: {
    total: number;
    completed: number;
    processing: number;
  };
  rankChecks: {
    total: number;
    completed: number;
    processing: number;
  };
  userActivity: {
    dailyActiveUsers: number[];
    labels: string[];
  };
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
      message: response.data?.message,
      data: response.data?.data as T,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: "error",
        message: error.response.data?.message || "An error occurred",
        data: error.response.data.data as T,
      };
    }
    return {
      status: "error",
      message: error.message || "Network error",
      data: null as T,
    };
  }
}

export async function getAdminUsers(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<AdminUser[]>(
    axios.get(ENDPOINTS.admin.users)
  );
}

export async function getAdminOverview(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<AdminOverview>(
    axios.get(ENDPOINTS.admin.overview)
  );
}

export async function getAdminAnalytics(cookieHeader?: string) {
  const axios = createServerAxios(cookieHeader);
  return handleResponse<PlatformAnalytics>(
    axios.get(ENDPOINTS.admin.analytics)
  );
}
