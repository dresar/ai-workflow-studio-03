import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/questions")({
  component: QuestionsPage,
});

type QType = "textarea" | "chips" | "radio" | "checkbox" | "select" | "switch";
interface Q {
  q: string;
  type: QType;
  options?: string[];
  desc?: string;
}

const QUESTIONS: Q[] = [
  { q: "Siapa target utama pengguna aplikasi Anda?", type: "textarea" },
  {
    q: "Apa tujuan utama aplikasi?",
    type: "chips",
    options: ["Penjualan", "Manajemen", "Edukasi", "Komunitas", "Produktivitas", "Hiburan"],
  },
  {
    q: "Fitur wajib yang harus ada?",
    type: "checkbox",
    options: ["Chat", "Notifikasi", "Pembayaran", "Upload File", "Multi-bahasa", "Export PDF"],
  },
  {
    q: "Apakah aplikasi memerlukan login pengguna?",
    type: "radio",
    options: ["Ya", "Tidak", "Opsional"],
  },
  { q: "Apakah membutuhkan dashboard admin?", type: "switch" },
  { q: "Apakah ada transaksi pembayaran?", type: "switch" },
  { q: "Apakah pengguna perlu mengunggah file?", type: "switch" },
  {
    q: "Level integrasi AI yang diinginkan?",
    type: "select",
    options: ["Tidak ada", "Ringan (chat)", "Sedang (recommender)", "Penuh (agent)"],
  },
  { q: "Apakah membutuhkan notifikasi real-time?", type: "switch" },
  { q: "Catatan tambahan tentang project", type: "textarea" },
];

function QuestionsPage() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const q = QUESTIONS[idx];
  const progress = ((idx + 1) / QUESTIONS.length) * 100;
  const [chipSel, setChipSel] = useState<Record<number, Set<string>>>({});

  function next() {
    if (idx === QUESTIONS.length - 1) navigate({ to: "/app/canvas" });
    else setIdx((i) => i + 1);
  }
  function back() {
    if (idx > 0) setIdx((i) => i - 1);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {idx + 1} dari {QUESTIONS.length} Pertanyaan
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="card-premium p-8">
        <h2 className="text-xl font-semibold">{q.q}</h2>
        {q.desc && <p className="mt-2 text-sm text-muted-foreground">{q.desc}</p>}

        <div className="mt-6">
          {q.type === "textarea" && (
            <Textarea placeholder="Tulis jawaban Anda di sini..." className="min-h-[140px]" />
          )}
          {q.type === "chips" && (
            <div className="flex flex-wrap gap-2">
              {q.options!.map((o) => {
                const sel = chipSel[idx]?.has(o);
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() =>
                      setChipSel((prev) => {
                        const s = new Set(prev[idx] ?? []);
                        if (s.has(o)) s.delete(o);
                        else s.add(o);
                        return { ...prev, [idx]: s };
                      })
                    }
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-sm transition",
                      sel
                        ? "border-primary/40 bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          )}
          {q.type === "checkbox" && (
            <div className="grid grid-cols-2 gap-3">
              {q.options!.map((o) => (
                <label key={o} className="flex items-center gap-2 rounded-md border border-border p-3 text-sm">
                  <Checkbox /> {o}
                </label>
              ))}
            </div>
          )}
          {q.type === "radio" && (
            <RadioGroup className="space-y-2">
              {q.options!.map((o) => (
                <label key={o} className="flex items-center gap-3 rounded-md border border-border p-3 text-sm">
                  <RadioGroupItem value={o} id={o} />
                  <span>{o}</span>
                </label>
              ))}
            </RadioGroup>
          )}
          {q.type === "select" && (
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih salah satu..." />
              </SelectTrigger>
              <SelectContent>
                {q.options!.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {q.type === "switch" && (
            <div className="flex items-center justify-between rounded-md border border-border p-4">
              <Label>Aktifkan</Label>
              <Switch />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={back} disabled={idx === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={next}>
            <SkipForward className="mr-2 h-4 w-4" /> Lewati
          </Button>
          <Button onClick={next}>
            {idx === QUESTIONS.length - 1 ? "Selesai" : "Lanjut"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
