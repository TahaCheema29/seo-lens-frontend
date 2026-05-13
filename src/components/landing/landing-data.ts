import type { LucideIcon } from "lucide-react"
import {
  Globe,
  LineChart,
  Search,
  Sparkles,
  Users,
} from "lucide-react"

export type LandingService = {
  id: string
  shortLabel: string
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export const LANDING_SERVICES: LandingService[] = [
  {
    id: "service-site-seo",
    shortLabel: "Site SEO",
    title: "Site SEO analysis",
    description:
      "Crawl your site, audit on-page SEO, technical health, and performance signals in one place.",
    href: "/analyze-site-seo",
    icon: Globe,
  },
  {
    id: "service-keyword-rank",
    shortLabel: "Rank check",
    title: "Keyword rank checker",
    description:
      "See where you stand in search results for your target keywords and landing pages.",
    href: "/analyze-rank",
    icon: LineChart,
  },
  {
    id: "service-keyword-research",
    shortLabel: "Research",
    title: "Keyword research",
    description:
      "Discover related terms, long-tail ideas, and questions people ask around your seed keywords.",
    href: "/suggest-keywords",
    icon: Search,
  },
  {
    id: "service-seo-insights",
    shortLabel: "Insights",
    title: "SEO insights",
    description:
      "Save and revisit deep SEO insight runs from your dashboard for ongoing optimization.",
    href: "/dashboard/seo-insights",
    icon: Sparkles,
  },
  {
    id: "service-competitors",
    shortLabel: "Competitors",
    title: "Competitor analysis",
    description:
      "Track competitors, overlaps, and opportunities—available with a Pro workspace.",
    href: "/dashboard/competitors",
    icon: Users,
  },
]
