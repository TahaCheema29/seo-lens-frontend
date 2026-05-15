import { toCamel, toSnake } from "@/utils/caseConverters";
import axios from "axios";

export const ENDPOINTS = {
    analyzeSeoSite: {
        post: "/seo-tools/analyze-site-seo"
    },
    analyzeKeywordRank: {
        post: "/seo-tools/analyze-rank"
    },
    suggestKeywords: {
        post: "/seo-tools/suggest-keywords"
    },
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        logout: "/auth/logout",
        me: "/auth/me",
    },
    adminAuth: {
        login: "/admin/auth/login",
        register: "/admin/auth/register",
        logout: "/admin/auth/logout",
        me: "/admin/auth/me",
    },
    dashboard: {
        overview: "/dashboard/overview",
        analyses: "/dashboard/analyses",
        analysesStats: "/dashboard/analyses/stats",
        keywords: "/dashboard/keywords",
        keywordsStats: "/dashboard/keywords/stats",
        ranks: "/dashboard/ranks",
        ranksStats: "/dashboard/ranks/stats",
        reports: "/dashboard/reports",
    },
    cicd: {
        apiKeys: "/api/v1/api-keys",
        deploymentAnalyses: "/api/v1/deployment-analyses",
    },
    admin: {
        overview: "/admin/overview",
        analytics: "/admin/analytics",
        users: "/admin/users",
    },
    competitorAnalysis: {
        analyze: "/competitor-analysis/analyze",
        history: "/competitor-analysis/history",
        getById: (id: string) => `/competitor-analysis/${id}`,
        delete: (id: string) => `/competitor-analysis/${id}`,
        export: (id: string, format: string) => `/competitor-analysis/${id}/export?format=${format}`,
    },
    payments: {
        subscription: "/payments/subscription",
        checkout: "/payments/subscription/checkout",
    },
};

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    // Add auth token from localStorage for cross-domain support
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token') || localStorage.getItem('admin_access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    
    if (config.data) {
        config.data = toSnake(config.data);
    }
    if (config.params) {
        config.params = toSnake(config.params);
    }
    return config;
}); axiosInstance.interceptors.response.use((response) => {
    if (response.data) {
        response.data = toCamel(response.data);
    }
    return response;
});