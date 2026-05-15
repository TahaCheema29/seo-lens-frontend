import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LANDING_SERVICES } from "@/components/landing/landing-data"

export const metadata: Metadata = {
  title: "SEOLens — SEO analysis & rank tracking",
  description:
    "Welcome to SEOLens. Site audits, keyword research, rank checks, insights, and competitor tools.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="text-lg font-bold tracking-tight">
            SEOLens
          </Link>
          <nav className="flex flex-wrap items-center gap-1 text-sm font-medium">
            <Button variant="ghost" size="sm" asChild>
              <a href="#services">Services</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#pricing">Pricing</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Sign up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.18),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.25),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            All-in-one SEO toolkit
          </p>
          <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Welcome to SEOLens
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Analyze sites, research keywords, check rankings, and grow visibility—with clear
            workflows from crawl to competitor insights.
          </p>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-muted-foreground">Jump to a service</p>
            <div className="flex flex-wrap gap-2">
              {LANDING_SERVICES.map((s) => (
                <Button key={s.id} variant="outline" size="sm" className="rounded-full" asChild>
                  <a href={`#${s.id}`}>{s.shortLabel}</a>
                </Button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/register">
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="#pricing">View Pro — $5 one-time</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services anchor */}
      <div id="services" className="scroll-mt-20" />

      {LANDING_SERVICES.map((service, index) => {
        const Icon = service.icon
        const alt = index % 2 === 1
        return (
          <section
            key={service.id}
            id={service.id}
            className={`scroll-mt-20 border-b border-border py-16 md:py-24 ${
              alt ? "bg-muted/40" : "bg-background"
            }`}
          >
            <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center md:gap-16">
              <div className={alt ? "md:order-2" : ""}>
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="size-6" />
                </div>
                <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">{service.title}</h2>
                <p className="text-lg text-muted-foreground">{service.description}</p>
                <Button className="mt-6 rounded-full" asChild>
                  <Link href={service.href}>
                    Open tool
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div
                className={`rounded-2xl border border-border bg-card p-8 shadow-sm ${
                  alt ? "md:order-1" : ""
                }`}
              >
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    Purpose-built workflow for this part of your SEO stack.
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    Works alongside your SEOLens dashboard when you sign in.
                  </li>
                  <li className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    Start from this page or use the main app navigation anytime.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )
      })}

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Pricing</h2>
            <p className="mt-3 text-muted-foreground">
              Start free on the Basic plan. Upgrade to Pro for advanced analysis and competitor
              features for <span className="font-semibold text-foreground">$5</span> one-time payment.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="text-lg font-semibold">Basic</h3>
              <p className="mt-1 text-3xl font-bold">$0</p>
              <p className="mt-2 text-sm text-muted-foreground">Core tools and limited depth.</p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Site & keyword tools", "Sitemap-focused crawls", "Dashboard access"].map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    {t}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-8 w-full rounded-full" asChild>
                <Link href="/register">Create free account</Link>
              </Button>
            </div>
            <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-md">
              <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Pro
              </span>
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="mt-1 text-3xl font-bold">
                $5<span className="text-base font-normal text-muted-foreground"> one-time</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Full-site analysis, competitor workflows, and CI/CD integration.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Everything in Basic",
                  "Competitor Analysis",
                  "CI/CD Auto Re-analysis",
                  "GitHub/GitLab Integration",
                  "Lifetime access",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    {t}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full rounded-full" asChild>
                <Link href="/dashboard">Upgrade to Pro</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Login / Sign up callout */}
      <section className="border-b border-border bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Login or create an account</h2>
            <p className="mt-3 text-muted-foreground">
              Save reports, sync dashboard tools, and manage your Pro subscription from one
              workspace.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:justify-between">
          <div>
            <p className="text-lg font-bold">SEOLens</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Practical SEO tooling for teams that ship content and care about search performance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold">Product</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <a href="#services" className="hover:text-foreground">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Account</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <Link href="/login" className="hover:text-foreground">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-foreground">
                    Sign up
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Tools</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <Link href="/analyze-site-seo" className="hover:text-foreground">
                    Site SEO
                  </Link>
                </li>
                <li>
                  <Link href="/analyze-competitor" className="hover:text-foreground">
                    Competitor Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/analyze-rank" className="hover:text-foreground">
                    Rank check
                  </Link>
                </li>
                <li>
                  <Link href="/suggest-keywords" className="hover:text-foreground">
                    Research
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SEOLens. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
