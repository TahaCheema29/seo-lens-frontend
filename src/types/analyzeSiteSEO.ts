export enum CrawlMode {
  SITEMAP_ONLY = "SITEMAP_ONLY",
  FULL_CRAWL = "FULL_CRAWL",
}

export interface TAnalyzeSiteSeoRequest {
  url: string;
  crawl_mode: CrawlMode;
}

export interface TAnalyzeSiteSeoResult {
  url: string;
  title: string;
  metaDescription?: string;
  metaKeywords?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  altCheck?: string;
  canonical?: string;
  mobileResponsiveness?: string;
  schemaValidation?: string;
  lcp?: string;
  fid?: string;
  cls?: string;
}
