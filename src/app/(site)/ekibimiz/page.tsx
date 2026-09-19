import Image from "next/image";
import {
  Phone,
  Mail,
  UserCog,
  Users,
  Megaphone,
  Scale,
  Handshake,
} from "lucide-react";
import Button from "@/components/Button";
import CtaBanner from "@/components/CtaBanner";
import { siteConfig } from "@/lib/site";
import { withBasePath } from "@/lib/paths";

const departments = [
  {
    icon: Users,
    title: "Satış Danışmanları",
    description:
      "Konut, ticari, arsa ve yatırım portföylerinde alıcı ve satıcılarımıza uçtan uca eşlik eder.",
  },
  {
    icon: UserCog,
    title: "Proje & Kurumsal Satış Ekibi",
    description:
      "Müteahhit firmalar için satış ofisi kurulumu ve proje satış yönetimini profesyonelce yürütür.",
  },
  {
    icon: Handshake,
    title: "Müşteri İlişkileri",
    description:
      "Portföy sahiplerimiz ve alıcılarımızla süreç boyunca şeffaf iletişimi sağlar.",
  },
  {
    icon: Megaphone,
    title: "Pazarlama & Dijital",
    description:
      "Portföylerin doğru kanallarda, etkili görsel ve içeriklerle tanıtılmasını yönetir.",
  },
  {
    icon: Scale,
    title: "Hukuk & Tapu Danışmanlığı",
    description:
      "Satış ve devir süreçlerinin mevzuata uygun, güvenli şekilde tamamlanmasını takip eder.",
  },
];

export default function TeamPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center pt-10 lg:pt-14">
          <div>
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-[42px] leading-[1.15] text-ink">
              Uzman ve
              <br />
              <span className="text-primary-500">Profesyonel Ekibimizle</span>
              <br />
              Tanışın.
            </h1>
            <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-md">
              Bireysel portföy satışından büyük ölçekli proje satış
              yönetimine kadar tüm süreci; alanında deneyimli danışmanlarımız,
              satış ekibimiz ve destek departmanlarımızla birlikte yönetiyoruz.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/iletisim" variant="primary" size="lg" withArrow>
                Bizimle İletişime Geçin
              </Button>
              <Button href="/kariyer" variant="outline" size="lg">
                Ekibimize Katılın
              </Button>
            </div>
          </div>
          <div className="relative h-[260px] sm:h-[340px] lg:h-[400px] rounded-3xl overflow-hidden">
            <Image
              src={withBasePath("/images/build-project.jpg")}
              alt="Akın Emlak ekibi"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="bg-white rounded-2xl border border-border-soft p-6 sm:p-8 grid sm:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 bg-primary-500/10 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-primary-600">
              HVY
            </span>
          </div>
          <div>
            <h3 className="font-bold text-ink text-lg">Hüsamettin Vehbi Yay</h3>
            <p className="text-sm text-primary-600 font-semibold mt-0.5">
              Kurucu &amp; Yönetici Ortak
            </p>
            <p className="text-[13.5px] text-muted mt-2 leading-relaxed max-w-xl">
              Akın Emlak Gayrimenkul &amp; Danışmanlık&apos;ı, güven ve
              kurumsallık ilkeleriyle kurarak İstanbul&apos;un farklı
              bölgelerinde hizmet veren bir marka haline getirdi. Portföy ve
              proje satış süreçlerinde ekibimize doğrudan öncülük eder.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-[13px] text-ink-soft">
              <a href={siteConfig.phoneHref} className="flex items-center gap-1.5 hover:text-primary-600">
                <Phone size={14} className="text-primary-500" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-1.5 hover:text-primary-600"
              >
                <Mail size={14} className="text-primary-500" />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-ink text-center mb-8">
          Departmanlarımız
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-border-soft p-6 flex flex-col"
              >
                <div className="w-11 h-11 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-ink text-[15px]">
                  {item.title}
                </h3>
                <p className="text-[13px] text-muted mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBanner title="Ekibimizle Tanışmak ve Portföyünüzü Değerlendirmek İçin Bize Ulaşın" />
    </>
  );
}
