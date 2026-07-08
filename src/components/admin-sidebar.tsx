import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Server,
  Key,
  Repeat,
  Layers,
  MessageCircleQuestion,
  LayoutTemplate,
  Wand2,
  Activity,
  ScrollText,
  Settings,
  UserCog,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { signOut, getUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV: Array<{ to: string; label: string; icon: LucideIcon }> = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/ai-provider", label: "AI Provider", icon: Server },
  { to: "/admin/api-key", label: "API Key", icon: Key },
  { to: "/admin/rotation", label: "Rotasi AI", icon: Repeat },
  { to: "/admin/technology", label: "Teknologi", icon: Layers },
  { to: "/admin/questions", label: "Pertanyaan AI", icon: MessageCircleQuestion },
  { to: "/admin/templates", label: "Template Project", icon: LayoutTemplate },
  { to: "/admin/prompt-engine", label: "Prompt Engine", icon: Wand2 },
  { to: "/admin/monitoring", label: "Monitoring", icon: Activity },
  { to: "/admin/logs", label: "Log Aktivitas", icon: ScrollText },
  { to: "/admin/settings", label: "Pengaturan", icon: Settings },
];

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  useEffect(() => setUser(getUser()), []);

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
      <div className="p-4">
        <BrandLogo />
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {NAV.map((n) => {
          const active = pathname === n.to || (n.to !== "/admin" && pathname.startsWith(n.to));
          return (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <n.icon size={16} />
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-md p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <UserCog size={14} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{user?.name ?? "Admin"}</div>
            <div className="truncate text-xs text-muted-foreground">Administrator</div>
          </div>
          <button
            aria-label="Keluar"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => {
              signOut();
              navigate({ to: "/login" });
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
