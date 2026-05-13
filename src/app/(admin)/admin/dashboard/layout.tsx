
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardShell role="admin">{children}</DashboardShell>;
}