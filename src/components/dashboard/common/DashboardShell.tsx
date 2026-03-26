'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { SidebarNav } from './SidebarNav';
import { Topbar } from './Topbar';

interface DashboardShellProps {
  children: React.ReactNode;
  role?: 'user' | 'admin';
  className?: string;
}

export function DashboardShell({ children, role = 'user', className }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav role={role} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300 ease-in-out',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        )}
      >
        <Topbar role={role} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className={cn('flex-1 p-6 overflow-auto', className)}>
          <div className="mx-auto max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
