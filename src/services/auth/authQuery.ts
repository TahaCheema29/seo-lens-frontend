import { axiosInstance, ENDPOINTS } from "@/config/apiConfig";
import { useQuery } from "@tanstack/react-query";

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

export interface Admin {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    isSuperAdmin: boolean;
    createdAt: string;
}

interface UserResponse {
    status: string;
    message: string;
    data: User;
}

interface AdminResponse {
    status: string;
    message: string;
    data: Admin;
}

export const useCurrentUser = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const response = await axiosInstance.get(ENDPOINTS.auth.me);
            return (response.data as UserResponse).data;
        },
        enabled,
        retry: false,
    });
};

export const useCurrentAdmin = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ["currentAdmin"],
        queryFn: async () => {
            const response = await axiosInstance.get(ENDPOINTS.adminAuth.me);
            return (response.data as AdminResponse).data;
        },
        enabled,
        retry: false,
    });
};

// Helper function to get initials from full name
export const getInitials = (fullName: string): string => {
    if (!fullName) return "U";
    return fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};
