'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Trophy, 
  AlertCircle, 
  ThumbsUp,
  Target,
  Zap,
  Search,
  Wrench
} from 'lucide-react';
import type { ComparisonMatrix, ComparisonMatrixItem } from '@/features/dashboard/types/competitorAnalysis';

interface ComparisonMatrixProps {
  matrix: ComparisonMatrix;
}

export function ComparisonMatrixComponent({ matrix }: ComparisonMatrixProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'performance':
        return <Zap className="h-4 w-4" />;
      case 'seo':
        return <Search className="h-4 w-4" />;
      case 'technical':
        return <Wrench className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const StrengthCard = ({ item }: { item: ComparisonMatrixItem }) => (
    <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/30 dark:border-emerald-800">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
          <Trophy className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getCategoryIcon(item.category)}
            <span className="text-sm text-muted-foreground capitalize">{item.category}</span>
          </div>
          <h4 className="font-semibold mb-1">{item.metric}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
            <div>
              <span className="text-muted-foreground">You: </span>
              <span className="font-medium text-emerald-700 dark:text-emerald-400">{item.yourValue}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Them: </span>
              <span className="font-medium">{item.competitorValue}</span>
            </div>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
            <TrendingUp className="mr-1 h-3 w-3" />
            {item.advantage}
          </Badge>
          <p className="text-sm text-muted-foreground mt-2">{item.whatThisMeans}</p>
          {item.keepDoing && (
            <div className="mt-2 p-2 bg-emerald-100/50 dark:bg-emerald-900/30 rounded text-sm text-emerald-800 dark:text-emerald-300">
              <ThumbsUp className="inline h-3 w-3 mr-1" />
              {item.keepDoing}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const WeaknessCard = ({ item }: { item: ComparisonMatrixItem }) => (
    <div className="p-4 rounded-lg border border-red-200 bg-red-50/50 dark:bg-red-950/30 dark:border-red-800">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/50">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getCategoryIcon(item.category)}
            <span className="text-sm text-muted-foreground capitalize">{item.category}</span>
          </div>
          <h4 className="font-semibold mb-1">{item.metric}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
            <div>
              <span className="text-muted-foreground">You: </span>
              <span className="font-medium text-red-700 dark:text-red-400">{item.yourValue}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Them: </span>
              <span className="font-medium">{item.competitorValue}</span>
            </div>
          </div>
          <Badge className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
            <TrendingDown className="mr-1 h-3 w-3" />
            {item.gap}
          </Badge>
          <p className="text-sm text-muted-foreground mt-2">{item.whatThisMeans}</p>
          {item.improvementPriority && (
            <div className="mt-2 p-2 bg-red-100/50 dark:bg-red-900/30 rounded text-sm text-red-800 dark:text-red-300">
              <Target className="inline h-3 w-3 mr-1" />
              {item.improvementPriority}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const TieCard = ({ item }: { item: ComparisonMatrixItem }) => (
    <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50 dark:bg-gray-900/30 dark:border-gray-700">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
          <Minus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getCategoryIcon(item.category)}
            <span className="text-sm text-muted-foreground capitalize">{item.category}</span>
          </div>
          <h4 className="font-semibold mb-1">{item.metric}</h4>
          <Badge className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
            {item.status}
          </Badge>
          {item.note && (
            <p className="text-sm text-muted-foreground mt-2">{item.note}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500" />
          Comparison Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="strengths" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strengths" className="relative">
              Strengths
              <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                {matrix.whereYouWin.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="weaknesses" className="relative">
              Areas to Improve
              <Badge variant="secondary" className="ml-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                {matrix.whereYouLose.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="ties" className="relative">
              Ties
              <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {matrix.tie.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strengths" className="mt-4">
            {matrix.whereYouWin.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {matrix.whereYouWin.map((item, index) => (
                  <StrengthCard key={index} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingDown className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>No strengths found yet. Check the "Areas to Improve" tab.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="weaknesses" className="mt-4">
            {matrix.whereYouLose.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {matrix.whereYouLose.map((item, index) => (
                  <WeaknessCard key={index} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-3 text-emerald-500" />
                <p className="font-medium">Great job!</p>
                <p>No weaknesses found. You're ahead in all areas.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ties" className="mt-4">
            {matrix.tie.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {matrix.tie.map((item, index) => (
                  <TieCard key={index} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Minus className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>No ties. You and your competitor have different strengths.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
