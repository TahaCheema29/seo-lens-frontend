"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Key, Plus, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useGetApiKeys } from "@/services/cicd/useCicdQueries";
import { useCreateApiKey, useRevokeApiKey } from "@/services/cicd/useCicdMutations";

export function ApiKeyManager() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // React Query hooks
  const { data: apiKeys = [], isLoading } = useGetApiKeys();
  const createKeyMutation = useCreateApiKey();
  const revokeKeyMutation = useRevokeApiKey();

  const handleCreateKey = async () => {
    createKeyMutation.mutate(
      { name: newKeyName || undefined },
      {
        onSuccess: (data) => {
          console.log('Create key success data:', data);
          // Handle both snake_case and camelCase from backend
          const apiKey = data?.apiKey;
          console.log('Extracted API key:', apiKey);
          if (apiKey) {
            setNewlyCreatedKey(apiKey);
            setNewKeyName("");
          } else {
            console.error('No apiKey in response:', data);
            toast.error("API key was created but could not be displayed. Please try again.");
          }
        },
      }
    );
  };

  const handleRevokeKey = async () => {
    if (!selectedKeyId) return;
    
    revokeKeyMutation.mutate(selectedKeyId, {
      onSuccess: () => {
        setIsRevokeOpen(false);
        setSelectedKeyId(null);
      },
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    toast.success("API key copied to clipboard");
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const selectedKey = apiKeys.find((key:any) => key.id === selectedKeyId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">API Keys</h2>
          <p className="text-muted-foreground">
            Manage API keys for CI/CD integrations with GitHub Actions
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate New Key
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            {!newlyCreatedKey ? (
              <>
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    Generate a new API key to use with GitHub Actions. This key will only be shown once.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Production Server"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Give your key a descriptive name to help you identify it later
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateKey} 
                    disabled={createKeyMutation.isPending}
                  >
                    {createKeyMutation.isPending ? "Generating..." : "Generate API Key"}
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="h-5 w-5" />
                    Store This Key Securely!
                  </DialogTitle>
                  <DialogDescription className="text-amber-600 font-medium">
                    This key will only be shown once. Copy it now and store it securely.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Your API Key</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded bg-background px-3 py-2 text-sm font-mono break-all">
                        {newlyCreatedKey}
                      </code>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyToClipboard(newlyCreatedKey)}
                      >
                        {copiedKey ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Next Steps:
                    </h4>
                    <ol className="text-sm text-blue-800 dark:text-blue-200 list-decimal list-inside space-y-1">
                      <li>Copy this API key</li>
                      <li>Go to your GitHub repository</li>
                      <li>Navigate to Settings → Secrets → Actions</li>
                      <li>Add a new secret named <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 rounded">SEO_LENS_API_KEY</code></li>
                      <li>Paste your API key as the value</li>
                    </ol>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      setIsCreateOpen(false);
                      setNewlyCreatedKey(null);
                      setNewKeyName("");
                    }}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    I&apos;ve Saved My Key
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* API Keys Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Active and revoked API keys for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Key className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No API Keys Yet</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                Generate your first API key to start using SEO Lens with GitHub Actions
              </p>
              <Button className="mt-4" onClick={() => setIsCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Generate API Key
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key:any) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">
                      {key.name || "Unnamed Key"}
                    </TableCell>
                    <TableCell>{formatDate(key.createdAt)}</TableCell>
                    <TableCell>{formatDate(key.lastUsedAt)}</TableCell>
                    <TableCell>
                      {key.isActive ? (
                        <Badge variant="default" className="bg-green-500">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Revoked</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {key.isActive && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedKeyId(key.id);
                            setIsRevokeOpen(true);
                          }}
                          disabled={revokeKeyMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Revoke Confirmation Dialog */}
      <Dialog open={isRevokeOpen} onOpenChange={setIsRevokeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this API key? This action cannot be undone,
              and any integrations using this key will stop working.
            </DialogDescription>
          </DialogHeader>
          {selectedKey && (
            <div className="py-4">
              <p className="text-sm font-medium">Key to revoke:</p>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedKey.name || "Unnamed Key"} (Created: {formatDate(selectedKey.createdAt)})
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevokeOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleRevokeKey} 
              disabled={revokeKeyMutation.isPending}
            >
              {revokeKeyMutation.isPending ? "Revoking..." : "Revoke Key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
