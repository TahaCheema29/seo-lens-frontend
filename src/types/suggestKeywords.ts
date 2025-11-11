export interface TSearchResult {
  position: number;
  title: string;
  url: string;
  snippet?: string | null;
}

export interface TPeopleAlsoAskItem {
  question: string;
  keyword: string;
}

export interface TSuggestKeywordResult {
  primary_keyword: string;
  search_results: TSearchResult[];
  related_searches: string[];
  people_also_ask: TPeopleAlsoAskItem[];
  autocomplete_suggestions: string[];
  long_tail_keywords: string[];
  total_related_terms: number;
  timestamp: number; 
  date: Date; 
}

export interface TSuggestKeywordRequest {
  keywords: string[];
}
