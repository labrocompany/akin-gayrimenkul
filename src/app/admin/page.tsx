"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Timestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { LogOut, Trash2, Inbox } from "lucide-react";
import Image from "next/image";
import { db, auth } from "@/lib/firebase";
import { useAdminUser } from "@/hooks/useAdminUser";
import Logo from "@/components/Logo";
import ListingsManager from "@/app/admin/ListingsManager";
import BlogManager from "@/app/admin/BlogManager";

type Submission = { id: string } & DocumentData;

const tabs = [
  { key: "ilanlar", label: "Portföyler (Site)" },
  { key: "blogYazilari", label: "Blog" },
  { key: "portfoyTalepleri", label: "Portföy Talepleri" },
  { key: "hizliTalepler", label: "Hızlı Talepler" },
  { key: "projeTalepleri", label: "Proje Talepleri" },
  { key: "iletisimMesajlari", label: "İletişim Mesajları" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const columnsByTab: Record<TabKey, { key: string; label: string }[]> = {
  ilanlar: [],
  blogYazilari: [],
  portfoyTalepleri: [
    { key: "adSoyad", label: "Ad Soyad" },
    { key: "telefon", label: "Telefon" },
    { key: "eposta", label: "E-posta" },
    { key: "gayrimenkulTuru", label: "Tür" },
    { key: "islemTipi", label: "İşlem" },
    { key: "il", label: "İl" },
    { key: "ilce", label: "İlçe" },
    { key: "metrekare", label: "m²" },
    { key: "fiyatBeklentisi", label: "Fiyat Beklentisi" },
    { key: "aciklama", label: "Açıklama" },
  ],
  hizliTalepler: [
    { key: "telefon", label: "Telefon" },
    { key: "gayrimenkulTuru", label: "Tür" },
    { key: "il", label: "İl" },
    { key: "ilce", label: "İlçe" },
    { key: "tahminiFiyat", label: "Tahmini Fiyat" },
  ],
  projeTalepleri: [
    { key: "firmaAdi", label: "Firma" },
    { key: "yetkiliAdSoyad", label: "Yetkili" },
    { key: "telefon", label: "Telefon" },
    { key: "eposta", label: "E-posta" },
    { key: "projeAdi", label: "Proje" },
    { key: "projeKonumu", label: "Konum" },
    { key: "talepTuru", label: "Talep Türü" },
    { key: "not", label: "Not" },
  ],
  iletisimMesajlari: [
    { key: "adSoyad", label: "Ad Soyad" },
    { key: "telefon", label: "Telefon" },
    { key: "eposta", label: "E-posta" },
    { key: "hizmetTuru", label: "Hizmet Türü" },
    { key: "konu", label: "Konu" },
    { key: "mesaj", label: "Mesaj" },
  ],
};

function formatDate(value: Timestamp | undefined) {
  if (!value) return "-";
  return value.toDate().toLocaleString("tr-TR");
}

function isHttpUrl(value: unknown): value is string {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

function photoUrls(item: Submission) {
  return Array.isArray(item.fotoUrl) ? item.fotoUrl.filter(isHttpUrl) : [];
}

function renderCell(colKey: string, item: Submission) {
  const value = item[colKey];
  if (Array.isArray(value)) return value.join(", ") || "-";
  return value || "-";
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading } = useAdminUser();
  const [activeTab, setActiveTab] = useState<TabKey>("ilanlar");
  const [items, setItems] = useState<Submission[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || activeTab === "ilanlar" || activeTab === "blogYazilari") return;
    const q = query(collection(db, activeTab), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setItems(
          snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }))
        );
        setItemsLoading(false);
      },
      () => setItemsLoading(false)
    );
    return unsubscribe;
  }, [user, activeTab]);

  const columns = useMemo(() => columnsByTab[activeTab], [activeTab]);

  function selectTab(tab: TabKey) {
    setItemsLoading(true);
    setActiveTab(tab);
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    await deleteDoc(doc(db, activeTab, id));
  }

  async function handleLogout() {
    await signOut(auth);
    router.replace("/admin/login");
  }

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-border-soft">
        <div className="container-page flex items-center justify-between py-4">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted hidden sm:block">{user.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-primary-600 transition-colors"
            >
              <LogOut size={16} />
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <div className="container-page py-8">
        <h1 className="font-bold text-2xl text-ink mb-6">Yönetim Paneli</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => selectTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeTab === tab.key
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-ink-soft border-border-soft hover:border-primary-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "ilanlar" ? (
          <ListingsManager />
        ) : activeTab === "blogYazilari" ? (
          <BlogManager />
        ) : activeTab === "portfoyTalepleri" ? (
          <PortfoyTalepleriList items={items} loading={itemsLoading} onDelete={handleDelete} />
        ) : (
          <div className="bg-white rounded-2xl border border-border-soft overflow-hidden">
            {itemsLoading ? (
              <p className="p-8 text-center text-sm text-muted">Yükleniyor...</p>
            ) : items.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
                <Inbox size={28} className="text-muted" />
                <p className="text-sm text-muted">Bu kategoride henüz kayıt yok.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-cream-dark text-left text-xs font-semibold text-ink-soft uppercase tracking-wide">
                      <th className="px-4 py-3 whitespace-nowrap">Tarih</th>
                      {columns.map((col) => (
                        <th key={col.key} className="px-4 py-3 whitespace-nowrap">
                          {col.label}
                        </th>
                      ))}
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-t border-border-soft align-top">
                        <td className="px-4 py-3 whitespace-nowrap text-muted">
                          {formatDate(item.createdAt)}
                        </td>
                        {columns.map((col) => (
                          <td key={col.key} className="px-4 py-3 max-w-xs text-ink">
                            {renderCell(col.key, item)}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDelete(item.id)}
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
        )}
      </div>
    </div>
  );
}

function PortfoyTalepleriList({
  items,
  loading,
  onDelete,
}: {
  items: Submission[];
  loading: boolean;
  onDelete: (id: string) => void;
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-border-soft">
        <p className="p-8 text-center text-sm text-muted">Yükleniyor...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border-soft">
        <div className="p-12 flex flex-col items-center justify-center text-center gap-3">
          <Inbox size={28} className="text-muted" />
          <p className="text-sm text-muted">Bu kategoride henüz kayıt yok.</p>
        </div>
      </div>
    );
  }

  const details = [
    { key: "telefon", label: "Telefon" },
    { key: "eposta", label: "E-posta" },
    { key: "gayrimenkulTuru", label: "Tür" },
    { key: "islemTipi", label: "İşlem" },
    { key: "il", label: "İl" },
    { key: "ilce", label: "İlçe" },
    { key: "mahalle", label: "Mahalle" },
    { key: "metrekare", label: "m²" },
    { key: "odaSayisi", label: "Oda" },
    { key: "binaYasi", label: "Bina Yaşı" },
    { key: "fiyatBeklentisi", label: "Fiyat Beklentisi" },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const photos = photoUrls(item);
        return (
          <article key={item.id} className="bg-white rounded-2xl border border-border-soft p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-ink text-base">{item.adSoyad || "-"}</h2>
                <p className="text-xs text-muted mt-1">{formatDate(item.createdAt)}</p>
              </div>
              <button
                onClick={() => onDelete(item.id)}
                className="text-muted hover:text-red-600 transition-colors"
                aria-label="Sil"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              {details.map((field) => (
                <div key={field.key}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{field.label}</p>
                  <p className="text-sm text-ink mt-0.5">{item[field.key] || "-"}</p>
                </div>
              ))}
            </div>

            {item.aciklama ? (
              <p className="text-sm text-ink-soft mt-4 leading-relaxed">{item.aciklama}</p>
            ) : null}

            <div className="mt-4 pt-4 border-t border-border-soft">
              {photos.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {photos.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-32 h-24 rounded-xl overflow-hidden bg-cream-dark"
                    >
                      <Image src={url} alt="Yüklenen fotoğraf" fill sizes="128px" className="object-cover" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">Fotoğraf yüklenmemiş</p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
