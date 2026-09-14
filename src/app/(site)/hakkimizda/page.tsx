import Image from "next/image";
import {
  Target,
  Eye,
  ShieldCheck,
  Users,
  Zap,
  Clock3,
  BadgeCheck,
} from "lucide-react";
import Button from "@/components/Button";
import StatsRow from "@/components/StatsRow";
import OfficeCard from "@/components/OfficeCard";
import CtaBanner from "@/components/CtaBanner";
import { offices } from "@/lib/site";
import { withBasePath } from "@/lib/paths";

const values = [
  {
    icon: ShieldCheck,
    title: "Güvenilir Satış",
    description: "Şeffaf ve güvenilir çalışma prensibiyle her adımda yanınızdayız.",
  },
  {
    icon: Users,
    title: "Profesyonel Ekip",
    description: "Deneyimli ve uzman danışman kadromuzla sürecinizi yönetiyoruz.",
  },
  {
    icon: Zap,
    title: "Hızlı Sonuç",
    description: "Doğru strateji ile hızlı ve etkin satış süreçleri sağlıyoruz.",
  },
  {
    icon: Clock3,
    title: "Zaman Yönetimi",
    description: "Sürecin her aşamasını sizin adınıza titizlikle takip ediyoruz.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center pt-10 lg:pt-14">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/10 text-primary-700 text-xs font-semibold px-3 py-1.5">
                <BadgeCheck size={14} />
                sahibinden.com&apos;da PREMİUM OFİS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-500/10 text-secondary-700 text-xs font-semibold px-3 py-1.5">
                <BadgeCheck size={14} />
                Hepsiemlak&apos;ta ELİT OFİS
              </span>
            </div>
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-[42px] leading-[1.15] text-ink">
              Güvenle Büyüyen
              <br />
              <span className="text-primary-500">Kurumsal Bir</span>
              <br />
              Gayrimenkul Danışmanlığı.
            </h1>
            <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-md">
              Akın Emlak Gayrimenkul &amp; Danışmanlık olarak, bireysel portföy
              satışından büyük ölçekli projelerin satış yönetimine kadar tüm
              süreci profesyonel ekibimizle birlikte yönetiyoruz. Gayrimenkul
              satışı, kiralanması, şantiyeden itibaren satış ofisinin
              kurulması, inşaatı biten gayrimenkullerin teslimi ve toplu
              konutlardaki bağımsız bölümlerin mülk sahiplerine tesliminden
              site yönetimine kadar geniş bir hizmet yelpazesi sunuyoruz.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/iletisim" variant="primary" size="lg" withArrow>
                Bizimle İletişime Geçin
              </Button>
              <Button href="/portfoyler" variant="outline" size="lg">
                Portföylerimizi İnceleyin
              </Button>
            </div>
            <div className="mt-8">
              <StatsRow />
            </div>
          </div>
          <div className="relative h-[260px] sm:h-[340px] lg:h-[420px] rounded-3xl overflow-hidden">
            <Image
              src={withBasePath("/images/interior-lounge.jpg")}
              alt="Akın Emlak ofis iç mekan"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-7">
            <div className="w-11 h-11 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center mb-4">
              <Target size={20} />
            </div>
            <h3 className="font-bold text-ink text-lg">Misyonumuz</h3>
            <p className="text-[13.5px] text-muted mt-2 leading-relaxed">
              Müşterilerimizin gayrimenkul yatırımlarında doğru strateji,
              doğru alıcı ve doğru sonuçla buluşmasını sağlamak; şeffaf,
              güvenilir ve kurumsal bir danışmanlık deneyimi sunmak.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-7">
            <div className="w-11 h-11 rounded-full bg-secondary-500/10 text-secondary-600 flex items-center justify-center mb-4">
              <Eye size={20} />
            </div>
            <h3 className="font-bold text-ink text-lg">Vizyonumuz</h3>
            <p className="text-[13.5px] text-muted mt-2 leading-relaxed">
              İstanbul&apos;un gelişen bölgelerinde, portföy yönetiminden proje
              satış danışmanlığına kadar sektörün güvenilir ve tercih edilen
              kurumsal markası olmak.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-ink text-center mb-8">
          Neden Akın Emlak?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {values.map((item) => {
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

      <section className="container-page py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-ink text-center mb-8">
          Ofislerimiz
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
