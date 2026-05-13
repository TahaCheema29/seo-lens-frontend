import axios from "axios";
import { toCamel } from "@/utils/caseConverters";

export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Create axios instance with cookies for server-side requests
export function createServerAxios(cookieHeader?: string) {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    withCredentials: true,
  });

  // Add response interceptor to convert snake_case to camelCase
  instance.interceptors.response.use((response) => {
    if (response.data) {
      response.data = toCamel(response.data);
    }
    return response;
  });

  return instance;
}
