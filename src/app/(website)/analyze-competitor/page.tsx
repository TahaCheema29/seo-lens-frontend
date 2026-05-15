'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Zap, Map, Globe, ArrowRight, CheckCircle2, BarChart3, Target, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import {
  ScoreComparisonCard,
  SuggestionsList,
  QuickWinsSection,
  ComparisonMatrixComponent,
} from '@/components/dashboard/user/competitorAnalysis';
import { useAnalyzeCompetitors } from '@/services/competitorAnalysis/mutations';
import { generateCompetitorAnalysisPDF } from '@/utils/pdfExport';
import type { 
  CompetitorAnalysisMode, 
  CompetitorAnalysisResponse 
} from '@/features/dashboard/types/competitorAnalysis';

const analysisModes = [
  {
    value: 'QUICK' as CompetitorAnalysisMode,
    label: 'Quick Analysis',
    description: 'Homepage only - Ultra fast 10-20 second comparison',
    icon: Zap,
    features: ['Homepage SEO analysis', 'Core metrics comparison', 'Instant results'],
  },
  {
    value: 'SITEMAP_ONLY' as CompetitorAnalysisMode,
    label: 'Sitemap Analysis',
    description: 'Up to 100 pages from XML sitemap - Comprehensive 20-40 second analysis',
    icon: Map,
    features: ['Sitemap-based crawling', '100 page limit', 'SEO coverage analysis'],
  },
  {
    value: 'FULL_CRAWL' as CompetitorAnalysisMode,
    label: 'Full Crawl',
    description: 'Discover up to 100 pages - Deep 30-90 second analysis',
    icon: Globe,
    features: ['Full site crawling', 'Complete SEO audit', '100 page limit'],
  },
];

export default function AnalyzeCompetitorContent() {
  const router = useRouter();
  const [userUrl, setUserUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [mode, setMode] = useState<CompetitorAnalysisMode>('QUICK');
  const [errors, setErrors] = useState<{ userUrl?: string; competitorUrl?: string }>({});
  const [result, setResult] = useState<CompetitorAnalysisResponse | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const analyzeMutation = useAnalyzeCompetitors();

  const validateUrls = (): boolean => {
    const newErrors: { userUrl?: string; competitorUrl?: string } = {};
    
    if (!userUrl.trim()) {
      newErrors.userUrl = 'Please enter your website URL';
    } else if (!isValidUrl(userUrl)) {
      newErrors.userUrl = 'Please enter a valid URL (e.g., https://example.com)';
    }
    
    if (!competitorUrl.trim()) {
      newErrors.competitorUrl = 'Please enter competitor website URL';
    } else if (!isValidUrl(competitorUrl)) {
      newErrors.competitorUrl = 'Please enter a valid URL (e.g., https://example.com)';
    } else if (getDomain(userUrl) === getDomain(competitorUrl)) {
      newErrors.competitorUrl = 'Competitor URL must be different from your URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUrls()) return;

    try {
      const analysisResult = await analyzeMutation.mutateAsync({
        userUrl,
        competitorUrl,
        mode,
      });
      
      setResult(analysisResult);
      toast.success('Competitor analysis completed!');
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to analyze competitors');
    }
  };

  const handleExportPDF = async () => {
    if (!result) return;
    
    try {
      setIsExporting(true);
      const blob = generateCompetitorAnalysisPDF(result);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `competitor-analysis-${result.analysisId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const resetAnalysis = () => {
    // Navigate to the analyze-competitor page to start fresh
    router.push('/analyze-competitor');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                Free Tool
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Competitor Analysis
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Compare your website with competitors and discover opportunities to improve your SEO. 
                Get actionable insights in seconds.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>No Signup Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis Form */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Start Your Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* URLs */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="userUrl">Your Website URL</Label>
                        <Input
                          id="userUrl"
                          placeholder="https://yourwebsite.com"
                          value={userUrl}
                          onChange={(e) => setUserUrl(e.target.value)}
                          disabled={analyzeMutation.isPending}
                          className="h-12"
                        />
                        {errors.userUrl && (
                          <p className="text-sm text-red-500">{errors.userUrl}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="competitorUrl">Competitor Website URL</Label>
                        <Input
                          id="competitorUrl"
                          placeholder="https://competitor.com"
                          value={competitorUrl}
                          onChange={(e) => setCompetitorUrl(e.target.value)}
                          disabled={analyzeMutation.isPending}
                          className="h-12"
                        />
                        {errors.competitorUrl && (
                          <p className="text-sm text-red-500">{errors.competitorUrl}</p>
                        )}
                      </div>
                    </div>

                    {/* Mode Selection */}
                    <div className="space-y-3">
                      <Label>Select Analysis Mode</Label>
                      <RadioGroup
                        value={mode}
                        onValueChange={(value) => setMode(value as CompetitorAnalysisMode)}
                        className="grid md:grid-cols-3 gap-4"
                        disabled={analyzeMutation.isPending}
                      >
                        {analysisModes.map((analysisMode) => (
                          <div key={analysisMode.value}>
                            <RadioGroupItem
                              value={analysisMode.value}
                              id={analysisMode.value}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={analysisMode.value}
                              className="flex flex-col h-full cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <analysisMode.icon className="h-5 w-5" />
                                <span className="font-semibold">{analysisMode.label}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 flex-1">
                                {analysisMode.description}
                              </p>
                              <ul className="space-y-1">
                                {analysisMode.features.map((feature, i) => (
                                  <li key={i} className="text-xs flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full md:w-auto"
                      disabled={analyzeMutation.isPending}
                    >
                      {analyzeMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing Competitors...
                        </>
                      ) : (
                        <>
                          Analyze Competitors
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {result && (
          <section id="results" className="py-12 bg-neutral-50 dark:bg-neutral-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Results Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold">Analysis Results</h2>
                    <p className="text-muted-foreground mt-1">
                      Completed in {result.analysisMeta.durationSeconds.toFixed(1)} seconds
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleExportPDF}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        'Download PDF Report'
                      )}
                    </Button>
                    <Button onClick={resetAnalysis}>
                      New Analysis
                    </Button>
                  </div>
                </div>

                {/* Score Comparison */}
                <ScoreComparisonCard 
                  scores={result.overallScores}
                  userUrl={result.urls.user}
                  competitorUrl={result.urls.competitor}
                />

                {/* Summary Card */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {result.comparisonSummary.headline}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {result.comparisonSummary.keyInsight}
                    </p>
                    {result.comparisonSummary.encouragement && (
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {result.comparisonSummary.encouragement}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Wins */}
                {result.quickWins.length > 0 && (
                  <QuickWinsSection quickWins={result.quickWins} />
                )}

                {/* Comparison Matrix */}
                <ComparisonMatrixComponent matrix={result.comparisonMatrix} />

                {/* Suggestions & Strengths */}
                <Tabs defaultValue="suggestions" className="w-full">
                  <TabsList className="grid w-full md:w-auto md:grid-cols-2">
                    <TabsTrigger value="suggestions" className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Improvement Suggestions
                      <Badge variant="secondary" className="ml-1">
                        {result.suggestions.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="strengths" className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Your Strengths
                      <Badge variant="secondary" className="ml-1">
                        {result.strengthsToMaintain.length}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="suggestions" className="mt-4">
                    <SuggestionsList suggestions={result.suggestions} />
                  </TabsContent>

                  <TabsContent value="strengths" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        {result.strengthsToMaintain.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.strengthsToMaintain.map((strength, index) => (
                              <div 
                                key={index} 
                                className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/30 dark:border-emerald-800"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                                    <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  </div>
                                  <span className="text-sm text-muted-foreground capitalize">
                                    {strength.category}
                                  </span>
                                </div>
                                <h4 className="font-semibold mb-1">{strength.metric}</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                                  <div>
                                    <span className="text-muted-foreground">You: </span>
                                    <span className="font-medium text-emerald-700 dark:text-emerald-400">
                                      {strength.yourValue}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Them: </span>
                                    <span className="font-medium">{strength.competitorValue}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {strength.whatThisMeans}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <Target className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                            <p>No specific strengths identified. Focus on improvement areas.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        {!result && (
          <section className="py-16 bg-neutral-50 dark:bg-neutral-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground text-lg">
                  Get actionable insights in three simple steps
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Enter URLs</h3>
                  <p className="text-muted-foreground">
                    Enter your website URL and your competitor's URL that you want to compare.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-amber-600">2</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Choose Mode</h3>
                  <p className="text-muted-foreground">
                    Select Quick, Sitemap, or Full Crawl mode based on your analysis needs.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-600">3</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Get Insights</h3>
                  <p className="text-muted-foreground">
                    Receive detailed comparison with suggestions, quick wins, and strengths.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        {!result && (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What You Get</h2>
                <p className="text-muted-foreground text-lg">
                  Comprehensive analysis to help you outrank your competition
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <Card>
                  <CardContent className="pt-6">
                    <BarChart3 className="h-8 w-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Score Comparison</h3>
                    <p className="text-muted-foreground text-sm">
                      Side-by-side SEO scores with detailed breakdown of performance metrics.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <Target className="h-8 w-8 text-red-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Gap Analysis</h3>
                    <p className="text-muted-foreground text-sm">
                      Identify exactly where you fall behind and where you're ahead.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <Lightbulb className="h-8 w-8 text-amber-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Actionable Suggestions</h3>
                    <p className="text-muted-foreground text-sm">
                      Prioritized recommendations with expected impact and timeline.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <Zap className="h-8 w-8 text-emerald-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Quick Wins</h3>
                    <p className="text-muted-foreground text-sm">
                      Easy fixes with high impact that you can implement today.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <Globe className="h-8 w-8 text-violet-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Technical SEO</h3>
                    <p className="text-muted-foreground text-sm">
                      Compare technical aspects like speed, mobile-friendliness, and security.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-cyan-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">PDF Export</h3>
                    <p className="text-muted-foreground text-sm">
                      Download a professional PDF report to share with your team.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
