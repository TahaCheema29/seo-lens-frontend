"use client"

import { useState } from "react"
import { Lock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useIsPro } from "@/services/subscription/subscriptionQueries"
import { UpgradeModal } from "./UpgradeModal"

interface ProGuardProps {
  children: React.ReactNode
  featureName: string
  description: string
}

export function ProGuard({ children, featureName, description }: ProGuardProps) {
  const { isPro, isLoading } = useIsPro()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!isPro) {
    return (
      <>
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="size-6 text-primary" />
            </div>
            <CardTitle className="text-xl">{featureName}</CardTitle>
            <CardDescription className="max-w-sm mx-auto">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="rounded-xl bg-muted p-4 mb-4">
              <p className="text-2xl font-bold">$5</p>
              <p className="text-sm text-muted-foreground">One-time payment • Lifetime access</p>
            </div>
            <Button
              className="rounded-full"
              size="lg"
              onClick={() => setShowUpgradeModal(true)}
            >
              <Sparkles className="mr-2 size-4" />
              Unlock with Pro
            </Button>
          </CardContent>
        </Card>

        <UpgradeModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />
      </>
    )
  }

  return <>{children}</>
}
