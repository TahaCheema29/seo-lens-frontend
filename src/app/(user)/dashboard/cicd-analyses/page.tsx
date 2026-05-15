import { CicdHistory } from '@/components/dashboard/user/CicdHistory';
import { ProGuard } from '@/components/subscription/ProGuard';

export default function CicdAnalysesPage() {
  return (
    <ProGuard
      featureName="CI/CD Analyses"
      description="View deployment analysis history and track SEO scores across your releases to ensure quality with every deployment."
    >
      <CicdHistory />
    </ProGuard>
  );
}
