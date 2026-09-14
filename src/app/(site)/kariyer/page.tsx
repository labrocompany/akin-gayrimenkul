import Image from "next/image";
import {
  GraduationCap,
  TrendingUp,
  Users,
  ShieldCheck,
  Briefcase,
  Mail,
  Phone,
} from "lucide-react";
import Button from "@/components/Button";
import { siteConfig } from "@/lib/site";
import { withBasePath } from "@/lib/paths";

const benefits = [
  {
    icon: TrendingUp,
    title: "Gelişim Fırsatı",
    description: "Sektörde deneyim kazanabileceğiniz, büyüyen bir kurumsal yapı.",
  },
  {
    icon: Users,
    title: "Güçlü Ekip Kültürü",
    description: "Deneyimli danışmanlarla birlikte öğrenerek ilerleyeceğiniz bir ortam.",
  },
  {
    icon: ShieldCheck,
    title: "Şeffaf Çalışma Prensibi",
    description: "Güven ve şeffaflık üzerine kurulu, kurumsal bir çalışma kültürü.",
  },
  {
    icon: Briefcase,
    title: "Geniş Portföy",
    description: "Konut, ticari, arsa ve proje satışında çeşitli tecrübe alanları.",
  },
];

const openRoles = [
  {
    icon: Users,
    title: "Gayrimenkul Satış Danışmanı",
    location: "Küçükçekmece / Esenyurt, İstanbul",
    type: "Tam Zamanlı",
  },
  {
    icon: GraduationCap,
    title: "Stajyer Satış Danışmanı",
    location: "İstanbul (Tüm Ofisler)",
    type: "Stajyer",
  },
  {
    icon: TrendingUp,
    title: "Proje Satış Ofisi Sorumlusu",
    location: "Proje Bazlı",
    type: "Tam Zamanlı",
  },
];

export default function CareerPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center pt-10 lg:pt-14">
          <div>
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-[42px] leading-[1.15] text-ink">
              Akın Emlak
              <br />
              <span className="text-primary-500">Ailesine</span>
              <br />
              Katılın.
            </h1>
            <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-md">
              Gayrimenkul sektöründe kariyer hedefleyen, güler yüzlü ve
              kurumsal bir ekiple çalışmak isteyen adaylarla tanışmaktan
              mutluluk duyarız.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={`mailto:${siteConfig.email}?subject=Kariyer%20Başvurusu`}
                variant="primary"
                size="lg"
                withArrow
              >
                Özgeçmişini Gönder
              </Button>
              <Button href="/iletisim" variant="outline" size="lg">
                Bizimle İletişime Geçin
              </Button>
            </div>
          </div>
          <div className="relative h-[260px] sm:h-[340px] lg:h-[400px] rounded-3xl overflow-hidden">
            <Image
              src={withBasePath("/images/office-4.jpg")}
              alt="Akın Emlak ofisi"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-ink text-center mb-8">
          Bizimle Çalışmanın Avantajları
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-border-soft p-5 flex flex-col items-start"
              >
                <div className="w-10 h-10 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center mb-3">
                  <Icon size={18} />
                </div>
                <h4 className="text-[13px] font-semibold text-ink">
                  {item.title}
                </h4>
                <p className="text-[11.5px] text-muted mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-ink text-center mb-8">
          Açık Pozisyonlar
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {openRoles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className="bg-white rounded-2xl border border-border-soft p-6 flex flex-col"
              >
                <div className="w-11 h-11 rounded-full bg-secondary-500/10 text-secondary-600 flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-ink text-[15px]">
                  {role.title}
                </h3>
                <p className="text-[13px] text-muted mt-2">{role.location}</p>
                <span className="inline-flex items-center self-start rounded-full bg-primary-50 text-primary-700 text-[11px] font-semibold px-2.5 py-1 mt-3">
                  {role.type}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-muted mt-6">
          Aradığınız pozisyonu bulamadıysanız da özgeçmişinizi bize
          gönderebilirsiniz, uygun bir pozisyon açıldığında sizinle iletişime
          geçeriz.
        </p>
      </section>

      <section className="container-page pb-10">
        <div className="bg-secondary-600 rounded-2xl px-6 sm:px-10 py-8 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-white font-bold text-xl sm:text-2xl">
              Başvurunuzu Bize İletin
            </h3>
            <p className="text-white/80 text-sm mt-2 max-w-md">
              Özgeçmişinizi e-posta ile gönderin veya telefonla bizimle
              iletişime geçin, ekibimiz en kısa sürede size dönüş yapacaktır.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`mailto:${siteConfig.email}?subject=Kariyer%20Başvurusu`}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 bg-white text-secondary-700 hover:bg-white/90 px-6 py-3.5 text-[15px]"
            >
              <Mail size={16} />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 bg-transparent text-white border border-white/70 hover:bg-white/10 px-6 py-3.5 text-[15px]"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
