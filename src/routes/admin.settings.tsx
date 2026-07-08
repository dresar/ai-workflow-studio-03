import { createFileRoute } from "@tanstack/react-router";
import { Save, Upload } from "lucide-react";
import { AdminPage } from "@/components/admin-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AdminPage
      title="Pengaturan Aplikasi"
      subtitle="Konfigurasi umum aplikasi"
      actions={<Button><Save className="mr-2 h-4 w-4" /> Simpan Perubahan</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-premium p-6">
          <h3 className="mb-4 text-base font-semibold">Identitas Aplikasi</h3>
          <div className="space-y-4">
            <Field label="Nama Aplikasi"><Input defaultValue="WorkflowAI" /></Field>
            <Field label="Tagline"><Input defaultValue="AI Workflow Generator" /></Field>
            <Field label="Deskripsi">
              <Textarea defaultValue="Dari ide ke prompt AI dalam satu workflow visual." />
            </Field>
            <Field label="Versi Aplikasi"><Input defaultValue="1.0.0" /></Field>
          </div>
        </div>

        <div className="card-premium p-6">
          <h3 className="mb-4 text-base font-semibold">Logo & Branding</h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-dashed border-border p-6">
              <div className="flex items-center justify-between gap-4">
                <BrandLogo size="lg" />
                <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" /> Ganti Logo</Button>
              </div>
            </div>
            <Field label="Favicon">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md border border-border bg-muted" />
                <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
              </div>
            </Field>
            <Field label="Warna Utama">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-md border border-border bg-primary" />
                <Input defaultValue="oklch(0.78 0.16 88)" className="flex-1 font-mono text-xs" />
              </div>
            </Field>
          </div>
        </div>

        <div className="card-premium p-6">
          <h3 className="mb-4 text-base font-semibold">Preferensi</h3>
          <div className="space-y-4">
            <Field label="Bahasa Default">
              <Select defaultValue="id">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Tema"><Input defaultValue="Dark Premium" disabled /></Field>
            <Field label="Timezone">
              <Select defaultValue="jakarta">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta">Asia/Jakarta</SelectItem>
                  <SelectItem value="singapore">Asia/Singapore</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>

        <div className="card-premium p-6">
          <h3 className="mb-4 text-base font-semibold">Footer</h3>
          <div className="space-y-4">
            <Field label="Teks Footer"><Input defaultValue="© 2026 WorkflowAI. All rights reserved." /></Field>
            <Field label="Link Kebijakan Privasi"><Input defaultValue="/privacy" /></Field>
            <Field label="Link Ketentuan"><Input defaultValue="/terms" /></Field>
            <Field label="Email Kontak"><Input defaultValue="hello@workflowai.app" /></Field>
          </div>
        </div>
      </div>
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
