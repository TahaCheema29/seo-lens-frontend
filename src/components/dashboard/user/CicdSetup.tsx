"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Copy,
  Github,
  Key,
  Play,
  FileCode2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useGetApiKeys } from "@/services/cicd/useCicdQueries";
import { toast } from "sonner";

const WORKFLOW_YAML = `name: SEO Analysis

on:
  push:
    branches: [main, master]

jobs:
  seo:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run SEO Analysis
        run: |
          echo "🚀 Triggering SEO analysis..."
          
          RESPONSE=$(curl -s -X POST "https://seo-lens-backend-production.up.railway.app/webhooks/trigger" \\
            -H "Authorization: Bearer \${{ secrets.SEO_LENS_API_KEY }}" \\
            -H "Content-Type: application/json" \\
            -d '{
              "url": "https://your-website.com",
              "crawl_mode": "standard",
              "repository": "\${{ github.repository }}",
              "branch": "\${{ github.ref_name }}",
              "commit_sha": "\${{ github.sha }}"
            }')
          
          echo "Response: \$RESPONSE"
          echo "\$RESPONSE" | jq .
          
          JOB_ID=$(echo "\$RESPONSE" | jq -r '.job_id')
          echo "✅ Analysis triggered! Job ID: \$JOB_ID"
          echo "📧 Check your email for results!"`;

export function CicdSetup() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const { data: apiKeys = [] } = useGetApiKeys();
  const activeKey = apiKeys.find((key) => key.isActive);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const steps = [
    {
      id: 1,
      title: "Generate API Key",
      description: "Create an API key from the API Keys page",
      icon: Key,
    },
    {
      id: 2,
      title: "Create GitHub Workflow",
      description: "Add the SEO Lens workflow to your repository",
      icon: FileCode2,
    },
    {
      id: 3,
      title: "Configure GitHub Secrets",
      description: "Add your API key to GitHub repository secrets",
      icon: Github,
    },
    {
      id: 4,
      title: "Test Integration",
      description: "Push to main branch and verify it works",
      icon: Play,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">CI/CD Integration Setup</h2>
        <p className="text-muted-foreground">
          Set up automated SEO analysis for every deployment to your production website
        </p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Steps</CardTitle>
          <CardDescription>Follow these steps to integrate SEO Lens with GitHub Actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {step.id}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: API Key */}
      <Card id="step-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              1
            </span>
            Generate API Key
          </CardTitle>
          <CardDescription>
            You need an API key to authenticate with SEO Lens from GitHub Actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeKey ? (
            <div className="rounded-md bg-green-50 p-4 dark:bg-green-950">
              <div className="flex items-center gap-2 text-green-800 dark:text-green-100">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">✅ API Key Generated</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-200 mt-2">
                You have an active API key: <strong>{activeKey.name || "Unnamed Key"}</strong>
              </p>
              <p className="text-sm text-green-700 dark:text-green-200 mt-1">
                Created: {new Date(activeKey.createdAt).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-100">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">⚠️ No API Key Found</span>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-200 mt-2">
                Go to the API Keys page and generate a new key first.
              </p>
              <Button className="mt-4" variant="outline" asChild>
                <a href="/dashboard/api-keys">Go to API Keys</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Add Action Code */}
      <Card id="step-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              2
            </span>
            Add Action to Your Repository
          </CardTitle>
          <CardDescription>
            Create the SEO Lens GitHub Action in your repository
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> Replace <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded">https://api.seo-lens.com</code> with your actual API endpoint when testing locally (e.g., ngrok URL).
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Create Workflow File</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(WORKFLOW_YAML, "workflow")}
              >
                {copiedSection === "workflow" ? (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                Copy
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              In your GitHub repository, create <code className="font-mono bg-muted px-1 rounded">.github/workflows/seo-lens.yml</code> with this content:
            </p>
            <div className="relative">
              <pre className="rounded-md bg-muted p-4 overflow-x-auto text-sm">
                <code>{WORKFLOW_YAML}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: GitHub Secrets */}
      <Card id="step-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              3
            </span>
            Add API Key to GitHub Secrets
          </CardTitle>
          <CardDescription>
            Store your API key securely in your GitHub repository
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4 list-decimal list-inside">
            <li className="text-sm">
              Go to your GitHub repository
            </li>
            <li className="text-sm">
              Click on <strong>Settings</strong> tab
            </li>
            <li className="text-sm">
              In the left sidebar, click <strong>Secrets and variables</strong> → <strong>Actions</strong>
            </li>
            <li className="text-sm">
              Click <strong>New repository secret</strong>
            </li>
            <li className="text-sm">
              Name: <code className="font-mono bg-muted px-1 rounded">SEO_LENS_API_KEY</code>
            </li>
            <li className="text-sm">
              Value: Your API key from Step 1
            </li>
            <li className="text-sm">
              Click <strong>Add secret</strong>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Step 4: Test */}
      <Card id="step-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              4
            </span>
            Test Your Integration
          </CardTitle>
          <CardDescription>
            Push to your main branch and verify everything works
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="space-y-2 list-decimal list-inside text-sm">
            <li>Make a change to your repository</li>
            <li>Push to the <code className="font-mono bg-muted px-1 rounded">main</code> or <code className="font-mono bg-muted px-1 rounded">master</code> branch</li>
            <li>Go to your repository&apos;s <strong>Actions</strong> tab on GitHub</li>
            <li>You should see the &quot;SEO Analysis&quot; workflow running</li>
            <li>Wait ~2 minutes for the analysis to complete</li>
            <li>Check your email for the SEO report!</li>
          </ol>

          <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950 mt-4">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              What to Expect:
            </h4>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <p>✅ GitHub Action triggers automatically on push to main</p>
              <p>✅ Analysis runs for ~2 minutes</p>
              <p>✅ You&apos;ll receive an email with your SEO score</p>
              <p>✅ View full history on this dashboard</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
