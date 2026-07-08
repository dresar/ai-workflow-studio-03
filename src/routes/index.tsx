import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const u = getUser();
    if (u?.role === "admin") throw redirect({ to: "/admin" });
    if (u?.role === "user") throw redirect({ to: "/app" });
    throw redirect({ to: "/login" });
  },
  component: () => null,
});
