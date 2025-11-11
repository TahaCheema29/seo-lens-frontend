"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import KeywordResearchResults from "./components/KeywordResearchResult"
import { TSuggestKeywordResult } from "@/types/suggestKeywords"
import { useSuggestedKeywords } from "@/services/seoTools/seoToolsMutation"


export default function KeywordResearch() {
    const [keywordFields, setKeywordFields] = useState([{ id: 1, value: "" }])
    const [nextId, setNextId] = useState(2)
    const [results, setResults] = useState<TSuggestKeywordResult[]>([])
    const { mutate: getSuggestedKeywords, isPending } = useSuggestedKeywords()


    const addKeywordField = () => {
        setKeywordFields([...keywordFields, { id: nextId, value: "" }])
        setNextId(nextId + 1)
    }

    const removeKeywordField = (id: number) => {
        if (keywordFields.length > 1) {
            setKeywordFields(keywordFields.filter((field) => field.id !== id))
        } else {
            toast("❌ Failed to research keywords", {
                description: "Please try again later.",
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
            toast("Error", {
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
                    toast("✅ Research Complete", {
                        description: `Researched ${validKeywords.length} keyword${validKeywords.length > 1 ? "s" : ""}`,
                        duration: 3000,
                    })
                },
                onError: () => {

                    toast("❌ Failed to research keywords", {
                        description: "Please try again later.",
                        duration: 3000,
                    })
                },
            }
        )

    }


    return (
        <main className="min-h-screen bg-white dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-black dark:text-white mb-4 text-balance">
                            Keyword Research & Suggestions
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 text-balance">
                            Discover related keywords, search trends, and content opportunities for your target keywords.
                        </p>
                    </div>

                    {/* Input Card */}
                    <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-8 shadow-lg">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-black dark:text-gray-200 mb-3">
                                    Keywords to Research
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
                                                disabled={isPending}
                                                className="cursor-pointer h-10 px-3 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold"
                                                title="Add keyword"
                                            >
                                                +
                                            </Button>
                                            <Button
                                                onClick={() => removeKeywordField(field.id)}
                                                disabled={keywordFields.length === 1 || isPending}
                                                className="cursor-pointer h-10 px-3 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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

                            {/* Research Button */}
                            <Button
                                onClick={handleResearch}
                                disabled={isPending}
                                className="w-full h-12 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold text-lg"
                            >
                                {isPending ? "Researching Keywords..." : "Start Research"}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Results Section */}
                {results.length > 0 && (
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">Research Results</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Found insights for {results.length} keyword{results.length > 1 ? "s" : ""}
                            </p>
                        </div>
                        <KeywordResearchResults results={results} />
                    </div>
                )}
            </div>

            <Toaster />
        </main>
    )
}
