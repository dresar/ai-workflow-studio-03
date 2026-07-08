import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GripVertical } from "lucide-react";
import { AdminPage } from "@/components/admin-page";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/rotation")({
  component: RotationPage,
});

const STRATEGIES = [
  { key: "round", label: "Round Robin", desc: "Bergantian secara berurutan" },
  { key: "priority", label: "Priority", desc: "Pilih berdasarkan prioritas tertinggi" },
  { key: "random", label: "Random", desc: "Pilih secara acak" },
  { key: "fallback", label: "Fallback", desc: "Gunakan cadangan jika utama gagal" },
];

const ORDER = ["Gemini", "Groq", "Claude", "DeepSeek", "OpenRouter", "OpenAI"];

function RotationPage() {
  const [strategy, setStrategy] = useState("priority");
  return (
    <AdminPage title="Rotasi AI" subtitle="Atur strategi pergantian API Key dan provider">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-premium p-6">
          <h3 className="mb-4 text-base font-semibold">Strategi Rotasi</h3>
          <div className="space-y-2">
            {STRATEGIES.map((s) => (
              <button
                key={s.key}
                onClick={() => setStrategy(s.key)}
                className={cn(
                  "flex w-full items-start justify-between rounded-lg border p-4 text-left transition",
                  strategy === s.key
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30",
                )}
              >
                <div>
                  <div className="text-sm font-medium">{s.label}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{s.desc}</div>
                </div>
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2",
                    strategy === s.key ? "border-primary bg-primary" : "border-border",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="card-premium p-6">
          <h3 className="mb-4 text-base font-semibold">Pengaturan Lanjutan</h3>
          <div className="space-y-4">
            <Row label="Auto Rotation" desc="Ganti otomatis saat quota habis"><Switch defaultChecked /></Row>
            <Row label="Retry Otomatis" desc="Coba lagi jika request gagal"><Switch defaultChecked /></Row>
            <Row label="Timeout (detik)"><Input type="number" defaultValue={30} className="w-24" /></Row>
            <Row label="Cooldown (menit)"><Input type="number" defaultValue={5} className="w-24" /></Row>
            <Row label="Maximum Retry"><Input type="number" defaultValue={3} className="w-24" /></Row>
          </div>
        </div>

        <div className="card-premium p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Urutan Prioritas Provider</h3>
              <p className="text-xs text-muted-foreground">Drag untuk mengubah urutan</p>
            </div>
            <Button size="sm">Simpan Urutan</Button>
          </div>
          <div className="space-y-2">
            {ORDER.map((p, i) => (
              <div
                key={p}
                className="flex items-center gap-3 rounded-md border border-border bg-muted/20 px-3 py-2.5"
              >
                <GripVertical size={16} className="text-muted-foreground" />
                <span className="w-6 text-xs font-semibold text-muted-foreground">#{i + 1}</span>
                <span className="flex-1 text-sm font-medium">{p}</span>
                <span className="text-xs text-muted-foreground">Latency 200-400ms</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminPage>
  );
}

function Row({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0">
      <div>
        <Label className="text-sm">{label}</Label>
        {desc && <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>}
      </div>
      {children}
    </div>
  );
}
