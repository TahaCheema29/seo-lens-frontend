export const USER_NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'SEO Insights', href: '/dashboard/seo-insights', icon: 'Search' },
  { label: 'Keyword Analyzer', href: '/dashboard/keyword-analyzer', icon: 'Key' },
  { label: 'Rank Tracker', href: '/dashboard/rank-tracker', icon: 'TrendingUp' },
  { label: 'Competitors', href: '/dashboard/competitors', icon: 'Users' },
  { label: 'Reports', href: '/dashboard/reports', icon: 'FileText' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { label: 'Users', href: '/admin/dashboard/users', icon: 'Users' },
  { label: 'Subscriptions', href: '/admin/dashboard/subscriptions', icon: 'CreditCard' },
  { label: 'Analytics', href: '/admin/dashboard/analytics', icon: 'BarChart3' },
  { label: 'Reports', href: '/admin/dashboard/reports', icon: 'FileText' },
  { label: 'Settings', href: '/admin/dashboard/settings', icon: 'Settings' },
] as const;

export const STATUS_COLORS = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  neutral: 'bg-gray-100 text-gray-800 border-gray-200',
} as const;

export const PLAN_COLORS = {
  free: 'bg-neutral-100 text-neutral-800',
  starter: 'bg-neutral-200 text-neutral-800',
  professional: 'bg-neutral-700 text-white',
  enterprise: 'bg-neutral-900 text-white',
} as const;

export const SEVERITY_CONFIG = {
  critical: { color: 'text-red-600 bg-red-50 border-red-200', icon: 'AlertCircle' },
  warning: { color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: 'AlertTriangle' },
  info: { color: 'text-neutral-600 bg-neutral-50 border-neutral-200', icon: 'Info' },
} as const;

export const TREND_ICONS = {
  up: 'TrendingUp',
  down: 'TrendingDown',
  stable: 'Minus',
} as const;

export const TABLE_PAGE_SIZES = [10, 25, 50, 100] as const;
