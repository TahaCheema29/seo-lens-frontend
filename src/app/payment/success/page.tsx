"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { subscriptionKeys } from "@/services/subscription/subscriptionQueries"
import { useCurrentUser } from "@/services/auth/authQuery"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      toast.error("Invalid session")
      router.push("/dashboard")
      return
    }

    // Wait a moment for the webhook to process
    const timer = setTimeout(async () => {
      try {
        // Invalidate subscription query to refresh the data
        await queryClient.invalidateQueries({ queryKey: subscriptionKeys.detail(user?.id) })
        
        toast.success("Welcome to Pro! 🎉 All features unlocked.")
        router.push("/dashboard")
      } catch (error) {
        toast.error("Something went wrong. Please refresh the page.")
        router.push("/dashboard")
      } finally {
        setIsProcessing(false)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [searchParams, router, queryClient, user])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        {isProcessing ? (
          <>
            <Loader2 className="mx-auto size-12 animate-spin text-primary" />
            <h1 className="mt-4 text-xl font-semibold">Processing your payment...</h1>
            <p className="mt-2 text-muted-foreground">Please wait while we activate your Pro account.</p>
          </>
        ) : (
          <>
            <CheckCircle className="mx-auto size-12 text-emerald-600" />
            <h1 className="mt-4 text-xl font-semibold">Payment Successful!</h1>
            <p className="mt-2 text-muted-foreground">Redirecting to dashboard...</p>
          </>
        )}
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="mx-auto size-12 animate-spin text-primary" />
          <h1 className="mt-4 text-xl font-semibold">Loading...</h1>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
