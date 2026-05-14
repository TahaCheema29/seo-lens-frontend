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
import { Search, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useRegisterUser } from '@/services/auth/authMutation';
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

export default function UserRegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegisterUser();

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
          toast.success(response.message || 'Account created successfully!');
          
          // Store token in localStorage for cross-domain auth
          const token = response.data?.accessToken;
          if (token && typeof window !== 'undefined') {
            localStorage.setItem('access_token', token);
            console.log('[Register] Token stored in localStorage');
          }
          
          // Navigate to dashboard
          router.push('/dashboard');
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } }; message?: string };
          console.log('Registration error:', error);
          toast.error(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
        }
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4QjVDZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 dark:bg-neutral-900/90 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-lg dark:bg-white dark:text-neutral-900">
                <Search className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">SEO Lens</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                {...register('fullName')}
                className="h-11 dark:bg-neutral-800/50"
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                className="h-11 dark:bg-neutral-800/50"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register('password')}
                  className="h-11 pr-10 dark:bg-neutral-800/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              {password && (
                <div className="space-y-1 pt-2">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <CheckCircle className={`h-3 w-3 ${req.met ? 'text-emerald-500' : 'text-neutral-300'}`} />
                      <span className={req.met ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register('confirmPassword')}
                  className="h-11 pr-10 dark:bg-neutral-800/50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1 rounded border-neutral-300" required />
              <label htmlFor="terms" className="text-xs text-neutral-600 dark:text-neutral-400">
                I agree to the{' '}
                <Link href="/terms" className="text-neutral-900 hover:underline dark:text-neutral-200">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-neutral-900 hover:underline dark:text-neutral-200">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <Button type="submit" className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-neutral-900 hover:underline dark:text-neutral-200">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}