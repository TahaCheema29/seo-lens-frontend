// Types for CI/CD Integration

export interface ApiKey {
  id: string;
  userId: string;
  name: string | null;
  isActive: boolean;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
}

export interface CreateApiKeyRequest {
  name?: string;
  expiresAt?: string;
}

export interface CreateApiKeyResponse {
  id: string;
  apiKey: string;
  name: string | null;
  message: string;
  userId: string;
  isActive: boolean;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
}

export interface DeploymentAnalysis {
  id: string;
  userId: string;
  prNumber: number | null;
  prTitle: string | null;
  branchName: string | null;
  commitSha: string | null;
  repositoryName: string | null;
  repositoryOwner: string | null;
  targetUrl: string;
  crawlMode: string;
  status: "pending" | "processing" | "completed" | "failed";
  score: number | null;
  jobId: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface DeploymentAnalysisListResponse {
  total: number;
  page: number;
  pageSize: number;
  items: DeploymentAnalysis[];
}
