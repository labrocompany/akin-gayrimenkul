import Image from "next/image";
import Link from "next/link";
import {
  Handshake,
  Home as HomeIcon,
  Building2,
  ShieldCheck,
  Users,
  Zap,
  Clock3,
  MapPin,
  TrendingUp,
  UserCog,
  Megaphone,
  BarChart3,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/Button";
import ListingCard from "@/components/ListingCard";
import OfficeCard from "@/components/OfficeCard";
import CtaBanner from "@/components/CtaBanner";
import StatsRow from "@/components/StatsRow";
import LeadMiniForm from "@/components/forms/LeadMiniForm";
import { listings } from "@/lib/listings";
import { offices } from "@/lib/site";

const infoCards = [
  {
    icon: Handshake,
    title: "Portföy Alımı",
    description:
      "Gayrimenkulünüzün doğru değerle satışa hazırlanması ve en doğru alıcıyla buluşturulması için çalışıyoruz.",
    linkLabel: "Portföy Ver",
    href: "/portfoyunuzu-satalim",
    iconBg: "bg-secondary-500/10 text-secondary-600",
  },
  {
    icon: HomeIcon,
    title: "Portföy Satımı",
    description:
      "Konut, arsa, ticari gayrimenkul ve yatırım fırsatları arasında size en uygun seçenekleri sunuyoruz.",
    linkLabel: "Satılık Portföyleri İncele",
    href: "/portfoyler",
    iconBg: "bg-primary-500/10 text-primary-600",
  },
  {
    icon: Building2,
    title: "Yetkili Satış Ofisi Danışmanlığı",
    description:
      "Müteahhit firmalara özel yetkili satış ofisi kuruyor, satış ve pazarlama süreçlerini profesyonel şekilde yönetiyoruz.",
    linkLabel: "Kurumsal Çözümler",
    href: "/proje-satis-danismanlik",
    iconBg: "bg-blue-500/10 text-blue-700",
  },
];

const steps = [
  { title: "Değerlendiriniz", description: "Gayrimenkulünüzü piyasa analizine göre inceleriz." },
  { title: "Planlarız", description: "Hedef kitleye özel pazarlama planı oluştururuz." },
  { title: "Hazırlarız", description: "Profesyonel çekim ve tanıtım materyalleri hazırlarız." },
  { title: "Görüntüleriz", description: "Doğru kanallarda etkili şekilde pazarlarız." },
  { title: "Etkileşim", description: "Alıcılarla iletişim kurar, randevu süreçlerini yönetiriz." },
  { title: "Satış & Devir", description: "Teklifin tapuya kadar tüm süreci takip ederiz." },
];

const projectServices = [
  { icon: MapPin, label: "Proje Konumlandırma" },
  { icon: TrendingUp, label: "Fiyatlandırma Stratejisi" },
  { icon: Building2, label: "Satış Ofisi Yönetimi" },
  { icon: Users, label: "CRM & Lead Yönetimi" },
  { icon: UserCog, label: "Satış Ekibi Yönetimi" },
  { icon: Megaphone, label: "Reklam & Lead Üretimi" },
  { icon: BarChart3, label: "Satış Raporlama" },
  { icon: MessageSquare, label: "Müşteri Görüşmeleri" },
];

const whyUs = [
  { icon: ShieldCheck, title: "Güvenilir Satış", description: "Şeffaf ve güvenilir çalışma prensibi" },
  { icon: Users, title: "Profesyonel Ekip", description: "Deneyimli ve uzman kadromuzla yanınızdayız" },
  { icon: Zap, title: "Hızlı Sonuç", description: "Doğru strateji ile hızlı ve etkin satış" },
  { icon: Clock3, title: "Zaman Yönetimi", description: "Süreci sizin adınıza biz yönetiriz" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center py-10 lg:py-14">
          <div className="relative z-10">
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-[42px] leading-[1.15] text-ink">
              Gayrimenkulde
              <br />
              <span className="text-primary-500">Doğru Strateji,</span>
              <br />
              <span className="text-secondary-600">Doğru Alıcı,</span>
              <br />
              Doğru Sonuç.
            </h1>
            <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-md">
              Bireysel portföy satışından büyük ölçekli projelerin satış
              yönetimine kadar tüm süreci profesyonel ekibimizle birlikte
              yönetiyoruz.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/portfoyunuzu-satalim" variant="primary" size="lg" withArrow>
                Portföyünüzü Satmak İstiyorum
              </Button>
              <Button href="/portfoyler" variant="outline" size="lg" withArrow>
                Gayrimenkul Arıyorum
              </Button>
            </div>
          </div>

          <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] rounded-3xl overflow-hidden">
            <Image
              src="/images/hero-home.jpg"
              alt="İstanbul manzaralı teras"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid sm:grid-cols-3 gap-5">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-border-soft p-6 flex flex-col"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${card.iconBg}`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-ink text-[15px] leading-snug">
                  {card.title}
                </h3>
                <p className="text-[13px] text-muted mt-2 leading-relaxed flex-1">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 mt-4 hover:gap-1.5 transition-all"
                >
                  {card.linkLabel} <ChevronRight size={15} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            Öne Çıkan Portföyler
          </h2>
          <Link
            href="/portfoyler"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:gap-1.5 transition-all"
          >
            Tüm Portföyler <ChevronRight size={15} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.slice(0, 3).map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-8">
            <h3 className="font-bold text-ink text-lg sm:text-xl">
              Portföyünüzü Neden Biz Satalım?
            </h3>
            <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-4">
              {steps.map((step, i) => (
                <div key={step.title} className="flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-full border-2 border-primary-500 text-primary-600 font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </div>
                  <h4 className="text-[13px] font-semibold text-ink mt-3">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-muted mt-1 leading-snug">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <LeadMiniForm />
        </div>
      </section>

      <section className="container-page py-8">
        <div className="bg-cream-dark rounded-2xl p-6 sm:p-8 grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
          <div className="relative h-[220px] sm:h-[260px] rounded-2xl overflow-hidden order-1">
            <Image
              src="/images/build-project.jpg"
              alt="Satış ofisi"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-ink text-xl sm:text-2xl leading-snug">
              Projenizi İnşa Ettiniz. Satışını Biz Yönetelim.
            </h3>
            <p className="text-muted text-sm mt-3 leading-relaxed max-w-md">
              Yetkili satış ofisi kurulumu, satış ekibi yönetimi, pazarlama
              ve CRM süreçleri ile projelerinizde yanınızdayız.
            </p>
            <Button href="/proje-satis-danismanlik" variant="secondary" size="md" withArrow className="mt-5">
              Projeniz İçin Teklif Alın
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {projectServices.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.label} className="flex items-center gap-2.5">
                <Icon size={16} className="text-primary-500 shrink-0" />
                <span className="text-[13px] text-ink-soft">{service.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          Neden Akın Emlak?
        </h2>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-ink">
                      {item.title}
                    </h4>
                    <p className="text-[11.5px] text-muted mt-0.5 leading-snug max-w-[140px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <StatsRow />
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          Ofislerimiz
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {offices.map((office) => (
            <OfficeCard
              key={office.slug}
              name={office.name}
              subtitle={office.subtitle}
              district={office.district}
              phone={office.phone}
              phoneHref={office.phoneHref}
              image={office.image}
            />
          ))}
        </div>
      </section>

      <CtaBanner title="Gayrimenkulünüz veya Projeniz İçin Bizimle İletişime Geçin" />
    </>
  );
}
