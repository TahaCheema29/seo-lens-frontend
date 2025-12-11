export interface TFindKeywordRank {
  url: string;
  keywords: string[];
}

export interface TAnalyzeKeywordRankRequest {
  position: number;
  title: string;
  url: string;
  snippet?: string | null;
}

export interface TAnalyzeKeywordRankResult {
  keyword: string;
  targetDomain?: string | null;
  targetPosition?: number | null;
  totalResults: number;
  searchResults: TAnalyzeKeywordRankRequest[];
  timestamp: number;
  date: Date; 
}
