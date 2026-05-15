"use client"

import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProBadgeProps {
  locked?: boolean
  className?: string
}

export function ProBadge({ locked = false, className }: ProBadgeProps) {
  if (locked) {
    return (
      <span
        className={cn(
          "ml-2 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
          className
        )}
      >
        <Lock className="size-3" />
        PRO
      </span>
    )
  }

  return (
    <span
      className={cn(
        "ml-2 inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground",
        className
      )}
    >
      PRO
    </span>
  )
}
