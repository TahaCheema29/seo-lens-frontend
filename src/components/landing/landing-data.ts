import { Search, TrendingUp, KeyRound } from "lucide-react"

export const LANDING_SERVICES = [
  {
    id: "site-seo-analyzer",
    shortLabel: "Site SEO",
    title: "Site SEO Analyzer",
    description:
      "Crawl your site and get actionable SEO insights: performance, accessibility, best practices, and search readiness.",
    href: "/analyze-site-seo",
    icon: Search,
  },
  {
    id: "keyword-rank",
    shortLabel: "Rank Check",
    title: "Keyword Rank Checker",
    description:
      "Check where your pages rank for target keywords across search engines and track changes over time.",
    href: "/analyze-rank",
    icon: TrendingUp,
  },
  {
    id: "keyword-research",
    shortLabel: "Research",
    title: "Keyword Research",
    description:
      "Discover keyword opportunities with search volume, competition scores, and related suggestions.",
    href: "/suggest-keywords",
    icon: KeyRound,
  },
]
