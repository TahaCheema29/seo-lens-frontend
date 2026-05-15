'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink } from 'lucide-react';

interface CompetitorAnalysisFormProps {
  onSubmit?: (userUrl: string, competitorUrl: string, mode: string) => void;
  isLoading?: boolean;
}

export function CompetitorAnalysisForm({ onSubmit, isLoading }: CompetitorAnalysisFormProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the public analyze-competitor page
    router.push('/analyze-competitor');
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      <Plus className="mr-2 h-4 w-4" />
      New Analysis
      <ExternalLink className="ml-2 h-3 w-3" />
    </Button>
  );
}
