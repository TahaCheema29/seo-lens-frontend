'use client';

import { useState } from 'react';
import { CompetitorAnalysisForm } from '@/components/dashboard/user/competitorAnalysis';
import { CompetitorAnalysisHistory } from '@/components/dashboard/user/competitorAnalysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  useCompetitorAnalysisHistory,
  useDeleteCompetitorAnalysis,
} from '@/services/competitorAnalysis/mutations';
import type {
  CompetitorAnalysisSummary
} from '@/features/dashboard/types/competitorAnalysis';

export default function CompetitorAnalysisPage() {
  const [activeTab, setActiveTab] = useState('history');

  // TanStack Query hooks
  const { data: historyData, isLoading: isLoadingHistory, refetch: refetchHistory } =
    useCompetitorAnalysisHistory(1, 20);

  const deleteMutation = useDeleteCompetitorAnalysis();

  const handleDelete = async (analysis: CompetitorAnalysisSummary) => {
    if (!confirm('Are you sure you want to delete this analysis?')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(analysis.analysisId);
      toast.success('Analysis deleted successfully!');
      refetchHistory();
    } catch (error) {
      toast.error('Failed to delete analysis');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitor Analysis</h1>
          <p className="text-muted-foreground">
            Compare your website with competitors and identify opportunities
          </p>
        </div>
        <CompetitorAnalysisForm />
      </div>

      {/* Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:w-auto md:grid-cols-2">
          <TabsTrigger value="history">Analysis History</TabsTrigger>
          <TabsTrigger value="guide">How It Works</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-6">
          <CompetitorAnalysisHistory
            analyses={historyData?.items || []}
            isLoading={isLoadingHistory}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="guide" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Enter URLs</h3>
              <p className="text-sm text-muted-foreground">
                Enter your website URL and your competitor's URL. We'll analyze both sites.
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Mode</h3>
              <p className="text-sm text-muted-foreground">
                Select Quick, Sitemap, or Full Crawl mode based on your needs and time.
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Insights</h3>
              <p className="text-sm text-muted-foreground">
                Receive detailed comparison, suggestions, and quick wins to improve your SEO.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
