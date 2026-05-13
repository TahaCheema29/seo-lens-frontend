import { axiosInstance, ENDPOINTS } from "@/config/apiConfig";
import { useMutation } from "@tanstack/react-query";

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
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(ENDPOINTS.auth.logout);
            return response.data;
        },
    });
};

export const useLogoutAdmin = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(ENDPOINTS.adminAuth.logout);
            return response.data;
        },
    });
};