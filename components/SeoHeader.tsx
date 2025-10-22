import { SeoLensIcon } from "@/assets"
import Image from "next/image"
import Link from "next/link"

export default function SeoHeader() {
  return (
    <header className="border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 dark:bg-white rounded-lg flex items-center justify-center">
            <Image width={32} height={32} src={SeoLensIcon} alt={"seo-lens icon"}/>
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-white">SEO-Lens</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/site-crawler" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Site Crawler
          </Link>
          <Link
            href="/keyword-rank"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Keyword Rank
          </Link>
        </nav>
      </div>
    </header>
  )
}
