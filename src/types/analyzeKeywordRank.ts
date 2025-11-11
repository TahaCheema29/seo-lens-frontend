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
  target_domain?: string | null;
  target_position?: number | null;
  total_results: number;
  search_results: TAnalyzeKeywordRankRequest[];
  timestamp: number;
  date: Date; 
}
