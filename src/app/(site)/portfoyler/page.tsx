"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Grid2x2,
  Home,
  Building2,
  Mountain,
  LayoutGrid,
  TrendingUp,
  Search,
  ChevronLeft,
  ChevronRight,
  CalendarClock,
  BadgeCheck,
  Percent,
} from "lucide-react";
import Button from "@/components/Button";
import ListingCard from "@/components/ListingCard";
import { listings, type ListingCategory } from "@/lib/listings";
import { istanbulDistricts } from "@/lib/turkey";
import { withBasePath } from "@/lib/paths";

const tabs: { key: ListingCategory | "tumu"; label: string; icon: typeof Home }[] = [
  { key: "tumu", label: "Tümü", icon: Grid2x2 },
  { key: "konut", label: "Konut", icon: Home },
  { key: "ticari", label: "Ticari", icon: Building2 },
  { key: "arsa", label: "Arsa", icon: Mountain },
  { key: "proje", label: "Projeler", icon: LayoutGrid },
  { key: "yatirim", label: "Yatırım Fırsatları", icon: TrendingUp },
];

export default function PortfoylerPage() {
  const [activeTab, setActiveTab] = useState<ListingCategory | "tumu">("tumu");

  const filtered = useMemo(() => {
    if (activeTab === "tumu") return listings;
    return listings.filter((listing) => listing.category === activeTab);
  }, [activeTab]);

  return (
    <>
      <section className="relative overflow-hidden pb-6">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center pt-10 lg:pt-14">
          <div>
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-[42px] leading-[1.15] text-ink">
              Öne Çıkan ve
              <br />
              <span className="text-primary-500">Güncel Portföyler</span>
            </h1>
            <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-md">
              Konut, ticari, arsa ve yatırım fırsatları arasından
              ihtiyaçlarınıza en uygun gayrimenkule kolayca ulaşın.
            </p>
          </div>
          <div className="relative h-[220px] sm:h-[300px] lg:h-[340px] rounded-3xl overflow-hidden">
            <Image
              src={withBasePath("/images/hero-home.jpg")}
              alt="İstanbul manzaralı teras"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page">
        <div className="bg-white rounded-2xl border border-border-soft p-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 -mt-2">
          <FilterField label="Gayrimenkul Türü">
            <select className="form-select">
              <option>Seçiniz</option>
              <option>Konut</option>
              <option>Ticari</option>
              <option>Arsa</option>
              <option>Proje</option>
            </select>
          </FilterField>
          <FilterField label="İşlem Tipi">
            <select className="form-select">
              <option>Seçiniz</option>
              <option>Satılık</option>
              <option>Kiralık</option>
            </select>
          </FilterField>
          <FilterField label="İlçe / Bölge">
            <select className="form-select">
              <option>Seçiniz</option>
              {istanbulDistricts.map((ilce) => (
                <option key={ilce}>{ilce}</option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Fiyat Aralığı">
            <div className="flex items-center gap-1.5">
              <input placeholder="Min" className="form-input" />
              <span className="text-muted text-sm">-</span>
              <input placeholder="Maks" className="form-input" />
              <span className="text-xs text-muted shrink-0">TL</span>
            </div>
          </FilterField>
          <FilterField label="Oda Sayısı">
            <div className="flex items-center gap-2">
              <select className="form-select">
                <option>Seçiniz</option>
                <option>1+1</option>
                <option>2+1</option>
                <option>3+1</option>
                <option>4+1</option>
              </select>
              <Button variant="primary" size="md" className="shrink-0 !px-4">
                <Search size={16} />
                Ara
              </Button>
            </div>
          </FilterField>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-border-soft">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  active
                    ? "bg-primary-50 border-primary-500 text-primary-700"
                    : "bg-transparent border-transparent text-ink-soft hover:text-primary-600"
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between py-5">
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            Portföy Bulundu
          </p>
          <select className="form-select w-auto text-sm">
            <option>Önerilen Sıralama</option>
            <option>Fiyat: Düşükten Yükseğe</option>
            <option>Fiyat: Yüksekten Düşüğe</option>
            <option>En Yeniler</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted py-16">
            Bu kategoride henüz portföy bulunmuyor.
          </p>
        )}
      </section>

      <section className="container-page pb-10">
        <div className="bg-cream-dark rounded-2xl p-4 sm:p-6 grid lg:grid-cols-[1fr_1.3fr] gap-6 items-center">
          <div className="relative h-[200px] sm:h-[260px] rounded-2xl overflow-hidden">
            <Image
              src={withBasePath("/images/project-banner.jpg")}
              alt="Vadi Excellence Projesi"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-primary-600 font-semibold text-xs tracking-wide mb-2">
              ÖNE ÇIKAN PROJE
            </p>
            <h3 className="font-bold text-ink text-lg sm:text-xl leading-snug">
              Vadi Excellence –{" "}
              <span className="text-primary-500">
                Yüksek Getirili Yatırım ve Yaşam Projesi
              </span>
            </h3>
            <p className="text-muted text-[13.5px] mt-3 leading-relaxed max-w-lg">
              İstanbul&apos;un yeni gelişen lokasyonunda, modern mimarisi ve
              sosyal olanakları ile fark yaratan bir yaşam sizi bekliyor.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-[12.5px] text-ink-soft">
              <span className="flex items-center gap-1.5">
                <BadgeCheck size={14} className="text-primary-500" /> 2+1 - 5+1
                Daire Seçenekleri
              </span>
              <span className="flex items-center gap-1.5">
                <Percent size={14} className="text-primary-500" /> %50&apos;ye
                Varan Yatırım Getirisi
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarClock size={14} className="text-primary-500" /> 2026
                Teslim
              </span>
            </div>
            <div className="flex gap-3 mt-5">
              <Button href="/proje-satis-danismanlik" variant="primary" size="md">
                Projeyi İncele
              </Button>
              <Button href="/proje-satis-danismanlik" variant="outline" size="md">
                Proje Danışmanlığı Alın
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          <PageButton aria-label="Önceki sayfa">
            <ChevronLeft size={16} />
          </PageButton>
          <PageButton active>1</PageButton>
          <PageButton disabled>2</PageButton>
          <PageButton disabled>3</PageButton>
          <PageButton aria-label="Sonraki sayfa" disabled>
            <ChevronRight size={16} />
          </PageButton>
        </div>
      </section>
    </>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

function PageButton({
  children,
  active,
  disabled,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border transition-colors ${
        active
          ? "bg-primary-500 border-primary-500 text-white"
          : "border-border-soft text-ink-soft disabled:opacity-40"
      }`}
    >
      {children}
    </button>
  );
}
