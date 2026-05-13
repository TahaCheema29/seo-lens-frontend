import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Subscription — SEOLens Pro ($5/mo)",
  description: "SEOLens Pro subscription for $5 per month. Full-site analysis, competitors, and more.",
}

const proFeatures = [
  "Full-site (auto) SEO crawl & analysis",
  "Competitor-focused rank and overlap workflows",
  "Priority access to dashboard SEO insights",
  "Cancel anytime from your billing settings",
]

export default function SubscriptionMarketingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Pro plan</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">$5 / month</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        One simple subscription fee unlocks Pro capabilities in SEOLens—including advanced analysis
        and competitor tooling tied to your account.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h2 className="text-lg font-semibold">What you get</h2>
        <ul className="mt-4 space-y-3">
          {proFeatures.map((f) => (
            <li key={f} className="flex gap-3 text-muted-foreground">
              <Check className="mt-0.5 size-5 shrink-0 text-emerald-600" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" className="rounded-full" asChild>
          <Link href="/register">
            Create account & upgrade
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="rounded-full" asChild>
          <Link href="/login">Already have an account? Login</Link>
        </Button>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        After you sign in, manage billing from{" "}
        <Link href="/dashboard/settings" className="font-medium text-foreground underline-offset-4 hover:underline">
          Dashboard → Settings → Subscription
        </Link>
        .
      </p>

      <p className="mt-6 text-center">
        <Button variant="link" asChild>
          <Link href="/">← Back to home</Link>
        </Button>
      </p>
    </div>
  )
}
