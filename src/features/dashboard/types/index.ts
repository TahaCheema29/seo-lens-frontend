export interface KPIData {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

export interface SEOInsight {
  id: string;
  type: 'issue' | 'opportunity' | 'success';
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  pageUrl?: string;
  metric?: string;
  metricValue?: string;
}

export interface KeywordData {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  competition: 'low' | 'medium' | 'high';
  trend: 'up' | 'down' | 'stable';
  suggestions?: string[];
}

export interface RankData {
  id: string;
  keyword: string;
  currentRank: number;
  previousRank: number;
  url: string;
  searchVolume: number;
  lastUpdated: string;
}

export interface CompetitorData {
  id: string;
  domain: string;
  domainAuthority: number;
  backlinks: number;
  organicKeywords: number;
  organicTraffic: number;
  overlapScore: number;
}

export interface ReportData {
  id: string;
  name: string;
  type: 'seo-audit' | 'keyword-analysis' | 'rank-report' | 'competitor-analysis';
  status: 'completed' | 'processing' | 'failed';
  createdAt: string;
  size: string;
  downloadUrl?: string;
}

export interface UserSettings {
  email: string;
  name: string;
  company?: string;
  website?: string;
  notifications: {
    email: boolean;
    weeklyReport: boolean;
    rankChanges: boolean;
    newOpportunities: boolean;
  };
  preferences: {
    timezone: string;
    currency: string;
    language: string;
  };
}

export interface SubscriptionData {
  id: string;
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  price: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  features: string[];
  limits: {
    sites: number;
    keywords: number;
    reports: number;
    apiCalls: number;
  };
  usage: {
    sites: number;
    keywords: number;
    reports: number;
    apiCalls: number;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  company?: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'user' | 'admin';
  plan: string;
  joinedAt: string;
  lastActive: string;
  sitesCount: number;
  keywordsCount: number;
}

export interface AdminSubscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: string;
  status: 'active' | 'inactive' | 'past_due' | 'cancelled';
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  startDate: string;
  nextBillingDate: string;
}

export interface AnalyticsData {
  date: string;
  activeUsers: number;
  newUsers: number;
  totalScans: number;
  totalReports: number;
  revenue: number;
}

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface SEOAnalysisHistory {
  id: string;
  url: string;
  crawlMode: 'SITEMAP_ONLY' | 'FULL_CRAWL';
  score: number;
  criticalIssues: number;
  warnings: number;
  passedChecks: number;
  status: 'completed' | 'processing' | 'failed';
  createdAt: string;
  pageCount: number;
}

export interface KeywordResearchHistory {
  id: string;
  primaryKeyword: string;
  relatedKeywordsCount: number;
  longTailKeywordsCount: number;
  searchResultsCount: number;
  status: 'completed' | 'processing' | 'failed';
  createdAt: string;
}

export interface RankCheckHistory {
  id: string;
  domain: string;
  keywords: string[];
  top10Count: number;
  notRankingCount: number;
  avgPosition: number | null;
  status: 'completed' | 'processing' | 'failed';
  createdAt: string;
}

// Re-export competitor analysis types
export * from './competitorAnalysis';
