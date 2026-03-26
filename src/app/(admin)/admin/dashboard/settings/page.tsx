'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Database,
  Mail,
  Save,
  Key,
  AlertTriangle,
  CheckCircle,
  Settings,
  Shield,
  Bell,
  Link2,
  Zap,
  TrendingUp,
  Clock,
  Calendar,
  Lock,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure platform settings and preferences
          </p>
        </div>

        {/* System Overview Card */}
        <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-950/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3">
                  <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">System Status</h3>
                  <p className="text-muted-foreground">
                    All systems operational
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Healthy
              </Badge>
            </div>
            
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-blue-500" />
                    Database
                  </span>
                  <span className="font-medium text-emerald-600">Online</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-violet-500" />
                    Email Service
                  </span>
                  <span className="font-medium text-emerald-600">Active</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-amber-500" />
                    API Status
                  </span>
                  <span className="font-medium text-emerald-600">Operational</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  Platform Settings
                </CardTitle>
                <CardDescription>Configure global platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name" className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-blue-500" />
                      Platform Name
                    </Label>
                    <Input id="platform-name" defaultValue="SEO Lens" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-500" />
                      Support Email
                    </Label>
                    <Input id="support-email" defaultValue="support@seolens.com" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        Maintenance Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Temporarily disable access to the platform
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        User Registration
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to sign up
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-500" />
                        Email Verification
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require email verification for new accounts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  Rate Limits
                </CardTitle>
                <CardDescription>Configure API and usage limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="api-rate-limit" className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      API Calls / Hour
                    </Label>
                    <Input id="api-rate-limit" type="number" defaultValue="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scan-rate-limit" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      Scans / Day
                    </Label>
                    <Input id="scan-rate-limit" type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-rate-limit" className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-violet-500" />
                      Reports / Day
                    </Label>
                    <Input id="report-rate-limit" type="number" defaultValue="50" />
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
                  Email Settings
                </CardTitle>
                <CardDescription>Configure email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        New User Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notify admins when new users sign up
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Database className="h-4 w-4 text-violet-500" />
                        Payment Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notify on successful and failed payments
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        System Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notify on system errors and warnings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        Security Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notify on suspicious activity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                    <Mail className="mr-2 h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
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
                <CardDescription>Configure platform security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Shield className="h-4 w-4 text-violet-500" />
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-blue-500" />
                        IP Whitelist
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Restrict admin access to specific IP addresses
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        Session Timeout
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Auto-logout inactive users after 30 minutes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Key className="h-4 w-4 text-violet-500" />
                    Password Policy
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="min-length">Minimum Length</Label>
                      <Input id="min-length" type="number" defaultValue="8" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-age">Password Expiry (days)</Label>
                      <Input id="max-age" type="number" defaultValue="90" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Uppercase Required
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Numbers Required
                    </Badge>
                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Special Characters
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  API Keys
                </CardTitle>
                <CardDescription>Manage API access keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-2">
                      <Key className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium">Production API Key</p>
                      <p className="text-sm text-muted-foreground">Created on Jan 1, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm">sk_live_••••••••••</code>
                    <Button variant="ghost" size="sm">
                      Show
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Revoke
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="border-amber-200 hover:bg-amber-50 dark:border-amber-800 dark:hover:bg-amber-950">
                  <Key className="mr-2 h-4 w-4" />
                  Generate New API Key
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  Third-Party Integrations
                </CardTitle>
                <CardDescription>Connect external services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Stripe', description: 'Payment processing', connected: true, color: 'violet' },
                  { name: 'SendGrid', description: 'Email delivery', connected: true, color: 'blue' },
                  { name: 'Google Analytics', description: 'Web analytics', connected: false, color: 'amber' },
                  { name: 'Slack', description: 'Team notifications', connected: true, color: 'emerald' },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full bg-${integration.color}-100 dark:bg-${integration.color}-900/30 p-2`}>
                        <Link2 className={`h-5 w-5 text-${integration.color}-600 dark:text-${integration.color}-400`} />
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {integration.connected ? (
                        <>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Connected
                          </Badge>
                          <Button variant="ghost" size="sm">
                            Configure
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500" />
                  Database Settings
                </CardTitle>
                <CardDescription>Database configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-pink-100 dark:bg-pink-900/30 p-2">
                      <Database className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <p className="font-medium">Database Status</p>
                      <p className="text-sm text-muted-foreground">PostgreSQL 14.5</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Healthy
                  </Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      Last Backup
                    </Label>
                    <p className="text-sm">Jan 15, 2024 at 3:00 AM</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      Backup Frequency
                    </Label>
                    <p className="text-sm">Daily at 3:00 AM UTC</p>
                  </div>
                </div>
                <Button variant="outline" className="border-pink-200 hover:bg-pink-50 dark:border-pink-800 dark:hover:bg-pink-950">
                  <Database className="mr-2 h-4 w-4" />
                  Run Backup Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-900">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-red-200 dark:border-red-900 p-4 bg-red-50/50 dark:bg-red-950/20">
                  <div>
                    <p className="font-medium">Reset Platform</p>
                    <p className="text-sm text-muted-foreground">
                      Clear all data and reset to defaults
                    </p>
                  </div>
                  <Button variant="destructive">Reset</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-red-200 dark:border-red-900 p-4 bg-red-50/50 dark:bg-red-950/20">
                  <div>
                    <p className="font-medium">Delete All User Data</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete all user accounts and data
                    </p>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
