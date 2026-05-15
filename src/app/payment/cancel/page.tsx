"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { XCircle } from "lucide-react"
import { toast } from "sonner"

export default function PaymentCancelPage() {
  const router = useRouter()

  useEffect(() => {
    toast.info("Payment cancelled. You can upgrade anytime.")
    
    // Redirect after a short delay
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <XCircle className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-semibold">Payment Cancelled</h1>
        <p className="mt-2 text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}
