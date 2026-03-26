'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2, Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin/dashboard/users');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 dark:opacity-30" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-white dark:text-white">Admin Portal</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white dark:text-white">Administrator Login</CardTitle>
          <CardDescription className="text-slate-400 dark:text-slate-400">Sign in to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 dark:text-slate-300">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@seolens.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-slate-800/50 dark:bg-slate-800/50 border-slate-700 dark:border-slate-700 text-white dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300 dark:text-slate-300">Password</Label>
                <Link href="/admin/forgot-password" className="text-sm text-slate-400 dark:text-slate-400 hover:text-white dark:hover:text-white">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-slate-800/50 dark:bg-slate-800/50 border-slate-700 dark:border-slate-700 text-white dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <Button type="submit" className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In to Admin'
              )}
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-500">Secure Access</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400 dark:text-slate-400">
            <Search className="h-4 w-4" />
            <span>Authorized personnel only</span>
          </div>
          
          <p className="mt-6 text-center text-sm text-slate-400 dark:text-slate-400">
            Need user account?{' '}
            <Link href="/login" className="font-medium text-emerald-400 dark:text-emerald-400 hover:text-emerald-300 dark:hover:text-emerald-300">
              User Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}