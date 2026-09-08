"use client";

import { useState, type FormEvent } from "react";
import { FileText, ShieldCheck } from "lucide-react";
import Button from "@/components/Button";
import { turkishProvinces } from "@/lib/turkey";
import { createProjeTalebi } from "@/lib/submissions";

const initialForm = {
  firmaAdi: "",
  yetkiliAdSoyad: "",
  telefon: "",
  eposta: "",
  projeAdi: "",
  projeKonumu: "",
  bagimsizBolumSayisi: "",
  talepTuru: "",
  not: "",
};

export default function ProjectRequestForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof initialForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await createProjeTalebi(form);
      setSubmitted(true);
    } catch {
      setError("Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-border-soft p-8 h-full flex flex-col items-center justify-center text-center min-h-[380px]">
        <div className="w-12 h-12 rounded-full bg-secondary-500/10 text-secondary-600 flex items-center justify-center mb-4">
          <ShieldCheck size={24} />
        </div>
        <h3 className="font-bold text-ink text-lg">Talebiniz Alındı</h3>
        <p className="text-sm text-muted mt-2 max-w-xs">
          Proje danışmanlığı ekibimiz talebinizi inceleyip en kısa sürede
          sizinle iletişime geçecek.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-7">
      <div className="flex items-center gap-2 mb-5">
        <FileText size={18} className="text-primary-500" />
        <h3 className="font-bold text-ink text-lg">
          Projeniz İçin Talep Oluşturun
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid sm:grid-cols-2 gap-3.5">
          <Field label="Firma Adı">
            <input
              required
              type="text"
              placeholder="Firma adınızı giriniz"
              className="form-input"
              value={form.firmaAdi}
              onChange={(e) => update("firmaAdi", e.target.value)}
            />
          </Field>
          <Field label="Yetkili Ad Soyad">
            <input
              required
              type="text"
              placeholder="Adınızı ve soyadınızı giriniz"
              className="form-input"
              value={form.yetkiliAdSoyad}
              onChange={(e) => update("yetkiliAdSoyad", e.target.value)}
            />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          <Field label="Telefon">
            <input
              required
              type="tel"
              placeholder="5XX XXX XX XX"
              className="form-input"
              value={form.telefon}
              onChange={(e) => update("telefon", e.target.value)}
            />
          </Field>
          <Field label="E-posta">
            <input
              required
              type="email"
              placeholder="ornek@email.com"
              className="form-input"
              value={form.eposta}
              onChange={(e) => update("eposta", e.target.value)}
            />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          <Field label="Proje Adı">
            <input
              type="text"
              placeholder="Proje adını giriniz"
              className="form-input"
              value={form.projeAdi}
              onChange={(e) => update("projeAdi", e.target.value)}
            />
          </Field>
          <Field label="Proje Konumu">
            <select
              className="form-select"
              value={form.projeKonumu}
              onChange={(e) => update("projeKonumu", e.target.value)}
            >
              <option value="">Seçiniz</option>
              {turkishProvinces.map((il) => (
                <option key={il}>{il}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          <Field label="Bağımsız Bölüm Sayısı">
            <input
              type="number"
              placeholder="Örn. 120"
              className="form-input"
              value={form.bagimsizBolumSayisi}
              onChange={(e) => update("bagimsizBolumSayisi", e.target.value)}
            />
          </Field>
          <Field label="Talep Türü">
            <select
              className="form-select"
              value={form.talepTuru}
              onChange={(e) => update("talepTuru", e.target.value)}
            >
              <option value="">Seçiniz</option>
              <option>Satış Ofisi Kurulumu</option>
              <option>Satış Süreç Yönetimi</option>
              <option>Proje Danışmanlığı</option>
            </select>
          </Field>
        </div>
        <Field label="Kısa Not">
          <textarea
            rows={3}
            placeholder="Projeniz ve beklentileriniz hakkında kısa bilgi veriniz."
            className="form-textarea"
            value={form.not}
            onChange={(e) => update("not", e.target.value)}
          />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full" withArrow disabled={submitting}>
          {submitting ? "Gönderiliyor..." : "Teklif Talep Et"}
        </Button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}
