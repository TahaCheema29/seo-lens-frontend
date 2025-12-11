import { axiosInstance, ENDPOINTS } from "@/config/apiConfig";
import { AnalyzeSiteSeoRequest, AnalyzeSiteSeoResponse } from "@/types/analyzeSiteSEO";
import { TFindKeywordRank, TAnalyzeKeywordRankResult } from "@/types/analyzeKeywordRank";
import { TSuggestKeywordRequest, TSuggestKeywordResult } from "@/types/suggestKeywords";
import { useMutation } from "@tanstack/react-query";

export const useAnalyzeSeoSite = () => {
    return useMutation({
        mutationFn: async ({
            userInput,
            crawlId
        }: {
            userInput: AnalyzeSiteSeoRequest
            crawlId?: string
        }) => {
            const params = crawlId ? { crawlId } : {}
            const response = await axiosInstance.post(ENDPOINTS.analyzeSeoSite.post, userInput, { params });
            const results: unknown = response.data.data;

            return results as AnalyzeSiteSeoResponse;
        },
    });
};

export const useAnalyzeKeywordRank = () => {
    return useMutation({
        mutationFn: async ({
            userInput,
        }: {
            userInput: TFindKeywordRank;
        }) => {
            const response = await axiosInstance.post(
                ENDPOINTS.analyzeKeywordRank.post,
                userInput
            );

            const result: TAnalyzeKeywordRankResult[] = response.data.data;
            return result;
        },
    });
};


export const useSuggestedKeywords = () => {
    return useMutation({
        mutationFn: async ({
            userInput,
        }: {
            userInput: TSuggestKeywordRequest;
        }) => {
            const response = await axiosInstance.post(
                ENDPOINTS.suggestKeywords.post,
                userInput
            );

            const result: TSuggestKeywordResult[] = response.data.data;
            return result;
        },
    });
};