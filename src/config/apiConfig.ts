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
    }
};
console.log("api base url ", process.env.API_BASE_URL)
export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
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