"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import KeywordRankResults from "./components/KeywordRankResults"
import { TAnalyzeKeywordRankResult } from "@/types/analyzeKeywordRank"
import { useAnalyzeKeywordRank } from "@/services/seoTools/seoToolsMutation"
import { Target, TrendingUp, Search, Plus, Minus, ArrowRight, BarChart3 } from "lucide-react"

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

export default function KeywordRankChecker() {
  const [domain, setDomain] = useState("")
  const [keywords, setKeywords] = useState<string[]>([""])
  const [results, setResults] = useState<TAnalyzeKeywordRankResult[]>([])
  const { mutate: getKeywordRank, isPending } = useAnalyzeKeywordRank()

  const addKeywordField = () => {
    setKeywords([...keywords, ""])
  }

  const removeKeywordField = (index: number) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((_, i) => i !== index))
    } else {
      toast.error("Cannot Remove Keyword", {
        description: "You must have at least one keyword.",
        duration: 3000,
      })
    }
  }

  const updateKeywordField = (index: number, value: string) => {
    const updated = [...keywords]
    updated[index] = value
    setKeywords(updated)
  }

  const handleCheck = async () => {
    const trimmedDomain = domain.trim()

    if (!trimmedDomain) {
      toast.error("Missing Domain", {
        description: "Please enter a domain before checking rankings.",
        duration: 3000,
      })
      return
    }

    if (!validHttpUrl.test(trimmedDomain)) {
      toast.error("Invalid URL", {
        description: "Please enter a valid domain like https://example.com",
        duration: 4000,
      })
      return
    }

    const validKeywords = keywords.map((k) => k.trim()).filter((k) => k.length > 0)

    if (validKeywords.length === 0) {
      toast.error("No Keywords Provided", {
        description: "Please enter at least one keyword to check.",
        duration: 3000,
      })
      return
    }

    getKeywordRank(
      { userInput: { url: trimmedDomain, keywords: validKeywords } },
      {
        onSuccess: (data) => {
          setResults(data)
          toast.success("Rank Check Complete", {
            description: `Checked ${validKeywords.length} keywords`,
            duration: 3000,
          })
        },
        onError: () => {
          toast.error("Error", {
            description: "Failed to check keyword rankings. Please try again.",
            duration: 3000,
          })
        },
      }
    )
  }

  const features = [
    { icon: Target, title: "Accurate Tracking", desc: "Real-time position monitoring" },
    { icon: TrendingUp, title: "Progress Monitor", desc: "Track ranking changes" },
    { icon: BarChart3, title: "Detailed Reports", desc: "Comprehensive analytics" },
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
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Hero Section */}
          <motion.div className="text-center mb-10" variants={fadeInUp}>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-sm font-medium mb-6"
              variants={fadeInUp}
            >
              <Target className="w-4 h-4" />
              <span>Keyword Ranking Tracker</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight"
              variants={fadeInUp}
            >
              Track Your
              <span className="block mt-2 bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-300 dark:to-white bg-clip-text text-transparent">
                Keyword Rankings
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Monitor where your website ranks for specific keywords and track your SEO progress over time.
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
                {/* Domain Input */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                    Target Domain
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <Input
                      type="text"
                      placeholder="https://example.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      disabled={isPending}
                      className="pl-12 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 h-14 rounded-xl focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                    Enter full URL (must start with http:// or https://)
                  </p>
                </div>

                {/* Keywords Section */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                    Keywords to Check
                  </label>
                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {keywords.map((keyword, index) => (
                        <motion.div 
                          key={index} 
                          className="flex gap-2 items-end"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex-1 relative">
                            <Input
                              type="text"
                              placeholder={`Keyword ${index + 1}`}
                              value={keyword}
                              onChange={(e) => updateKeywordField(index, e.target.value)}
                              disabled={isPending}
                              className="bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 h-12 rounded-xl focus:ring-2 focus:ring-neutral-400"
                            />
                          </div>
                          <Button
                            onClick={addKeywordField}
                            disabled={isPending}
                            className="h-12 w-12 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl"
                            title="Add keyword"
                          >
                            <Plus className="w-5 h-5" />
                          </Button>
                          <Button
                            onClick={() => removeKeywordField(index)}
                            disabled={keywords.length === 1 || isPending}
                            className="h-12 w-12 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-xl disabled:opacity-50"
                            title="Remove keyword"
                          >
                            <Minus className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                    Click + to add more keywords
                  </p>
                </div>

                {/* Check Button */}
                <Button
                  onClick={handleCheck}
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
                      Checking Rankings...
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Check Rankings
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {results && results.length > 0 && (
            <motion.div 
              className="max-w-5xl mx-auto mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Ranking Results</h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Domain: <span className="font-semibold text-neutral-900 dark:text-white">{domain}</span>
                </p>
              </div>
              <KeywordRankResults results={results} domain={domain} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Toaster 
        toastOptions={{
          style: {
            background: 'var(--dashboard-card)',
            color: 'var(--dashboard-text)',
            border: '1px solid var(--dashboard-border)',
          },
        }}
      />
    </main>
  )
}
