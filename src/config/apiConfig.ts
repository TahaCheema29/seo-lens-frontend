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
