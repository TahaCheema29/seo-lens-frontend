"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card } from "@/components/ui/card"

interface CrawlFrame {
  type: string
  screenshot?: string
  url?: string
  links_found?: number
  new_links?: number
  visited?: number
  frame?: number
  error?: string
}

interface CrawlPreviewProps {
  crawlId: string
}

export default function CrawlPreview({ crawlId }: CrawlPreviewProps) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [frame, setFrame] = useState<CrawlFrame | null>(null)
  const [displayedScreenshot, setDisplayedScreenshot] = useState<string | null>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const previousScreenshotRef = useRef<string | null>(null)
  const screenshotQueueRef = useRef<string[]>([])
  const isProcessingQueueRef = useRef<boolean>(false)
  const FRAME_DELAY_MS = 0 // No delay for immediate display

  // Process screenshot queue with delays
  const processScreenshotQueue = useCallback(() => {
    if (isProcessingQueueRef.current || screenshotQueueRef.current.length === 0) {
      return
    }

    isProcessingQueueRef.current = true
    const screenshot = screenshotQueueRef.current.shift()!

    // Update displayed screenshot
    previousScreenshotRef.current = screenshot
    setDisplayedScreenshot(screenshot)

    // Process next screenshot after delay
    setTimeout(() => {
      isProcessingQueueRef.current = false
      processScreenshotQueue()
    }, FRAME_DELAY_MS)
  }, [])

  useEffect(() => {
    if (!crawlId) return

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
    const wsUrl = apiBaseUrl.replace(/^http/, "ws") + `/seo-tools/ws/crawl/${crawlId}`

    console.log("Connecting to WebSocket:", wsUrl)

    const websocket = new WebSocket(wsUrl)

    websocket.onopen = () => {
      setWs(websocket)
    }

    websocket.onmessage = (e) => {
      const data: CrawlFrame = JSON.parse(e.data)
      setFrame(data)


    }


    return () => {
      websocket.close()
    }
  }, [crawlId])

  // Handle screenshot display with delay and persistence
  useEffect(() => {
    if (frame?.type === "frame" && frame.screenshot) {
      const screenshot = frame.screenshot

      // Add to queue
      screenshotQueueRef.current.push(screenshot)

      // Start processing if not already processing
      if (!isProcessingQueueRef.current) {
        processScreenshotQueue()
      }
    } else if (frame?.type === "frame" && !frame.screenshot) {
      // Frame without screenshot - keep showing previous one
      if (previousScreenshotRef.current) {
        setDisplayedScreenshot(previousScreenshotRef.current)
      }
    }
    // For other message types (navigate, complete, error), don't change screenshot
  }, [frame, processScreenshotQueue])

  return (
    <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full animate-pulse ${ws ? "bg-green-500" : "bg-red-500"}`} />
              <h3 className="text-xl font-bold text-black dark:text-white">Live Crawl Preview</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${ws
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}>
              {ws ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Status Bar */}
        <div className="mb-6">
          {frame?.url && (
            <p className="text-xs text-gray-500 dark:text-gray-400 ml-4 truncate">
              {frame.url}
            </p>
          )}
        </div>

        {/* Live View */}
        <div className="bg-gray-900 dark:bg-black rounded-lg overflow-hidden border-2 border-gray-800 dark:border-slate-700 shadow-inner">
          <div className="bg-gray-800 dark:bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-gray-700 dark:border-slate-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-gray-400 font-mono">Live Preview</span>
            </div>
          </div>
          <div
            ref={videoRef}
            className="h-96 md:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-950 dark:bg-black relative overflow-hidden"
          >
            {displayedScreenshot ? (
              <img
                src={displayedScreenshot}
                alt="Live crawl preview"
                className="max-w-full max-h-full object-contain transition-opacity duration-300"
              />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <div className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                  Waiting for crawl to start...
                </div>
                <div className="text-gray-500 dark:text-gray-600 text-xs mt-2">
                  Screenshots will appear here as pages are crawled
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

