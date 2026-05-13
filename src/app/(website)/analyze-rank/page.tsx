import { Suspense } from "react"
import KeywordRankChecker from "./KeywordRankChecker"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white rounded-full animate-spin" />
    </div>
  )
}

export default function AnalyzeRankPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <KeywordRankChecker />
    </Suspense>
  )
}
