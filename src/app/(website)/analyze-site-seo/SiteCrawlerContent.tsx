"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import SEOReport from "./components/SEOReport"
import { AnalyzeSiteSeoResponse, CrawlMode } from "@/types/analyzeSiteSEO"
import { useAnalyzeSeoSite } from "@/services/seoTools/seoToolsMutation"
import CrawlPreview from "@/components/CrawlPreview"
import { Search, Zap, Globe, ArrowRight, Sparkles, Shield } from "lucide-react"

const validHttpUrl = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function SiteCrawlerPageContent() {
  const searchParams = useSearchParams()
  const [url, setUrl] = useState("")
  const [crawlMode, setCrawlMode] = useState<CrawlMode.SITEMAP_ONLY | CrawlMode.FULL_CRAWL>(CrawlMode.SITEMAP_ONLY)
  const [results, setResults] = useState<AnalyzeSiteSeoResponse>()
  const [crawlId, setCrawlId] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const { mutate: getSeoReport, isPending } = useAnalyzeSeoSite()

  // Read url from URL params on mount
  useEffect(() => {
    const urlFromParams = searchParams.get("url")
    if (urlFromParams) {
      setUrl(urlFromParams)
    }
  }, [searchParams])

  const handleCrawlModeChange = (value: CrawlMode) => {
    setCrawlMode(value)
    if (value === CrawlMode.FULL_CRAWL) {
      toast.info("Full Crawl Selected", {
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
      toast.error("Invalid URL", {
        description: "Please enter a valid domain like https://example.com",
        duration: 4000,
      })
      return
    }

    setResults(undefined)
    setShowPreview(false)
    setCrawlId(null)

    const newCrawlId = crawlMode === CrawlMode.FULL_CRAWL 
      ? `seo-check-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      : null
    
    setCrawlId(newCrawlId)
    
    if (crawlMode === CrawlMode.FULL_CRAWL && newCrawlId) {
      setTimeout(() => setShowPreview(true), 500)
    }

    getSeoReport(
      {
        userInput: { url: url, crawlMode: crawlMode },
        crawlId: newCrawlId || undefined
      },
      {
        onSuccess: (data) => {
          setResults(data)
          toast.success("Analysis Complete", {
            description: "Website analysis report is ready",
            duration: 3000,
          })
        },
        onError: () => {
          setShowPreview(false)
          toast.error("Failed to analyze the website", {
            description: "Please try again later.",
            duration: 3000,
          })
        },
      }
    )
  }

  const features = [
    { icon: Globe, title: "Deep Crawling", desc: "Analyze every page on your site" },
    { icon: Zap, title: "Fast Results", desc: "Get insights in seconds" },
    { icon: Shield, title: "SEO Health", desc: "Comprehensive SEO audit" },
  ]

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Hero Section */}
        <motion.div 
          className="max-w-3xl mx-auto mb-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-10" variants={fadeInUp}>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-sm font-medium mb-6"
              variants={fadeInUp}
            >
              <Sparkles className="w-4 h-4" />
              <span>Advanced SEO Analysis Tool</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight"
              variants={fadeInUp}
            >
              Analyze Your Website's
              <span className="block mt-2 bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-300 dark:to-white bg-clip-text text-transparent">
                SEO Performance
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Get comprehensive insights into your site's SEO health with our advanced crawling and analysis tools.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-3 gap-4 mb-10"
            variants={fadeInUp}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="text-center p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                </div>
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Input Card */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 p-8 shadow-xl shadow-neutral-200/50 dark:shadow-black/50">
              <div className="space-y-6">
                {/* URL Input */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                    Website URL
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={isPending}
                      className="pl-12 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-xl focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
                      onKeyPress={(e) => e.key === "Enter" && !isPending && handleAnalyze()}
                    />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                    Enter full URL (must start with http:// or https://)
                  </p>
                </div>

                {/* Crawl Mode Selection */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                    Crawl Mode
                  </label>
                  <Select value={crawlMode} onValueChange={handleCrawlModeChange} disabled={isPending}>
                    <SelectTrigger className="bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white h-14 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                      <SelectItem value="SITEMAP_ONLY" className="text-neutral-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span>Sitemap Only (Fast)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="FULL_CRAWL" className="text-neutral-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>Full Crawl (Comprehensive)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Analyze Button */}
                <Button
                  onClick={handleAnalyze}
                  disabled={isPending}
                  className="w-full h-14 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold text-lg rounded-xl group transition-all duration-300"
                >
                  {isPending ? (
                    <motion.div 
                      className="flex items-center gap-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-5 h-5 border-2 border-white/30 dark:border-neutral-900/30 border-t-white dark:border-t-neutral-900 rounded-full animate-spin" />
                      Analyzing...
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Analyze Website
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Live Preview Section */}
        <AnimatePresence>
          {showPreview && crawlId && crawlMode === CrawlMode.FULL_CRAWL && (
            <motion.div 
              className="max-w-6xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CrawlPreview crawlId={crawlId} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SEOReport data={results} baseUrl={results.baseUrlChecks.baseUrl} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  )
}
