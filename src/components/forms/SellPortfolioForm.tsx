"use client";

import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { Home, UploadCloud, ShieldCheck } from "lucide-react";
import Button from "@/components/Button";
import { turkishProvinces, getDistrictsForProvince } from "@/lib/turkey";
import { createPortfoyTalebi, uploadPortfoyPhoto } from "@/lib/submissions";

const MAX_PHOTOS = 10;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

const initialForm = {
  gayrimenkulTuru: "",
  islemTipi: "",
  il: "",
  ilce: "",
  mahalle: "",
  metrekare: "",
  odaSayisi: "",
  binaYasi: "",
  fiyatBeklentisi: "",
  adSoyad: "",
  telefon: "",
  eposta: "",
  aciklama: "",
};

export default function SellPortfolioForm() {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(field: keyof typeof initialForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateIl(il: string) {
    setForm((prev) => ({ ...prev, il, ilce: "" }));
  }

  const districtOptions = getDistrictsForProvince(form.il);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const fotoUrl = await Promise.all(files.map((file) => uploadPortfoyPhoto(file)));
      await createPortfoyTalebi({
        ...form,
        dosyaAdlari: files.map((file) => file.name),
        fotoUrl,
      });
      setSubmitted(true);
    } catch {
      setError("Gönderim sırasında bir hata oluştu. Fotoğrafı tekrar seçip deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  function applyFiles(incoming: File[]) {
    const images = incoming.filter(
      (file) => file.type.startsWith("image/") || /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name)
    );
    if (images.length === 0) {
      setError("Lütfen JPG veya PNG formatında bir fotoğraf seçin.");
      return;
    }
    const selected = [...files, ...images].slice(0, MAX_PHOTOS);
    if (selected.some((file) => file.size > MAX_PHOTO_SIZE)) {
      setError("Her fotoğraf en fazla 5 MB olabilir.");
      return;
    }
    setError("");
    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
  }

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    applyFiles(Array.from(e.target.files));
    e.target.value = "";
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    applyFiles(Array.from(e.dataTransfer.files));
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-border-soft p-8 sm:p-10 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-secondary-500/10 text-secondary-600 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={28} />
        </div>
        <h3 className="font-bold text-ink text-xl">Portföyünüz Bize İletildi</h3>
        <p className="text-sm text-muted mt-3 max-w-md mx-auto leading-relaxed">
          Uzman ekibimiz kısa süre içinde bilgilerinizi inceleyip sizinle
          iletişime geçecektir. Bize güvendiğiniz için teşekkür ederiz.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Home size={18} className="text-primary-500" />
        <h3 className="font-bold text-ink text-lg">Portföy Bilgilerinizi Girin</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Gayrimenkul Türü">
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
          </Field>
          <Field label="İşlem Tipi">
            <select
              required
              className="form-select"
              value={form.islemTipi}
              onChange={(e) => update("islemTipi", e.target.value)}
            >
              <option value="">Seçiniz</option>
              <option>Satılık</option>
              <option>Kiralık</option>
            </select>
          </Field>
          <Field label="İl">
            <select
              required
              className="form-select"
              value={form.il}
              onChange={(e) => updateIl(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {turkishProvinces.map((il) => (
                <option key={il}>{il}</option>
              ))}
            </select>
          </Field>
          <Field label="İlçe">
            <select
              required
              className="form-select"
              value={form.ilce}
              onChange={(e) => update("ilce", e.target.value)}
              disabled={!form.il}
            >
              <option value="">Seçiniz</option>
              {districtOptions.map((ilce) => (
                <option key={ilce}>{ilce}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Field label="Mahalle">
            <input
              type="text"
              placeholder="Mahalle giriniz"
              className="form-input"
              value={form.mahalle}
              onChange={(e) => update("mahalle", e.target.value)}
            />
          </Field>
          <Field label="m²">
            <input
              type="number"
              placeholder="Örn. 120"
              className="form-input"
              value={form.metrekare}
              onChange={(e) => update("metrekare", e.target.value)}
            />
          </Field>
          <Field label="Oda Sayısı">
            <select
              className="form-select"
              value={form.odaSayisi}
              onChange={(e) => update("odaSayisi", e.target.value)}
            >
              <option value="">Seçiniz</option>
              <option>1+1</option>
              <option>2+1</option>
              <option>3+1</option>
              <option>4+1</option>
            </select>
          </Field>
          <Field label="Bina Yaşı">
            <select
              className="form-select"
              value={form.binaYasi}
              onChange={(e) => update("binaYasi", e.target.value)}
            >
              <option value="">Seçiniz</option>
              <option>0-5</option>
              <option>5-10</option>
              <option>10-20</option>
              <option>20+</option>
            </select>
          </Field>
          <Field label="Fiyat Beklentisi">
            <input
              type="text"
              placeholder="Örn. 10.000.000 TL"
              className="form-input"
              value={form.fiyatBeklentisi}
              onChange={(e) => update("fiyatBeklentisi", e.target.value)}
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Ad Soyad">
            <input
              required
              type="text"
              placeholder="Adınızı giriniz"
              className="form-input"
              value={form.adSoyad}
              onChange={(e) => update("adSoyad", e.target.value)}
            />
          </Field>
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

        <Field label="Kısa Açıklama">
          <textarea
            rows={3}
            placeholder="Gayrimenkulünüzle ilgili kısa bilgi veriniz."
            className="form-textarea"
            value={form.aciklama}
            onChange={(e) => update("aciklama", e.target.value)}
          />
        </Field>

        <div>
          <span className="form-label">Fotoğraf Yükle</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={handleFiles}
          />
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-2 border border-dashed rounded-xl py-6 cursor-pointer text-center transition-colors ${
              dragOver ? "border-primary-500 bg-primary-50" : "border-border-soft hover:border-primary-500"
            }`}
          >
            <UploadCloud size={22} className="text-primary-500" />
            <span className="text-xs text-muted px-4">
              {files.length > 0
                ? `${files.length} fotoğraf seçildi`
                : "Fotoğrafları buraya sürükleyin veya tıklayarak yükleyin. JPG, PNG (Maks. 10 adet)"}
            </span>
          </div>
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {previews.map((src, index) => (
                <div key={`${files[index]?.name}-${index}`} className="relative w-16 h-12 rounded-md overflow-hidden bg-cream-dark">
                  <img src={src} alt={files[index]?.name ?? "Fotoğraf"} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full" withArrow disabled={submitting}>
          {submitting ? "Gönderiliyor..." : "Portföyümü Gönder"}
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
