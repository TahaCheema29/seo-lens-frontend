import { Card } from "@/components/ui/card"

interface KeywordRank {
  keyword: string
  position: number | null
  totalResults: number
  status: string
  statusIcon: string
}

export default function KeywordRankResults({
  results,
  domain,
}: {
  results: KeywordRank[]
  domain: string
}) {
  const firstPageCount = results.filter((r) => r.position && r.position <= 10).length
  const notRankingCount = results.filter((r) => r.position === null).length

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
      <div className="space-y-4">
        {results.map((result, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-6 hover:border-gray-400 dark:hover:border-slate-600 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{result.statusIcon}</span>
                  <h3 className="text-xl font-bold text-black dark:text-white">{result.keyword}</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Position */}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Position</p>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {result.position ? `#${result.position}` : "N/A"}
                    </p>
                  </div>

                  {/* Total Results */}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Total Results</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      {(result.totalResults / 1000000).toFixed(1)}M
                    </p>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Status</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{result.status}</p>
                  </div>
                </div>
              </div>

              {/* Right Badge */}
              <div className="flex-shrink-0">
                {result.position && result.position <= 10 ? (
                  <div className="bg-black dark:bg-white rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-white dark:text-black font-semibold">RANKING</p>
                    <p className="text-2xl font-bold text-white dark:text-black">{result.position}</p>
                  </div>
                ) : result.position ? (
                  <div className="bg-gray-400 dark:bg-gray-600 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-white font-semibold">POSITION</p>
                    <p className="text-2xl font-bold text-white">{result.position}</p>
                  </div>
                ) : (
                  <div className="bg-gray-300 dark:bg-gray-700 rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold">NOT</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">FOUND</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
