import { Card } from "@/components/ui/card"
import { TAnalyzeKeywordRankResult } from "@/types/analyzeKeywordRank"


export default function KeywordRankResults({
  results,
  domain,
}: {
  results: TAnalyzeKeywordRankResult[]
  domain: string
}) {
  const firstPageCount = results.filter((r) => r.target_position && r.target_position <= 10).length
  const notRankingCount = results.filter((r) => !r.target_position).length

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 p-6">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Total Keywords</p>
            <p className="text-4xl font-bold text-black dark:text-white">{results.length}</p>
          </div>
        </Card>
        <Card className="bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 p-6">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">First Page Rankings</p>
            <p className="text-4xl font-bold text-black dark:text-white">{firstPageCount}</p>
          </div>
        </Card>
        <Card className="bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 p-6">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Not Ranking</p>
            <p className="text-4xl font-bold text-black dark:text-white">{notRankingCount}</p>
          </div>
        </Card>
      </div>

      {/* Results Cards */}
      <div className="space-y-8">
        {results.map((result, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-6 hover:border-gray-400 dark:hover:border-slate-600 transition-all hover:shadow-lg"
          >
            {/* Keyword Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-slate-700">
              <div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{result.keyword}</h3>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-slate-400">Total Results</p>
                    <p className="font-semibold text-black dark:text-white">
                      {(result.total_results / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  {result.target_position && (
                    <div>
                      <p className="text-gray-500 dark:text-slate-400">Your Position</p>
                      <p className="font-semibold text-black dark:text-white">#{result.target_position}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Position Badge */}
              <div className="flex-shrink-0">
                {result.target_position && result.target_position <= 10 ? (
                  <div className="bg-black dark:bg-white rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-white dark:text-black font-semibold">RANKING</p>
                    <p className="text-2xl font-bold text-white dark:text-black">{result.target_position}</p>
                  </div>
                ) : result.target_position ? (
                  <div className="bg-gray-400 dark:bg-gray-600 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-white font-semibold">POSITION</p>
                    <p className="text-2xl font-bold text-white">{result.target_position}</p>
                  </div>
                ) : (
                  <div className="bg-gray-300 dark:bg-gray-700 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold">NOT</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">FOUND</p>
                  </div>
                )}
              </div>
            </div>

            {/* Search Results */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                Top Search Results
              </p>
              {result.search_results.map((searchResult, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <div className="flex gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded">
                      {searchResult.position}
                    </span>
                    <a
                      href={searchResult.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex-1"
                    >
                      {searchResult.title}
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mb-2 ml-9 truncate">{searchResult.url}</p>
                  {searchResult.snippet && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 ml-9 line-clamp-2">{searchResult.snippet}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
