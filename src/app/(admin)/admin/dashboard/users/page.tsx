import { AdminUsersClient } from "@/components/dashboard/admin/AdminUsers";
import { getAdminUsers } from "@/services/dashboard/adminQueries";
import { cookies } from "next/headers";

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await getAdminUsers(cookieHeader);
  // Backend returns { status, message, data: [...users] }
  // console.log("user is ", JSON.stringify(response, null))
  const users = response.status === "success" ? response.data || [] : [];

  return <AdminUsersClient users={users} />;
}
