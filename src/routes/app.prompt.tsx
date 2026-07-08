import { createFileRoute } from "@tanstack/react-router";
import { Copy, Download, RefreshCw, Eye, Cpu, Languages, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/app/prompt")({
  component: PromptPage,
});

const PROMPT = `You are a senior full-stack engineer. Build a Marketplace UMKM Nusantara.

## Stack
- Frontend: React + TanStack Router + Tailwind
- Backend: Node.js + PostgreSQL
- Auth: Supabase Auth
- Payment: Midtrans

## Requirements
1. Implement authentication with email/password and Google OAuth.
2. Product catalog with categories, search, and filters.
3. Cart and checkout flow with payment integration.
4. Seller dashboard with order management.
5. Admin dashboard for platform metrics.

## Constraints
- Mobile-first responsive design
- Accessible components (WCAG AA)
- Server-side rendering for SEO

## Deliverables
- Complete source code
- README with setup instructions
- Database migrations
- Seed data script
`;

function PromptPage() {
  const lines = PROMPT.split("\n");
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Code2 size={18} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Prompt untuk AI Coding</h1>
            <p className="text-xs text-muted-foreground">
              Siap ditempel ke Cursor, Trae AI, Claude Code, Antigravity, dan lainnya
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(PROMPT); toast.success("Prompt disalin"); }}>
            <Copy className="mr-2 h-4 w-4" /> Copy Prompt
          </Button>
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Markdown</Button>
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> TXT</Button>
          <Button variant="outline" size="sm"><RefreshCw className="mr-2 h-4 w-4" /> Generate Ulang</Button>
          <Button size="sm"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card-premium overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-2/70" />
            </div>
            <span>prompt.md</span>
          </div>
          <div className="grid grid-cols-[auto_1fr] font-mono text-[13px]">
            <div className="select-none border-r border-border bg-muted/20 px-3 py-4 text-right text-muted-foreground/60">
              {lines.map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
            <pre className="overflow-x-auto px-4 py-4 leading-6">
              <code className="text-foreground/90">{PROMPT}</code>
            </pre>
          </div>
        </div>

        <aside className="card-premium h-fit p-5">
          <div className="text-sm font-semibold">Informasi Prompt</div>
          <div className="mt-4 space-y-4 text-sm">
            <Info icon={<Cpu size={14} />} label="AI Target" value="Cursor / Claude Code" />
            <Info icon={<Languages size={14} />} label="Bahasa Prompt" value="English" />
            <div>
              <div className="mb-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                <Code2 size={14} /> Teknologi
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "TanStack", "PostgreSQL", "Supabase", "Tailwind"].map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <Info label="Jumlah Karakter" value={`${PROMPT.length}`} />
            <Info label="Status" value="Generated · Ready" valueClass="text-primary" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Info({ icon, label, value, valueClass = "" }: { icon?: React.ReactNode; label: string; value: string; valueClass?: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
        {icon} {label}
      </div>
      <div className={"text-sm font-medium " + valueClass}>{value}</div>
    </div>
  );
}
