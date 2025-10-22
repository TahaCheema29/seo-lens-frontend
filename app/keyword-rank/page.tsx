"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import KeywordRankResults from "./components/KeywordRankResults"

interface KeywordRank {
  keyword: string
  position: number | null
  totalResults: number
  status: string
  statusIcon: string
}

export default function KeywordRankChecker() {
  const [domain, setDomain] = useState("")
  const [keywordFields, setKeywordFields] = useState([{ id: 1, value: "" }])
  const [nextId, setNextId] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<KeywordRank[]>([])
  const [showResults, setShowResults] = useState(false)

  const addKeywordField = () => {
    setKeywordFields([...keywordFields, { id: nextId, value: "" }])
    setNextId(nextId + 1)
  }

  const removeKeywordField = (id: number) => {
    if (keywordFields.length > 1) {
      setKeywordFields(keywordFields.filter((field) => field.id !== id))
    } else {
      toast.error("⚠️ Cannot Remove Keyword", {
        description: "You must have at least one keyword.",
        duration: 3000,
      })
    }
  }

  const updateKeywordField = (id: number, value: string) => {
    setKeywordFields(keywordFields.map((field) => (field.id === id ? { ...field, value } : field)))
  }

  const handleCheck = async () => {
    if (!domain.trim()) {
      toast.error("⚠️ Missing Domain", {
        description: "Please enter a domain before checking rankings.",
        duration: 3000,
      })
      return
    }

    const validKeywords = keywordFields.map((field) => field.value.trim()).filter((k) => k.length > 0)

    if (validKeywords.length === 0) {
      toast.error("⚠️ No Keywords Provided", {
        description: "Please enter at least one keyword to check.",
        duration: 3000,
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2500))

      // Mock results data
      const mockResults: KeywordRank[] = validKeywords.map((keyword, index) => {
        const positions = [2, null, 5, 1, 15, null, 8, 3]
        const position = positions[index % positions.length]

        return {
          keyword,
          position,
          totalResults: Math.floor(Math.random() * 1000000) + 10000,
          status:
            position === null
              ? "Not ranking in top 100"
              : position <= 10
                ? "First page"
                : position <= 30
                  ? "Second page"
                  : "Third page or lower",
          statusIcon: position === null ? "❌" : position <= 10 ? "✅" : position <= 30 ? "⚠️" : "📊",
        }
      })

      setResults(mockResults)
      setShowResults(true)
      toast.success("✅ Rank Check Complete", {
        description: `Checked ${validKeywords.length} keywords for ${domain}.`,
        duration: 3000
      })
    } catch (error) {
      toast.error("❌ Error", {
        description: "Failed to check keyword rankings. Please try again later.",
        duration: 3000
      })
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
              Track Your Keyword Rankings
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-balance">
              Monitor where your website ranks for specific keywords and track your SEO progress over time.
            </p>
          </div>

          {/* Input Card */}
          <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-8 shadow-lg">
            <div className="space-y-6">
              {/* Domain Input */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-200 mb-2">Target Domain</label>
                <Input
                  type="text"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400 h-12"
                />
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Enter domain without https:// or www</p>
              </div>

              {/* Keywords Input */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-200 mb-3">
                  Keywords to Check
                </label>
                <div className="space-y-3">
                  {keywordFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder={`Keyword ${index + 1}`}
                          value={field.value}
                          onChange={(e) => updateKeywordField(field.id, e.target.value)}
                          className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400 h-10"
                        />
                      </div>
                      <Button
                        onClick={() => addKeywordField()}
                        className="h-10 px-3 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold"
                        title="Add keyword"
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => removeKeywordField(field.id)}
                        disabled={keywordFields.length === 1}
                        className="h-10 px-3 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove keyword"
                      >
                        −
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                  Click + to add more keywords, − to remove
                </p>
              </div>

              {/* Check Button */}
              <Button
                onClick={handleCheck}
                disabled={isLoading}
                className="w-full h-12 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold text-lg"
              >
                {isLoading ? "Checking Rankings..." : "Check Rankings"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-2">Ranking Results</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Domain: <span className="font-semibold text-black dark:text-white">{domain}</span>
              </p>
            </div>
            <KeywordRankResults results={results} domain={domain} />
          </div>
        )}
      </div>

      <Toaster />
    </main>
  )
}
