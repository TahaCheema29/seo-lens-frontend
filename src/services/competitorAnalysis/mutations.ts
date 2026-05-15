import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  analyzeCompetitors,
  getCompetitorAnalysisHistory,
  getCompetitorAnalysisById,
  deleteCompetitorAnalysis,
  exportCompetitorAnalysis,
} from './queries';
import type { CompetitorAnalysisRequest } from '@/features/dashboard/types/competitorAnalysis';

export const useAnalyzeCompetitors = () => {
  return useMutation({
    mutationFn: analyzeCompetitors,
  });
};

export const useCompetitorAnalysisHistory = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['competitorAnalysis', 'history', page, limit],
    queryFn: () => getCompetitorAnalysisHistory(page, limit),
  });
};

export const useCompetitorAnalysis = (id: string) => {
  return useQuery({
    queryKey: ['competitorAnalysis', id],
    queryFn: () => getCompetitorAnalysisById(id),
    enabled: !!id,
  });
};

export const useDeleteCompetitorAnalysis = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompetitorAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitorAnalysis', 'history'] });
    },
  });
};

export const useExportCompetitorAnalysis = () => {
  return useMutation({
    mutationFn: ({ id, format }: { id: string; format: 'json' | 'csv' | 'pdf' }) =>
      exportCompetitorAnalysis(id, format),
  });
};
