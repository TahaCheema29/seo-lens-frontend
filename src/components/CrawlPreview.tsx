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
  const [status, setStatus] = useState("Connecting...")
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
      setStatus("Live streaming...")
      setWs(websocket)
    }

    websocket.onmessage = (e) => {
      const data: CrawlFrame = JSON.parse(e.data)
      setFrame(data)

      if (data.type === "navigate") {
        setStatus(`Navigating to ${data.url}`)
      } else if (data.type === "complete") {
        setStatus(`Complete! ${data.visited || 0} pages crawled`)
      } else if (data.type === "error") {
        setStatus(`Error: ${data.error || "Unknown error"}`)
      }
    }

    websocket.onerror = () => {
      setStatus("Connection error")
    }

    websocket.onclose = () => {
      setStatus("Disconnected")
      setWs(null)
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
    <Card className="bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-black dark:text-white">Live Crawl Preview</h3>
          <div className={`w-2 h-2 rounded-full ${ws ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {ws ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{status}</p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Live View */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div ref={videoRef} className="h-96 md:h-[500px] flex items-center justify-center">
            {displayedScreenshot ? (
              <img
                src={displayedScreenshot}
                alt="Live crawl"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-gray-500 text-lg">Waiting for crawl to start...</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

