import { axiosInstance, ENDPOINTS } from "@/config/apiConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionKeys } from "@/services/subscription/subscriptionQueries";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    email: string;
    fullName: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

export interface AdminResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    isSuperAdmin: boolean;
    createdAt: string;
}

export interface AuthResponse {
    status: string;
    message: string;
    data: {
        accessToken: string;
        tokenType: string;
    };
}

export const useLoginUser = () => {
    return useMutation({
        mutationFn: async (userInput: LoginRequest) => {
            const response = await axiosInstance.post(ENDPOINTS.auth.login, userInput);
            return response.data as AuthResponse;
        },
    });
};

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: async (userInput: RegisterRequest) => {
            const response = await axiosInstance.post(ENDPOINTS.auth.register, {
                email: userInput.email,
                password: userInput.password,
                full_name: userInput.fullName,
            });
            return response.data as AuthResponse;
        },
    });
};

export const useLoginAdmin = () => {
    return useMutation({
        mutationFn: async (userInput: LoginRequest) => {
            const response = await axiosInstance.post(ENDPOINTS.adminAuth.login, userInput);
            return response.data as AuthResponse;
        },
    });
};

export const useRegisterAdmin = () => {
    return useMutation({
        mutationFn: async (userInput: RegisterRequest) => {
            const response = await axiosInstance.post(ENDPOINTS.adminAuth.register, {
                email: userInput.email,
                password: userInput.password,
                full_name: userInput.fullName,
            });
            return response.data as AuthResponse;
        },
    });
};

export const useLogoutUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(ENDPOINTS.auth.logout);
            return response.data;
        },
        onSuccess: () => {
            // Clear subscription and user cache on logout
            queryClient.removeQueries({ queryKey: subscriptionKeys.all });
            queryClient.removeQueries({ queryKey: ["currentUser"] });
        },
    });
};

export const useLogoutAdmin = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(ENDPOINTS.adminAuth.logout);
            return response.data;
        },
        onSuccess: () => {
            // Clear subscription and admin cache on logout
            queryClient.removeQueries({ queryKey: subscriptionKeys.all });
            queryClient.removeQueries({ queryKey: ["currentAdmin"] });
        },
    });
};