"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import KeywordRankResults from "./components/KeywordRankResults"
import { TAnalyzeKeywordRankResult } from "@/types/analyzeKeywordRank"
import { useAnalyzeKeywordRank } from "@/services/seoTools/seoToolsMutation"

const validHttpUrl = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;

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
      toast.error("⚠️ Cannot Remove Keyword", {
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
      toast.error("⚠️ Missing Domain", {
        description: "Please enter a domain before checking rankings.",
        duration: 3000,
      })
      return
    }

    // ✅ validate the domain as per HttpUrl (http/https + valid host)
    if (!validHttpUrl.test(trimmedDomain)) {
      toast.error("❌ Invalid URL", {
        description:
          "Please enter a valid domain like https://example.com or http://example.org.",
        duration: 4000,
      })
      return
    }

    const validKeywords = keywords.map((k) => k.trim()).filter((k) => k.length > 0)

    if (validKeywords.length === 0) {
      toast.error("⚠️ No Keywords Provided", {
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
          toast.success("✅ Rank Check Complete", {
            description: `Checked ${validKeywords.length} keywords for ${trimmedDomain}.`,
            duration: 3000,
          })
        },
        onError: () => {
          toast.error("❌ Error", {
            description: "Failed to check keyword rankings. Please try again later.",
            duration: 3000,
          })
        },
      }
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-black dark:text-white mb-4 text-balance">
              Track Your Keyword Rankings
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-balance">
              Monitor where your website ranks for specific keywords and track your SEO progress over time.
            </p>
          </div>

          <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-200 mb-2">
                  Target Domain
                </label>
                <Input
                  type="text"
                  placeholder="https://example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400 h-12"
                />
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Enter full URL (must start with http:// or https://)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-200 mb-3">
                  Keywords to Check
                </label>
                <div className="space-y-3">
                  {keywords.map((keyword, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder={`Keyword ${index + 1}`}
                          value={keyword}
                          onChange={(e) => updateKeywordField(index, e.target.value)}
                          className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400 h-10"
                        />
                      </div>
                      <Button
                        onClick={addKeywordField}
                        className="h-10 px-3 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold"
                        title="Add keyword"
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => removeKeywordField(index)}
                        disabled={keywords.length === 1}
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

              <Button
                onClick={handleCheck}
                disabled={isPending}
                className="w-full h-12 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold text-lg"
              >
                {isPending ? "Checking Rankings..." : "Check Rankings"}
              </Button>
            </div>
          </Card>
        </div>

        {results && results.length > 0 && (
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
