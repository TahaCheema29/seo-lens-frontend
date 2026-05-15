export type CompetitorAnalysisMode = 'QUICK' | 'SITEMAP_ONLY' | 'FULL_CRAWL';
export type CompetitorAnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type CompetitorAnalysisWinner = 'user' | 'competitor' | 'tie';

export interface CompetitorAnalysisRequest {
  userUrl: string;
  competitorUrl: string;
  mode: CompetitorAnalysisMode;
}

export interface OverallScores {
  user: number;
  competitor: number;
  winner: CompetitorAnalysisWinner;
  gap: number;
  interpretation: string;
}

export interface MetricComparison {
  userValue: any;
  competitorValue: any;
  winner: string;
  gap?: string;
  gapPercentage?: number;
}

export interface CategoryScore {
  user: number;
  competitor: number;
}

// Enhanced Performance Metrics
export interface PerformanceMetrics {
  categoryScore: CategoryScore;
  loadTime?: MetricComparison;
  pageSize?: MetricComparison;
  requestsCount?: MetricComparison;
  // New metrics
  serverResponseTime?: MetricComparison;
  timeToFirstByte?: MetricComparison;
  resourceOptimization?: MetricComparison;
  cachingImplementation?: MetricComparison;
}

// Enhanced SEO Metrics
export interface SeoMetrics {
  categoryScore: CategoryScore;
  titleOptimization?: MetricComparison;
  metaDescriptionCoverage?: MetricComparison;
  headingStructure?: MetricComparison;
  imageAltCoverage?: MetricComparison;
  // New metrics
  canonicalTags?: MetricComparison;
  schemaMarkup?: MetricComparison;
  openGraphTags?: MetricComparison;
  twitterCards?: MetricComparison;
  internalLinks?: MetricComparison;
  externalLinks?: MetricComparison;
  keywordDensity?: MetricComparison;
  contentFreshness?: MetricComparison;
}

// Enhanced Technical Metrics
export interface TechnicalMetrics {
  categoryScore: CategoryScore;
  httpsSecurity?: MetricComparison;
  mobileFriendly?: MetricComparison;
  // New metrics
  robotsTxt?: MetricComparison;
  sitemapXml?: MetricComparison;
  wwwRedirect?: MetricComparison;
  directoryListing?: MetricComparison;
  securityHeaders?: MetricComparison;
  sslCertificate?: MetricComparison;
}

// NEW: Content Analysis Metrics
export interface ContentMetrics {
  categoryScore: CategoryScore;
  avgWordCount?: MetricComparison;
  totalWords?: MetricComparison;
  readabilityScore?: MetricComparison;
  contentDepth?: MetricComparison;
  uniqueContent?: MetricComparison;
  duplicateContent?: MetricComparison;
  imagesPerPage?: MetricComparison;
  videosPerPage?: MetricComparison;
}

// NEW: Link Analysis Metrics
export interface LinkMetrics {
  categoryScore: CategoryScore;
  totalInternalLinks?: MetricComparison;
  totalExternalLinks?: MetricComparison;
  avgInternalLinksPerPage?: MetricComparison;
  avgExternalLinksPerPage?: MetricComparison;
  brokenLinks?: MetricComparison;
  linkDistribution?: MetricComparison;
}

// NEW: Social Media Metrics
export interface SocialMetrics {
  categoryScore: CategoryScore;
  facebookOpenGraph?: MetricComparison;
  twitterCards?: MetricComparison;
  linkedInTags?: MetricComparison;
  socialShareButtons?: MetricComparison;
}

export interface DetailedComparison {
  performance?: PerformanceMetrics;
  seo?: SeoMetrics;
  technical?: TechnicalMetrics;
  content?: ContentMetrics;
  links?: LinkMetrics;
  social?: SocialMetrics;
}

export interface Suggestion {
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  priorityScore: number;
  issue: string;
  yourMetric: string;
  competitorMetric: string;
  whatThisMeans: string;
  whatYouShouldDo: string[];
  expectedBenefit: string;
  timeline: string;
  // New fields
  effortLevel: 'easy' | 'medium' | 'hard';
  impactLevel: 'high' | 'medium' | 'low';
  estimatedTimeToFix: string;
  resourcesNeeded: string[];
}

export interface QuickWin {
  issue: string;
  whyItMatters: string;
  effort: string;
  effortLevel: 'easy' | 'medium' | 'hard';
  impact: 'high' | 'medium' | 'low';
  howToFix: string;
  expectedResult: string;
  // New fields
  category: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ComparisonMatrixItem {
  category: string;
  metric: string;
  yourValue?: string;
  competitorValue?: string;
  advantage?: string;
  gap?: string;
  whatThisMeans?: string;
  businessImpact?: string;
  improvementPriority?: string;
  keepDoing?: string;
  status?: string;
  note?: string;
}

export interface ComparisonMatrix {
  whereYouWin: ComparisonMatrixItem[];
  whereYouLose: ComparisonMatrixItem[];
  tie: ComparisonMatrixItem[];
}

// NEW: Page-level breakdown
export interface PageComparison {
  url: string;
  userScore?: number;
  competitorScore?: number;
  winner: CompetitorAnalysisWinner;
  keyDifferences: string[];
  recommendations: string[];
}

// NEW: Action Priority Matrix
export interface ActionPriorityItem {
  action: string;
  category: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  priority: number;
  description: string;
  steps: string[];
}

export interface AnalysisMeta {
  startedAt: string;
  completedAt?: string;
  durationSeconds: number;
  pagesAnalyzed: {
    user: number;
    competitor: number;
  };
  urlsCrawled: {
    user: string[];
    competitor: string[];
  };
}

export interface ComparisonSummary {
  headline: string;
  keyInsight: string;
  encouragement?: string;
  keyTakeaways?: string[];
  competitivePosition?: string;
}

export interface CompetitorAnalysisResponse {
  analysisId: string;
  mode: CompetitorAnalysisMode;
  status: CompetitorAnalysisStatus;
  urls: {
    user: string;
    competitor: string;
  };
  analysisMeta: AnalysisMeta;
  overallScores: OverallScores;
  comparisonSummary: ComparisonSummary;
  detailedComparison: DetailedComparison;
  comparisonMatrix: ComparisonMatrix;
  suggestions: Suggestion[];
  quickWins: QuickWin[];
  strengthsToMaintain: ComparisonMatrixItem[];
  // New fields
  pageBreakdown?: PageComparison[];
  actionPriorityMatrix?: ActionPriorityItem[];
  industryBenchmark?: {
    yourPercentile: number;
    averageScore: number;
    topPerformerScore: number;
  };
  createdAt: string;
}

export interface CompetitorAnalysisSummary {
  analysisId: string;
  userUrl: string;
  competitorUrl: string;
  mode: CompetitorAnalysisMode;
  status: CompetitorAnalysisStatus;
  userScore?: number;
  competitorScore?: number;
  winner?: string;
  createdAt: string;
}

export interface CompetitorAnalysisList {
  total: number;
  items: CompetitorAnalysisSummary[];
}
