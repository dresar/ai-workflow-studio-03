import { createFileRoute } from "@tanstack/react-router";
import { Plus, Settings, Pencil, Activity, Server } from "lucide-react";
import { AdminPage } from "@/components/admin-page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/ai-provider")({
  component: AIProviderPage,
});

const PROVIDERS = [
  { name: "Gemini", model: "gemini-2.0-flash", active: true, priority: 1, latency: "312ms", quota: "80%", req: "42,120" },
  { name: "Groq", model: "llama-3.1-70b", active: true, priority: 2, latency: "184ms", quota: "45%", req: "28,540" },
  { name: "Claude", model: "claude-3.5-sonnet", active: true, priority: 3, latency: "420ms", quota: "62%", req: "19,230" },
  { name: "OpenAI", model: "gpt-4o-mini", active: false, priority: 4, latency: "380ms", quota: "10%", req: "5,120" },
  { name: "DeepSeek", model: "deepseek-chat", active: true, priority: 5, latency: "290ms", quota: "34%", req: "12,890" },
  { name: "OpenRouter", model: "auto", active: true, priority: 6, latency: "410ms", quota: "22%", req: "8,410" },
  { name: "Anthropic", model: "claude-3-opus", active: false, priority: 7, latency: "520ms", quota: "5%", req: "1,220" },
  { name: "Mistral", model: "mistral-large", active: false, priority: 8, latency: "360ms", quota: "0%", req: "0" },
];

function AIProviderPage() {
  return (
    <AdminPage
      title="AI Provider"
      subtitle="Kelola provider AI yang digunakan sistem"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Provider
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROVIDERS.map((p) => (
          <div key={p.name} className="card-premium p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                  <Server size={18} />
                </div>
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.model}</div>
                </div>
              </div>
              <Badge variant={p.active ? "default" : "secondary"} className="text-[10px]">
                {p.active ? "Aktif" : "Nonaktif"}
              </Badge>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <Info label="Prioritas" value={`#${p.priority}`} />
              <Info label="Latency" value={p.latency} icon={<Activity size={11} />} />
              <Info label="Quota" value={p.quota} />
              <Info label="Request" value={p.req} />
            </div>

            <div className="mt-5 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Settings className="mr-2 h-3.5 w-3.5" /> Setting
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}

function Info({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border/60 bg-muted/20 p-2.5">
      <div className="mb-0.5 flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
