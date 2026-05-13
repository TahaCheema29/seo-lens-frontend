import { axiosInstance } from "@/config/apiConfig";
import { ENDPOINTS } from "@/config/apiConfig";
import { useQuery } from "@tanstack/react-query";
import { ApiKey, DeploymentAnalysisListResponse } from "./queries";

// Query keys for caching
export const cicdQueryKeys = {
    apiKeys: ["api-keys"] as const,
    deploymentAnalyses: (page: number, pageSize: number) => 
        ["deployment-analyses", page, pageSize] as const,
};

// Fetch API Keys (client-side with React Query)
// Backend returns: [{ id, user_id, name, is_active, created_at, last_used_at, expires_at }, ...]
// Axios interceptor converts to camelCase automatically
export const useGetApiKeys = () => {
    return useQuery({
        queryKey: cicdQueryKeys.apiKeys,
        queryFn: async () => {
            const response = await axiosInstance.get(ENDPOINTS.cicd.apiKeys);
            // Response is the array directly after interceptor converts it
            return (response.data || []) as ApiKey[];
        },
    });
};

// Fetch Deployment Analyses (client-side with React Query)
export const useGetDeploymentAnalyses = (page = 1, pageSize = 10) => {
    const skip = (page - 1) * pageSize;
    
    return useQuery({
        queryKey: cicdQueryKeys.deploymentAnalyses(page, pageSize),
        queryFn: async () => {
            const response = await axiosInstance.get(ENDPOINTS.cicd.deploymentAnalyses, {
                params: { skip, limit: pageSize },
            });
            // Backend returns object with items array, not wrapped in data field
            // After interceptor: { items: [...], total, page, pageSize }
            const data = response.data;
            if (!data) {
                return { items: [], total: 0, page, pageSize } as DeploymentAnalysisListResponse;
            }
            
            return {
                items: data.items || [],
                total: data.total || 0,
                page: data.page || page,
                pageSize: data.pageSize || pageSize,
            } as DeploymentAnalysisListResponse;
        },
    });
};
