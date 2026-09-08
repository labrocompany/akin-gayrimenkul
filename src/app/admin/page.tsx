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
import { db, auth } from "@/lib/firebase";
import { useAdminUser } from "@/hooks/useAdminUser";
import Logo from "@/components/Logo";

type Submission = { id: string } & DocumentData;

const tabs = [
  { key: "portfoyTalepleri", label: "Portföy Talepleri" },
  { key: "hizliTalepler", label: "Hızlı Talepler" },
  { key: "projeTalepleri", label: "Proje Talepleri" },
  { key: "iletisimMesajlari", label: "İletişim Mesajları" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const columnsByTab: Record<TabKey, { key: string; label: string }[]> = {
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

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading } = useAdminUser();
  const [activeTab, setActiveTab] = useState<TabKey>("portfoyTalepleri");
  const [items, setItems] = useState<Submission[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
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
                          {Array.isArray(item[col.key])
                            ? item[col.key].join(", ")
                            : item[col.key] || "-"}
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
      </div>
    </div>
  );
}
