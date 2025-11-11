import { axiosInstance, ENDPOINTS } from "@/config/apiConfig";
import { TAnalyzeSiteSeoRequest, TAnalyzeSiteSeoResult } from "@/types/analyzeSiteSEO";
import { TFindKeywordRank, TAnalyzeKeywordRankResult } from "@/types/analyzeKeywordRank";
import { TSuggestKeywordRequest, TSuggestKeywordResult } from "@/types/suggestKeywords";
import { useMutation } from "@tanstack/react-query";

export const useAnalyzeSeoSite = () => {
    return useMutation({
        mutationFn: async ({ userInput }: { userInput: TAnalyzeSiteSeoRequest }) => {
            const response = await axiosInstance.post(ENDPOINTS.analyzeSeoSite.post, userInput);
            const rawResults: unknown = response.data.data;

            if (!Array.isArray(rawResults)) {
                throw new Error("Invalid response format — expected an array");
            }
            console.log("raw reesult is ", JSON.stringify(rawResults[0], null, 2))

            const results: TAnalyzeSiteSeoResult[] = rawResults
                .filter((item): item is Record<string, unknown> =>
                    typeof item === "object" && item !== null
                )
                .map((item) => ({
                    url: typeof item.url === "string" ? item.url : "",
                    title: typeof item.title === "string" ? item.title : "",
                    metaDescription:
                        typeof item.meta_description === "string" ? item.meta_description : undefined,
                    metaKeywords:
                        typeof item.meta_keywords === "string" ? item.meta_keywords : undefined,
                    h1: typeof item.h1 === "string" ? item.h1 : undefined,
                    h2: typeof item.h2 === "string" ? item.h2 : undefined,
                    h3: typeof item.h3 === "string" ? item.h3 : undefined,
                    altCheck: typeof item.alt_check === "string" ? item.alt_check : undefined,
                    canonical: typeof item.canonical === "string" ? item.canonical : undefined,
                    mobileResponsiveness:
                        typeof item.mobile_responsiveness === "string" ? item.mobile_responsiveness : undefined,
                    schemaValidation:
                        typeof item.schema_validation === "string" ? item.schema_validation : undefined,
                    lcp: typeof item.lcp === "string" ? item.lcp : undefined,
                    fid: typeof item.fid === "string" ? item.fid : undefined,
                    cls: typeof item.cls === "string" ? item.cls : undefined,
                }));

            console.log("reesult is ", JSON.stringify(results[0], null, 2))



            return results;
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