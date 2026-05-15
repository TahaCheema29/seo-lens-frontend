'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  ArrowLeft, 
  Clock, 
  Globe, 
  FileText,
  BarChart3,
  TrendingUp,
  Target,
  LayoutGrid,
  ListTodo
} from 'lucide-react';
import { ScoreComparisonCard } from './ScoreComparisonCard';
import { SuggestionsList } from './SuggestionsList';
import { QuickWinsSection } from './QuickWinsSection';
import { ComparisonMatrixComponent } from './ComparisonMatrix';
import { EnhancedSummary } from './EnhancedSummary';
import { DetailedMetricsDashboard } from './DetailedMetricsDashboard';
import { PageBreakdown } from './PageBreakdown';
import { ActionPriorityMatrix } from './ActionPriorityMatrix';
import type { CompetitorAnalysisResponse } from '@/features/dashboard/types/competitorAnalysis';

interface CompetitorAnalysisResultsProps {
  analysis: CompetitorAnalysisResponse;
  onBack?: () => void;
  onExport?: (format: 'pdf') => void;
  isExporting?: boolean;
}

export function CompetitorAnalysisResults({ 
  analysis, 
  onBack,
  onExport,
  isExporting 
}: CompetitorAnalysisResultsProps) {
  const getModeBadge = (mode: string) => {
    switch (mode) {
      case 'QUICK':
        return <Badge variant="outline">Quick Analysis</Badge>;
      case 'SITEMAP_ONLY':
        return <Badge variant="outline">Sitemap Analysis</Badge>;
      case 'FULL_CRAWL':
        return <Badge variant="outline">Full Crawl</Badge>;
      default:
        return <Badge variant="outline">{mode}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-700">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-700">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Safely extract values with defaults
  const userUrl = analysis?.urls?.user || 'Unknown';
  const competitorUrl = analysis?.urls?.competitor || 'Unknown';
  const mode = analysis?.mode || 'QUICK';
  const status = analysis?.status || 'unknown';
  const analysisId = analysis?.analysisId || 'unknown';
  const createdAt = analysis?.createdAt || new Date().toISOString();
  const overallScores = analysis?.overallScores;
  const pagesAnalyzed = analysis?.analysisMeta?.pagesAnalyzed;
  const durationSeconds = analysis?.analysisMeta?.durationSeconds;
  const detailedComparison = analysis?.detailedComparison;
  const comparisonMatrix = analysis?.comparisonMatrix;
  const suggestions = analysis?.suggestions || [];
  const quickWins = analysis?.quickWins || [];
  const strengthsToMaintain = analysis?.strengthsToMaintain || [];
  const pageBreakdown = analysis?.pageBreakdown;
  const actionPriorityMatrix = analysis?.actionPriorityMatrix;
  const urlsCrawled = analysis?.analysisMeta?.urlsCrawled;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">Competitor Analysis Results</h1>
              {getModeBadge(mode)}
              {getStatusBadge(status)}
            </div>
            <p className="text-muted-foreground text-sm">
              Analyzed {pagesAnalyzed?.user ?? 0} pages vs {pagesAnalyzed?.competitor ?? 0} pages
              {' • '}
              <Clock className="inline h-3 w-3 mx-1" />
              {durationSeconds?.toFixed(1) ?? '0.0'}s
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => onExport?.('pdf')}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Enhanced Summary with Position, Takeaways, Benchmark */}
      <EnhancedSummary analysis={analysis} />

      {/* Score Comparison */}
      {overallScores && (
        <ScoreComparisonCard 
          scores={overallScores}
          userUrl={userUrl}
          competitorUrl={competitorUrl}
        />
      )}

      {/* Comprehensive Tabs Layout */}
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Pages</span>
            {pageBreakdown && (
              <Badge variant="secondary" className="ml-1 text-xs">{pageBreakdown.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="actions" className="flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            <span className="hidden sm:inline">Actions</span>
            {actionPriorityMatrix && (
              <Badge variant="secondary" className="ml-1 text-xs">{actionPriorityMatrix.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Suggestions</span>
            <Badge variant="secondary" className="ml-1 text-xs">{suggestions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="matrix" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Matrix</span>
          </TabsTrigger>
          <TabsTrigger value="strengths" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Strengths</span>
          </TabsTrigger>
        </TabsList>

        {/* Detailed Metrics Tab */}
        <TabsContent value="metrics" className="mt-6">
          {detailedComparison ? (
            <DetailedMetricsDashboard detailedComparison={detailedComparison} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No detailed metrics available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Page Breakdown Tab */}
        <TabsContent value="pages" className="mt-6">
          {pageBreakdown && pageBreakdown.length > 0 ? (
            <PageBreakdown pageBreakdown={pageBreakdown} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No page breakdown available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Action Priority Matrix Tab */}
        <TabsContent value="actions" className="mt-6">
          {actionPriorityMatrix && actionPriorityMatrix.length > 0 ? (
            <ActionPriorityMatrix actions={actionPriorityMatrix} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <ListTodo className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No action items available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions" className="mt-6">
          {suggestions.length > 0 ? (
            <SuggestionsList suggestions={suggestions} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No suggestions available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Comparison Matrix Tab */}
        <TabsContent value="matrix" className="mt-6">
          {comparisonMatrix ? (
            <ComparisonMatrixComponent matrix={comparisonMatrix} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <LayoutGrid className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No comparison matrix available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Strengths Tab */}
        <TabsContent value="strengths" className="mt-6">
          {strengthsToMaintain.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Strengths to Maintain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {strengthsToMaintain.map((strength, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-full bg-emerald-100">
                          <Target className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-sm text-muted-foreground capitalize">{strength.category}</span>
                      </div>
                      <h4 className="font-semibold mb-1">{strength.metric}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>
                          <span className="text-muted-foreground">You: </span>
                          <span className="font-medium text-emerald-700">{strength.yourValue}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Them: </span>
                          <span className="font-medium">{strength.competitorValue}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{strength.whatThisMeans}</p>
                      {strength.keepDoing && (
                        <p className="mt-2 text-sm text-emerald-700 font-medium">{strength.keepDoing}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No specific strengths identified. Focus on improvement areas.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Wins Section (Always Visible) */}
      {quickWins.length > 0 && (
        <QuickWinsSection quickWins={quickWins} />
      )}

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-muted-foreground pt-4 border-t gap-2">
        <div>
          Analysis ID: <span className="font-mono">{analysisId}</span>
        </div>
        <div className="flex items-center gap-4">
          {urlsCrawled && (
            <span>
              URLs: {urlsCrawled.user?.length ?? 0} vs {urlsCrawled.competitor?.length ?? 0}
            </span>
          )}
          <span>
            Created: {new Date(createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
