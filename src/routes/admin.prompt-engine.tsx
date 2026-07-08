import { createFileRoute } from "@tanstack/react-router";
import { Save, PlayCircle } from "lucide-react";
import { AdminPage } from "@/components/admin-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/prompt-engine")({
  component: PromptEnginePage,
});

const TABS = [
  { key: "prd", label: "Generate PRD" },
  { key: "task", label: "Generate Task" },
  { key: "prompt", label: "Generate Prompt" },
  { key: "db", label: "Generate Database" },
  { key: "api", label: "Generate API" },
  { key: "arch", label: "Generate Architecture" },
  { key: "test", label: "Generate Testing" },
];

const SAMPLE = `You are an expert product manager. Given the user's app idea, produce a complete PRD in Markdown with the following sections:

1. Ringkasan
2. Tujuan
3. Target Pengguna
4. Fitur Utama
5. User Flow
6. Business Rules
7. Arsitektur

Variables:
{{app_idea}}
{{tech_preferences}}
{{answers}}
`;

function PromptEnginePage() {
  return (
    <AdminPage
      title="Prompt Engine"
      subtitle="Kelola template prompt untuk setiap tahap generasi"
      actions={
        <>
          <Button variant="outline"><PlayCircle className="mr-2 h-4 w-4" /> Test Prompt</Button>
          <Button><Save className="mr-2 h-4 w-4" /> Simpan</Button>
        </>
      }
    >
      <Tabs defaultValue="prd" className="w-full">
        <TabsList className="mb-6 flex h-auto flex-wrap gap-1 bg-transparent p-0">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.key}
              value={t.key}
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((t) => (
          <TabsContent key={t.key} value={t.key}>
            <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
              <div className="card-premium overflow-hidden">
                <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
                  {t.label.toLowerCase().replace(/\s/g, "-")}.prompt
                </div>
                <Textarea
                  defaultValue={SAMPLE}
                  className="min-h-[420px] resize-none rounded-none border-0 font-mono text-sm focus-visible:ring-0"
                />
              </div>
              <div className="card-premium h-fit p-5">
                <div className="mb-4 text-sm font-semibold">Konfigurasi</div>
                <div className="space-y-3 text-sm">
                  <Field label="Model"><Input defaultValue="gemini-2.0-flash" /></Field>
                  <Field label="Temperature"><Input type="number" step="0.1" defaultValue={0.7} /></Field>
                  <Field label="Max Tokens"><Input type="number" defaultValue={4096} /></Field>
                  <Field label="Top P"><Input type="number" step="0.05" defaultValue={0.9} /></Field>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </AdminPage>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
