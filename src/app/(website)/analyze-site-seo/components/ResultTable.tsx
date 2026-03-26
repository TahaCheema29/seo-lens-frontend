import { Card } from "@/components/ui/card"

export default function ResultsTable({ results }: { results: any[] }) {
  return (
    <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-700 border-b border-gray-300 dark:border-slate-600">
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Page</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">
                Meta Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Meta Keywords</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">H1</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">H2</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">H3</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Alt Check</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Canonical</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Mobile</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">Schema</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">LCP</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">FID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-gray-200">CLS</th>
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
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate block"
                    >
                      {result.url}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">
                  {result.metaDescription || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">
                  {result.metaKeywords || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{result.h1 || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{result.h2 || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{result.h3 || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{result.altCheck || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{result.canonical || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">
                  {result.mobileResponsiveness || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">
                  {result.schemaValidation || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{result.lcp || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{result.fid || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{result.cls || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
