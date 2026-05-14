'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for auth token in localStorage (for cross-domain support)
    const userToken = localStorage.getItem('access_token');
    const adminToken = localStorage.getItem('admin_access_token');

    console.log('[AuthGuard] Checking auth...');
    console.log('[AuthGuard] Has user token:', !!userToken);
    console.log('[AuthGuard] Has admin token:', !!adminToken);

    if (requireAdmin) {
      if (!adminToken) {
        console.log('[AuthGuard] No admin token, redirecting to admin login');
        router.push('/admin/login');
        return;
      }
    } else {
      if (!userToken) {
        console.log('[AuthGuard] No user token, redirecting to login');
        router.push('/login');
        return;
      }
    }

    setIsAuthenticated(true);
  }, [router, requireAdmin]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
      </div>
    );
  }

  return <>{children}</>;
}
