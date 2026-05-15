import { axiosInstance } from '@/config/apiConfig';
import { ENDPOINTS } from '@/config/apiConfig';
import type { 
  CompetitorAnalysisRequest, 
  CompetitorAnalysisResponse,
  CompetitorAnalysisSummary,
  CompetitorAnalysisList
} from '@/features/dashboard/types/competitorAnalysis';

export async function analyzeCompetitors(
  data: CompetitorAnalysisRequest
): Promise<CompetitorAnalysisResponse> {
  const response = await axiosInstance.post(
    ENDPOINTS.competitorAnalysis.analyze,
    data
  );
  return response.data.data;
}

export async function getCompetitorAnalysisHistory(
  page?: number,
  limit?: number
): Promise<CompetitorAnalysisList> {
  const response = await axiosInstance.get(
    ENDPOINTS.competitorAnalysis.history,
    { params: { skip: ((page || 1) - 1) * (limit || 20), limit: limit || 20 } }
  );
  return response.data.data;
}

export async function getCompetitorAnalysisById(
  id: string
): Promise<CompetitorAnalysisResponse> {
  const response = await axiosInstance.get(
    ENDPOINTS.competitorAnalysis.getById(id)
  );
  // Handle different response structures
  const data = response.data?.data || response.data;
  if (!data) {
    throw new Error('No data returned from API');
  }
  return data;
}

export async function deleteCompetitorAnalysis(id: string): Promise<void> {
  await axiosInstance.delete(ENDPOINTS.competitorAnalysis.delete(id));
}

export async function exportCompetitorAnalysis(
  id: string,
  format: 'json' | 'csv' | 'pdf'
): Promise<Blob> {
  const response = await axiosInstance.get(
    ENDPOINTS.competitorAnalysis.export(id, format),
    { responseType: 'blob' }
  );
  return response.data;
}
