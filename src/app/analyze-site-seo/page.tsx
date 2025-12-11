"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, Toaster } from "sonner"
import ResultsTable from "./components/ResultTable"
import { AnalyzeSiteSeoResponse, CrawlMode } from "@/types/analyzeSiteSEO"
import { useAnalyzeSeoSite } from "@/services/seoTools/seoToolsMutation"
import CrawlPreview from "@/components/CrawlPreview"

const validHttpUrl = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;

export default function SiteCrawlerPage() {
  const [url, setUrl] = useState("")
  const [crawlMode, setCrawlMode] = useState<CrawlMode.SITEMAP_ONLY | CrawlMode.FULL_CRAWL>(CrawlMode.SITEMAP_ONLY)
  const [results, setResults] = useState<AnalyzeSiteSeoResponse>()
  const [crawlId, setCrawlId] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [requestStarted, setRequestStarted] = useState(false)
  const { mutate: getSeoReport, isPending } = useAnalyzeSeoSite()

  const handleCrawlModeChange = (value: CrawlMode) => {
    setCrawlMode(value)
    if (value === CrawlMode.FULL_CRAWL) {
      toast.info("⏱️ Full Crawl Selected", {
        description: "This will take more time to complete. Please be patient.",
        duration: 3000,
      })
    }
  }

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL")
      return
    }

    if (!validHttpUrl.test(url)) {
      toast.error("❌ Invalid URL", {
        description:
          "Please enter a valid domain like https://example.com or http://example.org.",
        duration: 4000,
      })
      return
    }

    // Generate crawl ID for live preview (only for FULL_CRAWL mode)
    const newCrawlId = crawlMode === CrawlMode.FULL_CRAWL 
      ? `seo-check-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      : null
    
    setCrawlId(newCrawlId)
    setRequestStarted(true)
    
    // Only show preview for FULL_CRAWL mode and after a small delay to let request start
    if (crawlMode === CrawlMode.FULL_CRAWL && newCrawlId) {
      setTimeout(() => {
        setShowPreview(true)
      }, 500) // Small delay to let HTTP request start first
    } else {
      setShowPreview(false)
    }

    getSeoReport(
      {
        userInput: { url: url, crawlMode: crawlMode },
        crawlId: newCrawlId || undefined
      },
      {
        onSuccess: (data) => {
          setResults(data)
          setRequestStarted(false)
          toast("✅ Analysis Complete", {
            description: `Website analysis report is shown in the table`,
            duration: 3000,
          })
        },
        onError: () => {
          setShowPreview(false)
          setRequestStarted(false)
          toast("❌ Failed to analyze the website", {
            description: "Please try again later.",
            duration: 3000,
          })
        },
      }
    )

  }

  return (
    <main className="min-h-screen bg-white dark:bg-linear--to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-black dark:text-white mb-4 text-balance">
              Analyze Your Website's SEO Performance
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-balance">
              Get comprehensive insights into your site's SEO health with our advanced crawling and analysis tools.
            </p>
          </div>

          {/* Input Card */}
          <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-8 shadow-lg">
            <div className="space-y-6">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-200 mb-2">Website URL</label>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400 h-12"
                  onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                />
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Enter full URL (must start with http:// or https://)
                </p>
              </div>

              {/* Crawl Mode Selection */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-200 mb-2">Crawl Mode</label>
                <Select value={crawlMode} onValueChange={handleCrawlModeChange}>
                  <SelectTrigger className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                    <SelectItem value="SITEMAP_ONLY" className="text-black dark:text-white">
                      📋 Sitemap Only (Fast)
                    </SelectItem>
                    <SelectItem value="FULL_CRAWL" className="text-black dark:text-white">
                      🔍 Full Crawl (Comprehensive)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={isPending}
                className="w-full h-12 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold text-lg"
              >
                {isPending ? "Analyzing..." : "Analyze Website"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Live Preview Section - Only show for FULL_CRAWL mode */}
        {/* {showPreview && crawlId && crawlMode === CrawlMode.FULL_CRAWL && (
          <div className="max-w-6xl mx-auto mb-8">
            <CrawlPreview
              crawlId={crawlId}
            />
          </div>
        )} */}

        {/* Results Section */}
        {/* {results.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-2">Analysis Results</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Crawl Mode:{" "}
                <span className="font-semibold text-black dark:text-white">
                  {crawlMode === "SITEMAP_ONLY" ? "Sitemap Only" : "Full Crawl"}
                </span>
              </p>
            </div>
            <ResultsTable results={results} />
          </div>
        )} */}
      </div>

      <Toaster />
    </main>
  )
}