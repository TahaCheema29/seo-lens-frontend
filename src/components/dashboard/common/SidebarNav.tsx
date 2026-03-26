'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { USER_NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/features/dashboard/config';
import {
  LayoutDashboard,
  Search,
  Key,
  TrendingUp,
  Users,
  FileText,
  Settings,
  CreditCard,
  BarChart3,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Search,
  Key,
  TrendingUp,
  Users,
  FileText,
  Settings,
  CreditCard,
  BarChart3,
};

interface SidebarNavProps {
  role: 'user' | 'admin';
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarNav({ role, isOpen, onToggle }: SidebarNavProps) {
  const pathname = usePathname();
  const navItems = role === 'admin' ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col justify-between fixed left-0 top-0 z-50 h-full bg-[var(--dashboard-sidebar)] border-r border-[var(--dashboard-border)] transition-all duration-300 ease-in-out',
          isOpen ? 'w-64' : 'w-20',
          'lg:translate-x-0',
          !isOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div>
          <div className="flex h-16 items-center justify-between border-b border-[var(--dashboard-border)] px-4">
            <Link
              href={role === 'admin' ? '/admin/dashboard' : '/dashboard'}
              className={cn(
                'flex items-center gap-2 font-bold text-lg transition-all duration-200 hover:opacity-80',
                !isOpen && 'lg:opacity-0 lg:w-0'
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-lg">
                <Search className="h-4 w-4" />
              </div>
              <span className={cn('whitespace-nowrap text-[var(--dashboard-text)]', !isOpen && 'hidden')}>SEO Lens</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="hidden lg:flex hover:bg-[var(--dashboard-sidebar-hover)] text-[var(--dashboard-text-muted)] hover:text-[var(--dashboard-text)]"
            >
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden hover:bg-[var(--dashboard-sidebar-hover)]"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const isRootDashboard = item.href === '/dashboard';
              const isActive = isRootDashboard
                ? pathname === item.href
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group',
                    'hover:bg-[var(--dashboard-sidebar-hover)] hover:shadow-sm',
                    isActive && 'bg-neutral-900 text-white shadow-lg dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100',
                    !isActive && 'text-[var(--dashboard-text-muted)] hover:text-[var(--dashboard-text)]',
                    !isOpen && 'lg:justify-center'
                  )}
                >
                  <Icon className={cn('h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110', !isOpen && 'lg:mx-auto')} />
                  <span className={cn('whitespace-nowrap', !isOpen && 'lg:hidden')}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--dashboard-border)] p-4">
          <div
            className={cn(
              'flex items-center gap-3 rounded-xl bg-[var(--dashboard-sidebar-hover)] px-3 py-2.5 transition-all duration-200 hover:shadow-md',
              !isOpen && 'lg:justify-center'
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-700 text-white text-xs font-bold dark:bg-neutral-300 dark:text-neutral-900">
              JD
            </div>
            <div className={cn('min-w-0 flex-1', !isOpen && 'lg:hidden')}>
              <p className="truncate text-sm font-semibold text-[var(--dashboard-text)]">John Doe</p>
              <p className="truncate text-xs text-[var(--dashboard-text-muted)]">
                {role === 'admin' ? 'Administrator' : 'User Account'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
