"use client";

import { useState, type FormEvent } from "react";
import { ShieldCheck } from "lucide-react";
import Button from "@/components/Button";
import { turkishProvinces, istanbulDistricts } from "@/lib/turkey";
import { createHizliTalep } from "@/lib/submissions";

const initialForm = {
  gayrimenkulTuru: "",
  il: "",
  ilce: "",
  tahminiFiyat: "",
  telefon: "",
};

export default function LeadMiniForm() {
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
      await createHizliTalep(form);
      setSubmitted(true);
    } catch {
      setError("Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-7 h-full flex flex-col items-center justify-center text-center min-h-[340px]">
        <div className="w-12 h-12 rounded-full bg-secondary-500/10 text-secondary-600 flex items-center justify-center mb-4">
          <ShieldCheck size={24} />
        </div>
        <h3 className="font-bold text-ink text-lg">Talebiniz Alındı</h3>
        <p className="text-sm text-muted mt-2 max-w-xs">
          Portföy bilgileriniz ekibimize iletildi. En kısa sürede sizinle
          iletişime geçeceğiz.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-7">
      <h3 className="font-bold text-ink text-lg">
        Portföy Bilgilerinizi Bırakın
      </h3>
      <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
        <div>
          <label className="text-xs font-medium text-ink-soft mb-1.5 block">
            Gayrimenkul Türü
          </label>
          <select
            required
            className="form-select"
            value={form.gayrimenkulTuru}
            onChange={(e) => update("gayrimenkulTuru", e.target.value)}
          >
            <option value="">Seçiniz</option>
            <option>Konut</option>
            <option>Ticari</option>
            <option>Arsa</option>
            <option>Proje</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-ink-soft mb-1.5 block">
              İl Seçiniz
            </label>
            <select
              required
              className="form-select"
              value={form.il}
              onChange={(e) => update("il", e.target.value)}
            >
              <option value="">Seçiniz</option>
              {turkishProvinces.map((il) => (
                <option key={il}>{il}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-ink-soft mb-1.5 block">
              İlçe Seçiniz
            </label>
            <select
              required
              className="form-select"
              value={form.ilce}
              onChange={(e) => update("ilce", e.target.value)}
            >
              <option value="">Seçiniz</option>
              {istanbulDistricts.map((ilce) => (
                <option key={ilce}>{ilce}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-ink-soft mb-1.5 block">
            Tahmini Satış Fiyatı
          </label>
          <input
            type="text"
            placeholder="Örn. 10.000.000 TL"
            className="form-input"
            value={form.tahminiFiyat}
            onChange={(e) => update("tahminiFiyat", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-soft mb-1.5 block">
            Telefon
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-border-soft px-3 py-2.5 focus-within:border-primary-500">
            <span className="text-sm">🇹🇷</span>
            <input
              required
              type="tel"
              placeholder="05xx xxx xx xx"
              className="flex-1 text-sm outline-none bg-transparent"
              value={form.telefon}
              onChange={(e) => update("telefon", e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Gönderiliyor..." : "Portföyümü Değerlendirin"}
        </Button>
        <p className="text-[11px] text-muted flex items-start gap-1.5 pt-1">
          <ShieldCheck size={14} className="text-primary-500 shrink-0 mt-0.5" />
          Bilgileriniz gizli tutulur, üçüncü kişilerle paylaşılmaz.
        </p>
      </form>
    </div>
  );
}
