import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, Power, Wifi } from "lucide-react";
import { AdminPage } from "@/components/admin-page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/admin/api-key")({
  component: APIKeyPage,
});

const KEYS = [
  { provider: "Gemini", name: "Prod Primary", key: "sk-•••••••••••••abc1", status: "Active", prio: 1, quota: "1M/day", today: "324k", total: "42.1M", lat: "312ms", err: "-" },
  { provider: "Groq", name: "Prod Secondary", key: "gsk-•••••••••••df34", status: "Active", prio: 2, quota: "800k/day", today: "128k", total: "28.5M", lat: "184ms", err: "-" },
  { provider: "Claude", name: "Fallback", key: "sk-ant-••••••••ac9d", status: "Active", prio: 3, quota: "500k/day", today: "62k", total: "19.2M", lat: "420ms", err: "-" },
  { provider: "OpenAI", name: "Dev Key", key: "sk-••••••••••••xy12", status: "Disabled", prio: 4, quota: "200k/day", today: "0", total: "5.1M", lat: "-", err: "rate_limit" },
  { provider: "DeepSeek", name: "Team Key", key: "ds-•••••••••••qq88", status: "Active", prio: 5, quota: "500k/day", today: "48k", total: "12.8M", lat: "290ms", err: "-" },
];

function APIKeyPage() {
  return (
    <AdminPage
      title="API Key"
      subtitle="Kelola seluruh API Key untuk provider AI"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah API Key
        </Button>
      }
    >
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prio</TableHead>
                <TableHead>Quota</TableHead>
                <TableHead>Usage Hari Ini</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Error Terakhir</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {KEYS.map((k) => (
                <TableRow key={k.name}>
                  <TableCell className="font-medium">{k.provider}</TableCell>
                  <TableCell>{k.name}</TableCell>
                  <TableCell className="font-mono text-xs">{k.key}</TableCell>
                  <TableCell>
                    <Badge variant={k.status === "Active" ? "default" : "secondary"} className="text-[10px]">
                      {k.status}
                    </Badge>
                  </TableCell>
                  <TableCell>#{k.prio}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{k.quota}</TableCell>
                  <TableCell>{k.today}</TableCell>
                  <TableCell className="text-muted-foreground">{k.total}</TableCell>
                  <TableCell className="text-muted-foreground">{k.lat}</TableCell>
                  <TableCell className="text-muted-foreground">{k.err}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" aria-label="Test"><Wifi size={14} /></Button>
                      <Button size="icon" variant="ghost" aria-label="Toggle"><Power size={14} /></Button>
                      <Button size="icon" variant="ghost" aria-label="Edit"><Pencil size={14} /></Button>
                      <Button size="icon" variant="ghost" aria-label="Delete"><Trash2 size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminPage>
  );
}
