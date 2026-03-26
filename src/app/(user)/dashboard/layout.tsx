
import { DashboardShell } from '@/components/dashboard/common/DashboardShell';

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardShell role="user">{children}</DashboardShell>;
}