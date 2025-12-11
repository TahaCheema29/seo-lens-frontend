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
  primaryKeyword: string;
  searchResults: TSearchResult[];
  relatedSearches: string[];
  peopleAlsoAsk: TPeopleAlsoAskItem[];
  autocompleteSuggestions: string[];
  longTailKeywords: string[];
  totalRelatedTerms: number;
  timestamp: number; 
  date: Date; 
}

export interface TSuggestKeywordRequest {
  keywords: string[];
}
