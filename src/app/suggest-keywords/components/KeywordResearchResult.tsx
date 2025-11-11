import { Card } from "@/components/ui/card"
import { TSuggestKeywordResult } from "@/types/suggestKeywords"


interface KeywordResearchResultsProps {
  results: TSuggestKeywordResult[]
}

export default function KeywordResearchResults({ results }: KeywordResearchResultsProps) {
  return (
    <div className="space-y-8">
      {results.map((result, index) => (
        <div key={index} className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-300 dark:border-slate-700 pb-4">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{result.primary_keyword}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{result.total_related_terms} related terms found</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search Results */}
            <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-6">
              <h4 className="text-lg font-bold text-black dark:text-white mb-4">Top Search Results</h4>
              <div className="space-y-4">
                {result.search_results.map((sr, idx) => (
                  <div
                    key={idx}
                    className="pb-4 border-b border-gray-200 dark:border-slate-700 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded">
                        {sr.position}
                      </span>
                      <div className="flex-1 min-w-0">
                        <a
                          href={sr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-black dark:text-white hover:underline hover:text-gray-700 dark:hover:text-gray-300 transition truncate block"
                        >
                          {sr.title}
                        </a>
                        <a
                          href={sr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:underline transition truncate block"
                        >
                          {sr.url}
                        </a>
                        {sr.snippet && (
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{sr.snippet}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Searches */}
            <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-6">
              <h4 className="text-lg font-bold text-black dark:text-white mb-4">Related Searches</h4>
              <div className="flex flex-wrap gap-2">
                {result.related_searches.map((search, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-3 py-1 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-xs rounded-full"
                  >
                    {search}
                  </span>
                ))}
              </div>
            </Card>

            {/* People Also Ask */}
            <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-6">
              <h4 className="text-lg font-bold text-black dark:text-white mb-4">People Also Ask</h4>
              <div className="space-y-3">
                {result.people_also_ask.map((paa, idx) => (
                  <div
                    key={idx}
                    className="pb-3 border-b border-gray-200 dark:border-slate-700 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-medium text-black dark:text-white">{paa.question}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Keyword: {paa.keyword}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Autocomplete Suggestions */}
            <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-6">
              <h4 className="text-lg font-bold text-black dark:text-white mb-4">Autocomplete Suggestions</h4>
              <div className="space-y-2">
                {result.autocomplete_suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-200 dark:hover:bg-slate-600 cursor-pointer transition"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </Card>

            {/* Long-tail Keywords */}
            <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-6 lg:col-span-2">
              <h4 className="text-lg font-bold text-black dark:text-white mb-4">Long-tail Keywords</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {result.long_tail_keywords.map((keyword, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-sm rounded border border-gray-300 dark:border-slate-600"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}
