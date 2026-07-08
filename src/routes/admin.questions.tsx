import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { AdminPage } from "@/components/admin-page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/questions")({
  component: QPage,
});

const QS = [
  { q: "Siapa target pengguna aplikasi Anda?", cat: "Konteks", type: "textarea", prio: 1, active: true },
  { q: "Apa tujuan utama aplikasi?", cat: "Konteks", type: "chips", prio: 2, active: true },
  { q: "Fitur wajib yang harus ada?", cat: "Fitur", type: "checkbox", prio: 3, active: true },
  { q: "Apakah membutuhkan login pengguna?", cat: "Fitur", type: "radio", prio: 4, active: true },
  { q: "Apakah membutuhkan dashboard admin?", cat: "Fitur", type: "switch", prio: 5, active: true },
  { q: "Level integrasi AI?", cat: "Teknologi", type: "select", prio: 6, active: true },
  { q: "Apakah butuh notifikasi real-time?", cat: "Teknologi", type: "switch", prio: 7, active: false },
];

function QPage() {
  return (
    <AdminPage
      title="Pertanyaan AI"
      subtitle="Kelola pertanyaan yang tampil pada AI Interview"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Pertanyaan
        </Button>
      }
    >
      <div className="space-y-2">
        {QS.map((q) => (
          <div key={q.q} className="card-premium flex items-center gap-3 p-4">
            <GripVertical size={16} className="text-muted-foreground" />
            <span className="w-8 text-xs font-semibold text-muted-foreground">#{q.prio}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{q.q}</div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">{q.cat}</Badge>
                <Badge variant="outline" className="text-[10px]">{q.type}</Badge>
              </div>
            </div>
            <Switch defaultChecked={q.active} />
            <Button size="icon" variant="ghost"><Pencil size={14} /></Button>
            <Button size="icon" variant="ghost"><Trash2 size={14} /></Button>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}
