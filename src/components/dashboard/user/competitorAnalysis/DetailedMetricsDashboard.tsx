'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, Search, Wrench, FileText, Link2, Share2,
  Clock, Gauge, Database, Shield, Smartphone,
  Globe, LayoutGrid, Image as ImageIcon
} from 'lucide-react';
import type { DetailedComparison, MetricComparison } from '@/features/dashboard/types/competitorAnalysis';

interface DetailedMetricsDashboardProps {
  detailedComparison: DetailedComparison;
}

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  userScore: number;
  competitorScore: number;
  metrics: { label: string; comparison: MetricComparison }[];
  color: string;
}

function MetricCard({ title, icon, userScore, competitorScore, metrics, color }: MetricCardProps) {
  const winner = userScore > competitorScore ? 'user' : userScore < competitorScore ? 'competitor' : 'tie';
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className={`${color} pb-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge 
            variant={winner === 'user' ? 'default' : winner === 'competitor' ? 'destructive' : 'secondary'}
            className="font-mono"
          >
            {winner === 'user' ? 'Winning' : winner === 'competitor' ? 'Behind' : 'Tied'}
          </Badge>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>You: {userScore}/100</span>
            <span>Them: {competitorScore}/100</span>
          </div>
          <div className="relative h-2 bg-white/30 dark:bg-black/30 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-white rounded-full transition-all"
              style={{ width: `${userScore}%` }}
            />
            <div 
              className="absolute top-0 h-full w-1 bg-red-500 dark:bg-red-400"
              style={{ left: `${competitorScore}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  metric.comparison.winner === 'user' ? 'text-emerald-600 dark:text-emerald-400' : 
                  metric.comparison.winner === 'competitor' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {metric.comparison.userValue}
                </span>
                <span className="text-gray-400 dark:text-gray-500">vs</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {metric.comparison.competitorValue}
                </span>
                {metric.comparison.gap && (
                  <Badge variant="outline" className="text-xs">
                    {metric.comparison.gap}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DetailedMetricsDashboard({ detailedComparison }: DetailedMetricsDashboardProps) {
  const { performance, seo, technical, content, links, social } = detailedComparison;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Gauge className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Detailed Metrics Analysis</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Performance Metrics */}
        {performance && (
          <MetricCard
            title="Performance"
            icon={<Zap className="h-5 w-5" />}
            userScore={performance.categoryScore.user}
            competitorScore={performance.categoryScore.competitor}
            color="bg-blue-500 text-white"
            metrics={[
              { label: 'Load Time', comparison: performance.loadTime! },
              { label: 'Page Size', comparison: performance.pageSize! },
              { label: 'Requests', comparison: performance.requestsCount! },
              ...(performance.serverResponseTime ? [{ label: 'Server Response', comparison: performance.serverResponseTime }] : []),
            ]}
          />
        )}

        {/* SEO Metrics */}
        {seo && (
          <MetricCard
            title="SEO"
            icon={<Search className="h-5 w-5" />}
            userScore={seo.categoryScore.user}
            competitorScore={seo.categoryScore.competitor}
            color="bg-emerald-500 text-white"
            metrics={[
              { label: 'Title Optimization', comparison: seo.titleOptimization! },
              { label: 'Meta Descriptions', comparison: seo.metaDescriptionCoverage! },
              { label: 'Heading Structure', comparison: seo.headingStructure! },
              { label: 'Image Alt Tags', comparison: seo.imageAltCoverage! },
              ...(seo.schemaMarkup ? [{ label: 'Schema Markup', comparison: seo.schemaMarkup }] : []),
              ...(seo.canonicalTags ? [{ label: 'Canonical Tags', comparison: seo.canonicalTags }] : []),
              ...(seo.openGraphTags ? [{ label: 'Open Graph', comparison: seo.openGraphTags }] : []),
              ...(seo.internalLinks ? [{ label: 'Internal Links', comparison: seo.internalLinks }] : []),
            ]}
          />
        )}

        {/* Technical Metrics */}
        {technical && (
          <MetricCard
            title="Technical"
            icon={<Wrench className="h-5 w-5" />}
            userScore={technical.categoryScore.user}
            competitorScore={technical.categoryScore.competitor}
            color="bg-purple-500 text-white"
            metrics={[
              { label: 'HTTPS Security', comparison: technical.httpsSecurity! },
              { label: 'Mobile Friendly', comparison: technical.mobileFriendly! },
              ...(technical.robotsTxt ? [{ label: 'Robots.txt', comparison: technical.robotsTxt }] : []),
              ...(technical.wwwRedirect ? [{ label: 'WWW Redirect', comparison: technical.wwwRedirect }] : []),
              ...(technical.directoryListing ? [{ label: 'Directory Listing', comparison: technical.directoryListing }] : []),
            ]}
          />
        )}

        {/* Content Metrics */}
        {content && (
          <MetricCard
            title="Content"
            icon={<FileText className="h-5 w-5" />}
            userScore={content.categoryScore.user}
            competitorScore={content.categoryScore.competitor}
            color="bg-amber-500 text-white"
            metrics={[
              ...(content.avgWordCount ? [{ label: 'Avg Word Count', comparison: content.avgWordCount }] : []),
              ...(content.imagesPerPage ? [{ label: 'Images per Page', comparison: content.imagesPerPage }] : []),
            ]}
          />
        )}

        {/* Links Metrics */}
        {links && (
          <MetricCard
            title="Links"
            icon={<Link2 className="h-5 w-5" />}
            userScore={links.categoryScore.user}
            competitorScore={links.categoryScore.competitor}
            color="bg-cyan-500 text-white"
            metrics={[
              ...(links.totalInternalLinks ? [{ label: 'Total Internal Links', comparison: links.totalInternalLinks }] : []),
              ...(links.totalExternalLinks ? [{ label: 'Total External Links', comparison: links.totalExternalLinks }] : []),
              ...(links.avgInternalLinksPerPage ? [{ label: 'Avg Internal/Page', comparison: links.avgInternalLinksPerPage }] : []),
              ...(links.avgExternalLinksPerPage ? [{ label: 'Avg External/Page', comparison: links.avgExternalLinksPerPage }] : []),
            ]}
          />
        )}

        {/* Social Metrics */}
        {social && (
          <MetricCard
            title="Social"
            icon={<Share2 className="h-5 w-5" />}
            userScore={social.categoryScore.user}
            competitorScore={social.categoryScore.competitor}
            color="bg-pink-500 text-white"
            metrics={[
              ...(social.facebookOpenGraph ? [{ label: 'Open Graph', comparison: social.facebookOpenGraph }] : []),
            ]}
          />
        )}
      </div>
    </div>
  );
}
