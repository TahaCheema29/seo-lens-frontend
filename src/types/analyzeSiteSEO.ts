export enum CrawlMode {
  SITEMAP_ONLY = "SITEMAP_ONLY",
  FULL_CRAWL = "FULL_CRAWL",
}

export enum CheckStatus {
  PASS = "PASS",
  FAIL = "FAIL",
  WARNING = "WARNING",
}

export interface CheckResult<T = any> {
  status: CheckStatus;
  description: T;
}

export interface AnalyzeSiteSeoRequest {
  url: string;
  crawlMode: CrawlMode;
}


export interface BaseUrlChecks {
  baseUrl: string;

  wwwRedirectCheck?: CheckResult;
  robotsTxtCheck?: CheckResult;
  httpsSslCheck?: CheckResult;
  directoryListingCheck?: CheckResult;
  expiresHeadersCheck?: CheckResult;
  cachingAdvice?: CheckResult;
}

export interface AnalyzeSiteSeoResult {
  url: string;

  // Basic SEO – Title & Description
  title: string;
  titleLengthCheck?: CheckResult;
  titleKeywordPresence?: CheckResult;
  titleQualityGuidance?: string;

  metaDescription?: string;
  metaDescriptionLengthCheck?: CheckResult;
  metaDescriptionKeywordPresence?: CheckResult;
  metaDescriptionQualityGuidance?: string;

  metaKeywords?: string;

  // Headings
  h1Check?: CheckResult;
  h1KeywordGuidance?: string;
  h1?: string;

  h2Count?: number;
  h2OptimizationGuidance?: string;
  h2?: string;

  h3?: string;

  // Images
  imageAltCheck?: CheckResult;

  // Links
  internalLinksCount?: number;
  externalLinksCount?: number;
  linksQualityGuidance?: string;

  // Advanced SEO
  canonicalCheck?: CheckResult;
  canonical?: string;

  noindexCheck?: CheckResult;
  openGraphCheck?: CheckResult;
  schemaValidation?: CheckResult;

  // Performance
  htmlSizeCheck?: CheckResult;
  htmlSizeBytes?: number;

  responseTimeCheck?: CheckResult;
  responseTimeMs?: number;

  jsMinificationCheck?: CheckResult;
  cssMinificationCheck?: CheckResult;

  totalJsFiles?: number;
  totalCssFiles?: number;
  totalRequests?: number;

  imageRequests?: number;
  jsRequests?: number;
  cssRequests?: number;

  requestsGuidance?: string;
  inlineCssWarning?: string;

  embeddedObjectsCheck?: CheckResult;

  // Mobile
  mobileResponsiveness?: CheckResult;

  // Core Web Vitals
  lcp?: string;
  fid?: string;
  cls?: string;
}

export interface AnalyzeSiteSeoResponse {
  baseUrlChecks: BaseUrlChecks;
  urlResults: AnalyzeSiteSeoResult[];
}
