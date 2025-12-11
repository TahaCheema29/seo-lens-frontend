"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnalyzeSiteSeoResponse, CheckStatus } from "@/types/analyzeSiteSEO"
import { CheckCircle2, XCircle, AlertTriangle, ExternalLink } from "lucide-react"
import { generateSEOReportPDF } from "@/utils/seoReportPDF"

interface SEOReportProps {
  data: AnalyzeSiteSeoResponse
  baseUrl: string
}

export default function SEOReport({ data, baseUrl }: SEOReportProps) {
  const { baseUrlChecks, urlResults } = data
  const firstResult = urlResults[0] || null

  // Calculate overall score
  const calculateScore = () => {
    let totalChecks = 0
    let passedChecks = 0
    let warningChecks = 0
    let failedChecks = 0

    // Count base URL checks
    const baseChecks = [
      baseUrlChecks.wwwRedirectCheck,
      baseUrlChecks.robotsTxtCheck,
      baseUrlChecks.httpsSslCheck,
      baseUrlChecks.directoryListingCheck,
      baseUrlChecks.expiresHeadersCheck,
      baseUrlChecks.cachingAdvice,
    ]

    baseChecks.forEach((check) => {
      if (check) {
        totalChecks++
        if (check.status === CheckStatus.PASS) passedChecks++
        else if (check.status === CheckStatus.WARNING) warningChecks++
        else if (check.status === CheckStatus.FAIL) failedChecks++
      }
    })

    // Count URL result checks
    urlResults.forEach((result) => {
      const checks = [
        result.titleLengthCheck,
        result.titleKeywordPresence,
        result.metaDescriptionLengthCheck,
        result.metaDescriptionKeywordPresence,
        result.h1Check,
        result.imageAltCheck,
        result.canonicalCheck,
        result.noindexCheck,
        result.openGraphCheck,
        result.schemaValidation,
        result.htmlSizeCheck,
        result.responseTimeCheck,
        result.jsMinificationCheck,
        result.cssMinificationCheck,
        result.mobileResponsiveness,
      ]

      checks.forEach((check) => {
        if (check) {
          totalChecks++
          if (check.status === CheckStatus.PASS) passedChecks++
          else if (check.status === CheckStatus.WARNING) warningChecks++
          else if (check.status === CheckStatus.FAIL) failedChecks++
        }
      })
    })

    // Calculate score: PASS = 100%, WARNING = 50%, FAIL = 0%
    const score = totalChecks > 0 
      ? Math.round(((passedChecks * 100 + warningChecks * 50) / totalChecks))
      : 0

    return { score, totalChecks, passedChecks, warningChecks, failedChecks }
  }

  const scoreData = calculateScore()
  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 70) return "Very Good"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 70) return "text-blue-600 dark:text-blue-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    if (score >= 40) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const StatusIcon = ({ status }: { status: CheckStatus }) => {
    switch (status) {
      case CheckStatus.PASS:
        return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
      case CheckStatus.FAIL:
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
      case CheckStatus.WARNING:
        return <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
    }
  }

  const CheckItem = ({ 
    check, 
    label, 
    value,
    customText
  }: { 
    check?: { status: CheckStatus; description: string | any }
    label?: string
    value?: string | number
    customText?: string
  }) => {
    if (!check && !customText) return null
    
    const description = check 
      ? (typeof check.description === 'string' 
          ? check.description 
          : JSON.stringify(check.description))
      : customText || ''

    return (
      <div className="flex items-start gap-3 py-2">
        {check && (
          <div className="mt-0.5">
            <StatusIcon status={check.status} />
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {value && label ? (
              <>
                <span className="font-medium">{label}</span> {value}
              </>
            ) : (
              description
            )}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Your Free SEO Report is here!
        </h1>
        <div className="flex items-center justify-center gap-2">
          <a
            href={baseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            {baseUrl}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <Button 
          variant="outline" 
          className="mt-2"
          onClick={() => generateSEOReportPDF(data, baseUrl)}
        >
          Download Report
        </Button>
      </div>

      {/* Overall Score */}
      <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black dark:text-white">
            Overall Site Score
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            A very good score is between 60 and 80. For best results, you should strive for 70 and above.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(scoreData.score)}`}>
              {scoreData.score} / 100
            </div>
            <div className={`text-xl font-semibold ${getScoreColor(scoreData.score)}`}>
              {getScoreLabel(scoreData.score)}
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-300 dark:border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-white">
                {scoreData.totalChecks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">All Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                {scoreData.failedChecks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Critical Issues</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {scoreData.warningChecks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Recommended</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {scoreData.passedChecks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Good Results</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Preview */}
      {firstResult && (
        <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-white">
              Search Preview
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Here is how the site may appear in search results:
            </p>
          </CardHeader>
          <CardContent>
            <div className="border-l-4 border-blue-500 pl-4 space-y-2">
              <div className="text-sm text-blue-600 dark:text-blue-400">
                {firstResult.url}
              </div>
              <div className="text-xl text-blue-700 dark:text-blue-300 font-medium">
                {firstResult.title}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {firstResult.metaDescription || "No meta description available."}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Basic SEO */}
      {firstResult && (
        <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-white">
              Basic SEO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {firstResult.title && (
              <CheckItem
                check={firstResult.titleLengthCheck}
                customText={`The SEO title is set and is ${firstResult.title.length} characters long.`}
              />
            )}
            {firstResult.metaDescription && (
              <CheckItem
                check={firstResult.metaDescriptionLengthCheck}
                customText={`The meta description is ${firstResult.metaDescription.length} characters long, which is ${firstResult.metaDescription.length > 160 ? 'too long' : firstResult.metaDescription.length < 120 ? 'too short' : 'optimal'}.`}
              />
            )}
            <CheckItem
              check={firstResult.titleKeywordPresence}
            />
            <CheckItem
              check={firstResult.metaDescriptionKeywordPresence}
            />
            <CheckItem
              check={firstResult.h1Check}
            />
            {firstResult.h2Count !== undefined && (
              <div className="flex items-start gap-3 py-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {firstResult.h2Count > 0 
                    ? `H2 tags were found on the page.`
                    : `No H2 tags were found on the page.`
                  }
                </p>
              </div>
            )}
            <CheckItem
              check={firstResult.imageAltCheck}
            />
            {(firstResult.internalLinksCount !== undefined || firstResult.externalLinksCount !== undefined) && (
              <div className="flex items-start gap-3 py-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The page has {firstResult.internalLinksCount || 0} internal and {firstResult.externalLinksCount || 0} external links.
                  {firstResult.linksQualityGuidance && ` ${firstResult.linksQualityGuidance}`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Advanced SEO */}
      {firstResult && (
        <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-white">
              Advanced SEO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CheckItem
              check={firstResult.canonicalCheck}
            />
            <CheckItem
              check={firstResult.noindexCheck}
            />
            <CheckItem
              check={baseUrlChecks.wwwRedirectCheck}
            />
            <CheckItem
              check={baseUrlChecks.robotsTxtCheck}
            />
            <CheckItem
              check={firstResult.openGraphCheck}
            />
            <CheckItem
              check={firstResult.schemaValidation}
            />
          </CardContent>
        </Card>
      )}

      {/* Performance */}
      {firstResult && (
        <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-white">
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CheckItem
              check={baseUrlChecks.expiresHeadersCheck}
            />
            <CheckItem
              check={firstResult.jsMinificationCheck}
            />
            <CheckItem
              check={firstResult.cssMinificationCheck}
            />
            {firstResult.totalRequests !== undefined && (
              <div className="flex items-start gap-3 py-2">
                {firstResult.totalRequests > 20 ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                )}
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The page makes {firstResult.totalRequests} requests. {firstResult.totalRequests > 20 ? 'More than 20 requests can result in slow page loading.' : 'This is within acceptable limits.'}
                </p>
              </div>
            )}
            {firstResult.htmlSizeBytes !== undefined && (
              <div className="flex items-start gap-3 py-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The size of the HTML document is {(firstResult.htmlSizeBytes / 1024).toFixed(1)} Kb. {firstResult.htmlSizeBytes < 33000 ? 'This is under the average of 33 Kb.' : 'This exceeds the average of 33 Kb.'}
                </p>
              </div>
            )}
            {firstResult.responseTimeMs !== undefined && (
              <div className="flex items-start gap-3 py-2">
                {firstResult.responseTimeMs < 200 ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                )}
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The response time is {(firstResult.responseTimeMs / 1000).toFixed(1)} seconds. {firstResult.responseTimeMs < 200 ? 'This is under 0.2 seconds.' : 'This exceeds 0.2 seconds.'}
                </p>
              </div>
            )}
            {firstResult.responseTimeCheck && firstResult.responseTimeMs === undefined && (
              <CheckItem check={firstResult.responseTimeCheck} />
            )}
            {firstResult.requestsGuidance && (
              <div className="flex items-start gap-3 py-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {firstResult.requestsGuidance}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Security */}
      <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black dark:text-white">
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CheckItem
            check={baseUrlChecks.directoryListingCheck}
            label=""
          />
          <CheckItem
            check={baseUrlChecks.httpsSslCheck}
            label=""
          />
          {baseUrlChecks.httpsSslCheck?.status === CheckStatus.FAIL && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                If you aren't using an SSL certificate for your site that means you are losing a lot of potential traffic. We recommend getting an SSL certificate installed immediately.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mobile */}
      {firstResult && (
        <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-white">
              Mobile Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CheckItem
              check={firstResult.mobileResponsiveness}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

