import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Boxes } from "lucide-react";
import { AdminPage } from "@/components/admin-page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/technology")({
  component: TechnologyPage,
});

const CATEGORIES = [
  "Semua",
  "Frontend",
  "Backend",
  "Database",
  "Deployment",
  "Authentication",
  "Styling",
  "State Management",
  "Mobile",
  "Desktop",
  "Cloud",
  "DevOps",
  "Testing",
  "AI Framework",
];

interface Tech {
  name: string;
  category: string;
  version: string;
  desc: string;
  active: boolean;
}

const TECH: Tech[] = [
  { name: "React", category: "Frontend", version: "19.0", desc: "Library UI berbasis component", active: true },
  { name: "Next.js", category: "Frontend", version: "15.0", desc: "React framework dengan SSR/SSG", active: true },
  { name: "Vue", category: "Frontend", version: "3.5", desc: "Progressive framework", active: true },
  { name: "Node.js", category: "Backend", version: "22.0", desc: "JavaScript runtime", active: true },
  { name: "NestJS", category: "Backend", version: "10.0", desc: "Enterprise Node framework", active: true },
  { name: "Laravel", category: "Backend", version: "11.0", desc: "PHP web framework", active: true },
  { name: "PostgreSQL", category: "Database", version: "16.0", desc: "SQL database relasional", active: true },
  { name: "MongoDB", category: "Database", version: "7.0", desc: "NoSQL document database", active: true },
  { name: "MySQL", category: "Database", version: "8.4", desc: "SQL database populer", active: true },
  { name: "Vercel", category: "Deployment", version: "-", desc: "Deploy platform untuk frontend", active: true },
  { name: "Cloudflare", category: "Deployment", version: "-", desc: "Edge deployment", active: true },
  { name: "Supabase Auth", category: "Authentication", version: "2.0", desc: "Auth service", active: true },
  { name: "Clerk", category: "Authentication", version: "-", desc: "Auth komprehensif", active: false },
  { name: "Tailwind CSS", category: "Styling", version: "4.0", desc: "Utility-first CSS", active: true },
  { name: "shadcn/ui", category: "Styling", version: "-", desc: "Komponen headless siap pakai", active: true },
  { name: "TanStack Query", category: "State Management", version: "5.0", desc: "Async state management", active: true },
  { name: "Zustand", category: "State Management", version: "5.0", desc: "State minimalis", active: true },
  { name: "React Native", category: "Mobile", version: "0.76", desc: "Cross-platform mobile", active: true },
  { name: "Flutter", category: "Mobile", version: "3.24", desc: "Framework mobile Google", active: true },
  { name: "Tauri", category: "Desktop", version: "2.0", desc: "Desktop app ringan", active: true },
  { name: "Vitest", category: "Testing", version: "3.0", desc: "Unit testing modern", active: true },
  { name: "LangChain", category: "AI Framework", version: "0.3", desc: "Framework LLM app", active: true },
];

function TechnologyPage() {
  const [cat, setCat] = useState("Semua");
  const [q, setQ] = useState("");
  const filtered = TECH.filter(
    (t) =>
      (cat === "Semua" || t.category === cat) &&
      t.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AdminPage
      title="Teknologi"
      subtitle="Kelola daftar teknologi yang muncul di wizard pengguna"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Teknologi
        </Button>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Input
          placeholder="Cari teknologi..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition",
              cat === c
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <div key={t.name} className="card-premium p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Boxes size={18} />
              </div>
              <Badge variant={t.active ? "default" : "secondary"} className="text-[10px]">
                {t.active ? "Aktif" : "Nonaktif"}
              </Badge>
            </div>
            <div className="mt-4 font-semibold">{t.name}</div>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-[10px]">{t.category}</Badge>
              <span>v{t.version}</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t.desc}</p>
            <Button size="sm" variant="outline" className="mt-4 w-full">
              <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
            </Button>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}
