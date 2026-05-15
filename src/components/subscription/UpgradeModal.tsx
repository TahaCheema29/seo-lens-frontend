"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCreateCheckout } from "@/services/subscription/subscriptionQueries"

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const proFeatures = [
  "Competitor Analysis",
  "CI/CD Auto Re-analysis",
  "GitHub/GitLab Integration",
  "Advanced SEO Reports",
  "Priority Support",
]

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  const { mutate: createCheckout, isPending } = useCreateCheckout()

  const handleUpgrade = () => {
    createCheckout()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Unlock Pro Features</DialogTitle>
          <DialogDescription>
            One-time payment • Lifetime access
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Feature list */}
          <ul className="space-y-3">
            {proFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="flex size-5 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="size-3 text-emerald-600" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="rounded-xl bg-muted p-4 text-center">
            <p className="text-3xl font-bold">$5</p>
            <p className="text-sm text-muted-foreground">One-time payment • Lifetime access</p>
          </div>

          {/* CTA */}
          <Button
            className="w-full rounded-full"
            size="lg"
            onClick={handleUpgrade}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Upgrade to Pro"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Secure payment powered by Stripe
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
