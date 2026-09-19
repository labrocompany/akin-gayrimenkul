"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Plus, Trash2, Inbox, ImagePlus } from "lucide-react";
import {
  createTeamMember,
  deleteTeamMember,
  subscribeTeamMembers,
  uploadTeamPhoto,
  type TeamMember,
} from "@/lib/teamService";

const initialForm = {
  adSoyad: "",
  unvan: "",
  aciklama: "",
};

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeTeamMembers((data) => {
      setMembers(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function update<K extends keyof typeof initialForm>(field: K, value: (typeof initialForm)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageFile) {
      setError("Lütfen bir profil fotoğrafı seçin.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const fotoUrl = await uploadTeamPhoto(imageFile);
      await createTeamMember({
        adSoyad: form.adSoyad.trim(),
        unvan: form.unvan.trim(),
        aciklama: form.aciklama.trim(),
        fotoUrl,
      });
      setForm(initialForm);
      setImageFile(null);
      setImagePreview("");
      setFormOpen(false);
    } catch {
      setError("Kişi eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu kişiyi ekibimiz sayfasından kaldırmak istediğinize emin misiniz?")) return;
    await deleteTeamMember(id);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setFormOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          <Plus size={16} />
          Kişi Ekle
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-border-soft p-6 grid gap-4"
        >
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <label className="shrink-0 cursor-pointer">
              <span className="form-label">Profil Fotoğrafı</span>
              <span className="relative mt-1 w-24 h-24 rounded-full overflow-hidden bg-primary-500/10 border border-border-soft flex items-center justify-center">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Önizleme" fill className="object-cover" />
                ) : (
                  <ImagePlus size={22} className="text-primary-500" />
                )}
              </span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
            <div className="grid gap-4 flex-1 w-full">
              <Field label="Ad Soyad">
                <input
                  required
                  type="text"
                  className="form-input"
                  value={form.adSoyad}
                  onChange={(e) => update("adSoyad", e.target.value)}
                />
              </Field>
              <Field label="Ünvan">
                <input
                  required
                  type="text"
                  className="form-input"
                  value={form.unvan}
                  onChange={(e) => update("unvan", e.target.value)}
                />
              </Field>
            </div>
          </div>
          <Field label="Açıklama">
            <textarea
              rows={3}
              className="form-input"
              value={form.aciklama}
              onChange={(e) => update("aciklama", e.target.value)}
            />
          </Field>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-colors disabled:opacity-60"
            >
              {submitting ? "Ekleniyor..." : "Kişiyi Ekle"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-border-soft overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-sm text-muted">Yükleniyor...</p>
        ) : members.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
            <Inbox size={28} className="text-muted" />
            <p className="text-sm text-muted">Henüz ekip üyesi eklenmedi.</p>
          </div>
        ) : (
          <div className="divide-y divide-border-soft">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-4 px-4 py-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-cream-dark shrink-0">
                  {member.fotoUrl && (
                    <Image
                      src={member.fotoUrl}
                      alt={member.adSoyad}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink truncate">{member.adSoyad}</p>
                  <p className="text-sm text-muted truncate">{member.unvan}</p>
                </div>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-muted hover:text-red-600 transition-colors"
                  aria-label="Sil"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
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
