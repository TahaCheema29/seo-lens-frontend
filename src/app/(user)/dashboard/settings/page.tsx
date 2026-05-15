'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockUserSettings } from '@/features/dashboard/mock-data';
import { useSubscription, useCreateCheckout } from '@/services/subscription/subscriptionQueries';
import {
  User,
  Mail,
  Building2,
  Globe,
  Bell,
  CreditCard,
  Shield,
  Check,
  Zap,
  Crown,
  BarChart3,
  Lock,
  Plus,
  Download,
  Sparkles,
  Loader2,
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockUserSettings);
  const [isLoading, setIsLoading] = useState(false);
  const { data: subscription, isLoading: isLoadingSub } = useSubscription();
  const { mutate: createCheckout, isPending: isCreatingCheckout } = useCreateCheckout();

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleUpgrade = () => {
    createCheckout();
  };

  const isPro = subscription?.isPro ?? false;

  return (
    <DashboardShell role="user">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Subscription Overview Card */}
        <Card className={`border-l-4 ${isPro ? 'border-l-violet-500 bg-gradient-to-r from-violet-50/50 to-transparent dark:from-violet-950/20' : 'border-l-neutral-400 bg-gradient-to-r from-neutral-50/50 to-transparent dark:from-neutral-950/20'}`}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`rounded-full ${isPro ? 'bg-violet-100 dark:bg-violet-900/30' : 'bg-neutral-100 dark:bg-neutral-900/30'} p-3`}>
                  <Crown className={`h-6 w-6 ${isPro ? 'text-violet-600 dark:text-violet-400' : 'text-neutral-600 dark:text-neutral-400'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold capitalize">
                      {isLoadingSub ? 'Loading...' : isPro ? 'Pro Plan' : 'Standard Plan'}
                    </h3>
                    <Badge variant={isPro ? 'default' : 'outline'} className={isPro ? 'bg-violet-600' : ''}>
                      {isPro ? 'PRO' : 'FREE'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {isPro 
                      ? 'Lifetime access • Active' 
                      : 'Free forever • Limited features'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {isPro ? (
                  <Button variant="outline" disabled>
                    You&apos;re on Pro
                  </Button>
                ) : (
                  <Button 
                    className="bg-violet-600 hover:bg-violet-700"
                    onClick={handleUpgrade}
                    disabled={isCreatingCheckout}
                  >
                    {isCreatingCheckout ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Upgrade to Pro
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
            
            {isPro && (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-500" />
                      Competitor Analysis
                    </span>
                    <span className="font-medium text-emerald-600">Unlimited</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-emerald-500" />
                      CI/CD Integration
                    </span>
                    <span className="font-medium text-emerald-600">Enabled</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      Priority Support
                    </span>
                    <span className="font-medium text-emerald-600">Active</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20 border-2 border-blue-100 dark:border-blue-900">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950">Change Avatar</Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) =>
                          setSettings({ ...settings, name: e.target.value })
                        }
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) =>
                          setSettings({ ...settings, email: e.target.value })
                        }
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />
                      <Input
                        id="company"
                        value={settings.company || ''}
                        onChange={(e) =>
                          setSettings({ ...settings, company: e.target.value })
                        }
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500" />
                      <Input
                        id="website"
                        value={settings.website || ''}
                        onChange={(e) =>
                          setSettings({ ...settings, website: e.target.value })
                        }
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  Preferences
                </CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-cyan-500" />
                      Timezone
                    </Label>
                    <Input
                      id="timezone"
                      value={settings.preferences.timezone}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preferences: { ...settings.preferences, timezone: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-emerald-500" />
                      Currency
                    </Label>
                    <Input
                      id="currency"
                      value={settings.preferences.currency}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preferences: { ...settings.preferences, currency: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language" className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-violet-500" />
                      Language
                    </Label>
                    <Input
                      id="language"
                      value={settings.preferences.language}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          preferences: { ...settings.preferences, language: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, email: checked },
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-violet-500" />
                      Weekly Reports
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get weekly SEO performance summaries
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReport}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, weeklyReport: checked },
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      Rank Changes
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when keyword rankings change significantly
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.rankChanges}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, rankChanges: checked },
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      New Opportunities
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new SEO opportunities
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.newOpportunities}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, newOpportunities: checked },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  Current Plan
                </CardTitle>
                <CardDescription>Your subscription details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold capitalize">
                        {isLoadingSub ? 'Loading...' : isPro ? 'Pro' : 'Standard'}
                      </h3>
                      <Badge variant={isPro ? 'default' : 'outline'} className={isPro ? 'bg-violet-600' : ''}>
                        {isPro ? 'PRO' : 'FREE'}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {isPro 
                        ? 'One-time payment of $5 • Lifetime access' 
                        : 'Free forever • Upgrade to unlock Pro features'}
                    </p>
                  </div>
                  {isPro ? (
                    <Button disabled className="bg-violet-600">
                      <Check className="mr-2 h-4 w-4" />
                      Active
                    </Button>
                  ) : (
                    <Button 
                      className="bg-violet-600 hover:bg-violet-700"
                      onClick={handleUpgrade}
                      disabled={isCreatingCheckout}
                    >
                      {isCreatingCheckout ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Upgrade to Pro
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {isPro ? 'Pro Features' : 'Standard Features'}
                  </h4>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {[
                      'Site SEO Analyzer',
                      'Keyword Rank Checker',
                      'Keyword Research',
                      ...(isPro ? [
                        'Competitor Analysis',
                        'CI/CD Auto Re-analysis',
                        'GitHub/GitLab Integration',
                        'Priority Support',
                        'Lifetime Access'
                      ] : []),
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {!isPro && (
                  <>
                    <Separator />
                    <div className="rounded-xl bg-muted p-6 text-center">
                      <h4 className="font-medium mb-2">Upgrade to Pro</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get lifetime access to all Pro features for a one-time payment of $5
                      </p>
                      <Button 
                        className="rounded-full"
                        size="lg"
                        onClick={handleUpgrade}
                        disabled={isCreatingCheckout}
                      >
                        {isCreatingCheckout ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Upgrade Now
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-amber-500" />
                      Current Password
                    </Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald-500" />
                      New Password
                    </Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-500" />
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Update Password</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Shield className="h-4 w-4 text-violet-500" />
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" className="border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-950">
                      Enable 2FA
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-destructive flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    Danger Zone
                  </h4>
                  <div className="rounded-lg border border-red-200 dark:border-red-900 p-4 bg-red-50/50 dark:bg-red-950/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
