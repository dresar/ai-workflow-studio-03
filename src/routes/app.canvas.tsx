import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Shield,
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Settings,
  Brain,
  Bell,
  CreditCard,
  FileText,
  ArrowRight,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/canvas")({
  component: CanvasPage,
});

interface Feature {
  name: string;
  icon: LucideIcon;
  phase: string;
  subs: string[];
}

const FEATURES: Feature[] = [
  { name: "Authentication", icon: Shield, phase: "Fase 1", subs: ["Login", "Register", "OAuth", "Reset Password"] },
  { name: "Dashboard", icon: LayoutDashboard, phase: "Fase 1", subs: ["Widgets", "Statistik", "Aktivitas"] },
  { name: "User Management", icon: Users, phase: "Fase 2", subs: ["Roles", "Permissions", "Profile"] },
  { name: "Produk", icon: Package, phase: "Fase 2", subs: ["Katalog", "Kategori", "Inventory"] },
  { name: "Laporan", icon: BarChart3, phase: "Fase 3", subs: ["Sales", "Export", "Grafik"] },
  { name: "Pengaturan", icon: Settings, phase: "Fase 3", subs: ["General", "Tema", "Integrasi"] },
  { name: "AI", icon: Brain, phase: "Fase 4", subs: ["Chatbot", "Recommender", "Summarizer"] },
  { name: "Notification", icon: Bell, phase: "Fase 4", subs: ["Email", "Push", "In-app"] },
  { name: "Payment", icon: CreditCard, phase: "Fase 4", subs: ["Gateway", "Invoice", "Refund"] },
];

function StageBar({ active }: { active: number }) {
  const stages = ["Struktur", "PRD", "Task", "Prompt"];
  return (
    <div className="flex items-center gap-2 text-xs">
      {stages.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1",
              i <= active
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground",
            )}
          >
            {i < active && <Check size={10} />}
            {s}
          </span>
          {i < stages.length - 1 && <ArrowRight size={12} className="text-muted-foreground" />}
        </div>
      ))}
    </div>
  );
}

function CanvasPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-between border-b border-border bg-card/40 px-6 py-3 backdrop-blur">
        <StageBar active={0} />
        <Button onClick={() => navigate({ to: "/app/prd" })}>
          Lanjutkan <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid-bg relative flex-1 overflow-auto p-10">
        <div className="relative mx-auto max-w-6xl">
          {/* Root */}
          <div className="mb-10 flex justify-center">
            <div className="card-premium flex items-center gap-3 px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <FileText size={18} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Root Project</div>
                <div className="text-base font-semibold">Marketplace UMKM Nusantara</div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.name} className="card-premium p-5 transition hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon size={16} />
                    </div>
                    <div className="font-semibold">{f.name}</div>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {f.phase}
                  </Badge>
                </div>
                <div className="mt-4 space-y-1.5">
                  {f.subs.map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-2 rounded-md border border-border/60 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
