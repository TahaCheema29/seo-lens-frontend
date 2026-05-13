'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Menu,
  User,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { useLogoutUser, useLogoutAdmin } from '@/services/auth/authMutation';
import { useCurrentUser, useCurrentAdmin, getInitials } from '@/services/auth/authQuery';

interface TopbarProps {
  role: 'user' | 'admin';
  onMenuToggle: () => void;
}

export function Topbar({ role, onMenuToggle }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const logoutUser = useLogoutUser();
  const logoutAdmin = useLogoutAdmin();
  const { data: user } = useCurrentUser(role === 'user');
  const { data: admin } = useCurrentAdmin(role === 'admin');
  
  const currentUser = role === 'admin' ? admin : user;
  const userName = currentUser?.fullName || (role === 'admin' ? 'Admin' : 'User');
  const userInitials = getInitials(userName);

  const breadcrumbs = React.useMemo(() => {
    if (!pathname) return [];
    const parts = pathname.split('/').filter(Boolean);
    return parts.map((part, index) => {
      const href = '/' + parts.slice(0, index + 1).join('/');
      return { label: part.charAt(0).toUpperCase() + part.slice(1), href };
    });
  }, [pathname]);

  const handleLogout = async () => {
    try {
      if (role === 'admin') {
        await logoutAdmin.mutateAsync();
      } else {
        await logoutUser.mutateAsync();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.push(role === 'admin' ? '/admin/login' : '/login');
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[var(--dashboard-border)] bg-[var(--dashboard-card)] backdrop-blur-xl bg-opacity-80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden hover:bg-[var(--dashboard-sidebar-hover)] text-[var(--dashboard-text-muted)]"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden md:flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                {index > 0 && <ChevronRight className="h-4 w-4 text-[var(--dashboard-text-muted)]" />}
                <Link
                  href={crumb.href}
                  className={cn(
                    'transition-colors duration-200 hover:text-[var(--dashboard-text)]',
                    index === breadcrumbs.length - 1 
                      ? 'text-[var(--dashboard-text)] font-semibold' 
                      : 'text-[var(--dashboard-text-muted)]'
                  )}
                >
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          {/* <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-[var(--dashboard-text-muted)]" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-10 bg-[var(--dashboard-bg)] border-[var(--dashboard-border)] text-[var(--dashboard-text)] placeholder:text-[var(--dashboard-text-muted)] focus:ring-2 focus:ring-neutral-500/20 transition-all"
            />
          </div> */}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-[var(--dashboard-sidebar-hover)] text-[var(--dashboard-text-muted)] hover:text-[var(--dashboard-text)] transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-[var(--dashboard-sidebar-hover)] text-[var(--dashboard-text-muted)] hover:text-[var(--dashboard-text)] transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center shadow-lg"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-[var(--dashboard-card)] border-[var(--dashboard-border)]">
              <DropdownMenuLabel className="text-[var(--dashboard-text)]">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[var(--dashboard-border)]" />
              {mockNotifications.slice(0, 3).map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className="flex flex-col items-start py-2 hover:bg-[var(--dashboard-sidebar-hover)] cursor-pointer"
                >
                  <span className="font-medium text-[var(--dashboard-text)]">{notification.title}</span>
                  <span className="text-sm text-[var(--dashboard-text-muted)]">{notification.message}</span>
                  <span className="text-xs text-[var(--dashboard-text-muted)] mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-9 w-9 rounded-full p-0 hover:bg-[var(--dashboard-sidebar-hover)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900 text-sm font-bold shadow-md">
                  {userInitials}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[var(--dashboard-card)] border-[var(--dashboard-border)]">
              <DropdownMenuLabel className="text-[var(--dashboard-text)]">
                <div className="flex flex-col">
                  <span>{userName}</span>
                  <span className="text-xs font-normal text-[var(--dashboard-text-muted)]">
                    {role === 'admin' ? 'Administrator' : 'User Account'}
                  </span>
                </div>
              </DropdownMenuLabel>
              {/* <DropdownMenuSeparator className="bg-[var(--dashboard-border)]" /> */}
              {/* <DropdownMenuItem className="hover:bg-[var(--dashboard-sidebar-hover)] text-[var(--dashboard-text)] cursor-pointer">
                <User className="mr-2 h-4 w-4 text-[var(--dashboard-text-muted)]" />
                Profile
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem className="hover:bg-[var(--dashboard-sidebar-hover)] text-[var(--dashboard-text)] cursor-pointer">
                <Settings className="mr-2 h-4 w-4 text-[var(--dashboard-text-muted)]" />
                Settings
              </DropdownMenuItem> */}
              <DropdownMenuSeparator className="bg-[var(--dashboard-border)]" />
              <DropdownMenuItem 
                className="hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
