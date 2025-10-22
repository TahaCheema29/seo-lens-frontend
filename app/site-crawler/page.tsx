"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, Toaster } from "sonner"
import ResultsTable from "./components/ResultTable"

export default function SiteCrawlerPage() {
  const [url, setUrl] = useState("")
  const [crawlMode, setCrawlMode] = useState("SITEMAP_ONLY")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleCrawlModeChange = (value: string) => {
    setCrawlMode(value)
    if (value === "FULL_CRAWL") {
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

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock results data
      const mockResults = [
        {
          url: "https://example.com",
          title: "Home Page",
          status: "✅ 200 OK",
          metaDescription: "Present",
          h1Tag: "✅ Present",
          mobileOptimized: "✅ Yes",
          loadTime: "1.2s",
        },
        {
          url: "https://example.com/about",
          title: "About Page",
          status: "✅ 200 OK",
          metaDescription: "Present",
          h1Tag: "✅ Present",
          mobileOptimized: "✅ Yes",
          loadTime: "0.9s",
        },
        {
          url: "https://example.com/contact",
          title: "Contact Page",
          status: "✅ 200 OK",
          metaDescription: "❌ Missing",
          h1Tag: "✅ Present",
          mobileOptimized: "✅ Yes",
          loadTime: "1.5s",
        },
        {
          url: "https://example.com/blog",
          title: "Blog",
          status: "✅ 200 OK",
          metaDescription: "Present",
          h1Tag: "❌ Missing",
          mobileOptimized: "❌ No",
          loadTime: "2.1s",
        },
      ]

      setResults(mockResults)
      setShowResults(true)
      toast.success("✅ Analysis Complete", {
        description: `Found ${mockResults.length} pages to analyze`,
      })
    } catch (error) {
      toast.error("Failed to analyze the website")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
                disabled={isLoading}
                className="w-full h-12 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold text-lg"
              >
                {isLoading ? "Analyzing..." : "Analyze Website"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        {showResults && (
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
        )}
      </div>

      <Toaster />
    </main>
  )
}