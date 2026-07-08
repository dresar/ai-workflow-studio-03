import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Clock, Flag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/tasks")({
  component: TasksPage,
});

interface Task {
  title: string;
  label: string;
  priority: "High" | "Medium" | "Low";
  est: string;
  sub: string[];
}

const COLUMNS: Array<{ key: string; title: string; tasks: Task[] }> = [
  {
    key: "todo",
    title: "Todo",
    tasks: [
      { title: "Setup Auth Flow", label: "Auth", priority: "High", est: "6j", sub: ["Login UI", "JWT", "Session"] },
      { title: "Product Catalog Schema", label: "Backend", priority: "High", est: "4j", sub: ["Table", "Seed"] },
      { title: "Homepage Layout", label: "Frontend", priority: "Medium", est: "3j", sub: ["Hero", "Grid"] },
    ],
  },
  {
    key: "doing",
    title: "Sedang Dikerjakan",
    tasks: [
      { title: "Checkout API", label: "Backend", priority: "High", est: "8j", sub: ["Validate", "Reserve stock"] },
      { title: "Payment Integration", label: "Integration", priority: "High", est: "10j", sub: ["Midtrans", "Callback"] },
    ],
  },
  {
    key: "review",
    title: "Review",
    tasks: [
      { title: "Cart State Management", label: "Frontend", priority: "Medium", est: "3j", sub: ["Zustand store"] },
    ],
  },
  {
    key: "done",
    title: "Selesai",
    tasks: [
      { title: "Design System", label: "Design", priority: "Low", est: "5j", sub: ["Tokens", "Components"] },
    ],
  },
];

const prioColor: Record<Task["priority"], string> = {
  High: "border-destructive/30 bg-destructive/10 text-destructive",
  Medium: "border-primary/30 bg-primary/10 text-primary",
  Low: "border-border bg-muted text-muted-foreground",
};

function TasksPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-between border-b border-border bg-card/40 px-6 py-3">
        <div>
          <h1 className="text-lg font-semibold">Task Breakdown</h1>
          <p className="text-xs text-muted-foreground">Dari PRD ke daftar task implementasi</p>
        </div>
        <Button onClick={() => navigate({ to: "/app/prompt" })}>
          Generate Prompt <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto p-6">
        <div className="grid min-w-[900px] grid-cols-4 gap-4">
          {COLUMNS.map((col) => (
            <div key={col.key} className="flex flex-col">
              <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {col.tasks.length}
                </span>
              </div>
              <div className="flex-1 space-y-3 rounded-lg border border-border/60 bg-card/30 p-3">
                {col.tasks.map((t) => (
                  <div key={t.title} className="card-premium p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium">{t.title}</div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px]",
                          prioColor[t.priority],
                        )}
                      >
                        <Flag size={9} /> {t.priority}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">{t.label}</Badge>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock size={10} /> {t.est}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1.5 border-t border-border/60 pt-3">
                      {t.sub.map((s) => (
                        <label key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Checkbox className="h-3.5 w-3.5" />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
