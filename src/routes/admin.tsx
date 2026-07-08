import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/admin-sidebar";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const u = getUser();
    if (!u) throw redirect({ to: "/login" });
    if (u.role !== "admin") throw redirect({ to: "/app" });
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
