name: Dashboard UI Implementation Plan
overview: Build complete UI-only user and admin dashboards with mock data using Next.js App Router route groups, reusable typed components, shadcn/ui primitives, and subtle animations. Establish a scalable folder structure so API integration can be added later without major refactors.
todos:
  - id: setup-dashboard-architecture
    content: Create route groups, dashboard folder structure, and base shell/navigation components.
    status: pending
  - id: build-shared-ui-primitives
    content: Implement reusable typed components (cards, table wrappers, filter bars, status badges, alerts, chart placeholders) using shadcn patterns.
    status: pending
    dependencies:
      - setup-dashboard-architecture
  - id: implement-user-screens
    content: Build all user dashboard module pages with realistic mock data and component composition.
    status: pending
    dependencies:
      - build-shared-ui-primitives
  - id: implement-admin-screens
    content: Build all admin dashboard module pages with realistic mock data and component composition.
    status: pending
    dependencies:
      - build-shared-ui-primitives
  - id: polish-animation-responsiveness
    content: Add subtle animation effects and responsive behavior across dashboard pages.
    status: pending
    dependencies:
      - implement-user-screens
      - implement-admin-screens
  - id: validate-and-track-plan
    content: Run lint checks for changed files and add/update plan.md as execution tracker.
    status: pending
    dependencies:
      - polish-animation-responsiveness
---

# SEO Lens Dashboard UI Plan

## Objective

Implement a full **UI-only** dashboard system (mock data) for both user and admin roles using route groups, reusable components, strict TypeScript typing, clean structure, shadcn/ui, and simple animation effects.

## Route & Folder Architecture

- Use App Router route groups:
- `src/app/(user)/dashboard/...`
- `src/app/(admin)/dashboard/...`
- Create shared dashboard building blocks under:
- `src/components/dashboard/common/`
- `src/components/dashboard/user/`
- `src/components/dashboard/admin/`
- Add typed mock datasets under:
- `src/features/dashboard/mock-data/`
- Add dashboard-specific types under:
- `src/features/dashboard/types/`
- Add small config/constants under:
- `src/features/dashboard/config/`

## Screens to Implement (UI + Mock Data)

### User Dashboard Screens

- `src/app/(user)/dashboard/page.tsx` (Overview)
- `src/app/(user)/dashboard/seo-insights/page.tsx`
- `src/app/(user)/dashboard/keyword-analyzer/page.tsx`
- `src/app/(user)/dashboard/rank-tracker/page.tsx`
- `src/app/(user)/dashboard/competitors/page.tsx`
- `src/app/(user)/dashboard/reports/page.tsx`
- `src/app/(user)/dashboard/settings/page.tsx`

### Admin Dashboard Screens

- `src/app/(admin)/dashboard/page.tsx` (Admin Summary)
- `src/app/(admin)/dashboard/users/page.tsx`
- `src/app/(admin)/dashboard/subscriptions/page.tsx`
- `src/app/(admin)/dashboard/analytics/page.tsx`
- `src/app/(admin)/dashboard/reports/page.tsx`
- `src/app/(admin)/dashboard/settings/page.tsx`

## Reusable Component System

Build shared, typed components with consistent API and composition:

- Layout shell: sidebar, topbar, breadcrumb, page container
- KPI and metric cards
- Trend/mini charts (CSS/SVG-based for mock UI if chart library is not added)
- Data tables with sort/filter/pagination UI states
- Filter bars (search, select, date range)
- Status badges (severity, subscription, rank change)
- Alert/notification panel
- Empty/loading mock states

Primary files to add/update:

- `src/components/dashboard/common/DashboardShell.tsx`
- `src/components/dashboard/common/SidebarNav.tsx`
- `src/components/dashboard/common/Topbar.tsx`
- `src/components/dashboard/common/KpiCard.tsx`
- `src/components/dashboard/common/DataTable.tsx`
- `src/components/dashboard/common/FilterBar.tsx`
- `src/components/dashboard/common/StatusBadge.tsx`

## UI/UX Standards to Enforce

- Reusable components over duplicated markup
- Type-safe props and mock data interfaces
- Clear module boundaries by role and feature
- shadcn components as the default primitive layer (`Card`, `Button`, `Input`, `Select`, etc.)
- Simple animations for perceived quality (hover lift, fade-in, section enter transitions) using existing CSS animation support

## Navigation & Role Experience

- Role-specific sidebar menus and top-level navigation items
- Unified visual language across user/admin with role-tailored content
- Keep user views focused on personal SEO performance
- Keep admin views focused on control, monitoring, and billing oversight

## Mock Data Strategy

- Central typed mock files per feature (keywords, rank trends, competitors, subscriptions, reports)
- Stable IDs and deterministic sample values for predictable UI testing
- Keep shape close to expected backend contracts to minimize future refactors

## Implementation Flow

1. Build shared shell and nav.
2. Add common widgets/components.
3. Implement user screens with mock data.
4. Implement admin screens with mock data.
5. Polish motion, spacing, and responsiveness.
6. Verify lint/type health for changed files.
7. Create `plan.md` in repo root mirroring this approved plan for execution tracking.

## Planned Deliverables

- Full user dashboard UI module set (all requested screens)
- Full admin dashboard UI module set (all requested screens)
- Reusable typed component library for dashboards
- Mock data and feature-local typing scaffolding
- `plan.md` execution tracker based on approved plan