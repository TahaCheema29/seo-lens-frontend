import { CicdSetup } from '@/components/dashboard/user/CicdSetup';
import { ProGuard } from '@/components/subscription/ProGuard';

export default function CicdSetupPage() {
  return (
    <ProGuard
      featureName="CI/CD Setup"
      description="Configure automated SEO analysis in your GitHub Actions or GitLab CI pipeline to catch issues before they reach production."
    >
      <CicdSetup />
    </ProGuard>
  );
}
