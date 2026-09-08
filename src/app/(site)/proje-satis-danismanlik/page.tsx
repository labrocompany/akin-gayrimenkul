import Image from "next/image";
import {
  Building2,
  UserCog,
  TrendingUp,
  Search,
  Target,
  Users,
  BarChart3,
  MapPin,
  Tag,
  Megaphone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Button from "@/components/Button";
import StatsRow from "@/components/StatsRow";
import CtaBanner from "@/components/CtaBanner";
import ProjectRequestForm from "@/components/forms/ProjectRequestForm";
import { withBasePath } from "@/lib/paths";

const services = [
  {
    icon: Building2,
    title: "Satış Ofisi Kurulumu",
    description: "Projenize özel satış ofisi yapısını kuruyoruz.",
  },
  {
    icon: UserCog,
    title: "Satış Süreç Yönetimi",
    description: "Lead'den satış kapanışına kadar süreçleri yönetiyoruz.",
  },
  {
    icon: TrendingUp,
    title: "Proje Satış Danışmanlığı",
    description: "Fiyatlandırma, konumlandırma ve satış stratejisi geliştiriyoruz.",
  },
];

const processSteps = [
  { icon: Search, title: "Analiz", description: "Projenizi ve pazarınızı analiz ederiz." },
  { icon: Target, title: "Konumlandırma", description: "Hedef kitle ve fiyat stratejisini belirleriz." },
  { icon: Building2, title: "Kurulum", description: "Satış ofisi ve operasyon sistemini kurarız." },
  { icon: Users, title: "Yönetim", description: "Satış ekibi, müşteri takibi ve görüşmeleri yönetiriz." },
  { icon: BarChart3, title: "Raporlama", description: "Süreç düzenli raporlarla şeffaf şekilde takip ederiz." },
];

const capabilities = [
  { icon: MapPin, title: "Proje Konumlandırma", description: "Doğru hedef kitleye yönelik proje konumlandırması yapıyoruz." },
  { icon: Tag, title: "Fiyatlandırma Stratejisi", description: "Pazar dinamiklerine uygun rekabetçi fiyatlandırma stratejileri geliştiriyoruz." },
  { icon: UserCog, title: "Satış Ekibi Yönetimi", description: "Deneyimli satış ekibiyle süreci profesyonelce yönetiyoruz." },
  { icon: Users, title: "CRM & Lead Yönetimi", description: "Tüm lead'leri CRM sistemimize entegre edip yönetiyoruz." },
  { icon: Megaphone, title: "Reklam ve Lead Üretimi", description: "Dijital ve geleneksel kanallarla nitelikli lead üretimi sağlıyoruz." },
  { icon: BarChart3, title: "Satış Raporlama", description: "Performans ve satış raporları ile süreci şeffaf şekilde sunuyoruz." },
];

const whyUs = [
  { icon: Building2, title: "Kurumsal Yaklaşım" },
  { icon: Users, title: "Saha ve Satış Deneyimi" },
  { icon: Zap, title: "Hızlı Operasyon" },
  { icon: ShieldCheck, title: "Şeffaf Süreç" },
];

export default function ProjectAdvisoryPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center pt-10 lg:pt-14">
          <div>
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-[42px] leading-[1.15] text-ink">
              Projelerinize
              <br />
              Satış Gücü Kazandırın.
              <br />
              <span className="text-primary-500">
                Yetkili Satış Ofisi ve Proje Danışmanlığı.
              </span>
            </h1>
            <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-md">
              Müteahhit ve proje geliştirici firmalar için satış ofisi
              kurulumu, satış yönetimi ve uçtan uca danışmanlık sunuyoruz.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#proje-talep-formu" variant="primary" size="lg" withArrow>
                Projem İçin Görüşelim
              </Button>
              <Button href="#hizmetlerimiz" variant="outline" size="lg">
                Hizmetleri İncele
              </Button>
            </div>
            <div className="mt-8">
              <StatsRow />
            </div>
          </div>
          <div className="relative h-[260px] sm:h-[340px] lg:h-[400px] rounded-3xl overflow-hidden">
            <Image
              src={withBasePath("/images/hero-proje.jpg")}
              alt="Satış ofisi"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="hizmetlerimiz" className="container-page py-10">
        <div className="grid sm:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-2xl border border-border-soft p-6 flex flex-col"
              >
                <div className="w-11 h-11 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-ink text-[15px]">
                  {service.title}
                </h3>
                <p className="text-[13px] text-muted mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="proje-talep-formu" className="container-page py-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          <div className="relative h-[280px] lg:h-auto rounded-2xl overflow-hidden">
            <Image
              src={withBasePath("/images/interior-lounge.jpg")}
              alt="Satış ofisi iç mekan"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <ProjectRequestForm />
        </div>
      </section>

      <section className="container-page py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-ink text-center mb-8">
          Süreci Nasıl Yönetiyoruz?
        </h2>
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="bg-white rounded-2xl border border-border-soft p-5 text-center flex flex-col items-center"
              >
                <div className="relative w-11 h-11 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center mb-3">
                  <Icon size={18} />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-sm">{step.title}</h3>
                <p className="text-[11.5px] text-muted mt-1 leading-snug">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-border-soft p-5 flex items-start gap-3"
              >
                <Icon size={18} className="text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-ink text-[13.5px]">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-muted mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-primary-600 text-center mb-8">
          Neden Akın Emlak?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {whyUs.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-border-soft p-5 flex items-center gap-3"
              >
                <Icon size={18} className="text-primary-500 shrink-0" />
                <span className="text-[13px] font-medium text-ink">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBanner title="Projenizi satışa hazır hale getirelim." />
    </>
  );
}
