"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import KeywordResearchResults from "./components/KeywordResearchResult"
import { TSuggestKeywordResult } from "@/types/suggestKeywords"
import { useSuggestedKeywords } from "@/services/seoTools/seoToolsMutation"
import { Lightbulb, TrendingUp, Search, Plus, Minus, ArrowRight, Sparkles, Target } from "lucide-react"

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

export default function KeywordResearch() {
  const searchParams = useSearchParams()
  const [keywordFields, setKeywordFields] = useState([{ id: 1, value: "" }])
  const [nextId, setNextId] = useState(2)
  const [results, setResults] = useState<TSuggestKeywordResult[]>([])
  const { mutate: getSuggestedKeywords, isPending } = useSuggestedKeywords()

  // Read keyword from URL params on mount
  useEffect(() => {
    const keywordFromUrl = searchParams.get("keyword")
    if (keywordFromUrl) {
      setKeywordFields([{ id: 1, value: keywordFromUrl }])
    }
  }, [searchParams])

  const addKeywordField = () => {
    setKeywordFields([...keywordFields, { id: nextId, value: "" }])
    setNextId(nextId + 1)
  }

  const removeKeywordField = (id: number) => {
    if (keywordFields.length > 1) {
      setKeywordFields(keywordFields.filter((field) => field.id !== id))
    } else {
      toast.error("Cannot remove", {
        description: "You need at least one keyword field",
        duration: 3000,
      })
    }
  }

  const updateKeywordField = (id: number, value: string) => {
    setKeywordFields(keywordFields.map((field) => (field.id === id ? { ...field, value } : field)))
  }

  const handleResearch = async () => {
    const validKeywords = keywordFields.map((field) => field.value.trim()).filter((k) => k.length > 0)

    if (validKeywords.length === 0) {
      toast.error("Error", {
        description: "Please enter at least one keyword",
        duration: 3000,
      })
      return
    }

    getSuggestedKeywords(
      { userInput: { keywords: validKeywords } },
      {
        onSuccess: (data) => {
          setResults(data)
          toast.success("Research Complete", {
            description: `Found insights for ${validKeywords.length} keyword${validKeywords.length > 1 ? "s" : ""}`,
            duration: 3000,
          })
        },
        onError: () => {
          toast.error("Failed to research keywords", {
            description: "Please try again later.",
            duration: 3000,
          })
        },
      }
    )
  }

  const features = [
    { icon: Lightbulb, title: "Smart Suggestions", desc: "AI-powered keyword ideas" },
    { icon: TrendingUp, title: "Trend Analysis", desc: "Track keyword popularity" },
    { icon: Target, title: "Targeted Results", desc: "Relevant to your niche" },
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
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Keyword Research</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight"
              variants={fadeInUp}
            >
              Keyword Research &
              <span className="block mt-2 bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-300 dark:to-white bg-clip-text text-transparent">
                Suggestions
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Discover related keywords, search trends, and content opportunities for your target keywords.
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
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                    Keywords to Research
                  </label>
                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {keywordFields.map((field, index) => (
                        <motion.div 
                          key={field.id} 
                          className="flex gap-2 items-end"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <Input
                              type="text"
                              placeholder={`Keyword ${index + 1}`}
                              value={field.value}
                              onChange={(e) => updateKeywordField(field.id, e.target.value)}
                              disabled={isPending}
                              className="pl-12 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 h-12 rounded-xl focus:ring-2 focus:ring-neutral-400"
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
                            onClick={() => removeKeywordField(field.id)}
                            disabled={keywordFields.length === 1 || isPending}
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
                    Click + to add more keywords for comprehensive research
                  </p>
                </div>

                {/* Research Button */}
                <Button
                  onClick={handleResearch}
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
                      Researching...
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Start Research
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
          {results.length > 0 && (
            <motion.div 
              className="max-w-6xl mx-auto mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Research Results</h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Found insights for {results.length} keyword{results.length > 1 ? "s" : ""}
                </p>
              </div>
              <KeywordResearchResults results={results} />
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
