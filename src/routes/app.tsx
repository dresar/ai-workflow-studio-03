import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const u = getUser();
    if (!u) throw redirect({ to: "/login" });
    if (u.role === "admin") throw redirect({ to: "/admin" });
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
