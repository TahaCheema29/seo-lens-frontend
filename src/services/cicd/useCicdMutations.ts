import { axiosInstance } from "@/config/apiConfig";
import { ENDPOINTS } from "@/config/apiConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateApiKeyRequest, CreateApiKeyResponse } from "./queries";
import { toast } from "sonner";

// Create API Key
export const useCreateApiKey = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateApiKeyRequest) => {
            const response = await axiosInstance.post(ENDPOINTS.cicd.apiKeys, data);
            console.log('Full axios response:', response);
            // Axios returns { data: {...} } 
            // The interceptor converts snake_case to camelCase in response.data
            const result = response.data;
            console.log('Response data (after interceptor):', result);
            return result as CreateApiKeyResponse;
        },
        onSuccess: () => {
            toast.success("API key created successfully");
            // Invalidate and refetch API keys list
            queryClient.invalidateQueries({ queryKey: ["api-keys"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to create API key");
        },
    });
};

// Revoke API Key
export const useRevokeApiKey = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (keyId: string) => {
            await axiosInstance.delete(`${ENDPOINTS.cicd.apiKeys}/${keyId}`);
        },
        onSuccess: () => {
            toast.success("API key revoked successfully");
            // Invalidate and refetch API keys list
            queryClient.invalidateQueries({ queryKey: ["api-keys"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to revoke API key");
        },
    });
};