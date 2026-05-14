'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2, Shield, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useRegisterAdmin } from '@/services/auth/authMutation';
import { toast } from 'sonner';

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain one uppercase letter')
    .regex(/[0-9]/, 'Password must contain one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function AdminRegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegisterAdmin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  const passwordRequirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
  ];

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(
      { fullName: data.fullName, email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          toast.success(response.message || 'Admin account created successfully!');

          // Store token in localStorage for cross-domain auth
          const token = response.data?.accessToken || response.data?.access_token;
          if (token && typeof window !== 'undefined') {
            localStorage.setItem('admin_access_token', token);
            console.log('[Admin Register] Token stored in localStorage');
          }

          // Navigate to dashboard
          router.push('/admin/dashboard/users');
        },
        onError: (error: unknown) => {
          console.log('Admin registration error:', error);
          const err = error as { response?: { data?: { message?: string } }; message?: string };
          toast.error(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
        }
      }
    );
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
          <CardTitle className="text-2xl font-bold text-white dark:text-white">Create Admin Account</CardTitle>
          <CardDescription className="text-slate-400 dark:text-slate-400">Register as a platform administrator</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-300 dark:text-slate-300">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Admin Name"
                {...register('fullName')}
                className="h-11 bg-slate-800/50 dark:bg-slate-800/50 border-slate-700 dark:border-slate-700 text-white dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.fullName && <p className="text-xs text-red-400">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 dark:text-slate-300">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@seolens.com"
                {...register('email')}
                className="h-11 bg-slate-800/50 dark:bg-slate-800/50 border-slate-700 dark:border-slate-700 text-white dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 dark:text-slate-300">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create admin password"
                  {...register('password')}
                  className="h-11 pr-10 bg-slate-800/50 dark:bg-slate-800/50 border-slate-700 dark:border-slate-700 text-white dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
              {password && (
                <div className="space-y-1 pt-2">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <CheckCircle className={`h-3 w-3 ${req.met ? 'text-emerald-500' : 'text-slate-600 dark:text-slate-600'}`} />
                      <span className={req.met ? 'text-emerald-400 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300 dark:text-slate-300">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm admin password"
                  {...register('confirmPassword')}
                  className="h-11 pr-10 bg-slate-800/50 dark:bg-slate-800/50 border-slate-700 dark:border-slate-700 text-white dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>
            
            <Button type="submit" className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating admin account...
                </>
              ) : (
                'Register as Admin'
              )}
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-500">Restricted Access</span>
            </div>
          </div>
          
          <p className="mt-6 text-center text-sm text-slate-400 dark:text-slate-400">
            Already have an admin account?{' '}
            <Link href="/admin/login" className="font-medium text-emerald-400 dark:text-emerald-400 hover:text-emerald-300 dark:hover:text-emerald-300">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}