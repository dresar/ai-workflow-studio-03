import { createFileRoute } from "@tanstack/react-router";
import {
  FolderKanban,
  FileText,
  Wand2,
  Zap,
  Key,
  Server,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AdminPage } from "@/components/admin-page";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

const STATS: Array<{ label: string; value: string; delta: string; up: boolean; icon: LucideIcon }> = [
  { label: "Total Project", value: "1,284", delta: "+12%", up: true, icon: FolderKanban },
  { label: "Total PRD Generated", value: "3,547", delta: "+8%", up: true, icon: FileText },
  { label: "Total Prompt Generated", value: "5,921", delta: "+18%", up: true, icon: Wand2 },
  { label: "Total API Request", value: "184,220", delta: "-3%", up: false, icon: Zap },
  { label: "API Key Aktif", value: "24", delta: "+2", up: true, icon: Key },
  { label: "Provider Aktif", value: "6", delta: "0", up: true, icon: Server },
];

const CHART = Array.from({ length: 14 }).map((_, i) => ({
  day: `${i + 1}`,
  gemini: Math.round(200 + Math.random() * 300),
  groq: Math.round(150 + Math.random() * 250),
  claude: Math.round(100 + Math.random() * 200),
}));

function DashboardPage() {
  return (
    <AdminPage title="Dashboard" subtitle="Ringkasan performa aplikasi dan penggunaan AI">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="card-premium p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon size={16} />
              </div>
              <span
                className={
                  "inline-flex items-center gap-1 text-[11px] " +
                  (s.up ? "text-primary" : "text-destructive")
                }
              >
                {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {s.delta}
              </span>
            </div>
            <div className="mt-4 text-2xl font-semibold tracking-tight">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 card-premium p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">Penggunaan AI (14 hari terakhir)</h3>
            <p className="text-xs text-muted-foreground">Request per hari, dikelompokkan per provider</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CHART}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.4} />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="gemini" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="groq" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="claude" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminPage>
  );
}
