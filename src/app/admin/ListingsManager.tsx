"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Plus, Trash2, Inbox, ImagePlus, Pencil } from "lucide-react";
import {
  createListing,
  deleteListing,
  subscribeListings,
  updateListing,
  uploadListingImage,
  type ListingRecord,
} from "@/lib/listingsService";
import type { ListingCategory, ListingStatus } from "@/lib/listings";
import { categoryLabels } from "@/lib/listings";
import { withBasePath } from "@/lib/paths";
import { turkishProvinces, getDistrictsForProvince } from "@/lib/turkey";

const initialForm = {
  title: "",
  district: "",
  city: "İstanbul",
  status: "SATILIK" as ListingStatus,
  category: "konut" as ListingCategory,
  price: "",
  featuresText: "",
  link: "",
};

function normalizeLink(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

export default function ListingsManager() {
  const [listings, setListings] = useState<ListingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeListings((data) => {
      setListings(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function update<K extends keyof typeof initialForm>(field: K, value: (typeof initialForm)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function resetForm() {
    setForm(initialForm);
    setImageFile(null);
    setImagePreview("");
    setExistingImage("");
    setEditingId(null);
    setError("");
  }

  function handleCityChange(city: string) {
    setForm((prev) => ({ ...prev, city, district: "" }));
  }

  const districtOptions = getDistrictsForProvince(form.city);
  const previewSrc = imagePreview || existingImage;

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : "");
  }

  function handleToggleForm() {
    if (formOpen) {
      resetForm();
      setFormOpen(false);
      return;
    }
    resetForm();
    setFormOpen(true);
  }

  function handleEdit(listing: ListingRecord) {
    setForm({
      title: listing.title,
      district: listing.district,
      city: listing.city,
      status: listing.status,
      category: listing.category,
      price: listing.price,
      featuresText: listing.features.join(", "),
      link: listing.link ?? "",
    });
    setImageFile(null);
    setImagePreview("");
    setExistingImage(listing.image);
    setEditingId(listing.id);
    setError("");
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingId && !imageFile) {
      setError("Lütfen bir fotoğraf seçin.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const imageUrl = imageFile ? await uploadListingImage(imageFile) : existingImage;
      const payload = {
        title: form.title,
        district: form.district,
        city: form.city,
        status: form.status,
        category: form.category,
        price: form.price,
        image: imageUrl,
        features: form.featuresText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        link: normalizeLink(form.link),
      };
      if (editingId) {
        await updateListing(editingId, payload);
      } else {
        await createListing(payload);
      }
      resetForm();
      setFormOpen(false);
    } catch {
      setError(
        editingId
          ? "Portföy güncellenirken bir hata oluştu. Lütfen tekrar deneyin."
          : "Portföy eklenirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu portföyü silmek istediğinize emin misiniz?")) return;
    if (editingId === id) {
      resetForm();
      setFormOpen(false);
    }
    await deleteListing(id);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleToggleForm}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          <Plus size={16} />
          Yeni Portföy Ekle
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-border-soft p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <Field label="Başlık">
            <input
              required
              type="text"
              className="form-input"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </Field>
          <Field label="Şehir">
            <select
              required
              className="form-select"
              value={form.city}
              onChange={(e) => handleCityChange(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {turkishProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </Field>
          <Field label="İlçe / Bölge">
            <select
              required
              disabled={!form.city}
              className="form-select"
              value={form.district}
              onChange={(e) => update("district", e.target.value)}
            >
              <option value="">Seçiniz</option>
              {districtOptions.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Durum">
            <select
              className="form-select"
              value={form.status}
              onChange={(e) => update("status", e.target.value as ListingStatus)}
            >
              <option value="SATILIK">Satılık</option>
              <option value="KİRALIK">Kiralık</option>
            </select>
          </Field>
          <Field label="Kategori">
            <select
              className="form-select"
              value={form.category}
              onChange={(e) => update("category", e.target.value as ListingCategory)}
            >
              {Object.entries(categoryLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Fiyat">
            <input
              required
              type="text"
              placeholder="Örn. 10.000.000 TL"
              className="form-input"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
            />
          </Field>
          <Field label="Fotoğraf">
            <label className="flex items-center gap-3 form-input cursor-pointer">
              <ImagePlus size={16} className="text-primary-500 shrink-0" />
              <span className="truncate text-sm text-ink-soft">
                {imageFile
                  ? imageFile.name
                  : editingId
                    ? "Yeni fotoğraf seçin (opsiyonel)"
                    : "Fotoğraf seçin"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {previewSrc && (
              <div className="relative w-20 h-14 rounded-md overflow-hidden mt-2 bg-cream-dark">
                <Image src={previewSrc} alt="Önizleme" fill className="object-cover" />
              </div>
            )}
          </Field>
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="form-label">Devamı Linki</label>
            <input
              type="text"
              placeholder="https://..."
              className="form-input"
              value={form.link}
              onChange={(e) => update("link", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="form-label">Özellikler (virgülle ayırın)</label>
            <input
              type="text"
              placeholder="Örn. 3+1 165 m², 2 Kat, Kapalı Otopark"
              className="form-input"
              value={form.featuresText}
              onChange={(e) => update("featuresText", e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-600 sm:col-span-2 lg:col-span-3">{error}</p>}

          <div className="sm:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-colors disabled:opacity-60"
            >
              {submitting
                ? editingId
                  ? "Kaydediliyor..."
                  : "Ekleniyor..."
                : editingId
                  ? "Değişiklikleri Kaydet"
                  : "Portföyü Yayınla"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-border-soft overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-sm text-muted">Yükleniyor...</p>
        ) : listings.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
            <Inbox size={28} className="text-muted" />
            <p className="text-sm text-muted">Henüz portföy eklenmedi.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream-dark text-left text-xs font-semibold text-ink-soft uppercase tracking-wide">
                  <th className="px-4 py-3">Görsel</th>
                  <th className="px-4 py-3">Başlık</th>
                  <th className="px-4 py-3">Konum</th>
                  <th className="px-4 py-3">Durum</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Fiyat</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id} className="border-t border-border-soft align-middle">
                    <td className="px-4 py-3">
                      <div className="relative w-14 h-10 rounded-md overflow-hidden bg-cream-dark">
                        {listing.image && (
                          <Image
                            src={withBasePath(listing.image)}
                            alt={listing.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink font-medium">{listing.title}</td>
                    <td className="px-4 py-3 text-muted">
                      {listing.district} / {listing.city}
                    </td>
                    <td className="px-4 py-3 text-muted">{listing.status}</td>
                    <td className="px-4 py-3 text-muted">{categoryLabels[listing.category]}</td>
                    <td className="px-4 py-3 text-ink font-semibold">{listing.price}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(listing)}
                          className="text-muted hover:text-primary-600 transition-colors"
                          aria-label="Düzenle"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(listing.id)}
                          className="text-muted hover:text-red-600 transition-colors"
                          aria-label="Sil"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
