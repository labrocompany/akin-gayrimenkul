"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Plus, Trash2, Inbox, ImagePlus } from "lucide-react";
import {
  createBlogPost,
  deleteBlogPost,
  subscribeBlogPosts,
  uploadBlogImage,
  type BlogPost,
} from "@/lib/blogService";

const initialForm = {
  title: "",
  excerpt: "",
  content: "",
};

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeBlogPosts((data) => {
      setPosts(data);
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
      setError("Lütfen bir kapak fotoğrafı seçin.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const imageUrl = await uploadBlogImage(imageFile);
      await createBlogPost({
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        coverImage: imageUrl,
      });
      setForm(initialForm);
      setImageFile(null);
      setImagePreview("");
      setFormOpen(false);
    } catch {
      setError("Yazı eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    await deleteBlogPost(id);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setFormOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          <Plus size={16} />
          Yeni Yazı Ekle
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-border-soft p-6 grid gap-4"
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
          <Field label="Kısa Özet">
            <input
              required
              type="text"
              className="form-input"
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
            />
          </Field>
          <Field label="Kapak Fotoğrafı">
            <label className="flex items-center gap-3 form-input cursor-pointer">
              <ImagePlus size={16} className="text-primary-500 shrink-0" />
              <span className="truncate text-sm text-ink-soft">
                {imageFile ? imageFile.name : "Fotoğraf seçin"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {imagePreview && (
              <div className="relative w-32 h-20 rounded-md overflow-hidden mt-2 bg-cream-dark">
                <Image src={imagePreview} alt="Önizleme" fill className="object-cover" />
              </div>
            )}
          </Field>
          <Field label="İçerik">
            <textarea
              required
              rows={8}
              className="form-input"
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
            />
          </Field>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-colors disabled:opacity-60"
            >
              {submitting ? "Ekleniyor..." : "Yazıyı Yayınla"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-border-soft overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-sm text-muted">Yükleniyor...</p>
        ) : posts.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
            <Inbox size={28} className="text-muted" />
            <p className="text-sm text-muted">Henüz blog yazısı eklenmedi.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream-dark text-left text-xs font-semibold text-ink-soft uppercase tracking-wide">
                  <th className="px-4 py-3">Görsel</th>
                  <th className="px-4 py-3">Başlık</th>
                  <th className="px-4 py-3">Özet</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-border-soft align-middle">
                    <td className="px-4 py-3">
                      <div className="relative w-14 h-10 rounded-md overflow-hidden bg-cream-dark">
                        {post.coverImage && (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink font-medium">{post.title}</td>
                    <td className="px-4 py-3 text-muted max-w-sm truncate">{post.excerpt}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-muted hover:text-red-600 transition-colors"
                        aria-label="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
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
