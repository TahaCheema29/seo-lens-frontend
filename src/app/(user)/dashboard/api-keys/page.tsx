import { ApiKeyManager } from '@/components/dashboard/user/ApiKeyManager';
import { ProGuard } from '@/components/subscription/ProGuard';

export default function ApiKeysPage() {
  return (
    <ProGuard
      featureName="API Keys"
      description="Generate API keys to integrate SEO analysis into your CI/CD pipeline and automate checks on every deployment."
    >
      <ApiKeyManager />
    </ProGuard>
  );
}
