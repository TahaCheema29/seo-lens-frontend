import { Card } from "@/components/ui/card"

interface Result {
  url: string
  title: string
  status: string
  metaDescription: string
  h1Tag: string
  mobileOptimized: string
  loadTime: string
}

export default function ResultsTable({ results }: { results: Result[] }) {
  return (
    <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-700 border-b border-gray-300 dark:border-slate-600">
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Page</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">
                Meta Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">H1 Tag</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Mobile</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Load Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">{result.title}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{result.url}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-black dark:text-gray-300">{result.status}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 dark:text-slate-300">{result.metaDescription}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 dark:text-slate-300">{result.h1Tag}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 dark:text-slate-300">{result.mobileOptimized}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 dark:text-slate-300">{result.loadTime}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
