import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Plus, Search, MessageSquare, LogOut, User } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser, signOut } from "@/lib/auth";
import { useState, useEffect } from "react";

const RECENT_PROJECTS = [
  "Marketplace UMKM Nusantara",
  "Aplikasi POS Kafe Rimba",
  "Dashboard CRM Sales",
  "Landing Page SaaS",
  "Sekolah Digital Nusantara",
  "AI Chatbot Support",
];

export function AppSidebar() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = useState("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const filtered = RECENT_PROJECTS.filter((p) => p.toLowerCase().includes(q.toLowerCase()));

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
      <div className="p-4">
        <Link to="/app">
          <BrandLogo />
        </Link>
      </div>

      <div className="px-3">
        <Button
          className="w-full justify-start gap-2"
          onClick={() => navigate({ to: "/app" })}
        >
          <Plus size={16} /> Project Baru
        </Button>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari riwayat..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-9 pl-9 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <div className="px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Riwayat Project
        </div>
        <div className="space-y-0.5">
          {filtered.map((p) => (
            <button
              key={p}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <MessageSquare size={14} className="shrink-0 opacity-60" />
              <span className="truncate">{p}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-2 py-4 text-xs text-muted-foreground">Tidak ada hasil</div>
          )}
        </div>
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-md p-2 hover:bg-accent">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <User size={14} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{user?.name ?? "Pengguna"}</div>
            <div className="truncate text-xs text-muted-foreground">{user?.email ?? "-"}</div>
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
      {/* highlight active by pathname for later */}
      <span className="hidden" data-path={pathname} />
    </aside>
  );
}
